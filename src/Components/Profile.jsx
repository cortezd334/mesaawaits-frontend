import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { updateUser, deleteUser } from '../api';

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
    const [updateShow, setUpdateShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleUpdateClose = () => setUpdateShow(false)
    const handleUpdateShow = () => setUpdateShow(true)

    function handleChange(e) {
        let obj = {[e.target.name]: e.target.value}
        setForm(prevState => ({...prevState, ...obj}))
    }

    function submitHandler(e) {
        e.preventDefault()

        updateUser(user, form)
    }

    function deleteAccount() {
        deleteUser(user)
        localStorage.clear()
        history.push('/')
        setUser({})
    }

    return(
        <div>
            <h2 className='fancy'>Welcome {user.username}!</h2>
            <br/>
            <Form className='wideform' onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='text' placeholder='name' value={form.name} name='name' onChange={handleChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type='text' placeholder='username' value={form.username} name='username' onChange={handleChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Age</Form.Label>
                    <Form.Control type='text' placeholder='age' value={form.age} name='age' onChange={handleChange}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder='email' value={form.email} name='email' onChange={handleChange}/>
                </Form.Group>
                <Button type='submit' variant="outline-info" onClick={handleUpdateShow}>Update</Button>
                <Button className='del' variant="outline-info" onClick={handleShow}>Delete Account</Button>
            </Form>

            <Link to='/myreservations' className='prl'>View Upcoming Reservations</Link>
            <Link to='/favorites' className='prl'>View Favorite Restaurants</Link>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>Delete Your Account?
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete your account? Once deleted all future reservations will also be deleted.</p>
                </Modal.Body>

                <Modal.Footer>
                    {/* need to do somehting about delete Account/handleClose in deleteAccount call handleClose? */}
                    <Button variant="outline-dark" onClick={handleClose, deleteAccount}>Delete Account</Button>
                    <Button variant="outline-info"  onClick={handleClose}>Take Me Back</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={updateShow} onHide={handleUpdateClose}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <p>Your Account Has Been Updated</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="outline-info"  onClick={handleUpdateClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Profile