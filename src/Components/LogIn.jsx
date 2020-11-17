import React, { useState } from 'react';
import { login } from '../api';
import { useHistory } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function LogIn({handleAuthResp}) {
    const history = useHistory();
    const logIn = {
        username: '',
        password: ''
    }

    const [form, setForm] = useState(logIn)

    function handleChange(e) {
        let obj = {[e.target.name]: e.target.value}
        setForm(prevState => ({...prevState, ...obj}))
    }

    function handleSubmit(e) {
        e.preventDefault();
        login(form)
        .then(json => {
            console.log(json)
            if(!json.error){
                handleAuthResp(json)
                history.push('/restaurants')
            } else {
                alert(json.error)
            }
        })
    }

    return(
        <div className='login'>
            <h2>Welcome Back! Please sign in.</h2>
            <Form className='form' onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type='text' value={form.username} name='username' onChange={handleChange}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={form.password} name='password' onChange={handleChange}/>
                </Form.Group>
                <Button variant="outline-info" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}