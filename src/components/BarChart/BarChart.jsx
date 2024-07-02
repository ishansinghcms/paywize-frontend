import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Text,
} from "recharts";
import { useState, useEffect } from "react";
import { BASE_URL } from "../../../constants";

const renderCustomizedLabel = (props) => {
  const { x, y, width, height, value } = props;
  return (
    <Text
      x={x + width / 2}
      y={y + height / 2}
      fill="white"
      textAnchor="middle"
      dominantBaseline="middle"
    >
      {value}
    </Text>
  );
};

const BarChartComponent = ({ specific }) => {
  const [data, setData] = useState({});
  useEffect(() => {
    async function fetchDashboardData() {
      const email = localStorage.getItem("user");
      const response = await fetch(`${BASE_URL}/dashboard/analytics/${email}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setData(data);
    }
    fetchDashboardData();
  }, []);

  let barChartdata = [];
  if (specific === "user" && data.userWebsiteInteraction)
    barChartdata = [
      { name: "Sun", value: data.userWebsiteInteraction.website0 },
      { name: "Moon", value: data.userWebsiteInteraction.website1 },
      { name: "Mercury", value: data.userWebsiteInteraction.website2 },
      { name: "Venus", value: data.userWebsiteInteraction.website3 },
      { name: "Mars", value: data.userWebsiteInteraction.website4 },
    ];
  if (specific === "all" && data.allUsersWebInteractions)
    barChartdata = [
      { name: "Sun", value: data.allUsersWebInteractions.website0 },
      { name: "Moon", value: data.allUsersWebInteractions.website1 },
      { name: "Mercury", value: data.allUsersWebInteractions.website2 },
      { name: "Venus", value: data.allUsersWebInteractions.website3 },
      { name: "Mars", value: data.allUsersWebInteractions.website4 },
    ];
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        width={600}
        height={300}
        data={barChartdata}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Bar dataKey="value" fill="#8884d8" label={renderCustomizedLabel} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
