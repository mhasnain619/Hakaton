import React, { useState } from "react";
import { Grid, Button, Typography, Box, InputAdornment, IconButton, Snackbar, Alert } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import "./Signup.css";
import loginImage from '../../assets/signupBgRemove.png';
import Input from '../../Components/Input/Input'
import waveImg from '../../assets/wave.png';
import { useNavigate } from "react-router-dom";
import { MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../Store/Slices/AuthSlice";

const SignupPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        role: '',
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState({});  // Added error state

    const dispatch = useDispatch();
    const { loading, error: reduxError } = useSelector(state => state.auth);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const validateInputs = () => {
        let errors = {};
        if (!credentials.name) errors.name = "Full name is required";
        if (!credentials.email.includes("@")) errors.email = "Enter a valid email";
        if (!credentials.role) errors.role = "Please select a role";
        if (credentials.password.length < 6) errors.password = "Password should be at least 6 characters";
        if (credentials.password !== credentials.confirmPassword) errors.confirmPassword = "Passwords do not match";
        return errors;
    };

    const roles = ["Admin", "User"];

    const getCredentials = () => {
        const validationErrors = validateInputs();
        if (Object.keys(validationErrors).length > 0) {
            setError(validationErrors);  // Set the error state
            return;
        }

        dispatch(signupUser(credentials))
            .unwrap()
            .then(() => {
                setOpen(true);
                setTimeout(() => navigate('/'), 1000);
            })
            .catch((err) => {
                setError(prevError => ({ ...prevError, general: err?.message || "Signup failed" }));
            });
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    };

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    return (
        <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Grid item xs={12} md={6}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundImage: `url(${waveImg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    height: '100vh',
                    width: '100%',
                }} className="leftPanel">
                <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={open} autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
                        Account Created Successfully!
                    </Alert>
                </Snackbar>
                <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={!!error?.general} autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" variant="filled">
                        {error?.general}
                    </Alert>
                </Snackbar>
                <Box className='welComeTo'>
                    <Typography variant="h4" fontWeight='600' sx={{ color: 'white' }} gutterBottom>
                        WELCOME TO Jawan Pakistan Learning Management System
                    </Typography>
                </Box>
                <Box sx={{ height: '250px', width: '350px' }}>
                    <img height='100%' width='100%' src={loginImage} alt="Learning System" className="image" />
                </Box>
            </Grid>
            <Grid item xs={12} md={6} className="rightPanel">
                <Box className='inputsBox'>
                    <Typography variant="h5" align="start" gutterBottom>
                        Create Your Account
                    </Typography>
                    <Input
                        type="text"
                        fullWidth
                        onChangeEvent={(e) => setCredentials({ ...credentials, name: e.target.value })}
                        label="Name"
                        placeholder='Enter Your Full Name'
                        variant="outlined"
                        margin="normal"
                        error={!!error?.name}
                        helperText={error?.name || ""}
                    />
                    <Input
                        fullWidth
                        onChangeEvent={(e) => setCredentials({ ...credentials, email: e.target.value })}
                        label="E-mail"
                        placeholder='Enter Your E-mail'
                        variant="outlined"
                        margin="normal"
                        type="email"
                        error={!!error?.email}
                        helperText={error?.email || ""}
                    />
                    <Input
                        fullWidth
                        onChangeEvent={(e) => setCredentials({ ...credentials, role: e.target.value })}
                        label="Role"
                        variant="outlined"
                        margin="normal"
                        type="text"
                        select={true} // Ensure it behaves as a dropdown
                        value={credentials.role || ""}
                        text={roles.map((role) => (
                            <MenuItem key={role} value={role}>
                                {role}
                            </MenuItem>
                        ))}
                    />
                    <Input
                        fullWidth
                        onChangeEvent={(e) => setCredentials({ ...credentials, password: e.target.value })}
                        label="Password"
                        type="password"
                        placeholder='Enter Your Password'
                        variant="outlined"
                        margin="normal"
                        error={!!error?.password}
                        helperText={error?.password || ""}
                    />
                    <Input
                        fullWidth
                        label="Confirm Password"
                        onChangeEvent={(e) => setCredentials({ ...credentials, confirmPassword: e.target.value })}
                        type={showPassword ? "text" : "password"}
                        variant="outlined"
                        placeholder='Confirm Your Password'
                        margin="normal"
                        error={!!error?.confirmPassword}
                        helperText={error?.confirmPassword || ""}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button onClick={getCredentials} fullWidth className="loginButton" size="large" variant="contained" disabled={loading}>
                        {loading ? "Signing Up..." : "Signup"}
                    </Button>
                </Box>
                <Typography variant="body2" align="center" className="orText">
                    Or
                </Typography>
                <Typography variant="body2" align="center" color="primary" className="clickable" onClick={() => navigate('/login')}>
                    Login
                </Typography>
            </Grid>
        </Grid>
    );
};

export default SignupPage;
