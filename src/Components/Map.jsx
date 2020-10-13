import React, {useState} from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '600px',
    height: '600px'
  };
   
//   const center = {
//     lat: 37.7749,
//     lng: 122.4194
//   };

function Map() {

    const [map, setMap] = useState(null)
    const [center, setCenter] = useState({
      lat: 37.7749,
      lng: 122.4194
    })

    const API_KEY = process.env.REACT_APP_GOOGLE_KEY

    const onLoad = React.useCallback(function callback(map) {
      const bounds = new window.google.maps.LatLngBounds();
      map.fitBounds(bounds);
      setMap(map)
    }, [])
   
    const onUnmount = React.useCallback(function callback(map) {
      setMap(null)
    }, [])

    function getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
    
        } else {
          x.innerHTML = "Geolocation is not supported by this browser.";
        }
      }
    
    
    let x = document.getElementById("demo");
    function showPosition(position) {

    setCenter({lat: position.coords.latitude, lng: position.coords.longitude})

    let latlon = position.coords.latitude + "," + position.coords.longitude;
    
    let img_url = "https://maps.googleapis.com/maps/api/staticmap?center="+latlon+"&zoom=14&size=400x300&sensor=false&key=API_KEY";
    
    // document.getElementById("mapholder").innerHTML = "<img src='"+img_url+"'>";
    }

    return (
        <LoadScript
        googleMapsApiKey={API_KEY}
        >
        { getLocation() }
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={2}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            { /* Child components, such as markers, info windows, etc. */ }
            <></>
          </GoogleMap>
        </LoadScript>
    );
}
// export default React.memo(Map)
export default Map

// const { GoogleMap, LoadScript } = require("../../");
// const ScriptLoaded = require("../../docs/ScriptLoaded").default;

// const mapContainerStyle = {
//   height: "400px",
//   width: "800px"
// }

// const center = {
//   lat: 0,
//   lng: -180
// }

// const position = {
//   lat: 37.772,
//   lng: -122.214
// }

// const onLoad = marker => {
//   console.log('marker: ', marker)
// }

// <ScriptLoaded>
//   <GoogleMap
//     id="marker-example"
//     mapContainerStyle={mapContainerStyle}
//     zoom={2}
//     center={center}
//   >
//     <Marker
//       onLoad={onLoad}
//       position={position}
//     />
//   </GoogleMap>
// </ScriptLoaded>