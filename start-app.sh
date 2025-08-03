#!/bin/bash

set +e

docker-compose up --build -d || echo "docker-compose failed"

# Force shell to stay open
read -rp "Press enter to continue..."  # <- keeps shell open