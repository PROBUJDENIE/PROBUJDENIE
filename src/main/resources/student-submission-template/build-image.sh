#! /bin/bash

echo "Current working directory: $(pwd)"

IMAGE_TAG="$1"
APP_VERSION=1.0-SNAPSHOT
IMAGE_FULL_REFERENCE="probujdenie/student-submission:${IMAGE_TAG}"

echo "Building image ${IMAGE_FULL_REFERENCE}"

if docker build . --build-arg APP_VERSION="${APP_VERSION}" \
                  -t "${IMAGE_FULL_REFERENCE}" \
                  --no-cache \
                  --force-rm
                   then
    echo "Docker build succeeded."
else
    echo "Docker build failed, check the logs for errors." >&2
    exit 1
fi
