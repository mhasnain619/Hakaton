import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Box, Container, Grid, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const OurServices = () => {
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
    let role = localStorage.getItem('role')
    console.log(role);


    const handleBooking = (room) => {
        const auth = getAuth();

        onAuthStateChanged(auth, (user) => {
            if (user) {
                alert(`Booking initiated by: ${user.displayName || "Unknown User"}`);

                // Update room status in database
                axios.put(`http://localhost:3000/rooms/${room.id}`, { ...room, status: "Booked" })
                    .then(() => {
                        alert("Room booked successfully!");

                        // Update room status in UI
                        setData(prevData =>
                            prevData.map(r => r.id === room.id ? { ...r, status: "Booked" } : r)
                        );

                        // Navigate to booking details
                        navigate(`/teacher/room-list/${room.id}`);
                    })
                    .catch((err) => {
                        console.error("Error updating room status:", err);
                        alert("Failed to book the room.");
                    });
            } else {
                alert("Please log in to book a room.");
            }
        });
    };

    return (
        <Container sx={{ mt: 6 }}>
            <Typography variant="h4" align="center" sx={{ mb: 3, fontWeight: "bold", color: "#1976d2" }}>
                Our Services
            </Typography>
            <Grid container spacing={3}>
                {data.length > 0 ? (
                    data.map((room) => (
                        <Grid item xs={12} sm={6} md={4} key={room.id}>
                            <Card sx={{ boxShadow: 3, borderRadius: 2, p: 2 }}>
                                <CardContent>
                                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1976d2" }}>
                                        Room {room.roomNumber}
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontWeight: "bold", color: "#555" }}>
                                        Type: {room.type}
                                    </Typography>
                                    <Box sx={{ mt: 1 }}>
                                        <Typography variant="body2" sx={{ color: "#757575" }}>
                                            Price: ${room.price} per night
                                        </Typography>
                                        <Typography variant="body2" sx={{ fontWeight: "bold", color: room.status === "Booked" ? "red" : "#388e3c" }}>
                                            {room.status === "Booked" ? "Booked" : "Available"}
                                        </Typography>
                                    </Box>
                                </CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Button
                                        disabled={room.status === "Booked"}
                                        variant="contained"
                                        onClick={() => handleBooking(room)}
                                        sx={{ mt: 2 }}
                                    >
                                        {room.status === "Booked" ? "Booked" : "Book Now"}
                                    </Button>
                                    <Button
                                        disabled={role === "Customer"}
                                        variant="contained"
                                        sx={{ mt: 2 }}
                                    >
                                        Update Room
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

export default OurServices;
