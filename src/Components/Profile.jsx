import React from 'react';

function Profile({user}) {
    return(
        <div>
            <h1>Welcome {user.username}!</h1>
        </div>
    )
}

export default Profile