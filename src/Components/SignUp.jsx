import React, { useState } from 'react';
import { createUser } from '../api';
import { useHistory } from 'react-router-dom';

function SignUp ( {setUser}) {

    const history = useHistory();
    const signUp = {
        name: '',
        username: '',
        password: '',
        dospassword: ''
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
    //do I want to redirect to login or to profile ? only change ('/login') : make same as login

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
            <input type='text' value={form.dospassword} name='dospassword' onChange={handleChange}/>
        </label>
        <input type='submit' value='Submit'/>
    </form>
    )
}
export default SignUp