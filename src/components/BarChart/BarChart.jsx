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

const BarChartComponent = () => {
  const data = [
    { name: "Sun", value: 40 },
    { name: "Moon", value: 30 },
    { name: "Mercury", value: 20 },
    { name: "Venus", value: 27 },
    { name: "Mars", value: 18 },
  ];
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        width={600}
        height={300}
        data={data}
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
