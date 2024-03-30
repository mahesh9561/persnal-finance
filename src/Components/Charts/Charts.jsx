import React, { useState } from "react";
import { Line, Pie } from "@ant-design/charts";
import { Transaction } from "firebase/firestore";

function Charts({ sortTransactions }) {
  const [lineChart, setLineChart] = useState(null);
  const [pieChart, setPieChart] = useState(null);

  // Prepare data for Line chart
  const lineChartData = sortTransactions.map((item) => ({
    date: item.date,
    amount: item.amount,
  }));

  // Prepare data for Pie chart
  const expenseData = sortTransactions
    .filter((transaction) => transaction.type === "expense")
    .map((transaction) => ({
      tag: transaction.tag,
      amount: transaction.amount,
    }));

  const lineConfig = {
    data: lineChartData,
    height: 400,
    width: 850,
    autoFit: false,
    xField: "date",
    yField: "amount",
    onReady: (chartInstance) => setLineChart(chartInstance),
  };

  const pieConfig = {
    data: expenseData,
    width: 433,
    angleField: "amount",
    colorField: "tag",
    onReady: (chartInstance) => setPieChart(chartInstance),
  };

  return (
    <div className=" flex justify-between flex-wrap bg-slate-100 shadow-lg rounded-md m-5">
      <div className="m-5 bg-white shadow-lg rounded-xl">
        <h2 className="m-5">Your Analytics</h2>
        <Line {...lineConfig}   />
      </div>
      <div className="m-5 bg-white shadow-lg rounded-xl">
        <h2 className="m-5">Your Spending</h2>
        <Pie {...pieConfig} />
      </div>
    </div>
  );
}

export default Charts;
