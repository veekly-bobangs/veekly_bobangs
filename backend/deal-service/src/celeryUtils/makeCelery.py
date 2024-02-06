from datetime import datetime
import json
import os
from celery import Celery
from celery.schedules import crontab
from celery.signals import worker_ready
from redisConfig import redisClient, SCRAPE_TASK, SCRAPE_RES, SCRAPE_RES_TIME
from web_scraping.scrape import get_webscrape_data_with_retry

CELERY_BROKER_URL = os.environ.get('CELERY_BROKER_URL', 'redis://localhost:6379')
CELERY_RESULT_BACKEND = os.environ.get('CELERY_RESULT_BACKEND', 'redis://localhost:6379')

celery = Celery('tasks', broker=CELERY_BROKER_URL, backend=CELERY_RESULT_BACKEND)

celery.conf.beat_schedule = {
    'webscrape-every-5-mins': {
        'task': SCRAPE_TASK,
        'schedule': crontab(minute=5)
    }
}
celery.conf.timezone = 'UTC'

@worker_ready.connect
def at_start(sender, **kwargs):
    print("Worker is ready, sending init task")
    with sender.app.connection() as connection:
        sender.app.send_task(SCRAPE_TASK, connection=connection)

@celery.task(name=SCRAPE_TASK)
#TODO: add retry logic on failure
def celeryWebscrape():
    res = get_webscrape_data_with_retry()
    redisClient.set(SCRAPE_RES, json.dumps(res))
    redisClient.set(SCRAPE_RES_TIME, datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
