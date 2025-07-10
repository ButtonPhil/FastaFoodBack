import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bdd from "./configuration/db.js";
import userRoutes from './routes/userRoutes.js';
import productsRoute from "./routes/productsRoute.js";


const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();

app.use('/fastafood', userRoutes, productsRoute);

app.listen(process.env.PORT, () => {

  console.log("Server is running on port 3000");

  if(bdd) {

  console.log("Database connection established");

  }

});