import React from 'react';
import { Link } from 'react-router-dom';


function Profile({user}) {

    return(
        <div className='profile'>
            <h2 className='fancy'>Welcome {user.username}!</h2>
            <div className='proflinks acards'>
                <h3>What Would you like to do?</h3>
                <Link to='/myreservations' className='prl'>View Upcoming Reservations</Link>
                <Link to='/favorites' className='prl'>View Favorite Restaurants</Link>
                <Link to='/update' className='prl'>Update Profile</Link>
            </div>
        </div>
    )
}

export default Profile