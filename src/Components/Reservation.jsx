import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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

    console.log(form.time)
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
    <Form className='form' onSubmit={handleSubmit}>
        <Form.Group controlId='formGroupName'>
        <Form.Label className='item'>Name on Reservation</Form.Label>
            <Form.Control type='text' value={form.name} name='name' onChange={handleChange}/>
        </Form.Group>
        <Form.Group controlId='formGroupDate'>
        <Form.Label className='event-label item' for='exampleDate'> Date</Form.Label>
            <Form.Control type='date' id='exampleDate' value={form.date} name='date' onChange={handleChange}/>
        </Form.Group>
        <Form.Group controlId='formGroupTime'>
        <Form.Label className='event-label item' for='eventTime'> Time</Form.Label>
            <Form.Control type='time' id='eventTime' value={`${form.time}:00`} name='time' onChange={handleChange}/>
        </Form.Group>
        <Form.Group controlId='formGroupSize'>
        <Form.Label className='item'> Party Size</Form.Label>
            <Form.Control type='number' value={form.party_size} name='party_size' onChange={handleChange}/>
        </Form.Group>
        <Form.Group controlId='formGroupOccasion'>
        <Form.Label className='item'> Special Occasion</Form.Label>
            <Form.Control as='select' className='my-1 mr-sm-2' custom value={form.occasion} name='occasion' onChange={handleChange}>
                <option value='false'>None</option>
                <option value='Birthday'>Birthday</option>
                <option value='Anniversary'>Anniversary</option>
                <option value='Graduation'>Graduation</option>
                <option value='Wedding'>Wedding</option>
                <option value='Engagement'>Engagement</option>
                <option value='Divorce'>Divorce</option>
            </Form.Control>
        </Form.Group>
        <Form.Group controlId='formGroupNotes'>
        <Form.Label className='item'> Notes</Form.Label>
            <Form.Control type='text' value={form.notes} name='notes' onChange={handleChange}/>
        </Form.Group>
        <Button type='submit' variant="outline-info">Submit</Button>
    </Form>
    )
}