import React, { useState, useEffect, useRef } from "react";
import { useDashboardMutation } from "../slices/usersApiSlice";
import { Row, Col, Card } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import pieChart from "../charts/PieChart";
import lineChart from "../charts/LineChart";
import ReactECharts from "echarts-for-react";
import Vacation from "../assets/Vacation.svg";
import Home from "../assets/Home.svg";

const HomeScreen = () => {
  const [dashboard] = useDashboardMutation();

  return (
    <>
      <h1>Dashboard</h1>

      <div>
        <Row className="justify-content-xs-center align-items-center">
          <Col className="card" xs={11} sm={12} md={5} lg={4} xl={3}>
            <h3>Your Personal Dashboard</h3>
            <ReactECharts option={pieChart} />
          </Col>
          <Col className="card" xs={11} sm={12} md={5} lg={4} xl={3}>
            <h3>Spending</h3>
            <ReactECharts option={pieChart} />
          </Col>
          <Col className="card" xs={11} sm={12} md={5} lg={4} xl={3}>
            <h3>Pinned Budgets</h3>
            Progression bars coming soon...
          </Col>

          <Col className="card" xs={11} sm={12} md={5} lg={4} xl={3}>
            <h3>Transactions</h3>
            Transaction table coming soon...
          </Col>
          <Col className="card" xs={11} sm={12} md={5} lg={4} xl={3}>
            <h3>Debt to Income</h3>
            <ReactECharts option={lineChart} />
          </Col>
          <Card className="budget-card">
            <Card.Img variant="top" className="mt-2" src={Vacation} />
            <ListGroup className="list-group-center">
              <Card.Title>Vacation</Card.Title>
              <ListGroup.Item>Progress</ListGroup.Item>
              <ListGroup.Item>$100.53</ListGroup.Item>
              <ListGroup.Item>of $2,000</ListGroup.Item>
            </ListGroup>
          </Card>
          <Card className="budget-card">
            <Card.Img variant="top" src={Home} />
            <ListGroup className="list-group-center">
              <Card.Title>Home</Card.Title>
              <ListGroup.Item>Progress</ListGroup.Item>
              <ListGroup.Item>$15.208.23</ListGroup.Item>
              <ListGroup.Item>of $60,000</ListGroup.Item>
            </ListGroup>
          </Card>
        </Row>
      </div>
    </>
  );
};

export default HomeScreen;
