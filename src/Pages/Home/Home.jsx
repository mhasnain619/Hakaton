import { Box, Grid, Typography, Button } from '@mui/material';
import './home.css';
import image from '../../assets/removeBg.png';
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const navigate = useNavigate()
    return (
        <Box sx={{ px: 4, backgroundColor: '#2845AD', height: '100vh', display: 'flex', alignItems: 'center' }}>
            <Grid container alignItems="center" spacing={4}>
                {/* Text Section */}
                <Grid item xs={12} md={6}>
                    <Typography variant="h5" color="#dceeff" fontWeight="500">
                        One Solution to Replace Them All!
                    </Typography>
                    <Typography variant="h2" fontWeight="bold" color='white' gutterBottom>
                        Welcome to the Leading Hotel Management Software
                    </Typography>
                    <Typography variant="h6" color="#dceeff" gutterBottom>
                        for Accommodations in <span style={{ color: '#1976d2', fontWeight: 'bold' }}>PAKISTAN</span>
                    </Typography>

                    {/* Buttons */}
                    <Box mt={3} display="flex" gap={2}>
                        <Button onClick={() => navigate('/signup')} variant="contained" color="primary" size="large" sx={{ borderRadius: 8, px: 4, py: 1.5 }}>
                            Sign Up
                        </Button>
                        <Button onClick={() => navigate('/login')} variant="contained" color="primary" size="large" sx={{ borderRadius: 8, px: 4, py: 1.5 }}>
                            Login
                        </Button>

                    </Box>
                </Grid>

                {/* Image Section */}
                <Grid item xs={12} md={6} display="flex" justifyContent="center">
                    <Box component="img" src={image} alt="Hotel Management" sx={{ maxWidth: '100%', height: 'auto' }} />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Home;
