const duration = require("../../lib/util/calc-time");
const logSymbols = require("log-symbols");
const Ship = require("../../lib/ship");
require("dotenv").config();
const ship = new Ship(process.env.SHIP_API_KEY, process.env.SHIP_ENV);

const list = (options) => {
  return new Promise((resolve, reject) => {
    
    const start_time = process.hrtime();
    console.log("List Shipments...");
    ship.shipments
      .list(options)
      .then((res) => {
        console.log(`${res.data.length} listed`.green.bold);
        console.log(`${logSymbols.info}  Task ran in ${duration(start_time)}`);
        console.log("");
        console.log("");
        resolve(res);
      })
      .catch((err) => {
        console.error(`${err.message}`.bgRed);
        reject(err);
        process.exit(1);
      });
  });
};

const create = () => {
  return new Promise((resolve, reject) => {
    const start_time = process.hrtime();
    console.log("Creating Shipment...");
    
    const sender = {
      name: "Ship Roasters",
      email: "roasters@packagex.xyz",
      phone: "+12678846151",
      address: "500 7th Ave 8th floor, New York, NY 10018",
    };

    const recipient = {
      name: "Jamie Jones",
      email: "jamie.jones@packagex.xyz",
      phone: "+12678846151",
      address: "600 B Street Suite 300 San Diego, CA 92101",
    };

    const parcel = {
      length: 10, // inches
      width: 10, // inches
      height: 10, // inches
      weight: 5.5, // pounds
    };

    ship.shipments
      .create(sender, recipient, [parcel])
      .then((res) => {
        console.log(`${res.data.id}, ${res.data.rates[0].id}`);
        console.log(`${res.message}`.green.bold);
        console.log(`${logSymbols.info}  Task ran in ${duration(start_time)}`);
        console.log("");
        console.log("");
        resolve(res);
      })
      .catch((err) => {
        console.error(`${err.message}`.bgRed);
        reject(err);
        process.exit(1);
      });
  });
};

const buy = (shipmentId, rateId) => {
  return new Promise((resolve, reject) => {
    const start_time = process.hrtime();
    console.log("Purchasing shipment...");

    ship.shipments
      .buy(shipmentId, rateId)
      .then((res) => {
        console.log(`${res.message}`.green.bold);
        console.log(res);
        console.log(`${logSymbols.info}  Task ran in ${duration(start_time)}`);
        console.log("");
        console.log("");
        resolve(res);
      })
      .catch((err) => {
        console.error(`${err.message}`.bgRed);
        reject(err);
        process.exit(1);
      });
  });
};

const retrieve = (shipmentId) => {
  return new Promise((resolve, reject) => {
    const start_time = process.hrtime();
    console.log("Retrieving shipment...");

    ship.shipments
      .retrieve(shipmentId)
      .then((res) => {
        console.log(`${res.message}`.green.bold);
        console.log(res);
        console.log(`${logSymbols.info}  Task ran in ${duration(start_time)}`);
        console.log("");
        console.log("");
        resolve(res);
      })
      .catch((err) => {
        console.error(`${err.message}`.bgRed);
        reject(err);
        process.exit(1);
      });
  });
};

const refund = (shipmentId) => {
  return new Promise((resolve, reject) => {
    const start_time = process.hrtime();
    console.log("Refunding shipment...");

    ship.shipments
      .refund(shipmentId)
      .then((res) => {
        console.log(`${res.message}`.green.bold);
        console.log(`${logSymbols.info}  Task ran in ${duration(start_time)}`);
        console.log("");
        console.log("");
        resolve(res);
      })
      .catch((err) => {
        console.error(`${err.message}`.bgRed);
        reject(err);
        process.exit(1);
      });
  });
};

const update = (shipmentId) => {
  return new Promise((resolve, reject) => {
    const start_time = process.hrtime();
    console.log("Updating shipment...");

    const update = {
      sender: {
        name: "Ship Name Update",
      },
    };

    ship.shipments
      .update(shipmentId, update)
      .then((res) => {
        console.log(`${res.message}`.green.bold);
        console.log(`${logSymbols.info}  Task ran in ${duration(start_time)}`);
        console.log("");
        console.log("");
        resolve(res);
      })
      .catch((err) => {
        console.error(`${err.message}`.bgRed);
        reject(err);
        process.exit(1);
      });
  });
};

module.exports = {
  list,
  create,
  buy,
  retrieve,
  refund,
  update,
};
