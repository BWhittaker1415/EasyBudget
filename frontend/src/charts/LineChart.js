const lineChart = {
  xAxis: {
    type: "category",
    data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [2750, 2900, 2700, 2800, 2600, 2750, 2650],
      type: "line",
    },
    {
      data: [5000, 5100, 4800, 4950, 4900, 5250, 5000],
      type: "line",
    },
  ],
};

export default lineChart;
