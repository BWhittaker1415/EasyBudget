const pieChart = {
  tooltip: {
    trigger: "item",
  },
  legend: {
    top: "2%",
    left: "center",
  },

  series: [
    {
      name: "Access From",
      type: "pie",
      radius: ["40%", "60%"],
      avoidLabelOverlap: false,

      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 30,
          fontWeight: "bold",
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: "1500", name: "Mortgage" },
        { value: 400, name: "Car" },
        { value: 300, name: "Food" },
        { value: 150, name: "Utilities" },
        { value: 400, name: "Electric" },
      ],
    },
  ],
};

export default pieChart;
