import os
from celery import Celery
from web_scraping.scrape import get_webscrape_data

CELERY_BROKER_URL = os.environ.get('CELERY_BROKER_URL', 'redis://localhost:6379'),
CELERY_RESULT_BACKEND = os.environ.get('CELERY_RESULT_BACKEND', 'redis://localhost:6379')

celery = Celery('tasks', broker=CELERY_BROKER_URL, backend=CELERY_RESULT_BACKEND)

@celery.task(name='tasks.scrape', bind=True, max_retries=3, default_retry_delay=60)
def celeryWebscrape(self):
    try:
        return get_webscrape_data()
    except Exception as exc:
        print("Retrying task...")
        # Retry the task
        raise self.retry(exc=exc)