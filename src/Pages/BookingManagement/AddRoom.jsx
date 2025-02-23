import { Button, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const AddRoom = () => {
    const navigate = useNavigate();

    const [userDetails, setUserDetails] = useState({
        capacity: "",
        roomNumber: "",
        status: "",
        type: "",
        price: "",
    });

    const CreateUser = () => {
        const newRoom = {
            id: uuidv4(), // Generate a unique ID
            ...userDetails,
        };
        axios
            .post("http://localhost:3000/rooms", newRoom)
            .then((res) => {
                console.log("user create successfully..");
                navigate("/teacher/room-list");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <Paper elevation={24} sx={{ width: "40vw", marginTop: '50px', marginX: "auto", padding: 5 }}>
            <Typography variant="h5" sx={{ textAlign: "center" }}>
                Create Room
            </Typography>

            <TextField
                onChange={(e) => {
                    setUserDetails({ ...userDetails, roomNumber: e.target.value });
                }}
                label="Room Number"
                fullWidth
            />
            <br />
            <br />
            <br />
            <TextField
                onChange={(e) => {
                    setUserDetails({ ...userDetails, capacity: e.target.value });
                }}
                label="Enter capacity"
                fullWidth
            />

            <br />
            <br />

            <TextField
                onChange={(e) => {
                    setUserDetails({ ...userDetails, type: e.target.value });
                }}
                label="Enter type"
                fullWidth
            />
            <br />
            <br />
            <TextField
                onChange={(e) => {
                    setUserDetails({ ...userDetails, status: e.target.value });
                }}
                label="Enter status"
                fullWidth
            />
            <br />
            <br />
            <TextField
                onChange={(e) => {
                    setUserDetails({ ...userDetails, price: e.target.value });
                }}
                label="Enter price"
                fullWidth
            />
            <br />
            <br />

            <Button
                onClick={CreateUser}
                color="success"
                fullWidth
                variant="contained"
                sx={{ marginBottom: 3 }}
            >
                Create
            </Button>
            <Button onClick={() => navigate('/rooms/room-list')} color="error" fullWidth variant="contained">
                Back
            </Button>
        </Paper>
    );
};

export default AddRoom;