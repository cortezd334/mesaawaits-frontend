import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, useLoadScript, InfoWindow } from '@react-google-maps/api';
// import utensils_icon from '../images/utensils_icon.png'

function Map({restaurants, center, restMarkers, getLocation}) {
  
  useEffect(() => {
    getLocation()
  }, []);
  //with center it keeps calling (but will show proper map w/ markers)
  //with nothing it doesn't leave geocode (useEffect call on App page) location (markers will only show if rests are in current map city)

  const containerStyle = {
    height: "400px",
    width: "800px"
  }
  
  // const [center, setCenter] = useState({
  // lat: 37.7599,
  // lng: -122.4148
  // })

  // useEffect(() => {
  //   getLocation()
  // }, [restaurants]);

  const [markers, setMarkers] = useState([])
  
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY
  })
  
  const mapRef = React.useRef()
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map
  }, [])
  
  if(loadError) return 'Error'
  if(!isLoaded) return 'Maps'
    
  // function restMapLocation() {
  //   let first = restaurants[0].coordinates
  //   const location = {lat: first.latitude, lng: first.longitude}
  //   setCenter(location)
  // }

  // function showPosition(position) {
  //   setCenter({lat: position.coords.latitude, lng: position.coords.longitude})
  // }

  // function getLocation() {
  //   if(restaurants.length > 0) {
  //     restMapLocation()
  //   } else if(navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(showPosition)
  //   }
  // }

  // const infowindow = new google.maps.InfoWindow({ content: 'hello'})

  function handleClick() {
    // return <InfoBox options={options}position={center}></InfoBox>
    // infowindow.open(map, marker)
  }

    return (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onLoad={onMapLoad}
        >
        {restMarkers()}
      </GoogleMap>
    );
}
export default React.memo(Map)
