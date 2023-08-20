import dotenv from 'dotenv';
import express from 'express';
import { connect } from 'mongoose';
import router from './src/routers/index.js';
dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());

connect(process.env.URI_DB)
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(error => {
  console.error('Error connecting to MongoDB:', error);
});

app.use("/", router);

app.listen(PORT, () => {
    console.log('ok server');
})
