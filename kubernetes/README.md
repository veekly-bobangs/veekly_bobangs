# Guide

## Minikube

### Start 

1. `minikube start`

2. `kubectl apply -f <file>`

3. `kubectl service webapp-service --url`

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