import React, { useState, useEffect } from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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


export default function LoginPage(globals: unknown)
{
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
        };

return (
    <ThemeProvider theme={theme}>
        <Grid container spacing={0} rowSpacing={0} columnSpacing={0}>
            <Grid item md={6} spacing={0} rowSpacing={0} columnSpacing={0} 
                  xs={12} 
                  sx={{
                    display: { xs: "none", lg: "block" }
                  }}
            >
                <Box
                    component="img"
                    alt="Cartoon"
                    src="img/cartoon1.png" 
                    sx={{
                        width: '100%',
                        height: '100vh',
                        marginLeft: '-8px',
                        marginTop: '-8px',
                        marginBottom: '-15px',
                        backgroundColor: 'primary.main',
                        overflow: 'hidden',
                        objectFit: 'cover'
                    }}>
            </Box>




            </Grid>
            <Grid md={6}
                item xs={12} 
                sx={{
                    display: { xs: "block", lg: "block" }
                  }}>
                <Box
                sx={{
                    marginTop: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: '100 vh'
                }}>
                <Typography component="h1" variant="h5">
                    <strong>Welcome to Map Collab</strong>
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} style={{textAlign: 'center', width: '400px'}}>
                    
                    <Box sx={{textAlign: 'center'}}>
                        <TextField
                            size="small"
                            margin="normal"
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            required
                            fullWidth
                        />
                    </Box>
                
                <Box sx={{textAlign: 'center'}}>
                    <TextField
                        size="small"
                        margin="normal"
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        required
                        fullWidth
                    />
                </Box>
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    color="secondary"
                    style={{borderRadius: 50}}
                >
                    Log In
                </Button>
                <Grid container>
                    <Grid item xs>
                        <Link href="#" variant="body2" style={{color: 'black'}}>
                            Forgot password?
                        </Link>
                    </Grid>
                </Grid>
                <Box>
                    <Typography fontSize="15px">Not a member yet?</Typography>
                    <Link href="#" variant="body2" >
                        {"Sign Up"}
                    </Link>
                </Box>


                <Box
                    component="img"
                    sx={{
                        height: 50,
                        width: 50,
                        margin: 2,
                        marginTop: 5
                    }}
                    alt="Google Icon"
                    src="img/google_icon.png" 
                />

                <Box
                    component="img"
                    sx={{
                        height: 50,
                        width: 50,
                        margin: 2
                    }}
                    alt="Apple Icon"
                    src="img/apple_icon.png" 
                />

                <Box
                    component="img"
                    sx={{
                        height: 50,
                        width: 50,
                        margin: 2
                    }}
                    alt="Microsoft Icon"
                    src="img/microsoft_icon.png" 
                />





                </Box>
            </Box>
            </Grid>
        </Grid>
    </ThemeProvider>
    );
}