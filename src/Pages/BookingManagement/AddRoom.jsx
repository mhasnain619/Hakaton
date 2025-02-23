import { Button, Paper, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Input from "../../Components/Input/Input";

const AddRoom = () => {
    const navigate = useNavigate();

    const [userDetails, setUserDetails] = useState({
        capacity: "",
        roomNumber: "",
        status: "",
        type: "",
        price: "",
    });
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
    console.log(data);
    let id = data.map((id) => {
        return id.id
    })
    console.log(id);


    const CreateUser = () => {
        const newRoom = {
            id: id + 1, // Generate a unique ID
            ...userDetails,
        };
        axios
            .post("http://localhost:3000/rooms", newRoom)
            .then((res) => {
                console.log("Room create successfully..");
                navigate("/rooms/our-rooms");
            })
            .catch((err) => {
                console.log(err);
            });
    };
    console.log(userDetails);

    return (
        <Paper elevation={24} sx={{ display: 'flex', flexDirection: 'column', gap: '10px', width: "40vw", marginTop: '55px', marginX: "auto", padding: 5 }}>
            <Typography variant="h5" sx={{ textAlign: "center" }}>
                Create Room
            </Typography>

            <Input
                onChangeEvent={(e) => {
                    setUserDetails({ ...userDetails, roomNumber: e.target.value });
                }}
                label="Room Number"
                fullWidth
            />
            <Input
                onChangeEvent={(e) => {
                    setUserDetails({ ...userDetails, capacity: e.target.value });
                }}
                label="Enter capacity"
                fullWidth
            />


            <Input
                onChangeEvent={(e) => {
                    setUserDetails({ ...userDetails, type: e.target.value });
                }}
                label="Enter type"
                fullWidth
            />
            <Input
                onChangeEvent={(e) => {
                    setUserDetails({ ...userDetails, status: e.target.value });
                }}
                label="Enter status"
                fullWidth
            />
            <Input
                onChangeEvent={(e) => {
                    setUserDetails({ ...userDetails, price: e.target.value });
                }}
                label="Enter price"
                fullWidth
            />

            <Button
                onClick={CreateUser}
                fullWidth
                variant="contained"

            >
                Create
            </Button>
            <Button onClick={() => navigate('/rooms/room-list')}
                fullWidth variant="contained">
                Back
            </Button>
        </Paper>
    );
};

export default AddRoom;