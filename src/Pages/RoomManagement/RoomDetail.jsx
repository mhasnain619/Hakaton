import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, Typography, Chip, Box, Button } from "@mui/material";
import axios from "axios";

const RoomDetail = () => {
    const { roomId } = useParams();
    const [room, setRoom] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3000/rooms/${roomId}`)
            .then((res) => setRoom(res.data))
            .catch((err) => console.error("Error fetching room details:", err));
    }, [roomId]);

    if (!room) {
        return <Typography>Loading room details...</Typography>;
    }

    return (
        <Card sx={{ width: 500, mx: "auto", my: 8, boxShadow: 5, borderRadius: 3 }}>
            <img
                src={room.imageSrc}
                alt={`Room ${room.roomNumber}`}
                style={{ width: "100%", height: 200, objectFit: "cover", borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
            />
            <CardContent>
                <Typography variant="h5" sx={{ fontWeight: "bold", color: "#1976d2" }}>
                    Room {room.roomNumber} - {room.type}
                </Typography>
                <Chip
                    label={room.status === "Booked" ? "Booked" : "Available"}
                    color={room.status === "Booked" ? "error" : "success"}
                    sx={{ fontSize: 14 }}
                />
                <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
                    Price: ${room.price} per night
                </Typography>
                <Typography sx={{ mt: 1 }}><strong>Capacity:</strong> {room.capacity} persons</Typography>
                <Box sx={{ mt: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>Amenities:</Typography>
                    {room.amenities.map((amenity, index) => (
                        <Chip key={index} label={amenity} sx={{ m: 0.5, backgroundColor: "#e3f2fd" }} />
                    ))}
                </Box>

            </CardContent>
        </Card>
    );
};

export default RoomDetail;
