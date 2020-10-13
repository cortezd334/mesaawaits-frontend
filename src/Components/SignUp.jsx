import React, { useState } from 'react';
import { createUser } from '../api';

function SignUp () {

    const signUp = {
        name: '',
        username: '',
        password: '',
        recovery_password: '' //need to change this, in order to use properly
    }

    const [form, setForm] = useState(signUp)

    function handleChange(e) {
        let obj = {[e.target.name]: e.target.value}
        setForm(prevState => ({...prevState, ...obj}))
    }

    function handleSubmit(e) {
        e.preventDefault();
        createUser({user: {...form}})
    }

    return (
    <form onSubmit={handleSubmit}>
        <label> Name:
            <input type='text' value={form.name} name='name' onChange={handleChange}/>
        </label>
        <label> Username:
            <input type='text' value={form.username} name='username' onChange={handleChange}/>
        </label>
        <label> Password:
            <input type='text' value={form.password} name='password' onChange={handleChange}/>
        </label>
        <label> Re-Enter Password:
            <input type='text' value={form.recovery_password} name='recovery_password' onChange={handleChange}/>
        </label>
        <input type='submit' value='Submit'/>
    </form>
    )
}
export default SignUp