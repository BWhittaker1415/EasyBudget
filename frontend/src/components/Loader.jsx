import { Spinner } from "react-bootstrap";
// https://react-bootstrap.netlify.app/docs/components/spinners

const Loader = () => {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        width: "50px",
        height: "50px",
        margin: "auto",
        display: "block",
      }}
    ></Spinner>
  );
};

export default Loader;
