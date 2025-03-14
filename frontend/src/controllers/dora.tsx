import { Flex } from "@chakra-ui/react";
import DoraMetrics from "../components/DoraMetrics";
import DateSelector, { DateRange } from "../components/DateSelector";
import { useState } from "react";
import { useDoraMetrics } from "../services/metrics/dora";

const DoraController = () => {
  const [dateRange, setDateRange] = useState<DateRange>();
  const { isPending, error, data, isFetching } = useDoraMetrics(dateRange);

  if (isPending || isFetching) return "Loading";
  if (error) return "Error";

  return (
    <>
      <Flex justifyContent="flex-end" mb={4}>
        <DateSelector onRangeSelect={setDateRange} />
      </Flex>
      <DoraMetrics data={data} />
    </>
  );
};

export default DoraController;
