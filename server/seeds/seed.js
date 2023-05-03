const db = require("../config/connection");
const { User, Region, Vin } = require("../models");

const regionData = require("./regionData.json");
const userData = require("./userData.json");
const vinData = require("./vinData.json");

db.once("open", async () => {
  await User.deleteMany({});
  const users = await User.insertMany(userData);
  console.log("Users seeded!");

  await Region.deleteMany({});
  const regions = await Region.insertMany(regionData);
  console.log("Regions seeded!");

  await Vin.deleteMany({});
  const vins = await Vin.insertMany(vinData);
  console.log("Vins seeded!");

  process.exit(0);
});
