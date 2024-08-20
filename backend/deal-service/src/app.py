import json
import os
from dotenv import load_dotenv
from pathlib import Path
from flask import Flask, jsonify
from celeryUtils.makeCelery import celery
from redis.lock import Lock
from redisConfig import redisClient, SCRAPE_RES, SCRAPE_RES_TIME
from controllers import base_routes, chope_deals_routes

app = Flask(__name__)
app.register_blueprint(base_routes)
app.register_blueprint(chope_deals_routes, url_prefix='/api/chope-deals')

# For dockerfiles to access celery
celery

if __name__ == "__main__":
    # This would be already defined in prod dockerfile env var
    is_prod = os.environ.get('IS_PROD', False)
    if is_prod:
        print("Running in production mode")
        app.run(host="0.0.0.0", port=8000)
    else:
        print("*** Running in development mode, you should not be seeing this in production!")
        # If not running flask in docker, env var is in env file, not dockerfile
        dotenv_path = Path('../.env')
        load_dotenv(dotenv_path=dotenv_path)
        app.run(host="0.0.0.0", port=8000, debug=True)
