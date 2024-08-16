import { NextResponse } from "next/server";
import { Metric, metrics } from "@/shared/metrics";

/*
/api/ad-campaign-metrics/filter?startDate=2023-08-01&endDate=2023-08-05
/api/ad-campaign-metrics/filter?name=clicks
*/

// Utility function to filter by date range
const filterByDateRange = (
  data: Metric[],
  startDate: string,
  endDate: string
) => {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();

  return data.map((metric) => ({
    ...metric,
    chartData: {
      ...metric.chartData,
      timeseries: metric.chartData.timeseries.filter((ts) => {
        const time = new Date(ts.time).getTime();
        return time >= start && time <= end;
      }),
    },
  }));
};

// Handler function to filter metrics
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  let filteredMetrics = metrics;

  if (name) {
    filteredMetrics = filteredMetrics.filter((metric) =>
      metric.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  if (startDate && endDate) {
    filteredMetrics = filterByDateRange(filteredMetrics, startDate, endDate);
  }

  return NextResponse.json({ metrics: filteredMetrics });
}
