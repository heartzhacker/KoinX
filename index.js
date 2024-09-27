

import express, { json, response } from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
import connectDB from './src/database/index.js';
import dotenv from 'dotenv';
import cors from 'cors';


dotenv.config();
const app = express();
app.use(express.json({ limit: "10mb" }));
const port = process.env.PORT || 3000;

app.use(cors())




import transactionRouter from './src/routes/transation.routes.js'


app.use("/", transactionRouter)




// MongoDB connection URI
const uri = `${process.env.MONGO_URL}`;
// console.log(uri)
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', error);
})