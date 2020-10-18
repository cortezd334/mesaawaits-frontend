import React from 'react';
import Map from './Map'
import { Marker } from '@react-google-maps/api';

import utensils_icon from '../images/utensils_icon.png'
import { Card } from 'react-bootstrap';

import Restaurant from './Restaurant';

export default function MapView({restaurants, center, getLocation}) {
    
    function displayRest() {
        return restaurants.map(restaurant => {
            let cuisine = restaurant.categories.map(cuisine => {
                return cuisine.title
            })
            return <Card key={restaurant.id}>
                <h3>{restaurant.name}</h3>
                <br/>
                <p>{restaurant.rating} Star Rating</p>
                <p>{` ${cuisine} `}</p>
            </Card>
        })
    }

    function restMarkers() {
        return restaurants.map(restaurant => {
            
            const rest = restaurant.coordinates
            return <Marker key={restaurant.id} icon={{url: utensils_icon, scaledSize: new window.google.maps.Size(20,20)}} position={{lat: rest.latitude, lng: rest.longitude}}></Marker>
        });
      }

    return(
        <>
            {displayRest()}
            <Map restaurants={restaurants} center={center} restMarkers={restMarkers} getLocation={getLocation}/>
        </>
    )
}