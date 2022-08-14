import React, { useState, useEffect } from 'react';
import { useLoadScript, Marker } from '@react-google-maps/api';
import MapFrame from '../Components/MapFrame';

import './Utils/constants';

import '../PageStyling/Map.css'
import Globals from './Utils/globalstate';
import LocationHandler from '../Handlers/LocationHandler';

//MUI Elements
import AppBar from '@mui/material/AppBar';
import { CssBaseline } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';

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
                    console.log(response);
                    const mapDatas:ILocation[] = response.map(locData => ({
                        name: "A Person",
                        lat: locData['location']['coordinates'][0],
                        long: locData['location']['coordinates'][1],
                        mogiUrl: locData['user']['mogiUrl'],
                    }));
                    setOtherLocations(mapDatas);
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

<Grid container spacing={0} rowSpacing={0} columnSpacing={0}
            
        
        
            >
                <Grid item xs={6} md={6} spacing={0} rowSpacing={0} columnSpacing={0}>
                    <Typography
                    sx={{
                        fontWeight: 'bold',
                        color: '#892FFC',
                        paddingTop: '10px',
                        paddingLeft: '10px',
                        width: 'fit-content',
    
                    }}
                    
                    >Map Hustlers
                    </Typography>
                </Grid>
    
                <Grid item xs={6} md={6} spacing={0} rowSpacing={0} columnSpacing={0} sx={{textAlign: 'right'}}>
                
                    <Button 
                        href="/profile"
                        variant="contained"
                        disableElevation
    
                        sx={{ 
                            marginTop: '5px',
                            backgroundColor: 'white',
                            color: '#892FFC',
                            '&:hover':{
                                backgroundColor: '#892FFC',
                                color: 'white'
                            }
                        }}
                    >
                        Profile
                    </Button>
    
                    <Button 
                        href="/"
                        variant="contained"
                        disableElevation
                        sx={{ marginTop: '5px',
                            backgroundColor: 'white',
                            color: '#892FFC',
                            '&:hover':{
                                backgroundColor: '#892FFC',
                                color: 'white'
                            }
                        }}
                    >
                        Classes
                    </Button>
    
                    <Button 
                        href="/finder"
                        variant="contained"
                        sx={{ 
                            marginTop: '5px',
                            backgroundColor: '#892FFC',
                            '&:hover':{
                                backgroundColor: '#FB4F05'
                            }
                        }}
                    >
                        Find People
                    </Button>
                </Grid>
            </Grid>
    
        THIS PAGE IS MAPS
        {MapFrame(
            snapshot.lat, 
            snapshot.long, 
            zoom,
            peopleMarkers,)}
    </div>;
}