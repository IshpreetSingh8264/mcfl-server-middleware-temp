import express from 'express';
import { errorHandler } from './middlewares/errorHandler';
import cors from 'cors';
import morgan from "morgan";
import sapRouter from './routes/sap.route';

const app = express()
  .use(express.json({ limit: '2Gb' }))
  .use(express.urlencoded({ extended: true, limit: '2Gb' }))
  .use(cors({
    origin: '*', // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
  }))
  .use(morgan("combined"));

app.get("/health", (req, res) => res.status(200).json({ status: "OK", timestamp: new Date().toISOString() }));
app.get("/", (req, res) => res.status(200).json({ message: "Hello From MCFL" }));
app.use(sapRouter);

app.use(errorHandler);

export default app;