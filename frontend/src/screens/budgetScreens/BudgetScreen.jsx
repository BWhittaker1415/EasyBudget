import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import { GrEdit } from "react-icons/gr";
import { IoMdAddCircleOutline } from "react-icons/io";
import { GoTrash } from "react-icons/go";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  useGetBudgetQuery,
  useDeleteBudgetMutation,
} from "../../slices/budgetApiSlice";
import { toast } from "react-toastify";

const BudgetScreen = () => {
  const { data: budgets, isLoading, err, refetch } = useGetBudgetQuery();

  const [deleteBudget, { isLoading: loadingDelete }] =
    useDeleteBudgetMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        await deleteBudget(id);
        toast.success("Budget deleted");
        refetch();
      } catch (error) {
        toast.error(error.data.message || error.error);
      }
    }
  };

  return (
    <>
      <h1>Budgets</h1>

      <LinkContainer to="/budgets/create" className="my-3">
        <Button variant="light" className="btn-sm create-btn buttons">
          <IoMdAddCircleOutline /> Add New Budget
        </Button>
      </LinkContainer>

      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : err ? (
        <Message variant="danger">{err}</Message>
      ) : (
        <Table
          bordered
          striped
          hover
          responsive
          className="table-sm budget-table"
        >
          <thead>
            <tr>
              <th>CATEGORY</th>
              <th>NAME</th>
              <th>DATE</th>
              <th>COST</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {budgets &&
              budgets.map((budget) => (
                <tr key={budget._id}>
                  <td>{budget.category}</td>
                  <td>{budget.name}</td>
                  <td>{new Date(budget.date).toLocaleDateString()}</td>
                  <td>{budget.cost}</td>
                  <td>
                    <LinkContainer to={`/budgets/${budget._id}/edit`}>
                      <Button variant="light" className="btn-sm mx-2 buttons">
                        <GrEdit />
                      </Button>
                    </LinkContainer>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      className="btn-sm mx-2 buttons"
                      onClick={() => deleteHandler(budget._id)}
                    >
                      <GoTrash />
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default BudgetScreen;
