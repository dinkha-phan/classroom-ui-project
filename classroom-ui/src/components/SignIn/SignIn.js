import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GoogleLogin from 'react-google-login';
import { useLocalContext } from '../../context/context';
import axios from 'axios';
import { parseJwt, setAccessToken, setRefreshToken, urlSignIn, getUrlLoginGG } from '../../services/app.service';
function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function SignIn() {
    const { setLoggedInUser, setLoggedInMail } = useLocalContext();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        const recipeUrl = urlSignIn;
        const postBody = {
            username: data.get('email'),
            password: data.get('password'),
        };
        const requestMetadata = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postBody)
        };

        fetch(recipeUrl, requestMetadata)
            .then(res => res.json())
            .then((result) => {
                console.log(result);


                const token = result.token;
                setAccessToken(result.token);
                const userData = parseJwt(token);

                console.log(token, userData);

                setLoggedInUser(userData);
                setLoggedInMail(userData.email);

                //TODO: save AT and RT to local storage 
                
            });

    };
    const responseSucessGoogle = (response) => {
        console.log(response);
        const url = getUrlLoginGG();
        const postData ={
            data: response.profileObj
        }
        axios.post(url, postData).then(respons => {
            console.log("Google login success", respons);
            const token = respons.data.token;
                setAccessToken(token);
                const userData = parseJwt(token);

                console.log(token, userData);

                setLoggedInUser(userData);
                setLoggedInMail(userData.email);

        })
    }
    const responseErrorGoogle = (response) => {
        console.log(response);
    }


    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center" }}>
                            <div style={{ display: "flex", justifyContent: "space-around", marginBottom: 15 }}>
                                <GoogleLogin
                                    clientId="241758761089-mhhbbvca0eh6nh60sko4td8tp0iqe6r7.apps.googleusercontent.com"
                                    buttonText="Login with Google"
                                    onSuccess={responseSucessGoogle}
                                    onFailure={responseErrorGoogle}
                                    cookiePolicy={'single_host_origin'}
                                    // sx={{ textAlign: "center" }}
                                    style={{ alignItems: "center", textAlign: "center" }}
                                />
                            </div>

                            <Link href="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </div>

                    </Box>
                </Box>
                <Copyright sx={{ mt: 2, mb: 4 }} />
            </Container>
        </ThemeProvider >
    );
}