# Guide

## Minikube

### Start 

1. `minikube start`

2. Start pods

```
kubectl apply -f ConfigMap.yaml
kubectl apply -f ./backend/redis.yaml
kubectl apply -f ./backend/selenium.yaml
kubectl apply -f ./backend/celery.yaml
kubectl apply -f ./backend/flask-app.yaml
kubectl apply -f ./webapp/webapp.yaml
```

3. `minikube service webapp-service --url`

### Stop

```
kubectl delete --all deployments
kubectl delete --all services
kubectl delete --all pods
kubectl delete --all configmaps
kubectl delete --all secrets

minikube stop
minikube delete
```