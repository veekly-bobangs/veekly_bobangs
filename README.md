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

**Development:**

1. `docker compose -f .\docker-compose.dev.yml build`

2. `docker compose -f .\docker-compose.dev.yml watch` (hot reload enabled)

3. `docker compose -f .\docker-compose.dev.yml down` (when exiting)

**Deployment of front end:**

Locally push to docker hub (this part is integrated to GH Actions- FYI for manual version)

`docker build -t bokuan/veekly-bobangs-clockbox:latest . -f .\Dockerfile.prod`

`docker login`

`docker push bokuan/veekly-bobangs-clockbox:latest`

Transfer SSL/TLS certificates:

`nginx-selfsigned.crt` and `nginx-selfsigned.key` to `./frontend/nginx` 

or

`openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout nginx-selfsigned.key -out nginx-selfsigned.crt`

Update map api key - copy `.env.example` and change to `.env.local`

Pull from VM:

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
