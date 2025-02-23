import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Grid, Card, CardContent, Typography, Button, CircularProgress, Box } from "@mui/material";

const ServicesList = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("http://localhost:3000/services")
            .then((response) => {
                setServices(response.data);
                setLoading(false);
            })
            .catch((error) => console.error("Error fetching services:", error));
    }, []);

    const handleBookService = (service) => {
        const newRequest = {
            serviceId: service.id,
            serviceName: service.name,
            status: "Pending",
            requestedAt: new Date().toISOString()
        };

        axios.post("http://localhost:3000/serviceRequests", newRequest)
            .then(() => alert("Service booked successfully!"))
            .catch((error) => console.error("Error booking service:", error));
    };

    return (
        <Container sx={{ mt: 8 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Available Services
            </Typography>

            {loading ? (
                <Box style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Grid container spacing={3}>
                    {services.map((service) => (
                        <Grid item xs={12} sm={6} md={4} key={service.id}>
                            <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        {service.name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {service.description}
                                    </Typography>
                                    <Typography variant="body1" fontWeight="bold" sx={{ mt: 1 }}>
                                        Price: ${service.price}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default ServicesList;
