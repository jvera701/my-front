import { Navbar, Container, Nav } from "react-bootstrap";

function CustomNavbar() {
    return   <Navbar bg="secondary" variant="dark" sticky="top">
    <Nav className="me-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#features">Features</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link>
    </Nav>
  </Navbar>
}

export default CustomNavbar;