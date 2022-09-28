const jwt = require("jsonwebtoken");

const {
  createUser,
  getUserInfo,
  updataById,
} = require("../server/user.server");
const {
  userRegisterError,
  modifyPasswordfail,
} = require("../consitant/error/error.type");

const { JWT_SECRET } = require("../config/config.default");

const { getWxUserInfo, getAccessToken } = require("../request/module/user")

class UserController {
  async register(ctx, next) {
    const { user_name, password } = ctx.request.body;
    try {
      const res = await createUser(user_name, password);
      console.log(res);
      ctx.body = {
        code: 200,
        message: "用户注册成功",
        result: {
          user_name: res.user_name,
        },
      };
    } catch (err) {
      console.log(err);
      ctx.app.emit("error", userRegisterError, ctx);
    }
  }
  async login(ctx, next) {
    const { user_name } = ctx.request.body;
    // ctx.body = `hello  ${user_name}`;
    // 获取用户信息
    try {
      const { password, ...res } = await getUserInfo({ user_name });
      ctx.body = {
        code: 200,
        message: "用户登录成功",
        result: {
          token: jwt.sign(res, JWT_SECRET, { expiresIn: "1d" }),
        },
      };
    } catch (err) {
      console.error("用户登录失败", err);
    }
  }
  async changePassword(ctx, next) {
    // 1. 拿到用户输入的密码
    const id = ctx.state.user.id;
    const password = ctx.request.body.password;
    const user_name = ctx.request.body.user_name;
    const id_admin = ctx.request.body.is_admin;
    console.log(id, password, id_admin);
    // 2. 操作数据库
    try {
      if (await updataById({ id, password, user_name, id_admin })) {
        // console.log("正常情况");
        ctx.body = {
          code: 200,
          message: "修改密码成功",
          result: null,
        };
      } else {
        // console.log("不正常情况");
        // code:'10007'
        ctx.app.emit("error", modifyPasswordfail, ctx);
      }
    } catch (err) {
      console.log(err);
    }
    // 3. 返回结果
  }

  async wxLogin(ctx, next) {
    const body = ctx.request.body
    const accessToken = await getAccessToken()
    console.log('accessToken', accessToken);
    const res = await getWxUserInfo(body.code)
    ctx.body = {
      code: 200,
      message: "登录成功",
      data: res
    }
    console.log(body);
  }
}

module.exports = new UserController();


/**
 * [1,3,5,7,9] target =3
 * 
 * 1. 第一次二分  5>3 所以分而治之，取右边部分
 * 2. 这里取右边部分  你是给[1,3,5]  还是[1,3]呢？这就是你外层的while决定的  当你的外层while循环 规定的left<right的时候 
 *    就说明left不可能等于right 那么我完全可以给右边[1,3,5]反正取不到最后一个 同样的 你外层给了left<=right的时候  那么你只能给[1,3]了
 * 3. 写错了case
 *    - 第一次二分的时候  分治之后选择将[1,3,5]给到右边 然而你外层还是写着left<=right的时候  这个元素5会被判断两次
 * 4. 解决上面的问题也很简单 还可以通过给right赋值的时候做处理  就是不写成right = mid了  写成right = mid-1 这样这个元素5一样会被排除在外
 * 
 * 说白了 这里就是个边界问题  分治的时候 取左边 考虑数组的右边界  去右边的时候考虑数组的左边界
 *
 * 
 * 
 * 
 * 
 */