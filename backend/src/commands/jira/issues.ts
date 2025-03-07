import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { mapJiraIssueToChange } from "./utils/mappings";

dotenv.config(); // Load environment variables

// Jira API credentials
const JIRA_DOMAIN =
  process.env.JIRA_DOMAIN || "your-jira-instance.atlassian.net";
const EMAIL = process.env.JIRA_EMAIL || "your-email@example.com";
const API_TOKEN = process.env.JIRA_API_TOKEN || "your-api-token";
const PROJECT_KEY = process.env.JIRA_PROJECT_KEY || "PROJECT_KEY"; // Set your Jira project key

// Base64 encode authentication
const auth = Buffer.from(`${EMAIL}:${API_TOKEN}`).toString("base64");

// Jira API endpoint for fetching issues
const JIRA_SEARCH_ENDPOINT = `https://${JIRA_DOMAIN}/rest/api/3/search`;

const jiraFields = [
  "key",
  "summary",
  "issuetype",
  "resolutiondate",
  "created",
  "reporter",
  "updated",
  "resolution",
  "status",
  "labels",
];

const prisma = new PrismaClient();

// Function to fetch Jira issues from API for a specific start index
const fetchJiraIssues = async (startAt: number, maxResults: number) => {
  const query = `project=${PROJECT_KEY}&fields=${jiraFields.join(",")}`;
  const url = `${JIRA_SEARCH_ENDPOINT}?jql=${query}&startAt=${startAt}&maxResults=${maxResults}`;
  const response = await fetch(url,
    {
      method: "GET",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
};

// Function to fetch all Jira issues for a given project with pagination
const fetchAllJiraIssues = async () => {
  try {
    let startAt = 0;
    const maxResults = 100;
    let total = 1;
    let savedIssues = 0;

    while (startAt < total) {
      const data = await fetchJiraIssues(startAt, maxResults);
      total = data.total;
      startAt += maxResults;

      const results = await saveJiraIssues(data);

      savedIssues += results.length;

      console.log(`Saved ${savedIssues} / ${total} issues...`);
      console.log(`In this batch ${results.length}`);
    }
  } catch (error) {
    console.error("Error fetching Jira issues:", error);
  } finally {
    await prisma.$disconnect();
  }
};

// Run the function
fetchAllJiraIssues();

async function upsertIssueToDatabase(issue: any) {
  const { externalId, ...issueWithoutExternalId } = issue;
  return prisma.change.upsert({
    where: { externalId },
    update: issueWithoutExternalId,
    create: issue,
  });
}

async function saveJiraIssues(data: any) {
  const issues = data.issues.map(mapJiraIssueToChange);

  const results = await Promise.all(issues.map(upsertIssueToDatabase));

  return results;
}
