"use client";
import { Metric } from "@/shared/metrics";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

type MetricsResponse = {
  metrics: Metric[];
};

type MetricsContextType = {
  metrics: Metric[];
  loading: boolean;
  error: string | null;
};

const MetricsContext = createContext<MetricsContextType>({
  metrics: [],
  loading: false,
  error: null,
});

export const useMetricsContext = () => useContext(MetricsContext);

export const MetricsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      setLoading(true);
      try {
        const response = await axios.get<MetricsResponse>(
          "/api/ad-campaign-metrics"
        );
        setMetrics(response.data.metrics);
        setError(null);
      } catch (err) {
        setError("Failed to fetch metrics");
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  return (
    <MetricsContext.Provider value={{ metrics, loading, error }}>
      {children}
    </MetricsContext.Provider>
  );
};
