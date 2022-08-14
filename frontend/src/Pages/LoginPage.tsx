import React, { useState, useEffect } from 'react';

// import { Grid, Button } from '@mui/material';
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
import LoginHandler from '../Handlers/LoginHandler';
import { Navigate } from 'react-router-dom';

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
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isAuthenticated, setAuthentication] = useState(false);
    const [firstAttempt, setFirstAttempt] = useState(true);


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    if(isAuthenticated)
        return <Navigate to="/home" />;

return (
    <ThemeProvider theme={theme}>
        <Grid container spacing={0} rowSpacing={0} columnSpacing={0}>
            <Grid item xs={12} md={6} spacing={0} rowSpacing={0} columnSpacing={0}>
                <Box
                sx={{
                    width: '100%',
                    height: '100vh',
                    marginLeft: '-8px',
                    marginTop: '-8px',
                    backgroundColor: 'primary.main',
                    overflow: 'hidden',
                    paddingBottom: '10px'
                }}>

                <Box
                    component="img"
                    sx={{
                        height: 150,
                        width: 150,
                        margin: 2
                    }}
                    alt="Microsoft Icon"
                    src="img/cartoon_img/half_moon.png" 
                />



                </Box>
            </Grid>
            <Grid item xs={12} md={6}>
                <Box
                sx={{
                    marginTop: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    border: '1px solid red',
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
                            value={username}
                            onChange={e => setUsername(e.target.value)}
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
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </Box>
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                />
                {!firstAttempt && !isAuthenticated ? "Login failed, please try again" : undefined}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    color="secondary"
                    style={{borderRadius: 50}}
                    onClick={e => {
                        setFirstAttempt(false);
                        LoginHandler.attemptLogin(username, password).then(response => {
                            console.log("afwefg",response)
                            if(response)
                                setAuthentication(response);
                        });
                    }}
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