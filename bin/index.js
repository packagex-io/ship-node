#!/usr/bin/env node
const v8 = require("v8");
const program = require("commander");
const logSymbols = require("log-symbols");
const colors = require("colors");
console.log("");
// console.log(`Script started with ~${(v8.getHeapStatistics().total_available_size / 1024 / 1024 / 1024).toFixed(2)} GB of memory`.green.bold);

const shipments = require("./scripts/shipments");
const profile = require("./scripts/profile");

program.version("1.1.0");

program
  .command("shipments.list")
  .description("Lists the shipments")
  .option("-l, --limit <int>", "Adds a limit to the shipments list", 10)
  .option("-p, --page <int>", "Adds a page to the shipments list", null)
  .action((options) => {
    shipments.list({ limit: options.limit, page: options.page });
  });

program
  .command("shipments.create")
  .description("Creates a new shipment intent")
  .action(() => {
    shipments.create();
  });

program
  .command("shipments.buy")
  .description("Buys a shipment")
  .argument("<shipment>", "The ID of the shipment")
  .argument("<rate>", "The ID of the rate")
  .action((shipment, rate) => {
    shipments.buy(shipment, rate);
  });

program
  .command("shipments.retrieve")
  .description("Retrieve a shipment")
  .argument("<shipment>", "The ID of the shipment")
  .action((shipment, rate) => {
    shipments.retrieve(shipment);
  });

program
  .command("shipments.refund")
  .description("Refunds a shipment")
  .argument("<shipment>", "The ID of the shipment")
  .action((shipment) => {
    shipments.refund(shipment);
  });

program
  .command("shipments.update")
  .description("Updates a shipment")
  .argument("<shipmentId>", "The ID of the shipment")
  .action((shipmentId) => {
    shipments.update(shipmentId);
  });

program
  .command("profile.retrieve")
  .description("Retrieve the sender profile")
  .action(() => {
    profile.retrieve();
  });

program
  .command("test")
  .description("Tests ship npm module and API's")
  .action((shipment, rate) => {
    console.log("Testing Shipment APIs".bgBlue.bold);
    console.log("");
    console.log("");

    shipments
      .list()
      .then(() => {
        return shipments.create();
      })
      // .then((res) => {
      //   return shipments.update(res.data.id);
      // })
      .then((res) => {
        console.log(res.data.id);
        return shipments.retrieve(res.data.id);
      })
      .then((res) => {
        return shipments.buy(res.data.id, res.data.rates[0].id);
      })
      .then((res) => {
        console.log(res.data.id);
        return shipments.refund(res.data.id);
      })
      .then((res) => {
        return profile.retrieve();
      })
      .then((res) => {
        console.log("All Ship Shipment API's are working".green.bold);
        console.log("");
        console.log("");
        console.log("Test Completed".bgBlue.bold);
      })
      .catch((err) => {
        console.error(err);
        console.log("Ship Test Failed".red.bold);
      });
  });

program.parse(process.argv);
