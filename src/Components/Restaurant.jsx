import React, {useEffect} from 'react';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import { geoSearch } from '../api';
import { Link } from 'react-router-dom'


export default function Restaurant({restaurants, setRestaurants, center, getLocation}) {

    useEffect(() => {
        loadRest()
    }, []);
    //w/ center or empty still loads SFO
    // w/ restaurants correct city but continues to make calls

    console.log(center)

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

    console.log(restaurants)
    function displayRest() {
        // if(localStorage.search) {
        //     console.log(localStorage.search.list)
        //     //localStorage can not save the object
        //     //how else do we keep SFO from pulling again? 

        //     // localStorage.search.map(restaurant => {
        //     //     let cuisine = restaurant.categories.map(cuisine => {
        //     //         return cuisine.title
        //     //     })
        //     //     return <Card key={restaurant.id}>
        //     //         <h3>{restaurant.name}</h3>
        //     //         <br/>
        //     //         <p>{restaurant.rating} Star Rating</p>
        //     //         <p>{` ${cuisine} `}</p>
        //     //     </Card>
        //     // })
        // } else {
            // return restaurants.map(restaurant => {
            //     let cuisine = restaurant.categories.map(cuisine => {
            //         return cuisine.title
            //     })
            //     return <Card key={restaurant.id} style={{ height: '18rem'}}>
            //         <Card.Img variant='left' src={restaurant.image_url} fluid />
            //         {/* <Image src={restaurant.image_url} fluid /> */}
            //             {/* <img className='img' src={restaurant.image_url}/> */}
            //         <Card.Body>
            //             <Card.Title>{restaurant.name}</Card.Title>
            //             <br/>
            //             <p>{restaurant.rating} Star Rating</p>
            //             <p>{` ${cuisine} `}</p>
            //         </Card.Body>
            //     </Card>
            // })
            return restaurants.map(restaurant => {
                let cuisine = restaurant.categories.map(cuisine => {
                    return cuisine.title
                })
                return <Card key={restaurant.id}>
                    <div className='imgCon'>
                        <img className='img' src={restaurant.image_url}/>
                    </div>
                    <div className='info'>
                        <h3>{restaurant.name}</h3>
                        <br/>
                        <p>{restaurant.rating} Star Rating</p>
                        <p>{` ${cuisine} `}</p>
                    </div>
                </Card>
            })
        // }
    }

    return(
        <>
            {/* {loadRest()} being called here causes and infinite loop*/}
            <Link to='/map'>View on Map</Link>
            {displayRest()}
        </>
    )
}