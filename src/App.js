import React, { useEffect } from 'react';
import './App.css';
import Map from './Components/Map';
import Form from './Components/Form';
import { SearchProvider } from './Components/searchContext';
import SignUp from './Components/SignUp';
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from "react-router-dom";
// import { Route, Switch, Link, NavLink } from 'react-router-dom'



function App() {

  // useEffect(() => {
  //   search()
  // })
  //would this allow for yelp to run once page is loaded?
  return (
    <>
    <Router>
      <header>
        <NavLink to='/' exact>Home</NavLink>
        <NavLink to='/signup'> Create An Account</NavLink>
        <NavLink to='/login' >Log In</NavLink>
        <NavLink to='/profile' >Profile</NavLink>
        <NavLink to='/restaurants' >Restaurants</NavLink>
        <NavLink to='/reservations' >Make A Reservation</NavLink>
      </header>
      <Switch>
        {/* <Route exact path='/' component={Home}/> */}

        <Route path='/search'>
          <Form/>
        </Route> 

        <Route path='/signup'>
          <SignUp/>
        </Route> 

        {/* <Route path='/login'>
          <LogIn/>
        </Route>  */}

        <Route path='/map'>
          <Map/>
        </Route> 
      </Switch>
    </Router>
    {/* <SearchProvider value='ComponentWeWantShare'> */}

    {/* </SearchProvider> */}
    </>
  );
}

export default App;
