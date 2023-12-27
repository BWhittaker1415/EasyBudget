import React, { useState, useEffect, useRef } from "react";
import { useDashboardMutation } from "../slices/usersApiSlice";
import { Row, Col, Card } from "react-bootstrap";
import pieChart from "../charts/PieChart";
import lineChart from "../charts/LineChart";
import ReactECharts from "echarts-for-react";

const HomeScreen = () => {
  const [dashboard] = useDashboardMutation();
  const [cardSize, setCardSize] = useState({ width: 0, height: 0 });
  const cardRef = useRef(null);

  useEffect(() => {
    const updateCardSize = () => {
      if (cardRef.current) {
        const { offsetWidth, offsetHeight } = cardRef.current;
        setCardSize({ width: offsetWidth, height: offsetHeight });
      }
    };

    window.onload = () => {
      initializeThirdPartyLibrary();
    };

    updateCardSize();

    window.addEventListener("resize", updateCardSize);

    return () => {
      window.removeEventListener("resize", updateCardSize);
    };
  }, []);

  const dynamicLineChart = {
    ...lineChart,
    grid: {
      left: "10%",
      right: "10%",
      top: "15%",
      bottom: "15%",
    },
    xAxis: {
      ...lineChart.xAxis,
      boundaryGap: false,
    },
    yAxis: {
      ...lineChart.yAxis,
    },
  };

  return (
    <>
      <h1>Dashboard</h1>

      <div>
        <Row>
          <Col className="card" md={4} lg={4}>
            <h3>Spending Trend</h3>
            <ReactECharts
              option={pieChart}
              style={{ width: "100%", height: `${cardSize.height}px` }}
            />
          </Col>
          <Col className="card" md={4} lg={4}>
            <h3>Recent Transactions</h3>
            <div></div>
          </Col>
        </Row>
        <Row>
          <Col className="card" md={4} lg={4}>
            <h3>Recent Budgets</h3>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam nam
            numquam, nisi ex reiciendis sequi architecto, commodi vero sunt
            iusto cum quis laborum rem id expedita ipsum reprehenderit maxime
            in.
          </Col>
          <Col className="card" md={4} lg={4}>
            <h3>Cashflow Graph</h3>
            <ReactECharts
              option={dynamicLineChart}
              style={{ width: "100%", height: `${cardSize.height}px` }}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default HomeScreen;
