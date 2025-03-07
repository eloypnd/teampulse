import { Change, Resolution, PrismaClient } from "@prisma/client";

type Metric = number | null;

export type DoraMetrics = {
  changeLeadTime: Metric;
  deploymentFrequency: Metric;
  changeFailureRate: Metric;
  deploymentRecoveryTime: Metric;
};

const prisma = new PrismaClient();

async function getPullRequests(
  fromDate: number,
  toDate: number
): Promise<Change[]> {
  const pullRequests = await prisma.change.findMany({
    where: {
      externalResolvedAt: { gte: fromDate, lte: toDate },
      type: "PULL_REQUEST",
    },
  });

  return pullRequests;
}

async function getOpenedDefectsCount(
  fromDate: number,
  toDate: number
): Promise<number> {
  const defects = await prisma.change.findMany({
    where: {
      externalCreatedAt: {
        gte: fromDate,
        lte: toDate,
      },
      source: { name: "Jira" },
      type: "DEFECT",
    },
  });

  return defects.length;
}

async function getClosedDefects(
  fromDate: number,
  toDate: number
): Promise<Change[]> {
  const defects = await prisma.change.findMany({
    where: {
      externalResolvedAt: {
        gte: fromDate,
        lte: toDate,
      },
      source: { name: "Jira" },
      type: "DEFECT",
    },
  });

  return defects;
}

function calculateChangeLeadTime(prs: Change[]): Metric {
  const totalResolutionTime: number = prs.reduce(
    (acc, { resolutionTime }) => acc + (resolutionTime || 0),
    0
  );

  return totalResolutionTime / prs.length;
}

function calculateDeploymentFrequency(
  prs: Change[],
  from: number,
  to: number
): Metric {
  const totalWeeks = Math.ceil((to - from) / (7 * 24 * 60 * 60)); // Convert to weeks
  const deployFrequency = totalWeeks > 0 ? prs.length / totalWeeks : 0;
  return deployFrequency;
}

function calculateChangeFailureRate(
  mergedPrsCount: number,
  defectsCount: number
): Metric {
  const changeFailureRate =
    defectsCount > 0 ? Number((defectsCount / mergedPrsCount).toFixed(2)) : 0;

  return changeFailureRate;
}

function calculateDeploymentRecoveryTime(fixedDefects: Change[]): Metric {
  /**
   * Note that this is not MTTR nor "failed deployment recovery time"
   * because I haven't found yet meaninful data to calculate it.
   *
   * Instead we are calculating the defects resolution time
   */
  const count = fixedDefects.length;

  if (!count) return null;

  const defectsResolutionTime =
    fixedDefects.reduce(
      (acc, { resolutionTime }) => acc + (resolutionTime || 0),
      0
    ) / count;

  return defectsResolutionTime;
}

export const calculateDoraMetrics = async (
  fromDate: number,
  toDate: number
): Promise<DoraMetrics> => {
  const pullRequests: Change[] = await getPullRequests(fromDate, toDate);

  const mergedPrs: Change[] = pullRequests.filter(
    ({ resolution }) => resolution === Resolution.MERGED
  );

  const openedDefectsCount = await getOpenedDefectsCount(fromDate, toDate);

  const closedDefects = await getClosedDefects(fromDate, toDate);

  const changeLeadTime = calculateChangeLeadTime(mergedPrs);
  const deploymentFrequency = calculateDeploymentFrequency(
    mergedPrs,
    fromDate,
    toDate
  );
  const changeFailureRate = calculateChangeFailureRate(
    mergedPrs.length,
    openedDefectsCount
  );
  const deploymentRecoveryTime = calculateDeploymentRecoveryTime(closedDefects);

  return {
    changeLeadTime,
    deploymentFrequency,
    changeFailureRate,
    deploymentRecoveryTime,
  };
};
