import React, { useEffect, useState } from 'react';
// import './css/App.css';
import Map from './Components/Map';
import Form from './Components/Form';
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

  useEffect(() => {

  })

  const [user, setUser] = useState(false)
  // const [user, setUser] = useState({
  //   id: 0,
  //   username: '',
  //   token: ''
  // })
  //UserSerializer not set, may have to change so more info is shown

  const handleAuthResponse = (resp) => {
    if(resp.user){
        localStorage.token = resp.token
        // setUser({user: {id: resp.user.id, username: resp.user.username}, token: resp.token})
        setUser({user: resp.user, token: resp.token})
        // setUser(resp)
        console.log(resp)
    } else {
      alert(resp.error)
    }
  }

  const logOut = () => {
    localStorage.clear()
    history.push('/')
  }

  return (
    <>
    <Router>
      <NavBar user={user} logOut={logOut}/>
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
          <Profile user={user} setUser={setUser} />
          {/* {user && ( <Profile {...user} setUser={setUser}/> )} */}
          {/* <Profile {...user} setUser={setUser}/> */}
        </Route> 

        <Route path='/map'>
          <Map/>
        </Route> 

        <Route path='/makereservation'>
          <Reservation setUser={setUser} user={user}/>
        </Route> 

        <Route path='/search'>
          <Form />
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
