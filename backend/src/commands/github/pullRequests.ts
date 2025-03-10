import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { mapGithubPullRequestToChange } from "./utils/mappings";

dotenv.config();

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || "";
const REPOSITORIES = [
  { owner: "fill in owner", repo: "fill in name" },
  // Add more repositories as needed
];

const prisma = new PrismaClient();

const BASE_URL = `https://api.github.com/repos`;

async function upsertPullRequestToDatabase(pr: any) {
  const { externalId, ...prWithoutExternalId } = pr;
  return prisma.change.upsert({
    where: { externalId },
    update: prWithoutExternalId,
    create: pr,
  });
}

async function savePullRequests(data: any) {
  const pullRequests = data.map(mapGithubPullRequestToChange);

  const results = await Promise.all(
    pullRequests.map(upsertPullRequestToDatabase)
  );

  return results;
}

const fetchPullRequests = async (owner: string, repo: string, page: number) => {
  const headers = {
    Accept: "application/vnd.github.v3+json",
    Authorization: `Bearer ${GITHUB_TOKEN}`,
  };

  const response = await fetch(
    `${BASE_URL}/${owner}/${repo}/pulls?per_page=100&page=${page}&state=all`,
    { headers }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
};

async function fetchAllPullRequests(owner: string, repo: string) {
  let totalFetchedPullRequests: number = 0;
  let totalSavedPullRequests: number = 0;
  let page = 1;

  while (true) {
    try {
      const pullRequests = await fetchPullRequests(owner, repo, page);

      totalFetchedPullRequests += pullRequests.length;

      if (pullRequests.length === 0) {
        break; // Stop if no more PRs
      }

      const results = await savePullRequests(pullRequests);

      totalSavedPullRequests += results.length;

      // allPullRequests = allPullRequests.concat(pullRequests);
      page += 1;

      console.log(`Saved ${totalSavedPullRequests} pull requests ...`);
      console.log(`In this batch ${results.length}`);
    } catch (error) {
      console.error(`Error fetching PRs:`, error);
      break;
    }
  }
}

const main = async () => {
  try {
    for (const repo of REPOSITORIES) {
      await fetchAllPullRequests(repo.owner, repo.repo);
    }
  } catch (error) {
    console.error("Error in main process:", error);
  } finally {
    await prisma.$disconnect();
  }
};

main();
