import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { useCreateBudgetMutation } from "../../slices/budgetApiSlice";
import { ProgressBar } from "react-bootstrap";

const BudgetCreateScreen = () => {
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

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [create, { isLoading }] = useCreateBudgetMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const inputDate = new Date(date);
      const newDate = new Date(inputDate.toISOString().split("T")[0]);
      const response = await create({
        category,
        name,
        date: newDate.toISOString().split("T")[0],
        cost,
        progressTotal,
      }).unwrap();
      console.log(response);
      if (response.data.success) {
        dispatch({
          type: "BUDGET_CREATED",
          payload: response.data.createdBudget,
        });
        toast.success("New budget created!");
        navigate("/budgets");
      }
    } catch (err) {
      toast.error(err.data?.message || err.error);
    }
  };

  const calculateProgress = () => {
    const maxProgress = progressTotal || 100;
    return (cost / maxProgress) * 100;
  };

  return (
    <div>
      <h1>Create a new Budget to track</h1>

      <Link className="btn btn-light my-3 buttons" to="/budgets">
        Go Back
      </Link>

      <FormContainer className="budget-create">
        <Form onSubmit={submitHandler}>
          <Form.Group className="my-2" controlId="category">
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
            <Form.Label>Money Saved..</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Savings"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId="progressTotal">
            <Form.Label>Money Needed</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Total"
              value={progressTotal}
              onChange={(e) => setProgressTotal(e.target.value)}
            ></Form.Control>
          </Form.Group>

          {isLoading && <Loader />}

          <ProgressBar
            now={calculateProgress()}
            label={`${calculateProgress().toFixed(2)}%`}
          />

          <Button type="submit" variant="primary" className="mt-3 buttons">
            Add Budget
          </Button>
        </Form>
      </FormContainer>
    </div>
  );
};

export default BudgetCreateScreen;
