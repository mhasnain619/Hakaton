import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Paper, Typography, Button } from "@mui/material";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axios from "axios";

const BookingDetails = () => {
    const { roomId } = useParams();
    const [room, setRoom] = useState(null);
    const [user, setUser] = useState(null);
    const [data, setData] = useState([]);

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
    const navigate = useNavigate()
    useEffect(() => {
        console.log("Received roomId:", roomId);

        axios.get(`http://localhost:3000/rooms/${roomId}`)
            .then((res) => {
                console.log("Room data received:", res.data);
                setRoom(res.data);
            })
            .catch((err) => {
                console.error("Error fetching room:", err.response ? err.response.data : err.message);
            });

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
        return <Typography>Loading booking details...</Typography>;
    }

    return (
        <Paper elevation={3} sx={{ padding: 3, width: "50vw", margin: "50px auto" }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", color: "#1976d2" }}>
                Booking Details
            </Typography>
            <Typography><strong>Room Number:</strong> {room.roomNumber}</Typography>
            <Typography><strong>Type:</strong> {room.type}</Typography>
            <Typography><strong>Price:</strong> ${room.price} per night</Typography>
            <Typography><strong>Status:</strong> {room.status === "Booked" ? "Booked" : "Available"}</Typography>
            <Typography><strong>Room ID:</strong> {room.id}</Typography>
            <hr />
            {user && (
                <>
                    <Typography variant="h6">User Details</Typography>
                    <Typography><strong>Name:</strong> {user.name}</Typography>
                    <Typography><strong>Email:</strong> {user.email}</Typography>
                    <Typography><strong>Phone:</strong> {user.phone}</Typography>
                    <Typography><strong>User ID:</strong> {user.id}</Typography>
                </>
            )}
            <Button onClick={() => {
                alert('Room booked')
                navigate('/customer/customer-details')
            }} variant="contained" color="primary" sx={{ mt: 2 }}>Confirm Booking</Button>
        </Paper>
    );
};

export default BookingDetails;
