const axios = require("axios").default;

function retrieveShipment(id, _config) {
  return new Promise((resolve, reject) => {
    axios({
      method: "GET",
      url: `${_config.base_url}/shipments/${id}`,
      headers: {
        Authorization: "apikey " + _config.api_key,
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

function listDeliveries(options, _config) {
  return new Promise((resolve, reject) => {
    let url = `${_config.base_url}/shipments?`;

    if (options && options.limit) {
      url += `limit=${options.limit}&`;
    }

    if (options && options.page) {
      url += `page=${options.page}&`;
    }

    if (options && options.location) {
      url += `location=${options.location}&`;
    }

    if (options && options.status) {
      url += `status=${options.status}&`;
    }

    axios({
      method: "GET",
      url: url,
      headers: {
        Authorization: "apikey " + _config.api_key,
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

function createShipment(sender, recipient, parcels, options, _config) {
  return new Promise((resolve, reject) => {
    axios({
      method: "POST",
      url: `${_config.base_url}/shipments/`,
      headers: {
        Authorization: "apikey " + _config.api_key,
      },
      data: {
        sender: sender,
        recipient: recipient,
        parcels: parcels,
        options: options,
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

function purchaseShipment(shipment_id, rate_id, options, _config) {
  return new Promise((resolve, reject) => {
    axios({
      method: "POST",
      url: `${_config.base_url}/shipments/${shipment_id}`,
      headers: {
        Authorization: "apikey " + _config.api_key,
      },
      data: {
        rate_id: rate_id,
        payment_method: options.payment_method ? options.payment_method : null,
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

function refundShipment(shipment_id, _config) {
  return new Promise((resolve, reject) => {
    axios({
      method: "POST",
      url: `${_config.base_url}/shipments/${shipment_id}/refund`,
      headers: {
        Authorization: "apikey " + _config.api_key,
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

function updateShipment(shipment_id, update, _config) {
  return new Promise((resolve, reject) => {
    axios({
      method: "POST",
      url: `${_config.base_url}/shipments/${shipment_id}/update`,
      headers: {
        Authorization: "apikey " + _config.api_key,
      },
      data: update,
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
  retrieveShipment,
  listDeliveries,
  createShipment,
  purchaseShipment,
  refundShipment,
  updateShipment,
};
