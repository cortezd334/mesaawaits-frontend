import React from 'react'
import { NavLink } from "react-router-dom";

export default function NavBar({user, logOut}) {
    return(
        <div className='navbar'>
            <NavLink className='logo' to='/' exact>Logo Will Go Here</NavLink>
            <NavLink className='item position' to='/search' >Search</NavLink>
            <NavLink className='item position' to='/restaurants' >Restaurants</NavLink>
            <NavLink className='item position' to='/reservation' >Make A Reservation</NavLink>
            {Object.keys(user).length > 1 ? (
                <>
                    <NavLink className='item position' to='/profile' >Profile</NavLink>
                    <NavLink className='item position' to='/' onClick={logOut}>Log Out</NavLink>
                </>
                ) : (
                <>
                    <NavLink className='item position' to='/signup'> Create An Account</NavLink>
                    <NavLink className='item position' to='/login' >Log In</NavLink>
                </>)
            }
        </div>
    )
}