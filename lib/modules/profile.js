const axios = require("axios").default;

function retrieveProfile(_config) {
  return new Promise((resolve, reject) => {
    axios({
      method: "GET",
      url: `${_config.base_url}/org`,
      headers: {
        "PX-API-KEY": _config.api_key,
      },
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
}

module.exports = {
  retrieveProfile,
};
