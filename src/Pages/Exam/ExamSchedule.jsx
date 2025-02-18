import React from "react";
import { Card, CardContent, Typography, Box, Container, Grid, Button } from "@mui/material";

const examSchedule = [
    {
        subject: "Mathematics",
        class: "10th Grade",
        date: "2025-03-15",
        startTime: "09:00 AM",
        endTime: "11:00 AM"
    },
    {
        subject: "Science",
        class: "10th Grade",
        date: "2025-03-17",
        startTime: "10:00 AM",
        endTime: "12:00 PM"
    },
    {
        subject: "English",
        class: "10th Grade",
        date: "2025-03-19",
        startTime: "08:30 AM",
        endTime: "10:30 AM"
    },
    {
        subject: "History",
        class: "10th Grade",
        date: "2025-03-21",
        startTime: "11:00 AM",
        endTime: "01:00 PM"
    },
    {
        subject: "History",
        class: "10th Grade",
        date: "2025-03-21",
        startTime: "11:00 AM",
        endTime: "01:00 PM"
    },
    {
        subject: "History",
        class: "10th Grade",
        date: "2025-03-21",
        startTime: "11:00 AM",
        endTime: "01:00 PM"
    },
    {
        subject: "History",
        class: "10th Grade",
        date: "2025-03-21",
        startTime: "11:00 AM",
        endTime: "01:00 PM"
    },
    {
        subject: "History",
        class: "10th Grade",
        date: "2025-03-21",
        startTime: "11:00 AM",
        endTime: "01:00 PM"
    },
    {
        subject: "History",
        class: "10th Grade",
        date: "2025-03-21",
        startTime: "11:00 AM",
        endTime: "01:00 PM"
    },
    {
        subject: "Computer Science",
        class: "10th Grade",
        date: "2025-03-23",
        startTime: "02:00 PM",
        endTime: "04:00 PM"
    }
];

const ExamScheduleCard = () => {
    return (
        <Container sx={{ mt: 7 }}>
            <Grid container spacing={3} >
                {examSchedule.map((exam, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card sx={{ boxShadow: 3, borderRadius: 2, p: 1, }}>
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1976d2" }}>
                                    {exam.subject}
                                </Typography>
                                <Typography variant="body1" sx={{ fontWeight: "bold", color: "#555" }}>
                                    Class: {exam.class}
                                </Typography>
                                <Box sx={{ mt: 1 }}>
                                    <Typography variant="body2" sx={{ color: "#757575" }}>
                                        Date: {exam.date}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: "#757575" }}>
                                        Start Time: {exam.startTime}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: "#757575" }}>
                                        End Time: {exam.endTime}
                                    </Typography>
                                </Box>
                                <Button sx={{ mt: 1 }} variant="contained">View Detail</Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default ExamScheduleCard;
