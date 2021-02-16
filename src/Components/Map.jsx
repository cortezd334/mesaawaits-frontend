import React, { useEffect, useRef } from 'react';
import { GoogleMap, useLoadScript, InfoBox } from '@react-google-maps/api';

function Map({restaurants, center, restMarkers, getLocation, selectedRest}) {

  const prevRestaurants = useRef(restaurants)
  useEffect(() => {
      if( prevRestaurants.current !== restaurants) {
      getLocation()
      }
  }, [restaurants]);

  //with center it keeps calling (but will show proper map w/ markers)
  //with nothing it doesn't leave geocode (useEffect call on App page) location (markers will only show if rests are in current map city)
  // comparing to prevRestaurants solves above comments

  const containerStyle = {
    height: "600px",
    width: "600px"
  }
  
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY
  })
  
  const mapRef = React.useRef()
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map
  }, [])
  
  if(loadError) return 'Error'
  if(!isLoaded) return 'Maps'

  const options = { closeBoxURL: '', enableEventPropagation: true };
  const onLoad = infoBox => {
    console.log('infoBox: ', infoBox)
  };

    return (
      <div className='map'>
        <GoogleMap
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
