import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, Marker, useLoadScript, InfoWindow, InfoBox, LoadScript } from '@react-google-maps/api';
// import utensils_icon from '../images/utensils_icon.png'

function Map({restaurants, center, restMarkers, getLocation, selectedRest}) {
  
  // useEffect(() => {
  //   getLocation()
  // }, []);

  const prevRestaurants = useRef(restaurants)
  useEffect(() => {
      console.log(prevRestaurants.current)
      console.log(restaurants)
      if( prevRestaurants.current !== restaurants) {
      getLocation()
      }
  }, [restaurants]);

  //with center it keeps calling (but will show proper map w/ markers)
  //with nothing it doesn't leave geocode (useEffect call on App page) location (markers will only show if rests are in current map city)

  const containerStyle = {
    height: "750px",
    width: "600px"
  }
  
  // const [center, setCenter] = useState({
  // lat: 37.7599,
  // lng: -122.4148
  // })

  // useEffect(() => {
  //   getLocation()
  // }, [restaurants]);

  // const [markers, setMarkers] = useState([])
  
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

  const options = { closeBoxURL: '', enableEventPropagation: true };
  const onLoad = infoBox => {
    console.log('infoBox: ', infoBox)
  };

    return (
      <div className='right'>
        <GoogleMap
          // id='InfoBox-example'
          
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
          onLoad={onMapLoad}
          >
          {restMarkers()}
          {selectedRest &&
            <InfoBox
              onLoad={onLoad}
              options={options}
              position={{lat: selectedRest.coordinates.latitude, lng: selectedRest.coordinates.longitude}}
            >
              <div style={{ backgroundColor: '#99DFE3', opacity: 0.75, padding:12 }}>
                <div style={{ fontSize: 14, fontColor: `#08233B` }}>
                  {selectedRest.name}
                </div>
              </div>
            </InfoBox>}
        </GoogleMap>
        </div>
    );
}
export default React.memo(Map)
