import express from 'express';
import { config } from "dotenv";
import { postApi } from './routes';
import compression from 'compression';

const app = express();

// Environment variables
config();

// Middlewares
app.use(express.json());
app.use(compression());


// Api
postApi(app);

const PORT = process.env.PORT || 8002;

// Start the server and listen on port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});