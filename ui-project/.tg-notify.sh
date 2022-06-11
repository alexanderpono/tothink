#!/bin/bash
echo "MSG=$MSG"

curl -s -X POST https://api.telegram.org/$TELEGRAM_BOT_TOKEN/sendMessage -d chat_id=$TELEGRAM_USER_ID  -d text="$MSG"

# curl -F chat_id=$TELEGRAM_USER_ID -F document=@"./temp/testResult.html" https://api.telegram.org/$TELEGRAM_BOT_TOKEN/sendDocument

