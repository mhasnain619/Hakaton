import { Button, Paper, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../Components/Input/Input";

const AddServices = () => {
    const navigate = useNavigate();

    const [services, setServices] = useState({
        name: "",
        description: "",
        price: ""
    });
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:3000/services")
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                console.error("Error fetching rooms:", err);
            });
    }, []);


    const CreateUser = () => {
        axios
            .post("http://localhost:3000/services", services)
            .then((res) => {
                console.log("services create successfully..");
                navigate("/services/services-list");
            })
            .catch((err) => {
                console.log(err);
            });
    };
    console.log(services);

    return (
        <Paper elevation={24} sx={{ display: 'flex', flexDirection: 'column', gap: '10px', width: "40vw", marginTop: '55px', marginX: "auto", padding: 5 }}>
            <Typography variant="h5" sx={{ textAlign: "center" }}>
                Add Services
            </Typography>

            <Input
                onChangeEvent={(e) => {
                    setServices({ ...services, name: e.target.value });
                }}
                label="Service Name"
                fullWidth
            />
            <Input
                onChangeEvent={(e) => {
                    setServices({ ...services, description: e.target.value });
                }}
                label="Service description"
                fullWidth
            />


            <Input
                onChangeEvent={(e) => {
                    setServices({ ...services, price: e.target.value });
                }}
                label="Service price"
                fullWidth
            />
            <Button
                onClick={CreateUser}
                fullWidth
                variant="contained"
                sx={{ textTransform: 'none' }}
            >
                Add Services
            </Button>
            <Button onClick={() => navigate('/rooms/room-list')}
                fullWidth sx={{ textTransform: 'none' }} variant="contained">
                Back
            </Button>
        </Paper>
    );
};

export default AddServices;