import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { useCreateMutation } from "../slices/budgetApiSlice";
import { BUDGETS_URL } from "../constants";

const BudgetCreateScreen = () => {
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [cost, setCost] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [create, { isLoading }] = useCreateMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("working");
    try {
      const response = await create({
        category,
        name,
        date,
        cost,
      }).unwrap();
      console.log(response);
      if (response.data.success) {
        console.log(response);
        dispatch({
          type: "BUDGET_CREATED",
          payload: response.data.createdBudget,
        });
        navigate("/budgets");
        toast.success("New budget created!");
      } else {
        toast.error("Failed to create new budget.");
      }
    } catch (err) {
      toast.error(err.data?.message || err.error);
    }
  };

  return (
    <div>
      <h1>Create a new Budget to track</h1>
      <FormContainer className="budget-create">
        <Form onSubmit={submitHandler}>
          <Form.Group className="my-2" controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId="name">
            <Form.Label>Budget Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Budget Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId="date">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId="cost">
            <Form.Label>Budget Total</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Cost"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            ></Form.Control>
          </Form.Group>

          {isLoading && <Loader />}

          <Button type="submit" variant="primary" className="mt-3">
            Add Budget
          </Button>
        </Form>
      </FormContainer>
    </div>
  );
};

export default BudgetCreateScreen;
