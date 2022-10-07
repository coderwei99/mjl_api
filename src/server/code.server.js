
const Code = require("../model/code_model");

class CodeServer {
  // 创建邀请码
  // TODO  需要校检是否重复  就是判断shop_name如果存在 那么生成的邀请码一定是重复的 需要重新校检
  async create(code, shop_name) {
    const result = await Code.create({ code, shop_name });
    return result;
  }

  // 校检验证码  邀请码存在并且没被用过
  async verification(code) {
    const result = await Code.findOne({ where: { code } })
    return result
  }

  // 使用邀请码 如果有用户用过了就让这个邀请码失效
}

module.exports = new CodeServer();
