#!/bin/sh

# This script is used to start nginx with a custom configuration
envsubst < /usr/share/nginx/html/scripts/config.template.js > /usr/share/nginx/html/config.js

# Launch nginx
nginx -g 'daemon off;'
