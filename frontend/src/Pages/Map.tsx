import React, { useState } from 'react';
import { useLoadScript, Marker } from '@react-google-maps/api';
import MapFrame from '../Components/MapFrame';

import './Utils/constants';

import '../PageStyling/Map.css'

export default function MapPage(globals: unknown)
{
    const [snapshot, setSnapshot] = useState({lat: 0, long: 0, timestamp: 0});
    const [zoom, setZoom] = useState(10);
    

    //requirement checks
    if(process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY === "")
        throw Error("MUST HAVE ENV VARIABLE FOR GOOGLE MAPS API PUBLIC KEY");
    if(!navigator.geolocation)
    {
        console.log("geolocation not permitted");
    }

    navigator.geolocation.getCurrentPosition(position => {
            setSnapshot({
                lat:  44 || position.coords.latitude, 
                long: -80 || position.coords.longitude,
                timestamp: position.timestamp,
            });
    });

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || ""
    })

    if(!isLoaded)
        return <div>MAP PAGE IS LOADING</div>;
    

    const MOJI_WIDTH = 40;
    const MOJI_HEIGHT = 58;

    const peopleMarkers = [
        <Marker 
            position={{lat: snapshot.lat, lng: snapshot.long}}
            title="You"
            icon={{
                url: "https://preview.bitmoji.com/avatar-builder-v3/preview/body?scale=3&gender=1&style=5&rotation=7&beard=1630&brow=1541&cheek_details=1354&ear=1425&eye=1622&eyelash=2279&eye_details=-1&face_lines=1366&glasses=2441&hair=1719&hat=2555&jaw=1392&mouth=2337&nose=1460&beard_tone=8935738&blush_tone=16299718&brow_tone=13816322&eyeshadow_tone=14725305&hair_tone=4788241&hair_treatment_tone=666890&lipstick_tone=8929692&pupil_tone=11188685&skin_tone=6240025&body=1&face_proportion=4&eye_spacing=1&eye_size=0&outfit=978521",
                scaledSize: new google.maps.Size(MOJI_WIDTH, MOJI_HEIGHT),
            }} />
    ];

    return <div>
        THIS PAGE IS MAPS
        {MapFrame(
            snapshot.lat, 
            snapshot.long, 
            zoom,
            peopleMarkers,)}
    </div>;
}