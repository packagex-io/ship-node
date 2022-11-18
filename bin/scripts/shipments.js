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
        // console.log(JSON.stringify(res.data[0], null, 4));
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
      name: "Ali Khan",
      email: "ali.khan@packagex.io",
      phone: "+12394886485",
      address: "500 7th Avenue, New York, NY, USA",
    };

    const recipient = {
      name: "Jamie Jones",
      email: "jamie.jones@packagex.xyz",
      phone: "+12678846151",
      address: "600 7th Avenue, New York, NY, USA",
    };

    const parcel = {
      length: 10, // inches
      width: 0, // inches
      height: 7, // inches
      weight: 1, // pounds
    };

    ship.shipments
      .create(sender, recipient, [parcel])
      .then((res) => {
        const shipment = res.data;
        const sorted_rate = shipment.rates.sort((a, b) => a.billed_amount - b.billed_amount);
        const selected_rate = sorted_rate[0].id; //Get the cheapest rate
        // console.log(JSON.stringify(res.data, null, 4));
        console.log(`${res.data.id}, ${selected_rate}`);
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
    console.log(shipmentId);
    ship.shipments
      .buy(shipmentId, rateId)
      .then((res) => {
        console.log(`${res.message}`.green.bold);
        // console.log(JSON.stringify(res.data, null, 4));
        const shipment = res.data;
        const label_url = shipment.label_url;
        console.log(label_url);
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
        // console.log(JSON.stringify(res.data, null, 4));
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
