import React from 'react';
import { Link, useHistory } from 'react-router-dom';
// import Moment from 'react-moment'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { deleteRes } from '../api';

export default function Reso({user, setUser}) {

    // const prevRestaurants = useRef(restaurants)
    // useEffect(() => {
    //     viewReservations()
    // }, [user.reservations])

    function viewReservations() {
        console.log(user.reservations)
        return user.reservations.map(res => {
            // const dateToFormat = res.date
            return <Card key={res.id}>
                <h3>{res.restaurant.name}</h3>
                <br/>
                {/* <Moment>{dateToFormat}</Moment> */}
                <p>{res.party_size}</p>
                <Button variant="primary" onClick={() => handleClick(res)}>Delete Reservation</Button>
            </Card>
        })
    }

    function handleClick(res) {
        deleteRes(res)
        const filRes = user.reservations.filter(restaurant => restaurant.id !== res.id)
        console.log(filRes)
        setUser(prevUser => ({...prevUser, user:{ ...prevUser.user, reservations: filRes}}))
    }
    return(
        <>
            <h2> Upcoming Reservations</h2>
            {user && user.reservations.length > 0 ? viewReservations() : <p>'No Upcoming Reservations'</p>}
            <Link to='/profile'>Back to Profile</Link>
        </>
    )
}