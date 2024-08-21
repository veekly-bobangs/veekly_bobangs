from redis import Redis
import os

redis_host = os.environ.get('REDIS_URL', 'localhost')

redisClient = Redis(host=redis_host, port=6379, db=0)
redisRestaurantScrapeClient = Redis(host=redis_host, port=6379, db=1)

SCRAPE_TASK = "scrape_task"
SCRAPE_RES = "scraping_result"
SCRAPE_RES_TIME = "scraping_result_time"
