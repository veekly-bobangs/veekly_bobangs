from flask import Flask, jsonify
import celery.states as states
from celeryUtils.makeCelery import celery
from redis import Redis
from redis.lock import Lock

app = Flask(__name__)
redisClient = Redis(host='redis', port=6379, db=0)

def send_scrape_task(retry=False):
    lock = Lock(redisClient, "scrape_lock", timeout=30)
    if lock.acquire(blocking=False):
        try:
            if retry:
                redisClient.delete('scraping_task_id')
            task_id = redisClient.get('scraping_task_id')
            if task_id is None:
                scraping_task = celery.send_task('tasks.scrape')
                redisClient.set('scraping_task_id', scraping_task.id)
        finally:
            lock.release()


# Call send_scrape_task when app starts. The locking mechanism ensures
# that only one task is sent to celery in production with multiple gunicorn workers
send_scrape_task()

@app.route('/get', methods = ['GET'])
def get_articles():
    scraping_task_id = redisClient.get('scraping_task_id')
    if scraping_task_id is None:
        return jsonify({"status": "no scraping task found"})
    
    scraping_task_res = celery.AsyncResult(scraping_task_id)
    if scraping_task_res.state == states.PENDING:
        return jsonify({"status": "pending"})
    elif scraping_task_res.state == states.FAILURE:
        # retry the task
        send_scrape_task(retry=True)
        return jsonify({"status": "failed, retrying"})
    elif scraping_task_res.state == states.SUCCESS:
        return jsonify(scraping_task_res.get())
    else:
        return jsonify({"status": "unknown- " + scraping_task_res.state})

@app.route("/hello", methods=["GET"])
def say_hello():
    return jsonify({"msg": "Hello from Flask"})

@app.route('/flask-health-check', methods=["GET"])
def flask_health_check():
	return "success", 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)