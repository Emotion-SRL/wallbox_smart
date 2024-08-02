#!/bin/sh

# URL del repository
GITHUB_TOKEN="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"
REPO_URL="https://$GITHUB_TOKEN@github.com/Emotion-SRL/wallbox_smart.git"

# Navigare nella directory del repository
cd /root/wallbox_smart

# Eseguire git pull
git pull $REPO_URL

# Eseguire il reboot
reboot