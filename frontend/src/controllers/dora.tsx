import { useQuery } from "@tanstack/react-query";
import DoraMetrics from "../components/DoraMetrics";

function getDefaultUrl(): URL {
  const to = new Date().toISOString().split("T")[0];
  const from = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  const apiUrl = new URL("http://localhost:3000/api/metrics/dora");
  apiUrl.searchParams.append("from", from as string);
  apiUrl.searchParams.append("to", to as string);

  return apiUrl;
}

const DoraController = () => {
  const url = getDefaultUrl();

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["doraMetrics"],
    queryFn: async () => {
      const response = await fetch(url);
      return await response.json();
    },
  });

  if (isPending || isFetching) return "Loading";
  if (error) return "Error";

  return <DoraMetrics data={data} />;
};

export default DoraController;
