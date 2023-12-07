import { useParams, Link } from "react-router-dom";
import { Row, Col, ListGroup, Card, Button } from "react-bootstrap";
import { useGetBudgetDetailsQuery } from "../slices/budgetApiSlice";
import Loader from "../components/Loader";

const BudgetDetailScreen = () => {
  const { id: budgetId } = useParams();

  const { data: budget, isLoading, error } = useGetBudgetDetailsQuery(budgetId);

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <div>{error.data.message || error.error}</div>
      ) : (
        <Row>
          <Col>{budget}</Col>
        </Row>
      )}
    </>
  );
};

export default BudgetDetailScreen;
