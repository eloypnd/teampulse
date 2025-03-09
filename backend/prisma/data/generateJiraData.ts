import { Change, ChangeTypes, Status, Resolution } from "@prisma/client";

function getRandomTimestamp(start: Date, end: Date): number {
  return Math.floor(
    start.getTime() / 1000 +
      Math.random() * (end.getTime() / 1000 - start.getTime() / 1000)
  );
}

function generateChanges(
  numberOfEntries: number,
  idStartFrom: number
): Change[] {
  const today = new Date();
  const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

  const template: Change = {
    id: 1,
    externalId: "",
    externalKey: "",
    title: "Implement new feature",
    type: ChangeTypes.DEFECT,
    status: Status.CLOSED,
    resolution: Resolution.DONE,
    creatorId: 1,
    externalUrl: "",
    sourceId: 2,
    resolutionTime: 86400,
    labelIds: [1],
    externalCreatedAt: 0,
    externalUpdatedAt: 0,
    externalResolvedAt: 0,
  };

  return Array.from({ length: numberOfEntries }, (_, index) => {
    const created = getRandomTimestamp(thirtyDaysAgo, today);
    const updated = getRandomTimestamp(new Date(created * 1000), today);
    const resolved = getRandomTimestamp(new Date(updated * 1000), today);

    return {
      ...template,
      id: index + idStartFrom,
      externalId: `JIRA-${index + 100}`,
      externalKey: `PROJ-${index + 100}`,
      externalUrl: `https://company.atlassian.net/browse/PROJ-${index + 100}`,
      externalCreatedAt: created,
      externalUpdatedAt: updated,
      externalResolvedAt: resolved,
    };
  });
}

export default generateChanges;
