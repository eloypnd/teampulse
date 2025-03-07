import { StringDateToUnixEpoch, timeDifference } from "../../utils";

type IssueType =
  | "STORY"
  | "EPIC"
  | "SPIKE"
  | "TASK"
  | "DEFECT"
  | "UNKNOWN";

const issueTypeMapping: {
  [key: string]: IssueType;
} = {
  "A/B Test": "TASK",
  "API request": "TASK",
  AWS: "TASK",
  Acception: "TASK",
  "Access Request": "TASK",
  Access: "TASK",
  "Action Item": "TASK",
  Adaptation: "TASK",
  Adhoc: "TASK",
  Analytics: "TASK",
  AppSec: "TASK",
  Approval: "TASK",
  "Audit Finding": "TASK",
  Bug: "DEFECT",
  BugBounty: "DEFECT",
  CR: "DEFECT",
  "CSIRT Projects": "DEFECT",
  "Campaign Sub-task": "TASK",
  "Campaign Task": "TASK",
  "Change Request": "TASK",
  Change: "TASK",
  Compliance: "TASK",
  "Content Sub-task": "TASK",
  "Content Task": "TASK",
  "Data Import or DB Change": "TASK",
  Demands: "TASK",
  "Deployment Request": "TASK",
  "Design Excellence": "TASK",
  "Design Sub-task": "TASK",
  "Design Task": "TASK",
  Design: "TASK",
  DesignOps: "TASK",
  Discovery: "TASK",
  Discussion: "TASK",
  Document: "TASK",
  Emergency: "TASK",
  Enhancement: "TASK",
  Epic: "EPIC",
  Evaluation: "SPIKE",
  Experiment: "SPIKE",
  "External Compliance": "TASK",
  "External Request": "TASK",
  "Feature Request": "TASK",
  Feature: "TASK",
  Feedback: "TASK",
  "General Task": "TASK",
  "Github Secrets": "TASK",
  Goal: "TASK",
  Hypothesis: "TASK",
  "IT Help": "TASK",
  Idea: "TASK",
  Ideas: "TASK",
  Improvement: "TASK",
  "Incident Report": "DEFECT",
  Incident: "DEFECT",
  Incidents: "DEFECT",
  "Infra and Release Task": "TASK",
  "Initiative Request": "TASK",
  Initiative: "TASK",
  "Integration Support": "TASK",
  "Load Test Sub Task": "TASK",
  "Load Test Task": "TASK",
  "Marketing (CAM)": "TASK",
  "New Feature": "TASK",
  "New Requirement": "TASK",
  "Non EU Travel Request": "TASK",
  "OS Deployment Update": "TASK",
  "Operational Request": "TASK",
  Opportunity: "TASK",
  Other: "TASK",
  "PII Scanner": "TASK",
  "PM Task": "TASK",
  "Penetration Test": "TASK",
  Poc: "TASK",
  "Policy Deviation Form": "TASK",
  Precondition: "TASK",
  Problem: "TASK",
  "Procurement Requests": "TASK",
  "Production Task": "TASK",
  "Proposal Request": "TASK",
  Question: "SPIKE",
  "Question/Doc Request": "SPIKE",
  RAID: "TASK",
  RedTeam: "TASK",
  Release: "TASK",
  Report: "TASK",
  Request: "TASK",
  "Research Ops": "TASK",
  "Research Sub-task": "TASK",
  Research: "TASK",
  Rollout: "TASK",
  "Rule Implementation": "TASK",
  "SAST Finding": "TASK",
  "SR Automation": "TASK",
  Safety: "TASK",
  "Security Vulnerability": "DEFECT",
  "Service Request with Approvals": "TASK",
  "Service Request with multiple Approvals": "TASK",
  "Service Request": "TASK",
  "Sievo Issue": "TASK",
  Sievo: "TASK",
  "Social Media DE": "TASK",
  "Software Update": "TASK",
  Spike: "SPIKE",
  "Stability Task": "TASK",
  Story: "STORY",
  "Sub Test Execution": "TASK",
  "Sub-bug": "DEFECT",
  "Sub-task": "TASK",
  SubTask: "TASK",
  Subtask: "TASK",
  "Supplier Change Request Approval": "TASK",
  "Supplier Onboarding": "TASK",
  "Supplier Qualification": "TASK",
  Support: "TASK",
  "Task (IT Ops)": "TASK",
  Task: "TASK",
  "Tech Incident Sub Task": "DEFECT",
  "Tech Incident Task": "DEFECT",
  "Technical Story": "TASK",
  "Technical debt": "TASK",
  Template: "TASK",
  "Test Execution": "TASK",
  "Test Plan": "TASK",
  "Test Set": "TASK",
  Test: "TASK",
  ThreatModeling: "TASK",
  "Urgent Change": "TASK",
  "User Story": "STORY",
  Vulnerability: "DEFECT",
  "Xray Test": "TASK",
  // Add more Jira resolution mappings as needed
};

export const mapJiraIssueType = (issueType: string): IssueType => {
  if (!issueType) return "UNKNOWN";

  if (!issueTypeMapping[issueType]) {
    console.warn(`Unknown Jira type: ${issueType}. Defaulting to UNKNOWN`);
    return "UNKNOWN";
  }

  return issueTypeMapping[issueType];
};

const resolutionMapping: {
  [key: string]:
    | "DONE"
    | "WONT_DO"
    | "DUPLICATE"
    | "INCOMPLETE"
    | "POSTPONED"
    | "REOPENED";
} = {
  "3rd Party Issue": "WONT_DO",
  Answered: "DONE",
  Archived: "WONT_DO",
  "CX/UI Improvement": "DONE",
  Cancelled: "WONT_DO",
  "Cannot Reproduce": "WONT_DO",
  Closed: "DONE",
  Contained: "DONE",
  Declined: "WONT_DO",
  Deferred: "WONT_DO",
  Delivered: "DONE",
  Documented: "DONE",
  "Done (w changes)": "DONE",
  Done: "DONE",
  Duplicate: "DUPLICATE",
  "False Positive": "WONT_DO",
  Finished: "DONE",
  Fixed: "DONE",
  "Hardware failure": "WONT_DO",
  "In Product Backlog": "POSTPONED",
  Incomplete: "INCOMPLETE",
  Invalid: "INCOMPLETE",
  "Known Error": "WONT_DO",
  Misrouted: "WONT_DO",
  New: "WONT_DO",
  "No Reply": "WONT_DO",
  "Not Technically Feasible": "WONT_DO",
  "Not an Issue": "WONT_DO",
  Open: "REOPENED",
  "Platform issue": "WONT_DO",
  Rejected: "WONT_DO",
  Released: "DONE",
  Reopened: "REOPENED",
  Resolved: "DONE",
  "Server Issue": "WONT_DO",
  "Software failure": "WONT_DO",
  Tested: "DONE",
  Unanswered: "WONT_DO",
  "Won't Do": "WONT_DO",
  "Won't Fix": "WONT_DO",
  Workaround: "INCOMPLETE",
  "knowledge Gap": "INCOMPLETE",
  // Add more Jira resolution mappings as needed
};

export const mapJiraResolution = (
  jiraResolution: string
):
  | "DONE"
  | "WONT_DO"
  | "DUPLICATE"
  | "INCOMPLETE"
  | "POSTPONED"
  | "REOPENED"
  | "UNKNOWN"
  | null => {
  if (!jiraResolution) return null;

  if (!resolutionMapping[jiraResolution]) {
    console.warn(
      `Unknown Jira resolution: ${jiraResolution}. Defaulting to UNKNOWN`
    );
    return "UNKNOWN";
  }

  return resolutionMapping[jiraResolution];
};

export const statusMapping: {
  [key: string]: "OPEN" | "IN_PROGRESS" | "CLOSED";
} = {
  "To Do": "OPEN",
  "In Progress": "IN_PROGRESS",
  Done: "CLOSED",
  // Add more Jira status mappings as needed
};

const JIRA_DOMAIN =
  process.env.JIRA_DOMAIN || "your-jira-instance.atlassian.net";

export function mapJiraIssueToChange(issue: any) {
  // Extract relevant fields from the Jira API response
  const jiraStatus = issue.fields.status.statusCategory.name;

  const change = {
    externalId: issue.id.toString(),
    externalKey: issue.key,
    title: issue.fields.summary,
    status: statusMapping[jiraStatus] || "UNKNOWN",
    type: mapJiraIssueType(issue.fields.issuetype.name),
    resolution: mapJiraResolution(issue.fields.resolution?.name),
    creator: {
      connectOrCreate: {
        where: { externalId: issue.fields.reporter.accountId },
        create: {
          externalId: issue.fields.reporter.accountId,
          email: issue.fields.reporter.emailAddress,
          name: issue.fields.reporter.displayName,
        },
      },
    },
    externalUrl: `https://${JIRA_DOMAIN}/browse/${issue.key}`,
    externalResolvedAt: issue.fields.resolutiondate
      ? StringDateToUnixEpoch(issue.fields.resolutiondate)
      : null,
    externalCreatedAt: StringDateToUnixEpoch(issue.fields.created),
    externalUpdatedAt: StringDateToUnixEpoch(issue.fields.updated),
    source: {
      connectOrCreate: {
        where: { name: "Jira" },
        create: { name: "Jira" },
      },
    },
    resolutionTime: issue.fields.resolutiondate
      ? timeDifference(
          StringDateToUnixEpoch(issue.fields.resolutiondate),
          StringDateToUnixEpoch(issue.fields.created)
        )
      : null,

    labels: {
      connectOrCreate:
        issue.fields.labels.map((name: string) => ({
          where: { name },
          create: { name },
        })) || [],
    },
  };

  return change;
}
