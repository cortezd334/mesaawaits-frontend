import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { delFavorite } from '../api';

export default function Reso({user, setUser}) {

    function viewFavorites() {
        return user.favorites.map(favorite => {
            const fav = favorite.restaurant
            return <Card className='prof acards' key={fav.id} style={{ width: '20rem' }}>
                <Card.Body>
                    <Card.Title><h3>{fav.name}</h3></Card.Title>
                    <Card.Text>
                        {fav.cuisine}<br/>
                        {fav.rating} Star Rating
                    </Card.Text>
                    <Button variant="outline-info" onClick={() => handleDelete(fav)}>Remove From Favorites</Button>
                </Card.Body>
            </Card>
        })
    }

    function handleDelete(rest) {
        const data = user.favorites.filter(favorite => favorite.restaurant.name === rest.name)
        delFavorite(data[0])
        const fav = user.favorites.filter(favorite => favorite.restaurant.name !== rest.name)
        setUser(prevUser => ({...prevUser, user:{ ...prevUser.user, favorites: fav}}))
    }

    return(
        <>
            <h2 className='fancy'>Favorite Restaurants</h2>
            <div className='contain thirty'>
            {user.favorites.length > 0 ? viewFavorites() : <p>Find Your Next Favorite Restaurant by Searching Above</p>}
            </div>
            <Link to='/profile'>Back to Profile</Link>
        </>
    )
}