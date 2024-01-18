from redis import Redis

redisClient = Redis(host='redis', port=6379, db=0)

SCRAPE_LOCK = "scrape_lock"
SCRAPE_TASK_ID = "scraping_task_id"
SCRAPE_TASK = "tasks.scrape"
