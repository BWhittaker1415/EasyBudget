import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { toast } from "react-toastify";
import {
  useUpdateBudgetMutation,
  useGetBudgetDetailsQuery,
} from "../slices/budgetApiSlice";

const BudgetEditScreen = () => {
  const { id: budgetId } = useParams();

  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [cost, setCost] = useState("");

  const {
    data: budget,
    isLoading,
    refetch,
    error,
  } = useGetBudgetDetailsQuery(budgetId);

  const [updateBudget, { isLoading: loadingUpdate }] =
    useUpdateBudgetMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (budget) {
      setCategory(budget.category);
      setName(budget.name);

      const formattedDate = new Date(budget.date).toISOString().split("T")[0];
      setDate(formattedDate);

      setCost(budget.cost);
    }
  }, [budget]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!budgetId) {
      console.error("Budget is undefined");
      return;
    }
    const updatedBudget = {
      budgetId,
      category,
      name,
      date,
      cost,
    };

    const result = await updateBudget(updatedBudget);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Budget updated!");
      navigate("/budgets");
    }
  };

  return (
    <>
      <Link to="/budgets" className="btn btn-light my-3">
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit your Budget</h1>
        {loadingUpdate && <Loader />}

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="category" className="my-2">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="name" className="my-2">
              <Form.Label>Budget Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="date" className="my-2">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="cost" className="my-2">
              <Form.Label>Budget Cost</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter cost"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary" className="'my-2">
              Update Budget
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default BudgetEditScreen;
