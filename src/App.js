import React, { useEffect, useState, useRef } from 'react';
// import './css/App.css';
import MapView from './Components/MapView';
import Restaurant from './Components/Restaurant';
import Search from './Components/Search';
import Profile from './Components/Profile';
import SignUp from './Components/SignUp';
import LogIn from './Components/LogIn';
import NavBar from './Components/NavBar';
import Reso from './Components/Reso';
import ResoConfirmation from './Components/ResoConfirmation';
import Favorite from './Components/Favorite';
import Reservation from './Components/Reservation';
// import { SearchProvider } from './Components/searchContext';
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import { persist, getFav } from './api';




function App() {

  const [restaurants, setRestaurants] = useState([])
  const [reso, setReso] = useState({})
  const [user, setUser] = useState({
    user:{favorites:[]}
  })

  console.log(user)

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
  //will run again when the dependency changes: maybe put user in []
  
  useEffect(() => {
    getLocation()
  }, []);
  //empty it only calls once
  //center it keeps making calls


    function restMapLocation() {
    let first = restaurants[0].coordinates
    const location = {lat: first.latitude, lng: first.longitude}
    setCenter(location)
  }

  function showPosition(position) {
    setCenter({lat: position.coords.latitude, lng: position.coords.longitude})
  }

  // function getLocation() {
  //   if(navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(showPosition)
  //   }
  // }
  function getLocation() {
    if(restaurants.length > 0) {
      restMapLocation()
    } else if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition)
    }
  }

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
    // history.push('/')
    setUser({})
    localStorage.clear()
  }

  return (
    <>
    {/* {getLocation()} being called here causes an infinite loop*/}
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

      </Switch>
    </Router>
    {/* <SearchProvider value='ComponentWeWantShare'> */}

    {/* </SearchProvider> */}
    </>
  );
}

export default App;
