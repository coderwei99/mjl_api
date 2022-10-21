// token 换取文件
const { AppSecret, appId } = require("../consitant/wxConfigData");

const axios = require("axios");
// const dbs = require('../models/mo')
const AccessToken = require("../model/wx_access_token_model");

const _token = () =>
  new Promise(async (res, rej) => {
    const times = new Date().getTime(); //当前时间戳
    axToke = cd => {
      let config = {
        appid: appId,
        secret: AppSecret,
        grant_type: "client_credential",
      };
      let url =
        "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" +
        config.appid +
        "&secret=" +
        config.secret;
      axios.get(url).then(
        res => {
          console.log(res.data, "res.data");
          cd(res.data);
        },
        err => {
          cd(err);
        }
      );
    };

    // let accessTokes = await dbs.findo(Config, {})
    let accessTokes = await AccessToken.findOne({ raw: true });
    console.log("查询tokes", accessTokes, times);
    if (!accessTokes) {
      axToke(cd => {
        let obj = {
          accessToken: cd.access_token, //toke
          tokeTime: times + (cd.expires_in - 100) * 1000, // toke到期时间
        };
        console.log(obj, "obj");
        AccessToken.create(obj).then(rs => {
          console.log("新增tokes1", rs);
          res(rs.dataValues);
        });
      });
    } else if (accessTokes.accessToken == null) {
      axToke(cd => {
        let key = {
          _id: accessTokes._id,
        };
        let obj = {
          $set: {
            accessToken: cd.access_token, //toke
            tokeTime: times + (cd.expires_in - 100) * 1000, // toke到期时间
          },
        };
        AccessToken.update(key, obj).then(r => {
          AccessToken.findOne({}).then(rs => {
            console.log("新增tokes2", rs);
            res(rs);
          });
        });
      });
    } else if (accessTokes.tokeTime <= times) {
      console.log("toke过期", accessTokes.tokeTime, times);
      axToke(cd => {
        AccessToken.update(
          {
            accessToken: cd.access_token, //toke
            tokeTime: times + (cd.expires_in - 100) * 1000, // toke到期时间
          },
          {
            where: {
              id: accessTokes.id,
            },
          }
        ).then(r => {
          AccessToken.findOne({ raw: true }).then(rs => {
            console.log("新增tokes3", rs);
            res(rs);
          });
        });
      });
    } else {
      console.log("toke有效", accessTokes);
      res(accessTokes);
    }
  });

module.exports = { _token };
