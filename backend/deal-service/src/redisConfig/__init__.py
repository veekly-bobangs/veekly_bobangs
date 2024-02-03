from redis import Redis

redisClient = Redis(host='redis', port=6379, db=0)

SCRAPE_TASK = "scrape_task"
SCRAPE_RES = "scraping_result"
SCRAPE_RES_TIME = "scraping_result_time"
