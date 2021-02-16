import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteRes } from '../api';

export default function Reso({user, setUser}) {

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    function viewReservations() {
        return user.reservations.map(res => {

            function time(restime){
                if(restime !== null){
                    const first = restime.split('T')
                    const second = first[1].split(':')
                    if(second[0] > 12){
                    const hour = +second[0] - 12
                    return `${hour}:${second[1]}pm`

                    } else {
                    return `${second[0]}:${second[1]}am`
                    }
                }
            }

            return <div key={res.id}>
                <Card className='prof acards'  style={{ width: '20rem' }}>
                    <Card.Body>
                        <Card.Title>{res.restaurant.name}</Card.Title>
                        <Card.Text>
                            {moment(res.date).format('dddd[,] ll')} at {time(res.time)}<br/>
                            for {res.party_size} {res.party_size === 1 ? 'person' : 'people'}.<br/>
                            {res.occasion === 'false' ? '' : `${res.occasion} Celebration`}<br/>
                            Special Request/Notes: {res.notes ? res.notes : 'None'}
                        </Card.Text>
                        <Button variant="outline-info" onClick={handleShow}>Delete Reservation</Button>
                    </Card.Body>
                </Card>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>Delete Your Reservation?
                    </Modal.Header>
                    <Modal.Body>
                        <p>Are you sure you want to delete your reservation? Once deleted we can not guarantee future availability.</p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="outline-dark" onClick={ () => handleClick(res)}>Delete Reservation</Button>
                        <Button variant="outline-info"  onClick={handleClose}>Keep Reservation</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        })
    }

    function handleClick(res) {
        handleClose()
        deleteRes(res)
        const filRes = user.reservations.filter(restaurant => restaurant.id !== res.id)
        setUser(prevUser => ({...prevUser, user:{ ...prevUser.user, reservations: filRes}}))
    }
    return(
        <div >
            <h2> Upcoming Reservations</h2>
            <div className='contain thirty'>
            {user && user.reservations.length > 0 ? viewReservations() : <p>'No Upcoming Reservations'</p>}
            </div>
            <Link to='/profile'>Back to Profile</Link>
        </div>
    )
}