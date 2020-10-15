import React, { useEffect, useState } from 'react';
// import './css/App.css';
import Map from './Components/Map';
import Search from './Components/Search';
import Profile from './Components/Profile';
// import { SearchProvider } from './Components/searchContext';
import SignUp from './Components/SignUp';
import LogIn from './Components/LogIn';
import NavBar from './Components/NavBar';
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import Reservation from './Components/Reservation';
import { persist } from './api';




function App() {

  const history = useHistory()

  useEffect(() => {
    if(localStorage.token){
      persist()
      .then(json => handleAuthResponse(json))
    }
  }, [])
  //will run again when the dependency changes: maybe put user in []

  const [restaurants, setRestaurants] = useState([])
  const [user, setUser] = useState({
    user:{}
  })
  const [center, setCenter] = useState({
    lat: 37.7599,
    lng: -122.4148
  })

  const handleAuthResponse = (resp) => {
    if(resp.user){
        localStorage.token = resp.token
        setUser({user: resp.user, token: resp.token})
    } else {
      alert(resp.error)
    }
  }

  const logOut = () => {
    localStorage.clear()
    history.push('/')
  }

  console.log(restaurants)
  return (
    <>
    <Router>
      <NavBar user={user} logOut={logOut}/>
      <Switch>
        <Route path='/signup'>
          <SignUp setUser={setUser}/>
        </Route> 

        <Route path='/login'>
          <LogIn setUser={setUser} user={user} handleAuthResp={handleAuthResponse}/>
        </Route> 

        <Route path='/profile'>
          <Profile {...user}/>
        </Route> 

        <Route path='/map'>
          <Map center={center} setCenter={setCenter}/>
        </Route> 

        <Route path='/reservation'>
          <Reservation setUser={setUser} user={user}/>
        </Route> 

        <Route path='/search'>
          <Search restaurants={restaurants} setRestaurants={setRestaurants} setCenter={setCenter}/>
        </Route> 

        <Route path='/map'>
          <Map />
        </Route> 

      </Switch>
    </Router>
    {/* <SearchProvider value='ComponentWeWantShare'> */}

    {/* </SearchProvider> */}
    </>
  );
}

export default App;
