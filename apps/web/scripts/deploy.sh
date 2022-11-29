#!/bin/bash

gcloudProject=$(gcloud config get-value project)

docker build -t motifxd-web --platform linux/amd64 -f ./Dockerfile ../../ --tag "gcr.io/$gcloudProject/motifxd-web"
docker push "gcr.io/$gcloudProject/motifxd-web:latest"
gcloud run deploy motifxd-web --image "gcr.io/$gcloudProject/motifxd-web:latest" --region us-east1 --platform managed --memory 1Gi

