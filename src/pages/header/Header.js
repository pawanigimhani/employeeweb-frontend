import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import { Link } from 'react-router-dom'
import './Header.css'

function Header() {
  return (
    <div>
        <Navbar bg="primary" variant="dark">
            <Container>
            <Navbar.Brand to="/">
               <strong>
                Employee Management System
               </strong>
            </Navbar.Brand>
            <Nav className="ml-auto">
                <Nav.Link as={Link} to="/" className='nav-link'>Employees</Nav.Link>
                <Nav.Link as={Link} to="/employee" className='nav-link'>Add Employee</Nav.Link>

            </Nav>
            </Container>
        </Navbar>
    </div>
  )
}

export default Header