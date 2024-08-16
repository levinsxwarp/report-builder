export type TimeSeriesData = { time: string; value: number }[];

export type BreakdownData = { label: string; value: number }[];

export type Metric = {
  id: number;
  name: string;
  value: number;
  unit: string;
  description: string;
  chartData: {
    timeseries: TimeSeriesData;
    breakdown: BreakdownData;
  };
};

export const metrics: Metric[] = [
  {
    id: 1,
    name: "Impressions",
    value: 12000,
    unit: "views",
    description: "Number of times the ad was viewed",
    chartData: {
      timeseries: [
        { time: "2023-08-01", value: 2000 },
        { time: "2023-08-02", value: 3000 },
        { time: "2023-08-03", value: 4000 },
        { time: "2023-08-04", value: 1000 },
        { time: "2023-08-05", value: 2000 },
      ],
      breakdown: [
        { label: "Desktop", value: 7000 },
        { label: "Mobile", value: 4000 },
        { label: "Tablet", value: 1000 },
      ],
    },
  },
  {
    id: 2,
    name: "Clicks",
    value: 500,
    unit: "clicks",
    description: "Number of times the ad was clicked",
    chartData: {
      timeseries: [
        { time: "2023-08-01", value: 100 },
        { time: "2023-08-02", value: 150 },
        { time: "2023-08-03", value: 100 },
        { time: "2023-08-04", value: 50 },
        { time: "2023-08-05", value: 100 },
      ],
      breakdown: [
        { label: "Desktop", value: 300 },
        { label: "Mobile", value: 150 },
        { label: "Tablet", value: 50 },
      ],
    },
  },
  {
    id: 3,
    name: "Conversions",
    value: 50,
    unit: "conversions",
    description: "Number of times the ad led to a desired action",
    chartData: {
      timeseries: [
        { time: "2023-08-01", value: 10 },
        { time: "2023-08-02", value: 15 },
        { time: "2023-08-03", value: 10 },
        { time: "2023-08-04", value: 5 },
        { time: "2023-08-05", value: 10 },
      ],
      breakdown: [
        { label: "Form Submissions", value: 30 },
        { label: "Purchases", value: 15 },
        { label: "Sign-Ups", value: 5 },
      ],
    },
  },
  {
    id: 4,
    name: "Cost",
    value: 200,
    unit: "USD",
    description: "Total cost of the ad campaign",
    chartData: {
      timeseries: [
        { time: "2023-08-01", value: 50 },
        { time: "2023-08-02", value: 50 },
        { time: "2023-08-03", value: 50 },
        { time: "2023-08-04", value: 25 },
        { time: "2023-08-05", value: 25 },
      ],
      breakdown: [
        { label: "Google Ads", value: 100 },
        { label: "Facebook Ads", value: 75 },
        { label: "Instagram Ads", value: 25 },
      ],
    },
  },
  {
    id: 5,
    name: "CTR",
    value: 4.2,
    unit: "%",
    description: "Click-through rate",
    chartData: {
      timeseries: [
        { time: "2023-08-01", value: 3.5 },
        { time: "2023-08-02", value: 4.0 },
        { time: "2023-08-03", value: 4.5 },
        { time: "2023-08-04", value: 4.0 },
        { time: "2023-08-05", value: 4.2 },
      ],
      breakdown: [
        { label: "Desktop", value: 3.5 },
        { label: "Mobile", value: 4.2 },
        { label: "Tablet", value: 4.0 },
      ],
    },
  },
  {
    id: 6,
    name: "CPM",
    value: 5.0,
    unit: "USD",
    description: "Cost per thousand impressions",
    chartData: {
      timeseries: [
        { time: "2023-08-01", value: 4.5 },
        { time: "2023-08-02", value: 5.0 },
        { time: "2023-08-03", value: 5.5 },
        { time: "2023-08-04", value: 4.8 },
        { time: "2023-08-05", value: 5.0 },
      ],
      breakdown: [
        { label: "Google Ads", value: 6.0 },
        { label: "Facebook Ads", value: 5.0 },
        { label: "Instagram Ads", value: 4.0 },
      ],
    },
  },
  {
    id: 7,
    name: "CPC",
    value: 0.4,
    unit: "USD",
    description: "Cost per click",
    chartData: {
      timeseries: [
        { time: "2023-08-01", value: 0.35 },
        { time: "2023-08-02", value: 0.4 },
        { time: "2023-08-03", value: 0.45 },
        { time: "2023-08-04", value: 0.38 },
        { time: "2023-08-05", value: 0.4 },
      ],
      breakdown: [
        { label: "Google Ads", value: 0.5 },
        { label: "Facebook Ads", value: 0.4 },
        { label: "Instagram Ads", value: 0.3 },
      ],
    },
  },
  {
    id: 8,
    name: "CPA",
    value: 4.0,
    unit: "USD",
    description: "Cost per acquisition",
    chartData: {
      timeseries: [
        { time: "2023-08-01", value: 3.5 },
        { time: "2023-08-02", value: 4.0 },
        { time: "2023-08-03", value: 4.5 },
        { time: "2023-08-04", value: 3.8 },
        { time: "2023-08-05", value: 4.0 },
      ],
      breakdown: [
        { label: "Google Ads", value: 5.0 },
        { label: "Facebook Ads", value: 4.0 },
        { label: "Instagram Ads", value: 3.0 },
      ],
    },
  },
  {
    id: 9,
    name: "Reach",
    value: 8000,
    unit: "people",
    description: "Number of unique users who saw the ad",
    chartData: {
      timeseries: [
        { time: "2023-08-01", value: 2000 },
        { time: "2023-08-02", value: 3000 },
        { time: "2023-08-03", value: 4000 },
        { time: "2023-08-04", value: 1000 },
        { time: "2023-08-05", value: 2000 },
      ],
      breakdown: [
        { label: "New Users", value: 5000 },
        { label: "Returning Users", value: 3000 },
      ],
    },
  },
  {
    id: 10,
    name: "Engagements",
    value: 1500,
    unit: "engagements",
    description: "Total interactions with the ad",
    chartData: {
      timeseries: [
        { time: "2023-08-01", value: 300 },
        { time: "2023-08-02", value: 400 },
        { time: "2023-08-03", value: 500 },
        { time: "2023-08-04", value: 200 },
        { time: "2023-08-05", value: 100 },
      ],
      breakdown: [
        { label: "Likes", value: 700 },
        { label: "Shares", value: 500 },
        { label: "Comments", value: 300 },
      ],
    },
  },
  {
    id: 11,
    name: "Bounce Rate",
    value: 60.0,
    unit: "%",
    description: "Percentage of visitors who leave after viewing only one page",
    chartData: {
      timeseries: [
        { time: "2023-08-01", value: 65.0 },
        { time: "2023-08-02", value: 62.0 },
        { time: "2023-08-03", value: 60.0 },
        { time: "2023-08-04", value: 58.0 },
        { time: "2023-08-05", value: 60.0 },
      ],
      breakdown: [
        { label: "Desktop", value: 50.0 },
        { label: "Mobile", value: 65.0 },
        { label: "Tablet", value: 55.0 },
      ],
    },
  },
  {
    id: 12,
    name: "Avg. Session Duration",
    value: 120,
    unit: "seconds",
    description: "Average time spent by users on the page",
    chartData: {
      timeseries: [
        { time: "2023-08-01", value: 110 },
        { time: "2023-08-02", value: 115 },
        { time: "2023-08-03", value: 120 },
        { time: "2023-08-04", value: 125 },
        { time: "2023-08-05", value: 130 },
      ],
      breakdown: [
        { label: "Desktop", value: 130 },
        { label: "Mobile", value: 110 },
        { label: "Tablet", value: 120 },
      ],
    },
  },
  {
    id: 13,
    name: "ROI",
    value: 150,
    unit: "%",
    description: "Return on investment",
    chartData: {
      timeseries: [
        { time: "2023-08-01", value: 140 },
        { time: "2023-08-02", value: 145 },
        { time: "2023-08-03", value: 150 },
        { time: "2023-08-04", value: 155 },
        { time: "2023-08-05", value: 150 },
      ],
      breakdown: [
        { label: "Google Ads", value: 160 },
        { label: "Facebook Ads", value: 140 },
        { label: "Instagram Ads", value: 150 },
      ],
    },
  },
  {
    id: 14,
    name: "Video Views",
    value: 3000,
    unit: "views",
    description: "Number of times a video ad was viewed",
    chartData: {
      timeseries: [
        { time: "2023-08-01", value: 500 },
        { time: "2023-08-02", value: 700 },
        { time: "2023-08-03", value: 600 },
        { time: "2023-08-04", value: 800 },
        { time: "2023-08-05", value: 400 },
      ],
      breakdown: [
        { label: "Desktop", value: 2000 },
        { label: "Mobile", value: 800 },
        { label: "Tablet", value: 200 },
      ],
    },
  },
  {
    id: 15,
    name: "Share of Voice",
    value: 25.0,
    unit: "%",
    description: "Percentage of total mentions compared to competitors",
    chartData: {
      timeseries: [
        { time: "2023-08-01", value: 20.0 },
        { time: "2023-08-02", value: 22.5 },
        { time: "2023-08-03", value: 25.0 },
        { time: "2023-08-04", value: 27.5 },
        { time: "2023-08-05", value: 25.0 },
      ],
      breakdown: [
        { label: "Brand A", value: 40.0 },
        { label: "Brand B", value: 35.0 },
        { label: "Brand C", value: 25.0 },
      ],
    },
  },
  {
    id: 16,
    name: "Ad Spend",
    value: 5000,
    unit: "USD",
    description: "Total amount spent on ad campaigns",
    chartData: {
      timeseries: [
        { time: "2023-08-01", value: 800 },
        { time: "2023-08-02", value: 1200 },
        { time: "2023-08-03", value: 1000 },
        { time: "2023-08-04", value: 500 },
        { time: "2023-08-05", value: 1500 },
      ],
      breakdown: [
        { label: "Google Ads", value: 2000 },
        { label: "Facebook Ads", value: 1500 },
        { label: "Instagram Ads", value: 1000 },
        { label: "Twitter Ads", value: 500 },
      ],
    },
  },
  {
    id: 17,
    name: "Page Views",
    value: 25000,
    unit: "views",
    description: "Total number of page views",
    chartData: {
      timeseries: [
        { time: "2023-08-01", value: 5000 },
        { time: "2023-08-02", value: 6000 },
        { time: "2023-08-03", value: 4000 },
        { time: "2023-08-04", value: 7000 },
        { time: "2023-08-05", value: 5000 },
      ],
      breakdown: [
        { label: "Home Page", value: 12000 },
        { label: "Product Page", value: 8000 },
        { label: "Contact Page", value: 5000 },
        { label: "Other Pages", value: 3000 },
      ],
    },
  },
  {
    id: 18,
    name: "Customer Satisfaction",
    value: 85,
    unit: "%",
    description: "Percentage of satisfied customers",
    chartData: {
      timeseries: [
        { time: "2023-08-01", value: 80 },
        { time: "2023-08-02", value: 85 },
        { time: "2023-08-03", value: 90 },
        { time: "2023-08-04", value: 88 },
        { time: "2023-08-05", value: 85 },
      ],
      breakdown: [
        { label: "Very Satisfied", value: 50 },
        { label: "Satisfied", value: 25 },
        { label: "Neutral", value: 15 },
        { label: "Dissatisfied", value: 5 },
        { label: "Very Dissatisfied", value: 5 },
      ],
    },
  },
  {
    id: 19,
    name: "Social Media Mentions",
    value: 3500,
    unit: "mentions",
    description: "Number of times the brand was mentioned on social media",
    chartData: {
      timeseries: [
        { time: "2023-08-01", value: 600 },
        { time: "2023-08-02", value: 800 },
        { time: "2023-08-03", value: 500 },
        { time: "2023-08-04", value: 700 },
        { time: "2023-08-05", value: 900 },
      ],
      breakdown: [
        { label: "Twitter", value: 1200 },
        { label: "Facebook", value: 1500 },
        { label: "Instagram", value: 600 },
        { label: "LinkedIn", value: 200 },
      ],
    },
  },
  {
    id: 20,
    name: "Sales Revenue",
    value: 15000,
    unit: "USD",
    description: "Total revenue generated from sales",
    chartData: {
      timeseries: [
        { time: "2023-08-01", value: 2000 },
        { time: "2023-08-02", value: 2500 },
        { time: "2023-08-03", value: 3000 },
        { time: "2023-08-04", value: 3500 },
        { time: "2023-08-05", value: 3000 },
      ],
      breakdown: [
        { label: "Product A", value: 5000 },
        { label: "Product B", value: 7000 },
        { label: "Product C", value: 3000 },
        { label: "Product D", value: 500 },
      ],
    },
  },
  {
    id: 21,
    name: "New vs Returning Users",
    value: 1.5,
    unit: "ratio",
    description: "Ratio of new users to returning users",
    chartData: {
      timeseries: [
        { time: "2023-08-01", value: 1.2 },
        { time: "2023-08-02", value: 1.4 },
        { time: "2023-08-03", value: 1.5 },
        { time: "2023-08-04", value: 1.6 },
        { time: "2023-08-05", value: 1.5 },
      ],
      breakdown: [
        { label: "New Users", value: 7000 },
        { label: "Returning Users", value: 5000 },
      ],
    },
  },
];
