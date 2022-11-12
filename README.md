# Ship Sender Node.js Library

The Ship Sender Node library provides convenient access to the Ship Sender API for applications written in server-side JavaScript. Detailed documentation can be found [here](https://packagex-io.github.io/ship-node/).

## Installation

Install the package with:

```sh
npm install ship-node --save
```

## Usage

The package needs to be configured with your account's API Key, which is
available in the [PakcageX Cloud Dashboard](https://cloud.packagex.io/dashboard/developers/api-keys).

```js
const Ship = require("ship-node");
const ship = new Ship("key_EHKD5tbatzX59DArnTBjhr46G5n1f4aJkvwPByft");

ship.shipments
  .list()
  .then((response) => console.log(response.data))
  .catch((error) => console.error(error));
```

### Using Promises

Every method returns a chainable promise which can be used instead of a regular callback:

```js
// Create a new delivery and then select the cheapest rate to purchase

const sender = {
  name: "Ship Roasters",
  email: "roasters@packagex.xyz",
  phone: "4844836699",
  location_id: "loc_1uzCQL4cTjjw3vRfE2qYk1",
};

const recipient = {
  name: "Jamie Jones",
  email: "jamie.jones@packagex.xyz",
  phone: "4844836699",
  address: {
    address_line1: "500 7th Ave",
    city: "New York",
    state: "NY",
    zipcode: "10018",
  },
};

const parcel = {
  length: 10, // inches
  width: 10, // inches
  height: 10, // inches
  weight: 5.5, // pounds
  item_description: "Coffee", //optional
  special_handling: "Fragile", //optional
};

//options are completely optional. You can omit the whole object
//or any properties from the object
const options = {
  checkout_total: 5000, //$50.00
  verify_address: false,
  metadata: {
    my_custom_id: "123456789",
  },
};

ship.shipments
  .create(sender, recipient, [parcel], options) //parcel is passed in an array since you can pass multiple parcels as part of one delivery
  .then((response) => {
    const shipment = response.data;

    //your logic to select the rate you want.
    //you could have a customer select it or
    //you can filter by price or service level

    //in this example, we're selecting the first rate
    const rate = shipment.rates[0];
    return ship.shipments.buy(shipment.id, rate.id);
  })
  .then((response) => {
    //new shipment was created
  })
  .catch((err) => {
    //deal with the error
  });
```

## Delivery Lifecycle

The label generation process is a multi-step process and understanding how this works will make using the API much easier.

1. A request is made using the `sender`, `recipient`, and `parcels` fields. Here we are creating a delivery with all of the possible rates from any providers you have enabled on your dashboard.

2. During this step, the rates are held for 15 minutes. If no rate is purchased during this interval, the delivery will expire. You can of course create a new delivery in this case.

3. Within these 15 minutes, you can now select one of these rates to buy. The selection process is entirely based on your business logic like displaying options to customers or having your backend decide the best option.

4. Once the transaction has gone through, the delivery will be populated with the label image url and all other properties you need for tracking.

5. At this point, if you have made a mistake, you are able to request a refund for a shipping label. You have up to 14 days to request a refund for a traditional carrier. For on-demand couriers, you'll have a 5 minute time window to request a refund.

## Webhooks

From the [Ship Dashboard](https://cloud.packagex.io/dashboard/developers/webhooks) you can configure webhooks. There are several webhook statuses you can choose from. Our webhooks expect a response with a status code of `200` within 5 seconds. This should be enough time to process the data and respond back to us. If we do not receive a response back from you within 5 seconds, we'll retry the webhook a second time after waiting for 3 seconds.

Our webhooks will attempt to `POST` to your endpoint.

| Event              | Description                                                                                                                                                                     |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| delivery_created   | This will fire when the delivery intent was created. This is before the purchase was made                                                                                       |
| delivery_canceled  | This will fire after a delivery was canceled. This is usually due to a refund                                                                                                   |
| delivery_purchased | This webhook will fire after a delivery intent is successfully captured                                                                                                         |
| tracking_updated   | This webhook will fire when there are any tracking updates to the package. The tracking updated webhook does not fire when the initial delivery intent is created or purchased. |

Each webhook will contain the entire Shipment object. Most often, you're probably interested in the `tracking_updates` property which is an ordered array of Tracker objects or the `tracking_status` property which is the current object.

## Package Statuses

Ship packages have two "statuses": the `status` and `substatus`. The `status` describes the general concept of what is happening to the package, and the substatus gives you more detail about the package. For example, the `status` could be `in_transit` but the substatus will give you details about the transit like `out_for_delivery`. Internally at Ship, we use the `substatus` field more often. The `status` and `substatus` can be found on the Shipment object and the Tracker object.

Below is the list of statuses that we support. Keep in mind that the Tracker object will always have a human readable message that you can display.

> As we are in beta, there is a chance that some of these statuses will change before we hit V1.

| status        | substatus               | is_issue | description                                        |
| ------------- | ----------------------- | -------- | -------------------------------------------------- |
| `pre_transit` | `created`               | false    | Package was created                                |
| `transit`     | `address_issue`         | true     | Issue with the address                             |
| `transit`     | `courier_at_sender`     | false    | Courier arrived to pickup up the package           |
| `transit`     | `contact_courier`       | true     | Courier needs to be contacted                      |
| `transit`     | `delayed`               | true     | Package will not get there on time                 |
| `transit`     | `delivery_attempted`    | true     | Shipment attempted but not completed               |
| `transit`     | `delivery_rescheduled`  | true     | Shipment rescheduled                               |
| `transit`     | `delivery_scheduled`    | false    | Shipment data scheduled                            |
| `transit`     | `location_inaccessible` | true     | Courier could not get to the location              |
| `transit`     | `out_for_delivery`      | false    | Package it out for delivery                        |
| `transit`     | `package_accepted`      | false    | Package was accepted. Taken from sender.           |
| `transit`     | `package_at_waypoint`   | false    | Package was accepted by an intermediate location   |
| `transit`     | `in_transit`            | false    | Package is in transit                              |
| `transit`     | `pickup_available`      | false    | Pickup available                                   |
| `transit`     | `package_damaged`       | true     | Package was damaged in transit                     |
| `delivered`   | `delivered`             | false    | Package was successfully delivered                 |
| `returned`    | `return_to_sender`      | true     | Package was returned                               |
| `failed`      | `package_undeliverable` | true     | Package could not be delivered                     |
| `failed`      | `package_lost`          | true     | Package was lost                                   |
| `canceled`    | `canceled`              | true     | This delivery was canceled. Usually do to a refund |
| `unknown`     | `unknown`               | true     | Ship doesn't know what happened                |
