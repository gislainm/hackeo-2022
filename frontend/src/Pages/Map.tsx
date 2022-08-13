import React from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

import '../PageStyling/Map.css'

export default function MapPage(globals: unknown)
{
    console.log(process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY)
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || ""
    })

    if(!isLoaded)
        return <div>MAP PAGE IS LOADING</div>;
     
    return <div>
        THIS PAGE IS MAPS
        <MapFrame />
    </div>;
}

function MapFrame()
{
    return <GoogleMap 
        zoom={10} 
        center={{ lat: 44, lng: -80 }}
        mapContainerClassName="map-container">
            {}
        </GoogleMap>
}