import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default function Reso({user}) {

    function viewFavorites() {
        return user.favorites.map(favorite => {
            const fav = favorite.restaurant
            // const type = fav.cuisine.map(cuisine => console.log(cuisine))
            return <Card key={fav.id}>
            <h3>{fav.name}</h3>
            <br/>
            <p>{fav.rating} Star Rating</p>
            <p>{fav.cuisine}</p>
            {/* <Button variant="primary" onClick={() => handleClick(res)}>Delete Reservation</Button> */}
            </Card>
        })
    }

    return(
        <>
            <h2>Favorite Restaurants</h2>
            {user ? viewFavorites() : <Link to='/search'>Find Your Next Favorite Restaurant</Link>}
            <Link to='/profile'>Back to Profile</Link>
        </>
    )
}