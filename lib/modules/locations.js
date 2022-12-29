const axios = require("axios").default;

function retrieveLocation(id, _config) {
  return new Promise((resolve, reject) => {
    axios({
      method: "GET",
      url: `${_config.base_url}/shipments/${id}`,
      headers: {
        "PX-API-KEY": _config.api_key,
        "Content-Type": "application/json",
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
  retrieveLocation,
};
