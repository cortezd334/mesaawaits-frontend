import React, {useEffect, useRef} from 'react';
import Button from 'react-bootstrap/Button';
import Media from 'react-bootstrap/Media';
import new_heart from '../images/new_heart.png'
import red_heart from '../images/rojo.png'
import { geoSearch, saveRestaurant, addFavorite, delFavorite } from '../api';
import { Link, useHistory } from 'react-router-dom'


export default function Restaurant({restaurants, setRestaurants, center, user, setUser}) {

    const history = useHistory()
    
    const prevCenter = useRef(center)
    useEffect(() => {
        if( prevCenter.current.lat !== center.lat || prevCenter.current.lng !== center.lng) {
        loadRest()
        }
    }, [center]);
    //w/ center or empty still loads SFO
    // w/ restaurants correct city but continues to make calls
    // w/ comparison to prevCenter allows for proper city based off of center update (fixes above comments)

    const yelpSearch = {
        search: 'restaurants',
        latitude: center.lat,
        longitude: center.lng  
    }

    function loadRest() {
        geoSearch(yelpSearch)
        .then(json => {
            setRestaurants(
                json.businesses
            )
        })
    }

    function displayRest() {

        return restaurants.map(restaurant => {
            let cuisine = restaurant.categories.map(cuisine => {
                return cuisine.title
            })
            return <Media className='restcard allmarg acards' key={restaurant.id}>
                <img className='img' src={restaurant.image_url} alt='restaurant'/>
                <Media.Body className='info'>
                    <h3>{restaurant.name}</h3>
                    <br/>
                    <p>{restaurant.rating} Star Rating</p>
                    <p>{restaurant.price ? ` ${restaurant.price}` : null}</p>
                    <p>{` ${cuisine.join(', ')} `}</p>
                    <p>{restaurant.display_phone}</p>
                    <div>
                        <Button variant="outline-info" onClick={() => clickHandler(restaurant)}>Make Reservation</Button>
                    </div>
                    <div>
                        {user.favorites.map(favorite => 
                            favorite.restaurant.name).includes(restaurant.name) ? 
                        <img className='icon' src={red_heart} alt='Fav Heart' onClick={() => handleDelete(restaurant)}/> :
                        <img className='icon' src={new_heart} alt='New Heart' onClick={() => handleAdd(restaurant)}/>}
                    </div>
                </Media.Body>
            </Media>
        })
    }

    function clickHandler(rest) {

        let cuisine = rest.categories.map(cuisine => {
            return cuisine.title
        })

        const info = {
            name: rest.name,
            cuisine: cuisine.join(', ') ,
            rating: rest.rating,
            latitude: rest.coordinates.latitude,
            longitude: rest.coordinates.longitude,
            image: rest.image_url
        }
        saveRestaurant(info)
        .then(json => {
            localStorage.setItem('currentResId', json.id)      
        })
        history.push('/reservation')
    }

    function handleAdd(rest) {

        let cuisine = rest.categories.map(cuisine => {
            return cuisine.title
        })

        const info = {
            name: rest.name,
            cuisine: cuisine.join(', ') ,
            rating: rest.rating,
            latitude: rest.coordinates.latitude,
            longitude: rest.coordinates.longitude,
            image: rest.image_url
        }

        addFavorite(info)
        .then(json => {
            setUser(prevUser => ({...prevUser, user:{ ...prevUser.user, favorites: [...prevUser.user.favorites, json]}}))
        })
    }

    function handleDelete(rest) {
        const data = user.favorites.filter(favorite => favorite.restaurant.name === rest.name)
        delFavorite(data[0])
        const fav = user.favorites.filter(favorite => favorite.restaurant.name !== rest.name)
        setUser(prevUser => ({...prevUser, user:{ ...prevUser.user, favorites: fav}}))
    }

    return(
        <div className='topmargin'>
            <div id='link'>
            <Link to='/map'>View on Map</Link>
            </div>
            <div className='contain fifty'>
                {displayRest()}
            </div>
        </div>
    )
}