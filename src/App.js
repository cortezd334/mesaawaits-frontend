import React, { useEffect, useState } from 'react';
import MapView from './Components/MapView';
import Restaurant from './Components/Restaurant';
import LandingPage from './Components/LandingPage';
import Search from './Components/Search';
import Profile from './Components/Profile';
import SignUp from './Components/SignUp';
import LogIn from './Components/LogIn';
import Nav from './Components/Nav';
import Reso from './Components/Reso';
import ResoConfirmation from './Components/ResoConfirmation';
import Favorite from './Components/Favorite';
import Reservation from './Components/Reservation';
import Update from './Components/Update';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { persist } from './api';

function App() {

  const [restaurants, setRestaurants] = useState([])
  const [reso, setReso] = useState({})
  const [user, setUser] = useState({
    user:{favorites:[]}
  })

  const [center, setCenter] = useState({
    lat: 37.7599,
    lng: -122.4148
  })
  
  useEffect(() => {
    if(localStorage.token){
      persist()
      .then(json => handleAuthResponse(json))
    }
  }, [])
  
  useEffect(() => {
    console.log(user)
    if(!!user.token) {
    getLocation()
    }
  }, [user]);


  function restMapLocation() {
  let first = restaurants[0].coordinates
  const location = {lat: first.latitude, lng: first.longitude}
  setCenter(location)
  }

  function showPosition(position) {
    setCenter({lat: position.coords.latitude, lng: position.coords.longitude})
  }

  function getLocation() {
    console.log(restaurants)
    if(restaurants.length > 0) {
      restMapLocation()
    } else if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition)
    }
  }

  console.log(restaurants)


  const handleAuthResponse = (resp) => {
    if(resp.user){
        localStorage.token = resp.token
        localStorage.userId = resp.user.id
        setUser({user: resp.user, token: resp.token})
    } else {
      alert(resp.error)
    }
  }

  const logOut = () => {
    setUser({
      user:{favorites:[]}
    })
    setRestaurants([])
    setCenter({
      lat: 37.7599,
      lng: -122.4148
    })
    localStorage.clear()
  }

  return (
    <div className='app'>
    <Router>
      <Nav user={user} logOut={logOut} setRestaurants={setRestaurants}/>
      <Switch>
        <Route exact path='/'>
          <LandingPage setUser={setUser}/>
        </Route> 

        <Route path='/signup'>
          <SignUp setUser={setUser}/>
        </Route> 

        <Route path='/login'>
          <LogIn setUser={setUser} user={user} handleAuthResp={handleAuthResponse}/>
        </Route> 

        <Route path='/profile'>
          <Profile {...user} setUser={setUser}/>
        </Route> 

        <Route path='/restaurants'>
          <Restaurant restaurants={restaurants} setRestaurants={setRestaurants} center={center} getLocation={getLocation} {...user} setUser={setUser}/>
        </Route> 

        <Route path='/map'>
          <MapView restaurants={restaurants} center={center} getLocation={getLocation} {...user} setUser={setUser}/>
        </Route> 

        <Route path='/reservation'>
          <Reservation setUser={setUser} user={user} setReso={setReso} />
        </Route> 

        <Route path='/confirmation'>
          <ResoConfirmation {...user} reso={reso}/>
        </Route> 

        <Route path='/search'>
          <Search restaurants={restaurants} setRestaurants={setRestaurants}/>
        </Route> 

        <Route path='/myreservations'>
          <Reso {...user} setUser={setUser}/>
        </Route> 

        <Route path='/favorites'>
          <Favorite {...user} setUser={setUser}/>
        </Route> 

        <Route path='/update'>
          <Update {...user} setUser={setUser}/>
        </Route>

      </Switch>
    </Router>
    </div>
  );
}

export default App;


//restaurants redirect to map after search