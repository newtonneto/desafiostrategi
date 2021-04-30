import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

export default function Header() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">Home</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/clients">Clientes</Nav.Link>
        <Nav.Link href="/clients">Vendas</Nav.Link>
      </Nav>
    </Navbar>
  );
}