# Running backend for development:

1. `docker compose -f .\docker-compose.dev.yml build` (in root dir)

1. `docker compose -f .\docker-compose.dev.yml up` (in root dir)

1. `python -m venv .venv`

2. `.\.venv\Scripts\activate`

3. `pip install -r requirements.txt`

4. `alembic upgrade head` 

5. `python src/app.py`
