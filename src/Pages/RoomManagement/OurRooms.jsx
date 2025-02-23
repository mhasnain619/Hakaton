import React, { useEffect, useState } from "react";
import { Card, CardContent, CardMedia, Typography, Box, Container, Grid, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RoomList = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("http://localhost:3000/rooms")
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                console.error("Error fetching rooms:", err);
            });
    }, []);

    const handleViewDetails = (room) => {
        navigate(`/rooms/our-rooms/${room.id}`);
    };

    return (
        <Container sx={{ mt: 6 }}>
            <Typography variant="h4" align="center" sx={{ mb: 3, fontWeight: "bold", color: "#1976d2" }}>
                Room List
            </Typography>
            <Grid container spacing={3}>
                {data.length > 0 ? (
                    data.map((room) => (
                        <Grid item xs={12} sm={6} md={4} key={room.id}>
                            <Card sx={{ boxShadow: 4, borderRadius: 2, p: 2, transition: "0.3s", '&:hover': { boxShadow: 6 } }}>
                                <CardMedia
                                    component="img"
                                    height="180"
                                    image={room.imageSrc || "https://via.placeholder.com/300"} // Default image if none exists
                                    alt={`Room ${room.roomNumber}`}
                                    sx={{ borderRadius: "8px" }}
                                />
                                <CardContent>
                                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: 'center' }}>
                                        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1976d2" }}>
                                            Room {room.roomNumber}
                                        </Typography>
                                        <Typography variant="body1" sx={{ fontWeight: "bold", color: "#555" }}>
                                            Type: {room.type}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ mt: 1, display: "flex", justifyContent: "space-between", alignItems: 'center' }}>
                                        <Typography variant="body2" sx={{ color: "#757575" }}>
                                            Price: ${room.price} per night
                                        </Typography>
                                        <Typography variant="body2" sx={{ fontWeight: "bold", color: room.status === "Booked" ? "red" : "#388e3c" }}>
                                            {room.status === "Booked" ? "Booked" : "Available"}
                                        </Typography>
                                    </Box>
                                </CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'start', pb: 2 }}>
                                    <Button
                                        variant="contained"
                                        onClick={() => handleViewDetails(room)}
                                        sx={{ mt: 2 }}
                                    >
                                        View Details
                                    </Button>
                                </Box>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Typography align="center">No rooms available.</Typography>
                )}
            </Grid>
        </Container>
    );
};

export default RoomList;
