import React from 'react';

function Profile({user}) {
    console.log(user)
    console.log(user.user)
    // console.log(user.user.username)
    console.log(user.username)
    console.log(user.id)
    return(
        <div>
            <h1>Welcome {user.username}!</h1>
        </div>
    )
}

export default Profile