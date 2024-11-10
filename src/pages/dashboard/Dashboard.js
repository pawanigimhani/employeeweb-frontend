import React, { useEffect } from 'react'
import { useState } from 'react'
import { Button, Col, Container, Row, Table } from 'react-bootstrap';

function Dashboard() {

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/employees');
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8081/api/employee/${id}`, {
        method: 'DELETE',
      });
      if(response.status === 200){
        const newEmployees = employees.filter((employee) => employee.id !== id);
        setEmployees(newEmployees);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Container className='mt-5'>
        <Row>
          <Col>
          <h1 className='text-center'>Employees</h1>
          <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Department</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.phone}</td>
                    <td>{employee.department}</td>
                    <td>
                      <Button variant='outline-secondary'>Edit</Button>{" "}
                      <Button variant='outline-danger' onClick={()=> handleDelete(employee.id)}>Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
          </Table>
          </Col>
        </Row>
      </Container>
        
    </div>
  )
}

export default Dashboard