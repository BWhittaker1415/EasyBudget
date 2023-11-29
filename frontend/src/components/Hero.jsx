import { Container, Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Hero = () => {
  return (
    <div className=" py-5">
      <Container className="d-flex justify-content-center">
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
          <h1 className="text-center mb-4">EasyBudget</h1>
          <p className="text-center mb-4"></p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique
          necessitatibus commodi est aperiam quis velit rem, excepturi, incidunt
          repudiandae inventore fugiat, quibusdam facilis nobis distinctio.
          <div className="d-flex">
            <LinkContainer to="/login">
              <Button variant="primary" className="me-3">
                Login
              </Button>
            </LinkContainer>
            <LinkContainer to="/register">
              <Button variant="secondary">Sign up</Button>
            </LinkContainer>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Hero;
