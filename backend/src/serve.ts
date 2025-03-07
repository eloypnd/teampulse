import "tsconfig-paths/register";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { setRoutes } from "./routes";

dotenv.config(); // Load environment variables

const ApiService = express();
const PORT = process.env.PORT || 3000;

// Middleware
ApiService.use(express.json());
ApiService.use(express.urlencoded({ extended: true }));
ApiService.use(cors());
ApiService.use(helmet());
ApiService.use(morgan("dev"));

setRoutes(ApiService);

// Only start the server if we're not in a test environment
const start = () => {
  return ApiService.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

if (process.env.NODE_ENV !== "test") {
  start();
}

export { ApiService };
