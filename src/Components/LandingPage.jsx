import React from 'react';
import { Link } from 'react-router-dom';
import waiter from '../images/waiter.png';
import Button from 'react-bootstrap/Button';

export default function LandingPage(){
    return(
        <div className='landing'>
            <img className='guy' src={waiter} alt='logo'/>
            <h5 className='mesa'>Mesa</h5>
            <Link to='/login'>
            <Button className='btright' variant='secondary'>Book Your Next Dining Experience</Button><br/>
            </Link>
            <Link to='signup'>Create an account</Link>
            <p>Your preferred page to book all your restaurant reservations</p>
        </div>
    )
}