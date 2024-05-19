import json
import os
from flask import Flask, jsonify
from celeryUtils.makeCelery import celery
from redis.lock import Lock
from redisConfig import redisClient, SCRAPE_RES, SCRAPE_RES_TIME
from web_scraping.scrape import get_webscrape_data_with_retry

app = Flask(__name__)
# For dockerfiles to access celery
celery

devData = {}

@app.route('/get', methods = ['GET'])
def get_articles():
    if os.environ.get('IS_PROD', False):
        scrape_res = redisClient.get(SCRAPE_RES)
        if scrape_res is None:
            return jsonify({"status": "pending"})
        
        return jsonify(json.loads(scrape_res))
    else:
        return devData
    
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
    isProd = os.environ.get('IS_PROD', False)
    if isProd:
        print("Running in production mode")
    else:
        print("*** Running in development mode, you should not be seeing this in production!")
        devData = get_webscrape_data_with_retry()

    print("Starting Flask app")
    app.run(host="0.0.0.0", port=8000)
