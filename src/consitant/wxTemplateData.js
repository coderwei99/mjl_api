// 用于给商家推送模板消息的静态配置 因为依赖公众号推送消息 这些这里配置的是公众号的信息  比如说appid
// 地址:https://mp.weixin.qq.com/debug/cgi-bin/sandboxinfo?action=showinfo&t=sandbox/index
/**
 * appid: 公众号的appid
 * secret: 公众号的secret
 * touser: 推送到那个商户 测试号界面的微信
 * template_id: 具体的模板id
 * url: 商家点击详情跳转的界面
 * data: 可以往模板里面插入一些信息 需要在模板提前定义位置
 * 
 */

module.exports = {
  appid: "wx16cc6ea4ece67487",
  secret: "eef6e55557c5fc35927e34ffb2e18e99",
  touser: "oFtGs531zmNeee-FkUjEbrIq6pXM",
  template_id: "GUglJkRbUUkN_nS3pQ0rVRT4mzd6U5WbsuAs0Eom46k",
  url: "",
  data: {},
}