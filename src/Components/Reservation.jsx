import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import ResoConfirmation from './ResoConfirmation';
// import { newRes } from '../api';

export default function Reservation({user, setUser, setReso}) {
    
    const newResForm = {
        name: '',
        date: '',
        time: '',
        party_size: 0,
        occasion: 'false',
        notes: ''
    }

    const history = useHistory()
    const [form, setForm] = useState(newResForm)

    function handleChange(e) {
        let obj = {[e.target.name]: e.target.value}
        setForm(prevState => ({...prevState,         restaurant_id: localStorage.currentResId,
            user_id: localStorage.userId, ...obj}))
    }

    function handleSubmit(e) {
        e.preventDefault();

        console.log(localStorage.currentResId)
        fetch(`http://localhost:3000/reservations`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${user.token}`},
        body: JSON.stringify(form)
        })
        .then(res => res.json())
        .then(json => {
            setReso(json)
            console.log(user)
            setUser(prevUser => ({...prevUser, user:{ ...prevUser.user, reservations: [...prevUser.user.reservations, json]}}))
            history.push('/confirmation')
        })
    }


    return(
    <form className='form' onSubmit={handleSubmit}>
        <label className='item pad stack'> Name on Reservation:
            <input type='text' value={form.name} name='name' onChange={handleChange}/>
        </label>
        <br/>
        <label className='event-label item pad stack' for='exampleDate'> Date:
            <input type='date' id='exampleDate' value={form.date} name='date' onChange={handleChange}/>
        </label>
        <br/>
        <label className='event-label item pad stack' for='eventTime'> Time:
            <input type='time' id='eventTime' value={form.time} name='time' onChange={handleChange}/>
        </label>
        <br/>
        <label className='item pad stack'> Party Size:
            <input type='number' value={form.party_size} name='party_size' onChange={handleChange}/>
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