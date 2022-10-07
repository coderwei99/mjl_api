const WXBizDataCrypt = require('./WXBizDataCrypt')

const { appId } = require("../consitant/wxConfigData")
async function changeEncryptedData(sesskey, encryptedData, iv) {
	console.log('test-----------------', sesskey, encryptedData, iv);
	var pc = new WXBizDataCrypt(appId, sesskey)

	var data = pc.decryptData(encryptedData, iv)

	// console.log('解密后 data: ', data)
	return data
}

module.exports = {
	changeEncryptedData
}
// 解密后的数据为
//
// data = {
//   "nickName": "Band",
//   "gender": 1,
//   "language": "zh_CN",
//   "city": "Guangzhou",
//   "province": "Guangdong",
//   "country": "CN",
//   "avatarUrl": "http://wx.qlogo.cn/mmopen/vi_32/aSKcBBPpibyKNicHNTMM0qJVh8Kjgiak2AHWr8MHM4WgMEm7GFhsf8OYrySdbvAMvTsw3mo8ibKicsnfN5pRjl1p8HQ/0",
//   "unionId": "ocMvos6NjeKLIBqg5Mr9QjxrP1FA",
//   "watermark": {
//     "timestamp": 1477314187,
//     "appid": "wx4f4bc4dec97d474b"
//   }
// }
