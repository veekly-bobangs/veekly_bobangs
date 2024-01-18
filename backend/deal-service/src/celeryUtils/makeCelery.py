import os
from celery import Celery
from web_scraping.scrape import get_webscrape_data
from redisConfig import SCRAPE_TASK

CELERY_BROKER_URL = os.environ.get('CELERY_BROKER_URL', 'redis://localhost:6379'),
CELERY_RESULT_BACKEND = os.environ.get('CELERY_RESULT_BACKEND', 'redis://localhost:6379')

celery = Celery('tasks', broker=CELERY_BROKER_URL, backend=CELERY_RESULT_BACKEND)

@celery.task(name=SCRAPE_TASK)
def celeryWebscrape():
    return get_webscrape_data()
