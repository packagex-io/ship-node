const duration = require("../../lib/util/calc-time");
const Ship = require("../../lib/ship");
require("dotenv").config();

console.log(process.env.SHIP_ENV);
const ship = new Ship(process.env.SHIP_API_KEY, process.env.SHIP_ENV);

const retrieve = () => {
  return new Promise((resolve, reject) => {
    const start_time = process.hrtime();
    console.log("Retrieving profile...");

    ship.profile
      .retrieve()
      .then((res) => {
        console.log(`${res.message}`.green.bold);
        // console.log(JSON.stringify(res.data, null, 4));
        console.log(`Task ran in ${duration(start_time)}`);
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
  retrieve,
};
