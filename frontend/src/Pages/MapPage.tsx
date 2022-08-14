import React, { useState, useEffect } from 'react';
import { useLoadScript, Marker } from '@react-google-maps/api';
import MapFrame from '../Components/MapFrame';

import './Utils/constants';

import '../PageStyling/Map.css'
import Globals from './Utils/globalstate';
import LocationHandler from '../Handlers/LocationHandler';

interface ILocation
{
    name: string;
    lat: number;
    long: number;
    mogiUrl: string;
}

const SEND_LOCATION_INTERVAL = 60000;
const MOJI_WIDTH = 40;
const MOJI_HEIGHT = 58;

export default function MapPage(globals: unknown)
{
    const [snapshot, setSnapshot] = useState({lat: 0, long: 0, timestamp: 0});
    const [zoom, setZoom] = useState(10);
    const [otherLocations, setOtherLocations] = useState([] as ILocation[]);
    
    //requirement checks
    if(process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY === "")
        throw Error("MUST HAVE ENV VARIABLE FOR GOOGLE MAPS API PUBLIC KEY");

    if(!navigator.geolocation)
    {
        console.log("geolocation not permitted");
    }
    
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const latCoord: number = 44 || position.coords.latitude;
            const longCoord: number = -80 || position.coords.longitude;
            setSnapshot({
                lat:  latCoord, 
                long: longCoord,
                timestamp: position.timestamp,
            });

            LocationHandler.sendLocation(latCoord+"", longCoord+"");

            LocationHandler.getLocations(snapshot.lat+"", snapshot.long+"").then(response => {
                }); //append self location 
        });
    }, []);

    // setInterval(() => {
    //     // LocationHandler.sendLocation(snapshot.lat+"", snapshot.long+"");
    //     LocationHandler.getLocations(snapshot.lat+"", snapshot.long+"").then(response => {
    //         console.log("ewfawefawefawesfawefeawf")
    //         console.log(response)
    //     }); //append self location 
    // }, SEND_LOCATION_INTERVAL);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || ""
    })

    if(!isLoaded)
        return <div>MAP PAGE IS LOADING</div>;

    const peopleMarkers: JSX.Element[] = otherLocations.map(location => <Marker 
            position={{lat: location.lat, lng: location.long}}
            title={location.name} //user's name, not location's name
            icon={{
                url: location.mogiUrl,
                scaledSize: new google.maps.Size(MOJI_WIDTH, MOJI_HEIGHT),
            }} />);

    return <div>
        THIS PAGE IS MAPS
        {MapFrame(
            snapshot.lat, 
            snapshot.long, 
            zoom,
            peopleMarkers,)}
    </div>;
}