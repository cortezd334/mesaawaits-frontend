import React, { useEffect, useState } from 'react';
import './App.css';
import Map from './Components/Map';
import Form from './Components/Form';
import Profile from './Components/Profile';
import { SearchProvider } from './Components/searchContext';
import SignUp from './Components/SignUp';
import LogIn from './Components/LogIn';
import { BrowserRouter as Router, Switch, Route, Link, NavLink, useHistory } from "react-router-dom";
import Reservation from './Components/Reservation';
import { persist } from './api';
// import { Route, Switch, Link, NavLink } from 'react-router-dom'



function App() {

  const history = useHistory()

  useEffect(() => {
    if(localStorage.token){
      persist()
      .then(json => handleAuthResponse(json))
    }
  }, [])
  //will run again when the dependency changes: maybe put user in []

  useEffect(() => {

  })

  const [user, setUser] = useState({
    id: 0,
    username: '',
    token: ''
  })
  //UserSerializer not set, may have to change so more info is shown

  const handleAuthResponse = (resp) => {
    if(resp.user){
        localStorage.token = resp.token
        // setUser({user: {id: resp.user.id, username: resp.user.username, token: resp.token}}, () => {history.push('/profile')})
        //use state doesnt support a 2nd callback, To execute a side effect after rendering, declare it in the component body with useEffect().
        setUser({id: resp.user.id, username: resp.user.username, token: resp.token})
        // history.push('/profile')
    } else {
      alert(resp.error)
    }
  }

  console.log(user)

  return (
    <>
    <Router>
      <header>
        <NavLink to='/' exact>Home</NavLink>
        <NavLink to='/signup'> Create An Account</NavLink>
        <NavLink to='/login' >Log In</NavLink>
        <NavLink to='/profile' >Profile</NavLink>
        <NavLink to='/restaurants' >Restaurants</NavLink>
        <NavLink to='/makereservation' >Make A Reservation</NavLink>
      </header>
      <Switch>
        {/* <Route exact path='/' component={Home}/> */}

        <Route path='/search'>
          <Form/>
        </Route> 

        <Route path='/signup'>
          <SignUp setUser={setUser}/>
        </Route> 

        <Route path='/login'>
          <LogIn setUser={setUser} user={user} handleAuthResp={handleAuthResponse}/>
        </Route> 

        <Route path='/profile'>
          {/* <Profile user={user} setUser={setUser} /> */}
          {/* {user && ( <Profile {...user} setUser={setUser}/> )} */}
          <Profile {...user} setUser={setUser}/>
        </Route> 

        <Route path='/map'>
          <Map/>
        </Route> 

        <Route path='/makereservation'>
          <Reservation setUser={setUser} user={user}/>
        </Route> 

      </Switch>
    </Router>
    {/* <SearchProvider value='ComponentWeWantShare'> */}

    {/* </SearchProvider> */}
    </>
  );
}

export default App;
