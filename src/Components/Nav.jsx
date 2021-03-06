import React, {useState} from 'react'
import { NavLink } from "react-router-dom";
import NavBar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';

import waiter from '../images/waiter.png'
import { search } from '../api';
import { useHistory } from 'react-router-dom'


export default function Nav({user, logOut, setRestaurants}) {
    const history = useHistory()

    const yelpForm = {
        cuisine: '',
        location: ''
    }
    const [form, setForm] = useState(yelpForm)

    function handleChange(e) {
        let obj = {[e.target.name]: e.target.value}
        setForm(prevState => ({...prevState, ...obj}))
    }

    function handleSubmit(e) {
        e.preventDefault()

        search(form)
        .then(json => {
            setRestaurants(
                json.businesses
            )
        })
        history.push('/map')
    }
    return(
        <NavBar fixed='top' className='justify-content-between'>
            <img className='logo' src={waiter} alt='logo'/>
            <p className='navmesa'>Mesa</p>
            <p className='navawaits'>AWAITS</p>
            {Object.keys(user).length > 1 ? (
                <>
                    <NavLink className='item position' to='/restaurants' >Restaurants</NavLink>
                    <NavLink className='item position' to='/profile' >Profile</NavLink>
                    <Form className='form-inline position' onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label className='item search'> Cuisine</Form.Label>
                            <Form.Control type='text' value={form.cuisine} name='cuisine' onChange={handleChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className='item search'> Location</Form.Label>
                            <Form.Control type='text' value={form.location} name='location' onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className='search'>
                            <Button type='submit' variant="outline-info">Submit</Button>
                        </Form.Group>
                    </Form>
                    <NavLink className='item position' to='/' onClick={logOut}>Log Out</NavLink>
                </>
                ) : (
                <>
                    <NavLink className='item position' to='/signup'> Create An Account</NavLink>
                    <NavLink className='item position' to='/login' >Log In</NavLink>
                </>)
            }
            
        </NavBar>
    )
}