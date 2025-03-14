import { useQuery } from "@tanstack/react-query";
import { DateRange } from "@/components/DateSelector";
import {
  jsDateToShortIso,
  getFirstDayOfCurrentMonth,
} from "../../utils/dateUtils";

export function useDoraMetrics(dateRange?: DateRange) {
  return useQuery({
    queryKey: ["doraMetrics", dateRange?.start, dateRange?.end],
    queryFn: () => fetchDoraMetrics(dateRange),
  });
}

const METRICS_API_BASE_URL = "http://localhost:3000/api/metrics";

function getDoraMetricsUrl(range?: DateRange): URL {
  const to = jsDateToShortIso(range?.end || new Date());
  const from = jsDateToShortIso(range?.start || getFirstDayOfCurrentMonth());

  const apiUrl = new URL(`${METRICS_API_BASE_URL}/dora`);
  apiUrl.searchParams.append("from", from);
  apiUrl.searchParams.append("to", to);

  return apiUrl;
}

async function fetchDoraMetrics(range?: DateRange) {
  const url = getDoraMetricsUrl(range);
  const response = await fetch(url);
  return response.json();
}
