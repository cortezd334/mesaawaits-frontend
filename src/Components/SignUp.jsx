import React, { useState } from 'react';
import { createUser } from '../api';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'

function SignUp ({setUser}) {

    const history = useHistory();
    const signUp = {
        name: '',
        username: '',
        password: ''
    }

    const [form, setForm] = useState(signUp)

    function handleChange(e) {
        let obj = {[e.target.name]: e.target.value}
        setForm(prevState => ({...prevState, ...obj}))
    }

    function handleSubmit(e) {
        e.preventDefault();
        createUser({user: {...form}})
        .then(json => {
            if(!json.error){
                setUser(json)
                history.push("/login")
            } else {
                alert(json.error)
            }
        })
    }

    return (
        <div className='signup'>
            <h2>Welcome to MesaAwaits!</h2>
            <h4>Fill out form below to create and account.</h4>

            <Form className='form' onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" value={form.name} name='name' onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" value={form.username} name='username' onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={form.password} name='password' onChange={handleChange} />
                </Form.Group>
                <Button type='submit' variant="outline-info">Submit</Button>
            </Form>
    </div>
    )
}
export default SignUp