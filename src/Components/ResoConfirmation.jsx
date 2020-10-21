import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default function ResoConfirmation({user, reso}) {

  console.log(reso)
    return(
        <>
            <h2>Your MesaAwaits...</h2>
            <br/>
            <p>...at {reso.restaurant.name}</p>
            <p>on {reso.date}</p>
            <p>at {reso.time}</p>
            <p>for {reso.party_size} {reso.party_size === 1 ? 'person' : 'people'} </p>
            <p>we look forward to seeing you{reso.occasion === 'false' ? '!' : ` and celebrating your ${reso.occasion}!`} </p>
            <Link to='/search'>Find More Restaurants</Link>
            <Link to='/profile'>View Profile</Link>
        </>
    )
}