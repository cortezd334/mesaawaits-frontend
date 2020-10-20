import React, { useState, useEffect, useRef } from 'react';
import Card from 'react-bootstrap/Card';
import { updateUser } from '../api';

function Profile({user}) {

    const userForm = {
        name: user.name,
        username: user.username,
        age: user.age,
        email: user.email
    }

    const prevUser = useRef(user)
    useEffect(() => {
        if( prevUser.current !== user ) {
            setForm(userForm)
            // viewReservations()
        }
    }, [user]);
    
    const [form, setForm] = useState(userForm)
    function handleChange(e) {
        let obj = {[e.target.name]: e.target.value}
        setForm(prevState => ({...prevState, ...obj}))
    }

    function viewReservations() {
        return user.reservations.map(res => {
            return <Card key={res.id}>
                <h3>{res.restaurant.name}</h3>
                <br/>
                <p>{res.date}</p>
                <p>{res.party_size}</p>
            </Card>
        })
    }
    //can not view res cuz when loaded user doesn't exist, have to wait for it to update
    //is there a work around?
    function submitHandler(e) {
        e.preventDefault()
        console.log(user)
        console.log(form)
        updateUser(user, form)
        .then(console.log)
    }
    return(
        <div>
            <h1>Welcome {user.username}!</h1>
            <br/>
            <form onSubmit={submitHandler}>
                <label className='item pad stack'> Name:
                    <input type='text'  value={form.name} name='name' onChange={handleChange}/>
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
                <br/>
                <input type='submit' value='Submit'/>
            </form>
            <h4> Upcoming Reservations</h4>
            {user && viewReservations()}
        </div>
    )
}

export default Profile