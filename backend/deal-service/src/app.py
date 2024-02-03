import json
import os
from flask import Flask, jsonify
from celeryUtils.makeCelery import celery
from redis.lock import Lock
from redisConfig import redisClient, SCRAPE_RES, SCRAPE_RES_TIME

app = Flask(__name__)
# For dockerfiles to access celery
celery

@app.route('/get', methods = ['GET'])
def get_articles():
    scrape_res = redisClient.get(SCRAPE_RES)
    if scrape_res is None:
        return jsonify({"status": "pending"})
    
    return jsonify(json.loads(scrape_res))
    
@app.route('/get-time', methods = ['GET'])
def get_time():
    scrape_res_time = redisClient.get(SCRAPE_RES_TIME)
    if scrape_res_time is None:
        return jsonify({"status": "pending"})
    
    return jsonify({"time": scrape_res_time.decode("utf-8")})

@app.route("/hello", methods=["GET"])
def say_hello():
    return jsonify({"msg": "Hello from Flask"})

@app.route('/flask-health-check', methods=["GET"])
def flask_health_check():
	return "success", 200

if __name__ == "__main__":
    isDev = os.environ.get('IS_DEVELOPMENT', False)
    if isDev:
        print("Running in dev mode")
    print("Starting Flask app")
    app.run(host="0.0.0.0", port=8000)