import { useAllStateContext } from "@/context/AllStateContext";
import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const TotalSuggestionChart = () => {
  const { allSuggestion } = useAllStateContext();

  const dataByDate = allSuggestion.reduce((acc, item) => {
    const date = item.date; // Gantilah dengan field tanggal yang sesuai
    if (!acc[date]) {
      acc[date] = 0;
    }
    acc[date]++;
    return acc;
  }, {});

  const formattedData = Object.keys(dataByDate).map((date) => ({
    date,
    Saran: dataByDate[date],
  }));

  formattedData.sort((a, b) => new Date(a.date) - new Date(b.date));
  return (
    <div className="container w-1/2 pe-1 ps-2 py-2">
      <div className="border rounded-xl shadow-lg bg-secondary p-4 mt-1">
        <div>
          <h1 className="font-bold text-center text-white mb-4">
            Total Saran Masuk
          </h1>
        </div>
        <div className="container bg-white border rounded-lg pt-4 pb-2">
          <ResponsiveContainer width={"100%"} height={300}>
            <LineChart
              width={400}
              height={300}
              data={formattedData}
              margin={{
                left: -20,
                right: 20,
              }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                tickFormatter={(time) => {
                  const date = new Date(time);
                  const year = date.getFullYear().toString().slice(-2);
                  const month = `0${date.getMonth() + 1}`.slice(-2);
                  const day = `0${date.getDate()}`.slice(-2);
                  return `${day}`;
                }}
              />
              <YAxis
                tickFormatter={(tick) => Math.floor(tick)}
                tickMargin={10}
                fontSize={12}
                domain={[0, "auto"]}
                tickCount={5}
                allowDecimals={false}
              />

              <Tooltip />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <Line
                type="monotone"
                dataKey="Saran"
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default TotalSuggestionChart;
