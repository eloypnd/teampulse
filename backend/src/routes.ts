import { Application, Request, Response, Router } from "express";
import doraMetricsRoute from "./routes/metrics-dora";

const router = Router();

export function setRoutes(api: Application) {
  api.get("/", (req: Request, res: Response) => {
    res.json({ message: "Welcome to TeamPulse API" });
  });
  api.get("/health", (req: Request, res: Response) => {
    res.json({ message: "Service is running." });
  });

  api.use("/api", router);
  router.get("/metrics/dora", doraMetricsRoute);
}
