import React, { useState } from "react";
import { Container, TextField, Button, Grid, Typography, Box } from "@mui/material";
import './ContactUs.css'
const ContactPage = () => {
    const [formData, setFormData] = useState(
        {
            name: "",
            email: "",
            message: ""
        }
    );

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted:", formData);
    };

    return (
        <>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={12} md={6}>
                    <Container maxWidth="sm" sx={{ py: 8 }}>
                        <Box sx={{ mt: 4 }}>
                            <Typography sx={{ fontSize: 'larger', fontWeight: 'bolder' }} gutterBottom>
                                Contact us
                            </Typography>
                        </Box>
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Your Name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        variant="outlined"
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Email Address"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        variant="outlined"
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Your Message"
                                        name="message"
                                        multiline
                                        rows={4}
                                        value={formData.message}
                                        onChange={handleChange}
                                        variant="outlined"
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        sx={{ py: 1.5 }}
                                    >
                                        Send Message
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Container>
                </Grid>
                <Grid item display='flex' justifyContent='start' alignItems='center' xs={12} md={6}>
                    <Box className='contactTexts'>

                        <Typography>
                            We’d love to hear from you! Whether you have a question about our services, need assistance, or just want to share your feedback, we’re here to help.
                        </Typography>
                        <Typography>
                            Our team is dedicated to providing the best support and ensuring a seamless experience for our users. Fill out the contact form with your name, email, and message, and we’ll get back to you as soon as possible.
                        </Typography>
                        <Typography>
                            <strong>Email Support :</strong> Have an inquiry? Reach us via email for a prompt response.
                        </Typography>
                        <Typography>
                            <strong>Phone Support :</strong> Need direct assistance? Contact our support team during business hours.
                        </Typography>
                        <Typography>
                            <strong>Stay Connected :</strong>Follow us on social media for updates, announcements, and more.
                        </Typography>
                        <Typography>
                            Your feedback and queries are important to us, and we aim to respond as quickly as possible. Let’s connect today!
                            We’d love to hear from you! Whether you have questions,
                            feedback, or inquiries, feel free to reach out to us.
                            Simply fill out the form with your name, email, and message, and we'll get back to you as soon as possible. Stay connected—we're here to help!
                        </Typography>
                    </Box>
                </Grid>
            </Grid>


        </>
    );
};

export default ContactPage;
