import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container'
import AppBar from '@mui/material/AppBar'
import { Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'; // Grid version 1
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2
import Button from '@mui/material/Button'

let theme = createTheme({
    palette: {
      primary: {
        main: '#892FFC',
      },
      secondary: {
        main: '#FB4F05',
      },
    },
  });

export default function ProfilePage(globals: unknown)
{
    function buttonHover(){
        console.log("test");
    }





return (
    <ThemeProvider theme={theme}>
        <AppBar position="static" elevation={0} style={{backgroundColor: 'white', height: '60px', margin: 0}}>
            <Container maxWidth="xl" >

                <Typography
                    style={{position: 'absolute', left: 20, top: 20, fontWeight: 'bold', color: '#892FFC', fontSize: '30px'}}>
                    
                    Map Collab
                </Typography>

                <Typography
                    
                    style={{position: 'absolute', right: 20, top: 20, display: 'inline-block', color: '#892FFC', marginTop: 5, marginRight: 20}}>
                    
                    <Typography 
                        style={{display: 'inline-block', marginLeft: 10, marginRight: 10, backgroundColor: '#892FFC', color: 'white', padding: '10px', borderRadius: '20px'}}
                        sx={{
                            '&:hover':{
                                color: 'red',
                                cursor: 'pointer'
                            }
                        }}
>
                        Profile
                    
                    </Typography>

                    <Typography 
                        style={{display: 'inline-block', marginLeft: 20, marginRight: 10}}
                        sx={{
                            '&:hover':{
                                color: 'red',
                                cursor: 'pointer'
                            }
                        }}
>
                        Classes
                    
                    </Typography>

                    <Typography 
                        style={{display: 'inline-block', marginLeft: 20, marginRight: 10}}
                        sx={{
                            '&:hover':{
                                color: 'red',
                                cursor: 'pointer'
                            }
                        }}
>
                        Find People
                    
                    </Typography>
                </Typography>
            </Container>
        </AppBar>

        <Container
            maxWidth="xl"
            style={{height: '300px', textAlign: 'center', backgroundColor: '#F8F8F8', width: '100%'}}>
            <Box
                component="img"
                sx={{
                    height: 200,
                    width: 200,
                    margin: 2,
                    marginTop: 5,
                    borderRadius: 10
                }}
                alt="Microsoft Icon"
                src="img/no_pfp.png" 
            />

            <Typography
                style={{fontSize: '30px', fontWeight: 'bold'}}
            >
                Tony Smith
            </Typography>

            <Typography 
                style={{borderBottom:'3px solid #892FFC', width: 'fit-content', margin: 'auto'}}
            >
                Edit Profile
            </Typography>
        </Container>

        <Grid 
            container spacing={1}
            style={{textAlign:"center", marginTop:"30px", }}>
            <Grid item xs={12} md={4} lg={4}>
                <Box
                    component="img"
                    sx={{
                        height: 200,
                        width: 200,
                        margin: 2,
                        marginTop: 5,
                        borderRadius: 10
                    }}
                    alt="Microsoft Icon"
                    src="img/no_pfp1.jpg" 
                />

                <Typography>
                    Name  
                </Typography>
                
            </Grid>

            <Grid item xs={12} md={4} lg={4}>
            <Box
                component="img"
                sx={{
                    height: 200,
                    width: 200,
                    margin: 2,
                    marginTop: 5,
                    borderRadius: 10
                }}
                alt="Microsoft Icon"
                src="img/no_pfp1.jpg" 
            />

            <Typography>
                Name  
            </Typography>
                
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
            <Box
                component="img"
                sx={{
                    height: 200,
                    width: 200,
                    margin: 2,
                    marginTop: 5,
                    borderRadius: 10
                }}
                alt="Microsoft Icon"
                src="img/no_pfp1.jpg" 
            />

            <Typography>
                Name  
            </Typography>
                
            </Grid>
        </Grid>


    </ThemeProvider>


)
}