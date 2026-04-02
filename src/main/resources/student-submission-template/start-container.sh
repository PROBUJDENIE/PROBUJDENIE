#!/bin/bash

IMAGE_TAG="$1"
TIMEOUT="$2"
MEMORY="$3"
IMAGE_FULL_REFERENCE="probujdenie/student-submission:${IMAGE_TAG}"

timeout --kill-after=1s "${TIMEOUT}s" docker run --rm -i \
    --name "${IMAGE_TAG}" \
    --memory="${MEMORY}m" \
    "${IMAGE_FULL_REFERENCE}"

EXIT_CODE=$?

if [ "$EXIT_CODE" -eq 124 ] || [ "$EXIT_CODE" -eq 137 ] || [ "$EXIT_CODE" -eq 143 ]; then
    docker kill "${IMAGE_TAG}" 2>/dev/null || true
    exit 124
fi

exit "$EXIT_CODE"