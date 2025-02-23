import React, { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    List,
    ListItem,
    ListItemText,
    Grid,
    Divider,
    Box,
} from "@mui/material";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const CustomerDetails = () => {
    const [customer, setCustomer] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [isBooked, setIsBooked] = useState([]);

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // Set customer details
                setCustomer({
                    name: user.displayName || "Guest",
                    email: user.email,
                    phone: user.phoneNumber || "Not available",
                    id: user.uid,
                });

                // Fetch customer bookings
                axios
                    .get("http://localhost:3000/rooms")
                    .then((res) => {
                        setBookings(res.data);
                        const userBookings = res.data.filter(
                            (booking) => booking.bookedid === user.uid
                        );
                        setIsBooked(userBookings);
                    })
                    .catch((err) => console.error("Error fetching bookings:", err));
            }
        });
    }, []);

    if (!customer) return <Typography>Loading customer details...</Typography>;

    return (
        <Grid container spacing={3} sx={{ mt: 6, px: 3 }}>
            {/* Customer Details Card */}
            <Grid item xs={12} md={5}>
                <Card
                    sx={{
                        borderRadius: 3,
                        boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
                        padding: 2,
                        backgroundColor: "#f9f9f9",
                    }}
                >
                    <CardContent>
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: "bold",
                                color: "#1976d2",
                                textAlign: "center",
                                mb: 2,
                            }}
                        >
                            Customer Details
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Typography variant="body1" sx={{ fontSize: "1rem", color: "#555" }}>
                            <strong>Name:</strong> {customer.name}
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: "1rem", color: "#555" }}>
                            <strong>Email:</strong> {customer.email}
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: "1rem", color: "#555" }}>
                            <strong>Phone:</strong> {customer.phone}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>

            {/* Booking History Card */}
            <Grid item xs={12} md={7}>
                <Card
                    sx={{
                        borderRadius: 3,
                        boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
                        padding: 2,
                        backgroundColor: "#fff",
                    }}
                >
                    <CardContent>
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: "bold",
                                color: "#1976d2",
                                textAlign: "center",
                                mb: 2,
                            }}
                        >
                            Booking History
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <List>
                            {isBooked.length > 0 ? (
                                isBooked.map((booking) => (
                                    <Box
                                        key={booking.id}
                                        sx={{
                                            backgroundColor: "#f5f5f5",
                                            borderRadius: 2,
                                            p: 2,
                                            mb: 2,
                                            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                                        }}
                                    >
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: "bold",
                                                color: "#1976d2",
                                            }}
                                        >
                                            Room {booking.roomNumber} -{" "}
                                            <span
                                                style={{
                                                    color: booking.status === "Booked" ? "red" : "green",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                {booking.status}
                                            </span>
                                        </Typography>
                                        <Typography variant="body1" sx={{ color: "#555" }}>
                                            <strong>Type:</strong> {booking.type}
                                        </Typography>
                                        <Typography variant="body1" sx={{ color: "#555" }}>
                                            <strong>Price:</strong> ${booking.price} per night
                                        </Typography>
                                        <Typography variant="body1" sx={{ color: "#555" }}>
                                            <strong>Capacity:</strong> {booking.capacity}
                                        </Typography>
                                    </Box>
                                ))
                            ) : (
                                <Typography sx={{ textAlign: "center", color: "#757575" }}>
                                    No previous bookings found.
                                </Typography>
                            )}
                        </List>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default CustomerDetails;
