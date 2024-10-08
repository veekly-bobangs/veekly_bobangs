# Veekly Bobangs

## About

When we are outside and looking for places to eat, there isn’t a centralized platform to find food deals nearby you, allowing you to get discounts for your food options.

Veekly Bobangs aims to tackle this issue by providing an application that allows users to find food deals that are physically nearby the user.

Veekly Bobangs will be designed to be used within Singapore, obtaining food deals from the deal website Chope. However, it should be designed such that its scope can be scaled in the future, being able to be used outside of Singapore, obtaining food deals from websites that are not Chope, or display non-food deals.

Our solution will allow users to view food deals nearby them, in the form of a list of deals, or with the location pins projected on a map. 

## Authors

[Aveek](https://github.com/magichampz)

[Bo Kuan](https://github.com/bokuanT)

## Quick start

\* You need to have Docker Installed. Python dev version: 3.10, Node dev version: 18 *

**Development:**

1. `docker compose -f .\docker-compose.dev.yml build`

2. `docker compose -f .\docker-compose.dev.yml up`

3. Start frontend and backend (Install necessary packages first and set up db with `alembic upgrade head`, see READMEs)

    a. `cd ./backend/deal-service`

    b. `python ./src/app.py`

    c. `cd ./frontend/webapp`

    d. `npm run dev`

        - alternatively you can run the frontend in debug mode using vscode debugger

3. `docker compose -f .\docker-compose.dev.yml down` (when exiting)

**Domain name**

> [Afraid.org](https://freedns.afraid.org/subdomain/)

**Deployment of front end:**

**Locally push to docker hub (this part is integrated to GH Actions- FYI for manual version)**

Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` into dockerfile.prod (nextjs public env vars are built into the html in build time)

```
# Rebuild the source code only when needed
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_PUBLIC_SUPABASE_URL ...
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY ...
ENV NEXT_TELEMETRY_DISABLED 1
ENV DOCKER_BUILD 1

RUN npm run build

```

`docker build -t bokuan/veekly-bobangs-clockbox:latest . -f .\Dockerfile.prod`

`docker login`

`docker push bokuan/veekly-bobangs-clockbox:latest`

**SSL cert for https:**

[Guide used](https://mindsers.blog/en/post/https-using-nginx-certbot-docker/)

if nginx has trouble reading pem files, do `sudo chmod -R 755 ./certbot/conf/<folder>/` for folders that have no permission

Renewing cert (every 3 months): `docker compose -f ./docker-compose.web-app-deploy.yml run --rm certbot renew` (Do this while containers are running)

**Pull from VM:**

`docker compose -f ./docker-compose.web-app-deploy.yml down`

`git pull origin main`

`docker compose -f ./docker-compose.web-app-deploy.yml pull`

`docker compose -f ./docker-compose.web-app-deploy.yml build`

`docker compose -f ./docker-compose.web-app-deploy.yml up`

**Workflow testing**

[act](https://github.com/nektos/act)

`act --secret-file act.secrets`

### Original code base

[Frontend](https://github.com/bokuanT/veekly-bobangs)

[Backend](https://github.com/magichampz/deals-getter)
