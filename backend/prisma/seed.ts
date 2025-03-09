import { PrismaClient } from "@prisma/client";

import sourceToolsData from "./data/sourceTools.json";
const sourceTools = sourceToolsData as Array<any>;
import peopleData from "./data/people.json";
const people = peopleData as Array<any>;
import repositoriesData from "./data/repositories.json";
const repositories = repositoriesData as Array<any>;
import labelsData from "./data/labels.json";
const labels = labelsData as Array<any>;
import generateGithubData from "./data/generateGithubData";
import generateJiraData from "./data/generateJiraData";

const prisma = new PrismaClient();

async function main() {
  // Clean up existing data (order matters due to foreign key constraints)
  await prisma.change.deleteMany();
  await prisma.label.deleteMany();
  await prisma.repository.deleteMany();
  await prisma.people.deleteMany();
  await prisma.sourceTool.deleteMany();

  // Create source tools
  const createdSourceTools = await Promise.all(
    sourceTools.map((tool) => prisma.sourceTool.create({ data: tool }))
  );

  // Create people
  const createdPeople = await Promise.all(
    people.map((person) => prisma.people.create({ data: person }))
  );

  // Create repositories
  const createdRepos = await Promise.all(
    repositories.map((repo) => prisma.repository.create({ data: repo }))
  );

  // Create labels
  const createdLabels = await Promise.all(
    labels.map((label) => prisma.label.create({ data: label }))
  );

  // Generate and create changes
  const githubChanges = generateGithubData(20);
  await Promise.all(
    githubChanges.map((change) => {
      const { labelIds, ...changeWithoutLabels } = change;
      return prisma.change.create({
        data: {
          ...changeWithoutLabels,
          labels: {
            connect: labelIds.map((id) => ({ id })),
          },
        },
      });
    })
  );
  const jiraChanges = generateJiraData(2, 21);
  await Promise.all(
    jiraChanges.map((change) => {
      const { labelIds, ...changeWithoutLabels } = change;
      return prisma.change.create({
        data: {
          ...changeWithoutLabels,
          labels: {
            connect: labelIds.map((id) => ({ id })),
          },
        },
      });
    })
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
