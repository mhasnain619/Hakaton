import React from "react";
import { Card, CardContent, Typography, Grid, Container, Button } from "@mui/material";
import { Payment, Download } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const feeVouchers = [
    { studentName: "Ali Khan", className: "Class 1", monthlyFee: 2000, dueDate: "10 Feb 2025", issueDate: "01 Feb 2025", voucherNo: "V001", status: "Unpaid" },
    { studentName: "Ayesha Ahmed", className: "Class 2", monthlyFee: 2500, dueDate: "10 Feb 2025", issueDate: "01 Feb 2025", voucherNo: "V002", status: "Paid" },
    { studentName: "Ahmed Raza", className: "Class 3", monthlyFee: 2800, dueDate: "10 Feb 2025", issueDate: "01 Feb 2025", voucherNo: "V003", status: "Unpaid" },
    { studentName: "Fatima Noor", className: "Class 4", monthlyFee: 3000, dueDate: "10 Feb 2025", issueDate: "01 Feb 2025", voucherNo: "V004", status: "Paid" },
    { studentName: "Bilal Hussain", className: "Class 5", monthlyFee: 3200, dueDate: "10 Feb 2025", issueDate: "01 Feb 2025", voucherNo: "V005", status: "Unpaid" },
    { studentName: "Sara Malik", className: "Class 6", monthlyFee: 3500, dueDate: "10 Feb 2025", issueDate: "01 Feb 2025", voucherNo: "V006", status: "Paid" },
    { studentName: "Hamza Tariq", className: "Class 7", monthlyFee: 3800, dueDate: "10 Feb 2025", issueDate: "01 Feb 2025", voucherNo: "V007", status: "Unpaid" },
    { studentName: "Zainab Iqbal", className: "Class 8", monthlyFee: 4000, dueDate: "10 Feb 2025", issueDate: "01 Feb 2025", voucherNo: "V008", status: "Paid" },
    { studentName: "Usman Javed", className: "Class 9", monthlyFee: 4200, dueDate: "10 Feb 2025", issueDate: "01 Feb 2025", voucherNo: "V009", status: "Unpaid" },
    { studentName: "Hina Sheikh", className: "Class 10", monthlyFee: 4500, dueDate: "10 Feb 2025", issueDate: "01 Feb 2025", voucherNo: "V010", status: "Paid" },
];

const FeeVoucher = () => {
    const navigate = useNavigate()
    return (
        <Container sx={{ mt: 8 }}>
            <Grid container spacing={3}>
                {feeVouchers.map((voucher, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card sx={{ minWidth: 280, p: 2, boxShadow: 3, borderRadius: 2 }}>
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1976d2" }}>
                                    Fee Voucher - {voucher.voucherNo}
                                </Typography>
                                <Typography variant="body1">Name: <strong>{voucher.studentName}</strong></Typography>
                                <Typography variant="body1">Class: {voucher.className}</Typography>
                                <Typography variant="body1">Monthly Fee: <strong>PKR {voucher.monthlyFee}</strong></Typography>
                                <Typography variant="body1">Issue Date: {voucher.issueDate}</Typography>
                                <Typography variant="body1">Due Date: <strong style={{ color: "red" }}>{voucher.dueDate}</strong></Typography>
                                <Typography variant="body1" sx={{ mt: 1, color: voucher.status === "Paid" ? "green" : "red" }}>
                                    Status: <strong>{voucher.status}</strong>
                                </Typography>

                                <Grid container spacing={2} sx={{ mt: 2 }}>
                                    <Grid item xs={12}>
                                        <Button
                                            onClick={() => navigate('/fees/fees-submission')}
                                            variant="contained"
                                            size="large"
                                            color="primary"
                                            fullWidth
                                            startIcon={<Payment />}
                                            disabled={voucher.status === "Paid"}
                                        >
                                            Pay Now
                                        </Button>
                                    </Grid>
                                    {/* <Grid item xs={6}>
                                        <Button variant="outlined" color="secondary" fullWidth startIcon={<Download />}>
                                            Download
                                        </Button>
                                    </Grid> */}
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default FeeVoucher;
