import express from 'express';
import { errorHandler } from './middlewares/errorHandler';
import cors from 'cors';
import morgan from "morgan";

const app = express()
  .use(express.json({ limit: '2Gb' }))
  .use(express.urlencoded({ extended: true, limit: '2Gb' }))
  .use(cors({
    origin: '*', // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods
    allowedHeaders: ['Content-Type'], // Allow specific headers
  }))
  .use(morgan("combined"))
  .use(errorHandler);

app.get("/", (req, res) => res.status(200).json({ message: "Hello From MCFL" }))


export default app;