import React from "react";
import { Card, CardContent, Typography, Box, Container, Grid } from "@mui/material";

// Sample Exam Results Data
const examResults = [
    { name: "Ali Khan", subject: "Mathematics", marks: 92 },
    { name: "Ayesha Ahmed", subject: "Science", marks: 85 },
    { name: "Bilal Siddiqui", subject: "English", marks: 78 },
    { name: "Sara Noor", subject: "History", marks: 66 },
    { name: "Hamza Raza", subject: "Computer Science", marks: 95 },
    { name: "Ayesha Ahmed", subject: "Science", marks: 85 },
    { name: "Bilal Siddiqui", subject: "English", marks: 78 },
    { name: "Sara Noor", subject: "History", marks: 66 },
    { name: "Hamza Raza", subject: "Computer Science", marks: 95 },
];

// Function to calculate grade based on marks
const getGrade = (marks) => {
    if (marks >= 90) return "A+";
    if (marks >= 80) return "A";
    if (marks >= 70) return "B";
    if (marks >= 60) return "C";
    return "F";
};

const ExamResultCard = () => {
    return (
        <Container sx={{ mt: 6 }}>
            <Typography variant="h4" align="center" sx={{ mb: 3, fontWeight: "bold", color: "#1976d2" }}>
                Exam Results
            </Typography>
            <Grid container spacing={3} >
                {examResults.map((result, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card sx={{ boxShadow: 3, borderRadius: 2, p: 2, }}>
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1976d2" }}>
                                    {result.name}
                                </Typography>
                                <Typography variant="body1" sx={{ fontWeight: "bold", color: "#555" }}>
                                    Subject: {result.subject}
                                </Typography>
                                <Box sx={{ mt: 1 }}>
                                    <Typography variant="body2" sx={{ color: "#757575" }}>
                                        Marks: {result.marks}/100
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontWeight: "bold", color: getGrade(result.marks) === "F" ? "red" : "#388e3c" }}>
                                        Grade: {getGrade(result.marks)}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default ExamResultCard;
