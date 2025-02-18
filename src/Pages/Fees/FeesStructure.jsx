import React from "react";
import { Card, CardContent, Typography, Grid, Container } from "@mui/material";

const classesData = [
    { className: "Class 1", monthlyFee: 2000, yearlyFee: 22000 },
    { className: "Class 2", monthlyFee: 2500, yearlyFee: 27000 },
    { className: "Class 3", monthlyFee: 2800, yearlyFee: 30000 },
    { className: "Class 4", monthlyFee: 3000, yearlyFee: 32000 },
    { className: "Class 5", monthlyFee: 3200, yearlyFee: 35000 },
    { className: "Class 6", monthlyFee: 3500, yearlyFee: 38000 },
    { className: "Class 7", monthlyFee: 3800, yearlyFee: 40000 },
    { className: "Class 8", monthlyFee: 4000, yearlyFee: 42000 },
    { className: "Class 9", monthlyFee: 4200, yearlyFee: 45000 },
    { className: "Class 10", monthlyFee: 4500, yearlyFee: 48000 },
];

const FeesStructureCard = () => {
    return (
        <Container sx={{ mt: 8 }}>
            <Grid container spacing={3}>
                {classesData.map((classItem, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card sx={{ minWidth: 250, p: 1, boxShadow: 3, borderRadius: 2 }}>
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1976d2" }}>
                                    {classItem.className}
                                </Typography>
                                <Typography variant="body1">Monthly Fee: <strong>PKR {classItem.monthlyFee}</strong></Typography>
                                <Typography variant="body1">Yearly Fee: <strong>PKR {classItem.yearlyFee}</strong></Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default FeesStructureCard;
