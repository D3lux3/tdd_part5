#!/usr/bin/env bash
set -euxo pipefail

docker-compose -f docker-compose.e2e.yaml up -d

cd e2e

echo "waiting for the server to start"
sleep 15

CI=true npm run test

docker-compose -f ../docker-compose.e2e.yaml down