import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { updateUser, deleteRes, deleteUser } from '../api';

function Profile({user, setUser}) {

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
        }
    }, [user]);
    
    const history = useHistory()

    const [form, setForm] = useState(userForm)
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    function handleChange(e) {
        let obj = {[e.target.name]: e.target.value}
        setForm(prevState => ({...prevState, ...obj}))
    }

    function submitHandler(e) {
        e.preventDefault()

        updateUser(user, form)
        .then(console.log)
    }

    function deleteAccount() {
        deleteUser(user)
        localStorage.clear()
        history.push('/')
        setUser({})
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
                <input type='submit' value='Update'/>
            </form>

            <Button variant='primary' onClick={handleShow}>Delete Account</Button>

            <Link to='/myreservations'>View Upcoming Reservations</Link>
            <Link to='/favorites'>View Favorite Restaurants</Link>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>Delete Your Account?
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete your account? Once deleted all future reservations will also be deleted.</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose, deleteAccount}>Delete Account</Button>
                    <Button variant="primary" onClick={handleClose}>Take Me Back</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Profile