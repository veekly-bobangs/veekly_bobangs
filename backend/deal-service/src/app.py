import json
import os
from dotenv import load_dotenv
from pathlib import Path
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
    # This would be already defined in prod dockerfile env var
    is_prod = os.environ.get('IS_PROD', False)
    if is_prod:
        print("Running in production mode")
    else:
        print("*** Running in development mode, you should not be seeing this in production!")
        # If not running flask in docker, env var is in env file, not dockerfile
        dotenv_path = Path('../.env')
        load_dotenv(dotenv_path=dotenv_path)

    print("Starting Flask app")
    app.run(host="0.0.0.0", port=8000)
