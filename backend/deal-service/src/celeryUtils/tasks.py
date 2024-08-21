from celery import shared_task
from celery.signals import worker_ready
from datetime import datetime
import json
from redisConfig import redisClient, SCRAPE_TASK, SCRAPE_RES, SCRAPE_RES_TIME, redisRestaurantScrapeClient
from web_scraping.scrape import get_webscrape_data_with_retry
from web_scraping.scrape_google_place import scrape_google_place_info

@worker_ready.connect
def at_start(sender, **kwargs):
    print("Worker is ready, sending init task")
    with sender.app.connection() as connection:
        sender.app.send_task(SCRAPE_TASK, connection=connection)

@shared_task(ignore_result=False)
def search_restaurants_online(restaurant_name: str) -> list:
    scraped_data = scrape_google_place_info(restaurant_name + " Singapore")
    redisRestaurantScrapeClient.set(restaurant_name, json.dumps(scraped_data))
    return scraped_data

@shared_task(ignore_result=False, name=SCRAPE_TASK)
def celery_webscrape():
    res = get_webscrape_data_with_retry()
    redisClient.set(SCRAPE_RES, json.dumps(res))
    redisClient.set(SCRAPE_RES_TIME, datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
