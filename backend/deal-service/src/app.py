import os
from dotenv import load_dotenv
from pathlib import Path
from flask import Flask
from celeryUtils.makeCelery import celery
from controllers import base_routes, chope_deals_routes, restaurants_routes
from models import db

app = Flask(__name__)
app.register_blueprint(base_routes)
app.register_blueprint(chope_deals_routes, url_prefix='/api/chope-deals')
app.register_blueprint(restaurants_routes, url_prefix='/api/restaurants')

# For dockerfiles to access celery
celery

if __name__ == "__main__":
    # This would be already defined in prod dockerfile env var
    is_prod = os.environ.get('IS_PROD', False)
    
    if not is_prod:
        # If not running flask in docker, env var is in env file, not dockerfile
        dotenv_path = Path(__file__).resolve().parent.parent / '.env'
        load_dotenv(dotenv_path=dotenv_path)
        print("Loaded .env file in dev mode")

    # print all env vars
    database_url = os.environ.get("DATABASE_URL")
    if not database_url:
        raise ValueError("DATABASE_URL is not set in .env file")
    
    app.config['SQLALCHEMY_DATABASE_URI'] = database_url
    db.init_app(app)

    if is_prod:
        print("Running in production mode")
        app.run(host="0.0.0.0", port=8000)
    else:
        print("*** Running in development mode, you should not be seeing this in production!")
        app.run(host="0.0.0.0", port=8000, debug=True)
