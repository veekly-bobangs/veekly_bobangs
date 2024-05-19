# Running backend with only webscraping functionality:

1. `python -m venv .venv`

2. `.\.venv\Scripts\activate`

3. `pip install -r requirements.txt`

4. `python src/app.py`

# Quick start (not reccomended to run without docker, not tried)
1. `python -m venv .venv`

2. `.\.venv\Scripts\activate`

3. `pip install -r requirements.txt`

4. Set environment variables for:

```
CELERY_BROKER_URL redis://redis:6379/0
CELERY_RESULT_BACKEND redis://redis:6379/0
```

(or make sure redis is accessible at `redis://localhost:6379`)

5. start redis

6. run `python ./src/app.py`

7. Start celery worker in `./src` dir with `celery -A app.celery worker --loglevel=info`
