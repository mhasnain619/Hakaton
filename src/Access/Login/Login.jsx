import React, { useState } from "react";
import { Grid, TextField, Button, Checkbox, FormControlLabel, Typography, Box, InputAdornment, IconButton, Alert, Snackbar, CircularProgress } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db } from "../../FirebaseConfiq";
import { useNavigate } from "react-router-dom";
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import loginImage from '../../assets/signupBgRemove.png';
import waveImg from '../../assets/wave.png';
import './Login.css'
import Input from "../../Components/Input/Input";
import { doc, getDoc } from "firebase/firestore";

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [userLoginData, setUserLoginData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate();

    const userLogedIn = async () => {
        setIsLoading(true);
        let validationErrors = {};

        if (!userLoginData.email) validationErrors.email = "Please enter your email.";
        if (!userLoginData.password) validationErrors.password = "Please enter your password.";

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors); // Ensure errors are set correctly
            setIsLoading(false);
            return; // Stop execution if there are errors
        }

        try {
            const userCredential = await signInWithEmailAndPassword(auth, userLoginData.email, userLoginData.password);
            const user = userCredential.user;
            localStorage.setItem("uid", user.uid);

            // Fetch user role from Firestore
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists()) {
                const role = userDoc.data().role;
                localStorage.setItem("role", role);
            } else {
                console.warn("No user document found!");
            }

            setOpen(true);
            setIsLoading(false);
            setTimeout(() => {
                navigate("/");
            }, 1000);
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
        }
    };


    const loginWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                localStorage.setItem("uid", result.user.uid);
                localStorage.setItem("role", result.user.role);
                console.log("Google Login Success:", result.user);
                navigate('/dashboard');
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
        setError("");
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {/* Error Snackbar */}
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={!!error} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" variant="filled">
                    {error}
                </Alert>
            </Snackbar>

            <Grid item xs={12} md={6} sx={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                backgroundImage: `url(${waveImg})`, backgroundSize: 'cover',
                backgroundPosition: 'center', backgroundRepeat: 'no-repeat',
                height: '100vh', width: '100%',
            }} className="leftPanel">
                <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
                        Logged In Successfully!
                    </Alert>
                </Snackbar>

                <Box className='welComeTo'>
                    <Typography variant="h4" fontWeight='600' sx={{ color: '#FDFDFD' }} gutterBottom>
                        Welcome Back
                    </Typography>
                    <Typography variant="h6" fontWeight='400' sx={{ color: '#FDFDFD' }} gutterBottom>
                        To stay connected with us please login with your personal info
                    </Typography>
                </Box>
                <Box sx={{ position: 'relative', height: '250px', width: '350px' }}>
                    <img height='100%' width='100%' src={loginImage} alt="Learning System" className="image" />
                    <ArrowCircleDownIcon
                        sx={{ fontSize: '40px' }}
                        className="downArrow"
                        onClick={() => {
                            const loginBox = document.getElementById("loginBox");
                            if (loginBox) loginBox.scrollIntoView({ behavior: "smooth" });
                        }}
                    />
                </Box>
            </Grid>

            <Grid item xs={12} md={6} className="rightPanel">
                <Box id='loginBox'>
                    <Typography variant="h5" gutterBottom>
                        LOGIN
                    </Typography>

                    {/* Email Input Field with Error Handling */}
                    <Input
                        onChangeEvent={(e) => setUserLoginData({ ...userLoginData, email: e.target.value })}
                        fullWidth label="E-mail" variant="outlined" margin="normal"
                        placeholder='Enter Your E-mail'
                        error={!!errors.email} helperText={errors.email}
                    />

                    {/* Password Input Field with Error Handling */}
                    <Input
                        onChangeEvent={(e) => setUserLoginData({ ...userLoginData, password: e.target.value })}
                        fullWidth label="Password" type={showPassword ? "text" : "password"}
                        variant="outlined" margin="normal"
                        placeholder='Enter Your Password'
                        error={!!errors.password} helperText={errors.password}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <FormControlLabel control={<Checkbox />} label="Remember me" />

                </Box>
                <Button onClick={userLogedIn} fullWidth size="large" variant="contained">
                    {isLoading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : "Login"}
                </Button>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                    <Typography variant="body2" align="center" className="orText">
                        Don't have an account?
                    </Typography>
                    <Typography onClick={() => navigate('/signup')} variant="body2" align="center" color="primary" className="clickable">
                        Sign up
                    </Typography>
                </Box>

                <Typography variant="body2" align="center" className="orText">
                    Or
                </Typography>

                <Typography sx={{ mt: '5px' }} onClick={loginWithGoogle} variant="body2" align="center" color="primary" className="clickable">
                    Sign in with Google
                </Typography>
            </Grid>
        </Grid>
    );
};

export default LoginPage;
