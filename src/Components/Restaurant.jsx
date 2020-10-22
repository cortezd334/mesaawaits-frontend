import React, {useEffect, useRef} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import new_heart from '../images/new_heart.png'
import red_heart from '../images/red_heart.png'
import { geoSearch, saveRestaurant, addFavorite, delFavorite } from '../api';
import { Link, useHistory } from 'react-router-dom'


export default function Restaurant({restaurants, setRestaurants, center, user, setUser}) {

    const history = useHistory()
    
    const prevCenter = useRef(center)
    useEffect(() => {
        console.log(prevCenter.current)
        console.log(center)
        if( prevCenter.current !== center) {
        loadRest()
        }
    }, [center]);
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
                    <div>
                        <Button variant="primary" onClick={() => clickHandler(restaurant)}>Make Reservation</Button>
                    </div>
                    <div>
                    {user.favorites.map(favorite => 
                        favorite.restaurant.name).includes(restaurant.name) ? 
                    <img className='icon' src={red_heart} alt='Fav Heart' onClick={() => handleDelete(restaurant)}/> :
                    <img className='icon' src={new_heart} alt='New Heart' onClick={() => handleAdd(restaurant)}/>}
                    </div>
                </Card>
            })
        // }
    }

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
        <>
            {/* {loadRest()} being called here causes and infinite loop*/}
            <Link to='/map'>View on Map</Link>
            {displayRest()}
        </>
    )
}