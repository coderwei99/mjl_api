const axios = require("axios")

const { BASEURL, TIMEOUT } = require("./config");

class TripRequest {
  instance;
  constructor(baseURL, timeout = 10000) {
    this.instance = axios.create({
      baseURL,
      timeout,
    });
  }
  request(config) {
    return new Promise((resolve, reject) => {
      this.instance
        .request(config)
        .then(res => {
          console.log('config---res', config);
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  get(config) {
    return this.request({ ...config, methods: "get" });
  }
  post(config) {
    console.log(config, 'config');
    return this.request({ ...config, methods: "post" });
  }
}

module.exports = new TripRequest(BASEURL, TIMEOUT);