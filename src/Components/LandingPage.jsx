import React from 'react';
import { Link } from 'react-router-dom';
import waiter from '../images/waiter.png';
import Button from 'react-bootstrap/Button';

export default function LandingPage(){
    return(
        <div className='landing'>
            <img src={waiter} alt='logo'/>
            <Link to='/login'>
            <Button variant='secondary'>Book Your Next Dining Experience</Button><br/>
            </Link>
            <Link to='signup'>Create an account</Link>
            <p>Your preferred page to book all your restaurant reservations</p>
        </div>
    )
}