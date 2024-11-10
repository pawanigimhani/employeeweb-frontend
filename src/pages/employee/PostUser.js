import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import "./PostUser.css"


function PostUser() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        department: ''
    })

    const navigate = useNavigate();

    const handleInput = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        console.log(e)
        console.log(formData)
        try {
            const response = await fetch('http://localhost:8081/api/employee', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            console.log("Employee Created", data)
            navigate('/');
        } catch (error) {
            console.error(error)
    }
    }
  return (
    <div className='center-form'>
        <h1>Add Nem Employee</h1>
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicName">
                <Form.Control type="text" name="name" placeholder="Enter name" value={formData.name} onChange={handleInput} />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Control type="email" name='email' placeholder="Enter email" value={formData.email} onChange={handleInput} />
            </Form.Group>
            <Form.Group controlId="formBasicPhone">
                <Form.Control type="text" name='phone' placeholder="Enter phone" value={formData.phone} onChange={handleInput} />
            </Form.Group>
            <Form.Group controlId="formBasicDepartment">
                <Form.Control type="text" name='department' placeholder="Enter department" value={formData.department} onChange={handleInput} />
            </Form.Group>
            <Button variant="primary" type="submit" className='w-100'>
                Submit
            </Button>
        </Form>

    </div>
  )
}

export default PostUser