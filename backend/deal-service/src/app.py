from flask import Flask, jsonify
import celery.states as states
from celeryUtils.makeCelery import celery

app = Flask(__name__)

scraping_task = celery.send_task('tasks.scrape')

@app.route('/get', methods = ['GET'])
def get_articles():
    global scraping_task
    scraping_task_res = celery.AsyncResult(scraping_task.id)
    if scraping_task_res.state == states.PENDING:
        return jsonify({"status": "pending"})
    elif scraping_task_res.state == states.FAILURE:
        # retry the task
        scraping_task = celery.send_task('tasks.scrape')
        return jsonify({"status": "failed, retrying"})
    elif scraping_task_res.state == states.SUCCESS:
        return jsonify(scraping_task_res.get())
    else:
        return jsonify({"status": "unknown" + scraping_task_res.state})

@app.route("/hello", methods=["GET"])
def say_hello():
    return jsonify({"msg": "Hello from Flask"})

@app.route('/flask-health-check', methods=["GET"])
def flask_health_check():
	return "success", 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)