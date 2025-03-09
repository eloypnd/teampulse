import { Change, ChangeTypes } from "@prisma/client";

function getRandomTimestamp(start: Date, end: Date): number {
  return Math.floor(
    start.getTime() / 1000 +
      Math.random() * (end.getTime() / 1000 - start.getTime() / 1000)
  );
}

function generateChanges(numberOfEntries: number): Change[] {
  const today = new Date();
  const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

  const template: Change = {
    id: 1,
    externalId: "",
    externalKey: "",
    title: "title",
    type: ChangeTypes.PULL_REQUEST, // "PULL_REQUEST",
    status: "CLOSED",
    resolution: "MERGED",
    creatorId: 1,
    externalUrl: "",
    branchNameHead: "some-branch-name",
    branchNameBase: "main",
    repositoryId: 1,
    sourceId: 1,
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
      id: index + 1,
      externalId: `PR_${index + 123}`,
      externalKey: `PR-${index + 123}`,
      externalUrl: `https://some.url/${index}`,
      externalCreatedAt: created,
      externalUpdatedAt: updated,
      externalResolvedAt: resolved,
    };
  });
}

export default generateChanges;
