import React, { useEffect, useState } from 'react'
import { Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import "leaflet/dist/leaflet.css"
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import * as ELG from 'esri-leaflet-geocoder'

let DefaulIcon = L.icon ({
    iconUrl : icon, 
    shadowUrl: iconShadow
})
L.Marker.prototype.options.icon = DefaulIcon


const GeoCoderMarker = ({address}) => {

    const map = useMap()
    const [position, setPosition] = useState([60, 19])

    useEffect(() => {
        const fetchCoords = async () => {
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
            );
            const data = await response.json();
            if (data?.length > 0) {
              const { lat, lon } = data[0];
              setPosition([parseFloat(lat), parseFloat(lon)]);
              map.flyTo([parseFloat(lat), parseFloat(lon)], 13);
            }
          } catch (error) {
            console.error("Geocoding error:", error);
          }
        };
        fetchCoords();
      }, [address, map]);

  return (
    <Marker position={position} icon={DefaulIcon}>
        <Popup/>
    </Marker>
  )
}

export default GeoCoderMarker