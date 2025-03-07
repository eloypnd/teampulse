import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { DateISO8601toUnix } from "../utils/index";
import { calculateDoraMetrics, DoraMetrics } from "@/domain/metrics/dora";

const prisma = new PrismaClient();

const doraMetricsRoute = async (req: Request, res: Response) => {
  const { from, to } = req.query;
  let fromDate: number = 0;
  let toDate: number = 0;

  // Validate and convert dates to Unix timestamps
  try {
    if (!from || !to) {
      throw new Error("Both 'from' and 'to' dates are required.");
    }
    fromDate = DateISO8601toUnix(from as string);
    toDate = DateISO8601toUnix(to as string);
  } catch (error: Error | any) {
    res.status(400).json({ error: error.message });
    return;
  }

  // Calculate DORA metrics
  const doraMetrics: DoraMetrics = await calculateDoraMetrics(fromDate, toDate);

  // return metrics
  res.json(doraMetrics);
};

export default doraMetricsRoute;
