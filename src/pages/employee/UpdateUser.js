import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import "./UpdateUser.css";

function UpdateUser() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const getEmployee = async () => {
      try {
        const response = await fetch(`http://localhost:8081/api/getemployee/${id}`);
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error(error);
      }
    };
    getEmployee();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8081/api/editemployee/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log("Employee Created", data);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="center-form">
      <h1>Edit Employee</h1>
      <Form onSubmit={handleUpdate}>
        <Form.Group controlId="formBasicName">
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleInput}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleInput}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPhone">
          <Form.Control
            type="text"
            name="phone"
            placeholder="Enter phone"
            value={formData.phone}
            onChange={handleInput}
          />
        </Form.Group>
        <Form.Group controlId="formBasicDepartment">
          <Form.Control
            type="text"
            name="department"
            placeholder="Enter department"
            value={formData.department}
            onChange={handleInput}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100">
          Done
        </Button>
      </Form>
    </div>
  );
}

export default UpdateUser;
