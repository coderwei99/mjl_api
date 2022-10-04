const TripRequest = require("../request");
const axios = require("axios")
const {
  appid,
  secret,
  touser,
  template_id,
  url,
  data
} = require("../../consitant/wxTemplateData");

// 获取模板消息的access_token
function getAccessToken() {
  return TripRequest.get({
    url: `cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`
  })
}

// 进行消息推送


function postSendTemplate(access_token) {
  return TripRequest.post({
    url: `cgi-bin/message/template/send?access_token=${access_token}`,
    data: {
      "touser": "oFtGs531zmNeee-FkUjEbrIq6pXM",
      "template_id": "GUglJkRbUUkN_nS3pQ0rVRT4mzd6U5WbsuAs0Eom46k",
      "url": "",
      "data": {
        "love": {
          "value": "今天没有土味情话了 哈哈！",
          "color": "#FFC0CB"
        }
      }
    },
  })
}


module.exports = {
  getAccessToken,
  postSendTemplate
}