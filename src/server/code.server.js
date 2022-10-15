
const Code = require("../model/code_model");

class CodeServer {
  // 创建邀请码
  // 需要校检是否重复  就是判断shop_name如果存在 那么生成的邀请码一定是重复的 需要重新校检
  async create(code, shop_name) {
    const findShopName = await Code.findOne({ where: { shop_name } })
    console.log(findShopName, '------------------');
    // 如果找到了邀请码 需要抛出异常
    if (findShopName) return 'error'
    const result = await Code.create({ code, shop_name });
    return result;
  }

  // 校检验证码  邀请码存在并且没被用过
  async verification(code) {
    const result = await Code.findOne({ where: { code } })
    return result
  }

  // 使用邀请码 如果有用户用过了就让这个邀请码失效
  async discardCode(code) {
    const res = await Code.update({ is_valid: false }, { where: { code } })
    console.log(res, 'find code res');
    return res
  }

  // 获取邀请码列表
  async findCodeList({ pageNum, pageSize }) {
    const offset = (pageNum - 1) * pageSize;
    const { count, rows } = await Code.findAndCountAll({
      limit: pageSize * 1,
      offset,
    });

    return {
      pageNum,
      pageSize,
      total: count,
      list: rows,
    };



  }
}

module.exports = new CodeServer();
