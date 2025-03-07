import { StringDateToUnixEpoch, timeDifference } from "../../utils";

type ChangeType = "PULL_REQUEST";

const statusMapping: { [key: string]: "OPEN" | "IN_PROGRESS" | "CLOSED" } = {
  open: "OPEN",
  closed: "CLOSED",
};

// const resolutionMapping: { [key: string]: "DONE" | "WONT_DO" | null } = {
//   merged: "DONE",
//   closed: "WONT_DO",
// };

function mapGithubResolution(
  state: string,
  merged_at: string | null
): "MERGED" | "CLOSED" {
  if (state === "closed" && merged_at) return "MERGED";
  return "CLOSED";
}

export function mapGithubPullRequestToChange(pullRequest: any) {
  // Extract relevant fields from the Github API response
  const type:ChangeType = "PULL_REQUEST";

  const change = {
    externalId: pullRequest.id.toString(),
    externalNodeId: pullRequest.node_id,
    title: pullRequest.title,
    status: statusMapping[pullRequest.state] || "UNKNOWN",
    type: type,
    resolution: mapGithubResolution(pullRequest.state, pullRequest.merged_at),
    creator: {
      connectOrCreate: {
        where: { externalId: pullRequest.user.id.toString() },
        create: {
          externalId: pullRequest.user.id.toString(),
          externalUrl: pullRequest.user.html_url,
          email:
            pullRequest.user?.email || `${pullRequest.user?.login}##github.com`,
          name: pullRequest.user?.name || pullRequest.user?.login || "Unknown",
        },
      },
    },
    externalUrl: pullRequest.html_url,
    externalResolvedAt: pullRequest.closed_at
      ? StringDateToUnixEpoch(pullRequest.closed_at)
      : null,
    externalCreatedAt: StringDateToUnixEpoch(pullRequest.created_at),
    externalUpdatedAt: StringDateToUnixEpoch(pullRequest.updated_at),
    branchNameHead: pullRequest.head.ref,
    branchNameBase: pullRequest.base.ref,
    source: {
      connectOrCreate: {
        where: { name: "Github" },
        create: { name: "Github" },
      },
    },
    resolutionTime: pullRequest.closed_at
      ? timeDifference(
          StringDateToUnixEpoch(pullRequest.closed_at),
          StringDateToUnixEpoch(pullRequest.created_at)
        )
      : null,

    labels: {
      connectOrCreate:
        pullRequest.labels.map((label: any) => ({
          where: { name: label.name },
          create: { name: label.name },
        })) || [],
    },
    repository: {
      connectOrCreate: {
        where: { externalId: pullRequest.base.repo.id.toString() },
        create: {
          externalId: pullRequest.base.repo.id.toString(),
          name: pullRequest.base.repo.name,
          owner: pullRequest.base.repo.owner.login,
          fullName: pullRequest.base.repo.full_name,
          url: pullRequest.base.repo.html_url,
          language: pullRequest.base.repo.language,
          defaultBranch: pullRequest.base.repo.default_branch,
        },
      }
    }
  };

  return change;
}
