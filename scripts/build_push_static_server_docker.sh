#! /bin/bash

echo "Building docker image..."
docker build -t [CONTAINER REPOSITORY PATH] .
echo "Docker image built."
echo "Pushing docker image to container registry..."
docker push [CONTAINER REPOSITORY PATH]
echo "Pushed docker image to container registry. You can now update the image on kubernetes via the GKE Console."