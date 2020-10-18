import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';

function Profile({user}) {

    // useEffect(() => {
    //     viewReservations()
    // }, [user]);

    const userForm = {
        name: user.name,
        username: user.username,
        age: user.age,
        email: user.email
    }
    const [form, setForm] = useState(userForm)
    function handleChange() {

    }

    function viewReservations() {
        console.log(user.reservations)
        // return user.reservations.map(res => {
        //     return <Card key={res.id}>
        //         {/* <h3>{res.name}</h3> need to get Restaurant name*/}
        //         <br/>
        //         <p>{res.date}</p>
        //         <p>{res.party_size}</p>
        //     </Card>
        // })
    }
    //can not view res cuz when loaded user doesn't exist, have to wait for it to update
    //is there a work around?
    
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
            {viewReservations()}
        </div>
    )
}

export default Profile