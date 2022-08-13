import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

const DEFAULT_ZOOM: number = 10;
const DEFAULT_LAT: number = -44;
const DEFAULT_LONG: number = -87;


export default function MapFrame(
    lat: number, 
    long: number, 
    zoom: number,
    markers: JSX.Element[],
    zoomCallback?: ()=>void) : JSX.Element
{
    return <GoogleMap 
        zoom={zoom} 
        center={{ lat: lat, lng: long }}
        mapContainerClassName="map-container"
        onZoomChanged={ zoomCallback }>
            {markers}
        </GoogleMap>
}