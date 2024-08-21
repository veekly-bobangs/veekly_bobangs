import os
from dotenv import load_dotenv
from pathlib import Path
from flask import Flask
from celery.schedules import crontab
from celeryUtils import celery_init_app
from controllers import base_routes, chope_deals_routes, restaurants_routes
from models import db
from redisConfig import SCRAPE_TASK

# Load env vars (if dev mode)
# This would be already defined in prod dockerfile env var
is_prod = os.environ.get('IS_PROD', False)

if not is_prod:
    # If not running flask in docker, env var is in env file, not dockerfile
    dotenv_path = Path(__file__).resolve().parent.parent / '.env'
    load_dotenv(dotenv_path=dotenv_path)
    print("Loaded .env file in dev mode")

def create_app() -> Flask:
    app = Flask(__name__)
    app.register_blueprint(base_routes)
    app.register_blueprint(chope_deals_routes, url_prefix='/api/chope-deals')
    app.register_blueprint(restaurants_routes, url_prefix='/api/restaurants')

    # For celery worker to access
    app.config.from_mapping(
        CELERY=dict(
            broker_url=os.environ.get("CELERY_BROKER_URL", "redis://localhost"),
            result_backend=os.environ.get("CELERY_RESULT_BACKEND", "redis://localhost"),
            task_ignore_result=True,
            beat_schedule={
                'webscrape-every-25-mins': {
                    'task': SCRAPE_TASK,
                    'schedule': crontab(minute='*/25')
                }
            }
        ),
    )
    celery_init_app(app)
    return app

flask_app = create_app()
celery_app = flask_app.extensions["celery"]

if __name__ == "__main__":
    # Connect to database
    database_url = os.environ.get("DATABASE_URL")
    if not database_url:
        raise ValueError("DATABASE_URL is not set in .env file")
    
    flask_app.config['SQLALCHEMY_DATABASE_URI'] = database_url
    db.init_app(flask_app)    

    if is_prod:
        print("Running in production mode")
        flask_app.run(host="0.0.0.0", port=8000)
    else:
        print("*** Running in development mode, you should not be seeing this in production!")
        flask_app.run(host="0.0.0.0", port=8000, debug=True)
