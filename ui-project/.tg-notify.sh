#!/bin/bash
# var="hello"
# echo "$var world"
# echo "TEST_VAL1=$TEST_VAL1"
# echo "TEST_VAL2=$TEST_VAL2"
echo "MSG=$MSG"

# TEXT="Тестирование выполнено: (☉_☉)"
curl -s -X POST https://api.telegram.org/$TELEGRAM_BOT_TOKEN/sendMessage -d chat_id=$TELEGRAM_USER_ID  -d text="$MSG"

# curl -F chat_id=$TELEGRAM_USER_ID -F document=@"./temp/testResult.html" https://api.telegram.org/$TELEGRAM_BOT_TOKEN/sendDocument


#%0A%0AProject:+$CI_PROJECT_NAME%0AURL:+$CI_PROJECT_URL/pipelines/$CI_PIPELINE_ID/%0ABranch:+$CI_COMMIT_REF_SLUG%0A
#отчет доступен по ссылке: https://gitlab.com/alexanderpono/otus-qa-js-hw-10/-/jobs/$CI_JOB_ID/artifacts/public/testResult.html
#%0A краткий отчет: