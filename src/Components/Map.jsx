import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

function Map({restaurants}) {
  
  const containerStyle = {
    height: "400px",
    width: "800px"
  }
  
  const [center, setCenter] = useState({
  lat: 37.7599,
  lng: -122.4148
  })

  useEffect(() => {
    getLocation()
  }, [restaurants]);

  const [markers, setMarkers] = useState([])

  function restMarkers() {
    return restaurants.map(restaurant => {
        const rest = restaurant.coordinates
        return <Marker position={{lat: rest.latitude, lng: rest.longitude}}></Marker>
        // return <Marker onLoad={marker => console.log(marker)} position={{lat: rest.latitude, lng: rest.longitude}}></Marker>
    });
  }

  const onMapClick = React.useCallback((e) => {
    // displayRest()
    setMarkers(() => [{
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    }])
  }, [])

  
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY
  })
  
  const mapRef = React.useRef()
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map
  }, [])
  
  if(loadError) return 'Error'
  if(!isLoaded) return 'Maps'
    
  function restMapLocation() {
    let first = restaurants[0].coordinates
    const location = {lat: first.latitude, lng: first.longitude}
    setCenter(location)
  }

  function showPosition(position) {
    setCenter({lat: position.coords.latitude, lng: position.coords.longitude})
  }

  function getLocation() {
    if(restaurants.length > 0) {
      restMapLocation()
    } else if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition)
    }
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
