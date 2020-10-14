import React, { useState } from 'react';
import { login } from '../api';
import { useHistory } from "react-router-dom";

function LogIn({ user, setUser, handleAuthResp}) {
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
                history.push('/profile')
            } else {
                alert(json.error)
            }
        })
    }

    return(
    <form onSubmit={handleSubmit}>
        <label> Username:
            <input type='text' value={form.username} name='username' onChange={handleChange}/>
        </label>
        <label> Password:
            <input type='text' value={form.password} name='password' onChange={handleChange}/>
        </label>
        <input type='submit' value='Submit'/>
    </form>
    )
}

export default LogIn