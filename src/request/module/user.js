const TripRequest = require("../request");

const { AppSecret, appId } = require("../../consitant/wxConfigData");

// 获取access_token
function getAccessToken() {
  return TripRequest.get({
    url: `cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${AppSecret}`
  })
}

// 获取用户手机号
function getUserPhone(access_token) {
  return TripRequest.post({
    url: `wxa/business/getuserphonenumber?access_token=${access_token}`
  })
}

// 根据code 换取用户的openid
function getWxUserInfo(code) {
  return TripRequest.get({
    url: `sns/jscode2session?appid=wx19cbe5fb88aa66e1&secret=${AppSecret}&js_code=${code}&grant_type=authorization_code`,
  });
}

module.exports = {
  getWxUserInfo,
  getAccessToken
}