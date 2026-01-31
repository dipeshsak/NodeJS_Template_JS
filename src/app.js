import express from "express";
import userRoutes from "./routes/user.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import { requestLogger } from "./middlewares/logger.middleware.js";

const app = express();

app.use(express.json());
app.use(requestLogger);

app.use("/api/users", userRoutes);

app.use(errorHandler);

export default app;
