import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

const TopNav = () => {
  return (
    <Navbar bg='light' variant='light'>
      <Container>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <div className='d-flex w-100'>
          <Nav className='me-auto'>
            <Nav.Link href='/transactions'>Transactions</Nav.Link>
            <Nav.Link href='/budgets'>Expenses</Nav.Link>
            <Nav.Link href='/goals'>Goals</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href='/help'>Help</Nav.Link>
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
};

export default TopNav;
