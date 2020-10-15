import React, { useState } from 'react';
// import { newRes } from '../api';

export default function Reservation({user, setUser}) {
    
    const newResForm = {
        name: '',
        date: '',
        time: '',
        partySize: 0,
        occasion: 'false',
        notes: ''

    }
    const [form, setForm] = useState(newResForm)

    function handleChange(e) {
        let obj = {[e.target.name]: e.target.value}
        setForm(prevState => ({...prevState, ...obj}))
    }

    function handleSubmit(e) {
        e.preventDefault();

        fetch(`http://localhost:3000/reservations`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${user.token}`},
        body: JSON.stringify(form)
        })
        .then(res => res.json())
        .then(console.log)
    }


    return(
    <form className='form' onSubmit={handleSubmit}>
        <label className='item pad stack'> Name:
            <input type='text' value={form.name} name='name' onChange={handleChange}/>
        </label>
        <br/>
        <label className='item pad stack'> Date:
            <input type='text' value={form.date} name='date' onChange={handleChange}/>
        </label>
        <br/>
        <label className='item pad stack'> Time:
            <input type='text' value={form.time} name='time' onChange={handleChange}/>
        </label>
        <br/>
        <label className='item pad stack'> Party Size:
            <input type='number' value={form.partySize} name='partySize' onChange={handleChange}/>
        </label>
        <br/>
        <label className='item pad stack'> Special Occasion:
            <select value={form.occasion} name='occasion' onChange={handleChange}>
                <option value='false'>None</option>
                <option value='Birthday'>Birthday</option>
                <option value='Anniversary'>Anniversary</option>
                <option value='Graduation'>Graduation</option>
                <option value='Wedding'>Wedding</option>
                <option value='Engagement'>Engagement</option>
                <option value='Divorce'>Divorce</option>
            </select>
        </label>
        <br/>
        <label className='item pad stack'> Notes:
            <textarea value={form.notes} name='notes' onChange={handleChange}/>
        </label>
        <br/>
        <input type='submit' value='Submit'/>
    </form>
    )
}