import React from 'react';
import { useHistory } from 'react-router-dom'
import Map from './Map'
import { Marker } from '@react-google-maps/api';
import { saveRestaurant, addFavorite } from '../api';
import utensils_icon from '../images/utensils_icon.png'
import new_heart from '../images/new_heart.png'
import red_heart from '../images/red_heart.png'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

// import Restaurant from './Restaurant';

export default function MapView({restaurants, center, getLocation, userFavs, setUserFavs}) {
    
    const history = useHistory()

    function displayRest() {
        return restaurants.map(restaurant => {
            let cuisine = restaurant.categories.map(cuisine => {
                return cuisine.title
            })
            return <Card key={restaurant.id}>
                <div className='imgCon'>
                    <img className='img' src={restaurant.image_url} alt='Restaurant'/>
                </div>
                <div>
                    <h3>{restaurant.name}</h3>
                    <br/>
                    <p>{restaurant.rating} Star Rating</p>
                    <p>{` ${cuisine} `}</p>
                </div>
                <div>
                <Button variant="primary" onClick={() => clickHandler(restaurant)}>Make Reservation</Button>
                </div>
                <div>
                    {/* turnary where if restaurant belongs to favs different image  */}

                    {/* {userFavs.includes(restaurant => { restaurant.name}.name) ? 
                    <img className='icon' src={red_heart} alt='Fav Heart' onClick={() => handleAdd(restaurant)}/> : */}
                    {<img className='icon' src={new_heart} alt='New Heart' onClick={() => handleAdd(restaurant)}/>}
                </div>
            </Card>
        })
    }

    console.log(userFavs)
    function clickHandler(rest) {
        console.log(rest)

        let cuisine = rest.categories.map(cuisine => {
            return cuisine.title
        })

        const info = {
            name: rest.name,
            cuisine: {cuisine},
            rating: rest.rating,
            latitude: rest.coordinates.latitude,
            longitude: rest.coordinates.longitude,
            image: rest.image_url
        }

        saveRestaurant(info)
        .then(json => {
            localStorage.setItem('currentResId', json.id) 
            console.log(json)
            console.log(localStorage.currentResId)        
        })
        .then(console.log)
        history.push('/reservation')
    }

    function handleAdd(rest) {

        let cuisine = rest.categories.map(cuisine => {
            return cuisine.title
        })

        const info = {
            name: rest.name,
            cuisine: {cuisine},
            rating: rest.rating,
            latitude: rest.coordinates.latitude,
            longitude: rest.coordinates.longitude,
            image: rest.image_url
        }

        addFavorite(info)
        .then(json => setUserFavs(prevState => ([...prevState, json])))
    }

    function restMarkers() {
        return restaurants.map(restaurant => {
            
            const rest = restaurant.coordinates
            return <Marker key={restaurant.id} icon={{url: utensils_icon, scaledSize: new window.google.maps.Size(20,20)}} position={{lat: rest.latitude, lng: rest.longitude}}></Marker>
        });
      }

    return(
        <>
            <Map restaurants={restaurants} center={center} restMarkers={restMarkers} getLocation={getLocation}/>
            {displayRest()}
        </>
    )
}