import express from "express";
import colors from "colors";

import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const port = process.env.PORT || 5001;

connectDB(); // connect to MongoDB

const app = express();

// Body parser middleware { req.body } {email,password}
app.use(express.json()); // allows to accept JSON data in the body
app.use(express.urlencoded({ extended: true })); // allows to accept form data

app.get("/", (req, res) => {
   res.send("API is running...");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
   console.log(`Serve at http://localhost:${port}`.zalgo);
});
