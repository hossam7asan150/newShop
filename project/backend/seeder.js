import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

import Products from "./models/productModel.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import users from "./data/users.js";
import Order from "./models/orderModel.js";
import orders from "./data/orders.js";

import connectDB from "./config/db.js";
connectDB(); // connect to MongoDB

const importData = async () => {
   try {
      await User.deleteMany();
      await Products.deleteMany();

      const createdProducts = await Products.insertMany(products);
      const createdUsers = await User.insertMany(users);

      console.log("Data Imported!");
      process.exit();
   } catch (error) {
      console.error(`${error}`);
      process.exit(1);
   }
};

const destroyData = async () => {
   try {
      await User.deleteMany();

      console.log("Data Destroyed!");
      process.exit();
   } catch (error) {
      console.error(`${error}`);
      process.exit(1);
   }
};

if (process.argv[2] === "-d") {
   destroyData();
} else {
   importData();
}
