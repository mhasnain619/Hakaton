import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Card, CardContent, Typography, Avatar, Button, Grid, Box, CircularProgress } from '@mui/material';
import { FaLocationDot } from "react-icons/fa6";
import AdminPanelSettingsTwoToneIcon from '@mui/icons-material/AdminPanelSettingsTwoTone';

import {
    Business as BusinessIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
    Language as LanguageIcon,
} from '@mui/icons-material';

import userImg from '../../assets/userimg.png';
import './profile.css';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../FirebaseConfiq';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const auth = getAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);

                // Fetch user role from Firestore
                const userDoc = await getDoc(doc(db, "users", currentUser.uid));
                if (userDoc.exists()) {
                    setRole(userDoc.data().role || "No role assigned");
                } else {
                    setRole("No role assigned");
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const logout = () => {
        localStorage.removeItem('uid');
        localStorage.removeItem('role');
        navigate('/login');
    };

    return (
        <Box sx={{ py: 8 }}>
            {loading ? (
                <Box display="flex" alignItems="center">
                    <CircularProgress size={40} color="primary" />
                </Box>
            ) : user ? (
                <Card className="user-card">
                    <Grid container spacing={2}>
                        {/* User Avatar and Basic Info */}
                        <Grid item xs={12} md={3} display="flex" justifyContent="center" alignItems="center">
                            <Avatar
                                alt={user.displayName || "User"}
                                src={userImg} // user.photoURL ||
                                className="user-avatar"
                            />
                        </Grid>
                        <Grid item xs={12} md={9}>
                            <Typography className='userName'>
                                {user.displayName || "No Name Available"}
                            </Typography>
                            <Typography className='userNameSngCompany'>
                                {user.email}
                            </Typography>
                            <Grid container spacing={2} marginTop={1}>
                                <Grid item xs={12} sm="auto">
                                    <Button onClick={logout} variant="contained" color="secondary" size="large">
                                        Log Out
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Additional User Details */}
                    <CardContent className="card-content">
                        <Grid container spacing={1}>
                            {/* Company Placeholder */}
                            <Grid item xs={12} md={5}>
                                <Box style={{ textAlign: 'start' }}>
                                    <p className='nameContAddre'>Company Details :</p>
                                    <span className='iconAndText'>
                                        <BusinessIcon className="section-icon" fontSize="small" />
                                        <p>{user.companyDetail || "No company details here"}</p>
                                    </span>
                                </Box>
                            </Grid>

                            {/* Contact Information */}
                            <Grid item xs={12} md={5}>
                                <Box style={{ textAlign: 'start' }}>
                                    <p className='nameContAddre'>Contact Information :</p>
                                    <span className='iconAndText'>
                                        <EmailIcon className="section-icon" fontSize="small" />
                                        <p>{user.email}</p>
                                    </span>
                                    <span className='iconAndText'>
                                        <PhoneIcon className="section-icon" fontSize="small" />
                                        <p>{user.phoneNumber || "No Phone"}</p>
                                    </span>
                                    <span className='iconAndText'>
                                        <LanguageIcon className="section-icon" fontSize="small" />
                                        <p>{user.uid || "No Website"}</p>
                                    </span>
                                </Box>
                            </Grid>

                            {/* Role */}
                            <Grid item xs={12} md={2}>
                                <Box style={{ textAlign: 'start' }}>
                                    <p className='nameContAddre'>Role :</p>
                                    <span className='Address'>
                                        <AdminPanelSettingsTwoToneIcon className='locationIcon' />
                                        <p>{role || "No Role Added"}</p>
                                    </span>
                                </Box>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            ) : (
                <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
                    <Typography variant="h6" component="h2" className="title">
                        No User Found...
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default UserProfile;
