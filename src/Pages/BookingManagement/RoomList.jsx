import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Box, Container, Grid, Button, CardMedia } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

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
    let role = localStorage.getItem('role')
    console.log(role);

    const handleBooking = (room) => {
        const auth = getAuth();

        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(user);



                // Update room status in database
                axios.put(`http://localhost:3000/rooms/${room.id}`, { ...room, status: "Booked", bookedid: user.uid })
                    .then(() => {

                        // Update room status in UI
                        setData(prevData =>
                            prevData.map(r => r.id === room.id ? { ...r, status: "Booked" } : r)
                        );
                        alert("Room booked successfully!");
                        // Navigate to booking details
                        navigate(`/rooms/room-list/${room.id}`);
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
                Room List
            </Typography>
            <Grid container spacing={3}>
                {data.length > 0 ? (
                    data.map((room) => (
                        <Grid item xs={12} sm={6} md={4} key={room.id}>
                            <Card sx={{ boxShadow: 3, borderRadius: 2, p: 2 }}>
                                <CardMedia
                                    component="img"
                                    height="180"
                                    image={room.imageSrc || "https://via.placeholder.com/300"} // Default image if none exists
                                    alt={`Room ${room.roomNumber}`}
                                    sx={{ borderRadius: "8px" }}
                                />
                                <CardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1976d2" }}>
                                            Room {room.roomNumber}
                                        </Typography>
                                        <Typography variant="body1" sx={{ fontWeight: "bold", color: "#555" }}>
                                            Type: {room.type}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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

export default RoomList;
