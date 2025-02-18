import React, { useState } from "react";
import {
    Container,
    TextField,
    Button,
    MenuItem,
    Typography,
    Card,
    CardContent,
} from "@mui/material";
import { Payment } from "@mui/icons-material";
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../FirebaseConfiq';

const FeeSubmission = () => {
    let [openLoader, setOpenLoader] = React.useState(false)

    const [formData, setFormData] = useState({
        studentName: "",
        className: "",
        amount: "",
        paymentMethod: "",
    });
    const [students, setStudents] = React.useState([])
    React.useEffect(() => {
        const fetchStudents = async () => {
            setOpenLoader(true)
            try {
                const querySnapshot = await getDocs(collection(db, "students"));
                const studentData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setStudents(studentData)
            } catch (error) {
                console.error("Error fetching students:", error);
            }
            setOpenLoader(false)
        }
        fetchStudents()
    }, [])

    const paymentMethods = ["Cash", "Bank Transfer", "Credit Card"];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Fee Submitted for ${formData.studentName} - PKR ${formData.amount}`);
        setFormData({ studentName: "", className: "", amount: "", paymentMethod: "" });
    };

    return (
        <Container sx={{ mt: 10 }}>
            <Card sx={{ maxWidth: 500, mx: "auto", p: 3, boxShadow: 3, borderRadius: 2 }}>
                <CardContent>
                    <Typography variant="h5" sx={{ mb: 3, textAlign: "center", color: "#1976d2" }}>
                        Fee Submission
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            select
                            label="Select Student"
                            fullWidth
                            name="studentName"
                            value={formData.studentName}
                            onChange={handleChange}
                            sx={{
                                mb: 2,
                                "& .MuiInputBase-root": {}, // Remove internal padding
                                "& .MuiSelect-select": { minHeight: "45px", }, // Reduce height
                            }}
                            required
                        >
                            {students.length > 0 ? (
                                students.map((student, index) => (
                                    <MenuItem key={index} value={student.userName}>
                                        {`${student.userName} (${student.userClass})`}
                                    </MenuItem>
                                ))
                            ) : (
                                <MenuItem disabled>No Student Added</MenuItem>
                            )}

                        </TextField>

                        <TextField
                            label="Class"
                            fullWidth
                            name="className"
                            value={formData.className}
                            onChange={handleChange}
                            sx={{ mb: 2 }}
                            required
                        />

                        <TextField
                            label="Amount (PKR)"
                            fullWidth
                            type="number"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            sx={{ mb: 2 }}
                            required
                        />

                        <TextField
                            select
                            label="Payment Method"
                            fullWidth
                            name="paymentMethod"
                            value={formData.paymentMethod}
                            onChange={handleChange}
                            sx={{ mb: 3 }}
                            required
                        >
                            {paymentMethods.map((method, index) => (
                                <MenuItem key={index} value={method}>
                                    {method}
                                </MenuItem>
                            ))}
                        </TextField>

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            size="large"
                            startIcon={<Payment />}
                        >
                            Submit Payment
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
};

export default FeeSubmission;
