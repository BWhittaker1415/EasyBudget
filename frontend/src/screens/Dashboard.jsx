import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPinnedBudgets } from "../slices/authSlice";
import { useDashboardMutation } from "../slices/usersApiSlice";
import { useGetBudgetQuery } from "../slices/budgetApiSlice";
import { Row, Col, Card } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import pieChart from "../charts/PieChart";
import lineChart from "../charts/LineChart";
import ReactECharts from "echarts-for-react";
import Dashboard from "../assets/Dashboard.svg";
import Vacation from "../assets/Vacation.svg";
import Home from "../assets/Home.svg";
import axios from "axios";
import { ProgressBar } from "react-bootstrap";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const pinnedBudgets = useSelector((state) => state.auth.pinnedBudgets);
  const [dashboard] = useDashboardMutation();
  const { data: budgets } = useGetBudgetQuery();

  const fetchPinnedBudgets = async () => {
    try {
      const response = await axios.get("/api/budgets");
      const fetchedPinnedBudgets = response.data;
      dispatch(setPinnedBudgets(fetchedPinnedBudgets));
    } catch (error) {
      console.error("Error fetching pinned budgets:", error);
    }
  };

  useEffect(() => {
    fetchPinnedBudgets();
  }, [dispatch]);

  return (
    <>
      <h1>Dashboard</h1>

      <div>
        <Row className="justify-content-xs-center align-items-center">
          <Col className="card" xs={11} sm={12} md={5} lg={4} xl={3}>
            <h3>Your Personal Dashboard</h3>
            <img src={Dashboard} />
          </Col>
          <Col className="card" xs={11} sm={12} md={5} lg={4} xl={3}>
            <h3>Spending</h3>
            <ReactECharts option={pieChart} />
          </Col>
          <Col className="card" xs={11} sm={12} md={5} lg={4} xl={3}>
            <h3>Pinned Budgets</h3>
            <div>
              {pinnedBudgets.map((pinnedBudget) => (
                <div key={pinnedBudget._id} className="budget-card">
                  <ListGroup className="list-group-center">
                    <h5>{pinnedBudget.name}</h5>
                    <ListGroup.Item>Progress</ListGroup.Item>
                    <ListGroup.Item>{pinnedBudget.cost}</ListGroup.Item>
                    <ListGroup.Item>
                      of {pinnedBudget.progressTotal}
                    </ListGroup.Item>
                  </ListGroup>
                </div>
              ))}
            </div>
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
