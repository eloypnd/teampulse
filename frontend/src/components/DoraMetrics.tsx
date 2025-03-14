import { Heading, Link, SimpleGrid, Text } from "@chakra-ui/react";
import { LuExternalLink } from "react-icons/lu";
import Metric from "./Metric";

interface DoraMetricsProps {
  data?: {
    changeLeadTime: number;
    deploymentFrequency: number;
    changeFailureRate: number;
    deploymentRecoveryTime: number;
  };
}

const DoraMetrics = ({ data }: DoraMetricsProps) => {
  return (
    <>
      <Heading mb={4}>Dora Metrics</Heading>
      <Text mb={6}>
        <Link href="https://dora.dev" target="_blank" rel="noreferrer">
          DORA <LuExternalLink />
        </Link>{" "}
        is the largest and longest running research program of its kind, that
        seeks to understand the capabilities that drive software delivery and
        operations performance. DORA helps teams apply those capabilities,
        leading to better organizational performance.
      </Text>
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
        <Metric
          label="Change Lead Time"
          helperText="Time it takes to go from code commit to code successfully running in
          production."
          value={((data?.changeLeadTime ?? 0) / 86400).toFixed(2)}
          unit="days"
        />
        <Metric
          label="Deployment Frequency"
          helperText="How often application changes are deployed to production."
          value={data?.deploymentFrequency ?? 0}
          unit="per day"
        />
        <Metric
          label="Change Failure Rate"
          helperText="Percentage of deployments causing a failure in production."
          value={(data?.changeFailureRate ?? 0 * 100).toFixed(2)}
          unit="%"
        />
        <Metric
          label="Failed Deployment Recovery Time"
          helperText="Time it takes to recover from a failed deployment."
          value={data?.deploymentRecoveryTime ?? 0}
          unit="hours"
        />
      </SimpleGrid>
    </>
  );
};

export default DoraMetrics;
