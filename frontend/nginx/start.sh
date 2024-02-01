#!/bin/bash
envsubst '$WEB_APP_ADDR' < /tmp/default.conf > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
