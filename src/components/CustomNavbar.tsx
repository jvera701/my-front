import { Navbar, Nav } from 'react-bootstrap'
import React from 'react'

function CustomNavbar() {
  return (
    <Navbar bg="secondary" variant="dark" sticky="top">
      <Nav className="me-auto">
        <Nav.Link href="/home">Home</Nav.Link>
      </Nav>
    </Navbar>
  )
}

export default CustomNavbar
