import {useEffect, useState, useRef} from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import "leaflet/dist/leaflet.css"

export default function Map({position}){
    let markerRef = useRef(null);
    useEffect(()=>{
        if(markerRef.current && position){
            markerRef.current.setLatLng(position);
        }
    },[position]);
    if ("geolocation" in navigator) {
        // Geolocation is available
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            console.log(`Your position is : ${latitude} ${longitude}`);
          },
          (error) => {
            console.log("Error getting location:", error.message);
          }
        );
      } else {
        // Geolocation is not available
        console.error("Geolocation is not supported by your browser.");
      }

    return(
        <div>
            <h3>Map</h3>
            <MapContainer style={{height:"500px"}} center={position} zoom={15} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href=\"https://www.maptiler.com/copyright/\" target=\"_blank\">&copy; MapTiler</a> <a href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\">&copy; OpenStreetMap contributors</a> contributors'
                    url="http://192.168.0.106:8080/styles/basic-preview/{z}/{x}/{y}.png"
                />
                {position && <Marker ref={markerRef} position={position}/>}
            </MapContainer>
        </div>
    )
}