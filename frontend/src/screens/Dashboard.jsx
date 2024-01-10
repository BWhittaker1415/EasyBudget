import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetBudgetQuery } from "../slices/budgetApiSlice";
import { setPinnedBudgets, pinBar, unpinBar } from "../slices/pinnedBarSlice";
import { Row, Col, Card, ProgressBar } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import pieChart from "../charts/PieChart";
import lineChart from "../charts/LineChart";
import ReactECharts from "echarts-for-react";
import Dashboard from "../assets/Dashboard.svg";
import Vacation from "../assets/Vacation.svg";
import Home from "../assets/Home.svg";
import axios from "axios";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const pinnedBudgets = useSelector((state) => state.pinnedBars);
  const { data: allBudgets, isLoading, isError } = useGetBudgetQuery();

  useEffect(() => {
    const storedPinnedBudgets = localStorage.getItem("pinnedBudgets");
    if (storedPinnedBudgets) {
      const parsedPinnedBudgets = JSON.parse(storedPinnedBudgets);
      dispatch(setPinnedBudgets(parsedPinnedBudgets));
    }
  }, [dispatch]);

  const togglePinnedStatus = (budgetId) => {
    if (pinnedBudgets.includes(budgetId)) {
      dispatch(unpinBar(budgetId));
      updateLocalStorage(pinnedBudgets.filter((id) => id !== budgetId));
    } else {
      dispatch(pinBar(budgetId));
      updateLocalStorage([...pinnedBudgets, budgetId]);
    }
  };

  const updateLocalStorage = (updatedPinnedBudgets) => {
    localStorage.setItem("pinnedBudgets", JSON.stringify(updatedPinnedBudgets));
  };

  const calculateProgress = (budget) => {
    const maxProgress = budget.progressTotal || 100;
    return (budget.cost / maxProgress) * 100;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !allBudgets) {
    return <div>Error loading budgets.</div>;
  }

  const pinnedBudgetDetails = allBudgets.filter((budget) =>
    pinnedBudgets.includes(budget._id)
  );

  return (
    <>
      <h1>Dashboard</h1>

      <div>
        <Row className='justify-content-xs-center align-items-center'>
          <Col className='card' xs={11} sm={12} md={5} lg={4} xl={3}>
            <h3>Your Personal Dashboard</h3>
            <img src={Dashboard} />
          </Col>
          <Col className='card' xs={11} sm={12} md={5} lg={4} xl={3}>
            <h3>Spending</h3>
            <ReactECharts option={pieChart} />
          </Col>
          <Col className='card' xs={11} sm={12} md={5} lg={4} xl={3}>
            <h3>Pinned Bills</h3>
            <div>
              {pinnedBudgetDetails.map((budget) => (
                <div key={budget._id} className='progress-bar-item'>
                  <p>{budget.name}</p>
                  <ProgressBar
                    className='mb-2'
                    now={calculateProgress(budget)}
                  />
                </div>
              ))}
            </div>
          </Col>

          <Col className='card' xs={11} sm={12} md={5} lg={4} xl={3}>
            <h3>Transactions</h3>
            Transaction table coming soon...
          </Col>
          <Col className='card' xs={11} sm={12} md={5} lg={4} xl={3}>
            <h3>Debt to Income</h3>
            <ReactECharts option={lineChart} />
          </Col>
          <Card className='budget-card'>
            <Card.Img variant='top' className='mt-2' src={Vacation} />
            <ListGroup className='list-group-center'>
              <Card.Title>Vacation</Card.Title>
              <ListGroup.Item>Progress</ListGroup.Item>
              <ListGroup.Item>$100.53</ListGroup.Item>
              <ListGroup.Item>of $2,000</ListGroup.Item>
            </ListGroup>
          </Card>
          <Card className='budget-card'>
            <Card.Img variant='top' src={Home} />
            <ListGroup className='list-group-center'>
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
