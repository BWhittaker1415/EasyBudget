import { useDashboardMutation } from "../slices/usersApiSlice";
import { Row, Col, Card } from "react-bootstrap";
import pieChart from "../charts/PieChart";
import lineChart from "../charts/LineChart";
import ReactECharts from "echarts-for-react";

const HomeScreen = () => {
  const [dashboard] = useDashboardMutation();

  return (
    <>
      <h1>Dashboard</h1>

      <div>
        <Row>
          <Col>
            <Card sm={0}>
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Card Subtitle
                </Card.Subtitle>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Card Subtitle
                </Card.Subtitle>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Card Subtitle
                </Card.Subtitle>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col className="card" md={6} lg={6}>
            <h3>Cashflow Graph</h3>
            <ReactECharts option={lineChart} />
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

          <Col className="card" md={6} lg={6}>
            <h3>Spending Trend</h3>
            <ReactECharts option={pieChart} />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default HomeScreen;
