import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Box } from "@mui/material";

const InventoryManagement = () => {
    const [inventory, setInventory] = useState([]);
    const [open, setOpen] = useState(false);
    const [itemData, setItemData] = useState({ name: "", quantity: "", price: "" });
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:3000/inventory")
            .then((res) => setInventory(res.data))
            .catch((err) => console.error("Error fetching inventory:", err));
    }, []);

    const handleOpen = (item = null) => {
        if (item) {
            setItemData(item);
            setEditId(item.id);
        } else {
            setItemData({ name: "", quantity: "", price: "" });
            setEditId(null);
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        setItemData({ ...itemData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        if (editId) {
            axios.put(`http://localhost:3000/inventory/${editId}`, itemData)
                .then(() => {
                    setInventory(inventory.map((item) => (item.id === editId ? itemData : item)));
                    handleClose();
                });
        } else {
            axios.post("http://localhost:3000/inventory", itemData)
                .then((res) => {
                    setInventory([...inventory, res.data]);
                    handleClose();
                });
        }
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3000/inventory/${id}`)
            .then(() => {
                setInventory(inventory.filter((item) => item.id !== id));
            });
    };

    return (
        <Box sx={{ marginTop: '55px', width: '100%' }}>
            <h2>Inventory Management</h2>
            <Button variant="contained" color="primary" onClick={() => handleOpen()}>Add Item</Button>
            <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table sx={{ width: "100%" }}>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Name</strong></TableCell>
                            <TableCell><strong>Quantity</strong></TableCell>
                            <TableCell><strong>Price</strong></TableCell>
                            <TableCell><strong>Actions</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {inventory.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>${item.price}</TableCell>
                                <TableCell sx={{ display: 'flex', justifyContent: 'start', gap: '20px' }}>
                                    <Button variant="contained" onClick={() => handleOpen(item)} color="primary">Edit</Button>
                                    <Button variant="contained" onClick={() => handleDelete(item.id)} color="error">Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{editId ? "Edit Item" : "Add Item"}</DialogTitle>
                <DialogContent>
                    <TextField label="Name" name="name" value={itemData.name} onChange={handleChange} fullWidth margin="dense" />
                    <TextField label="Quantity" name="quantity" value={itemData.quantity} onChange={handleChange} fullWidth margin="dense" />
                    <TextField label="Price" name="price" value={itemData.price} onChange={handleChange} fullWidth margin="dense" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave} variant="contained" color="primary">Save</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default InventoryManagement;
