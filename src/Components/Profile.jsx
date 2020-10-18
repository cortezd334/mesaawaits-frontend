import React, { useState } from 'react';

function Profile({user}) {

    const userForm = {
        name: user.name,
        username: user.username,
        age: user.age,
        email: user.email
    }
    const [form, setForm] = useState(userForm)
    function handleChange() {

    }

    
    return(
        <div>
            <h1>Welcome {user.username}!</h1>
            <br/>
            <form>
                <label className='item pad stack'> Name:
                    <input type='text' value={form.name} name='name' onChange={handleChange}/>
                </label>
                <br/>
                <label className='item pad stack'> Userame:
                    <input type='text' value={form.username} name='username' onChange={handleChange}/>
                </label>
                <br/>
                <label className='item pad stack'> Age:
                    <input type='text' value={form.age} name='age' onChange={handleChange}/>
                </label>
                <br/>
                <label className='item pad stack'> Email:
                    <input type='text' value={form.email} name='email' onChange={handleChange}/>
                </label>
            </form>
        </div>
    )
}

export default Profile