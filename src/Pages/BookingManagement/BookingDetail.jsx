import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography, Button, Box, Divider } from "@mui/material";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axios from "axios";

const BookingDetails = () => {
    const { roomId } = useParams();
    const [room, setRoom] = useState(null);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3000/rooms/${roomId}`)
            .then((res) => setRoom(res.data))
            .catch((err) => console.error("Error fetching room:", err.response?.data || err.message));

        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({
                    name: user.displayName || "Guest",
                    email: user.email || "No email",
                    phone: user.phoneNumber || "Not available",
                    id: user.uid,
                });
            }
        });
    }, [roomId]);

    if (!room) {
        return <Typography align="center" sx={{ mt: 4 }}>Loading booking details...</Typography>;
    }

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
            <Card sx={{ width: "600px", boxShadow: 5, borderRadius: 3, p: 2 }}>
                <CardMedia
                    component="img"
                    height="150"
                    image={room.imageSrc || "https://via.placeholder.com/400x200"}
                    alt="Room Image"
                    sx={{ borderRadius: "10px", objectFit: "cover" }}
                />
                <CardContent>
                    <Typography variant="h5" sx={{ fontWeight: "bold", color: "#1976d2" }}>
                        Room {room.roomNumber}
                    </Typography>
                    <Typography variant="body1"><strong>Type:</strong> {room.type}</Typography>
                    <Typography variant="body1"><strong>Price:</strong> ${room.price} per night</Typography>
                    <Typography variant="body1">
                        <strong>Status:</strong>
                        <span style={{ color: room.status === "Booked" ? "red" : "green", fontWeight: "bold" }}>
                            {room.status}
                        </span>
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    {user && (
                        <>
                            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1976d2" }}>Customer Details</Typography>
                            <Typography variant="body1"><strong>Name:</strong> {user.name}</Typography>
                            <Typography variant="body1"><strong>Email:</strong> {user.email}</Typography>
                            <Typography variant="body1"><strong>Phone:</strong> {user.phone}</Typography>
                        </>
                    )}
                    <Button
                        onClick={() => {
                            alert('Room booked');
                            navigate('/customer/customer-details');
                        }}
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2, borderRadius: 2 }}
                    >
                        Confirm Booking
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
};

export default BookingDetails;
