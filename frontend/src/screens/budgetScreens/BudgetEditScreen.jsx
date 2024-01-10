import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";
import {
  useUpdateBudgetMutation,
  useGetBudgetDetailsQuery,
} from "../../slices/budgetApiSlice";

const BudgetEditScreen = () => {
  const { id: budgetId } = useParams();

  const categories = [
    "Select category..",
    "Housing",
    "Utilities",
    "Auto",
    "Food",
    "Child Care",
    "Credit Card",
    "Other",
  ];

  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [cost, setCost] = useState("");
  const [progressTotal, setProgressTotal] = useState("");

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

      setProgressTotal(budget.progressTotal);
    }
  }, [budget]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!budgetId) {
      console.error("Budget is undefined");
      return;
    }

    if (!category || !name || !date || !cost || !progressTotal) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (isNaN(cost)) {
      toast.error("Please enter a valid cost");
      return;
    }

    const formattedDate = new Date(date).toISOString().split("T")[0];

    const updatedBudget = {
      budgetId,
      category,
      name,
      date: formattedDate,
      cost,
      progressTotal,
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
      <Link to='/budgets' className='btn btn-light my-3 buttons'>
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit your Expense</h1>
        {loadingUpdate && <Loader />}

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='category' className='my-2'>
              <Form.Label>Category</Form.Label>
              <Form.Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group controlId='name' className='my-2'>
              <Form.Label>Expense name</Form.Label>
              <Form.Control
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='date' className='my-2'>
              <Form.Label>Due date</Form.Label>
              <Form.Control
                type='date'
                value={date}
                onChange={(e) => setDate(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='progressTotal' className='my-2'>
              <Form.Label>Money needed</Form.Label>
              <Form.Control
                type='number'
                value={progressTotal}
                onChange={(e) => setProgressTotal(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='cost' className='my-2'>
              <Form.Label>Money set aside..</Form.Label>
              <Form.Control
                type='number'
                value={cost}
                onChange={(e) => setCost(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' className='my-2 buttons'>
              Update Expense
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default BudgetEditScreen;
