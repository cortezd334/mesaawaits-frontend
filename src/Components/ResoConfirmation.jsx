import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import moment from 'moment';
import 'moment-timezone';

export default function ResoConfirmation({user, reso}) {

  console.log(reso)
    // const time = moment(reso.time)
    // console.log(moment.utcOffset())
    return(
        <>
            <h2>Your MesaAwaits...</h2>
            <br/>
            <p>...at {reso.restaurant.name}</p>
            <p>on {moment(reso.date).format('dddd[,] ll')}</p>
            <p>at {moment(reso.time).format('LT')}</p>
            {/* <p>at {moment('21:00:00').format('LT')}</p> */}
            {/* <p>at {time.tz('America/Los_Angeles').format('LT')}</p> */}
            <p>for {reso.party_size} {reso.party_size === 1 ? 'person' : 'people'} </p>
            <p>we look forward to seeing you{reso.occasion === 'false' ? '!' : ` and celebrating your ${reso.occasion}!`} </p>
            <Link to='/search'>Find More Restaurants</Link>
            <Link to='/profile'>View Profile</Link>
        </>
    )
}