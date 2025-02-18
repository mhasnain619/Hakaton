import React, { useState } from "react";
import Input from "../../Components/Input/Input";
import { Box, Button, Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import './StudentRegistration.css';
import CircularProgress from '@mui/material/CircularProgress';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../../FirebaseConfiq';

const StudentRegistrationForm = () => {
    let [openLoader, setOpenLoader] = useState(false)
    let [studentObj, setStudentObj] = useState({
        userName: '',
        userEmail: '',
        userNumber: '',
        userClass: '',
        gender: ''
    });

    const navigate = useNavigate();

    const handleSubmit = async () => {
        setOpenLoader(true)
        if (studentObj.userName == '' || studentObj.userEmail == '' || studentObj.userClass == '' || studentObj.gender == '' || studentObj.userNumber == '') {
            setOpenLoader(false)
            alert('Please fill all the fields')
            return;
        }
        try {
            const docRef = await addDoc(collection(db, "students"), studentObj);
            setStudentObj({ userName: '', userEmail: '', userClass: '', gender: '' });
            navigate('/student/student-list');
        } catch (error) {
            console.error("Error adding document: ", error);
        }
        setOpenLoader(false)
    };

    return (
        <Container sx={{ py: 8 }} maxWidth="sm">
            <Box className='formBox'>
                <Typography className="studentRegistrationName" variant="h4" gutterBottom>
                    Student Registration Form
                </Typography>
                <Input
                    type='text'
                    label="Student Name"
                    placeholder='Enter your full name'
                    value={studentObj.userName}
                    onChangeEvent={(e) => setStudentObj({ ...studentObj, userName: e.target.value })}
                />

                <Input
                    type='text'
                    label="Email"
                    placeholder='Enter your email'
                    value={studentObj.userEmail}
                    onChangeEvent={(e) => setStudentObj({ ...studentObj, userEmail: e.target.value })}
                />
                <Input
                    type='number'
                    label="Number"
                    placeholder='Enter your phone number'
                    value={studentObj.userNumber}
                    onChangeEvent={(e) => setStudentObj({ ...studentObj, userNumber: e.target.value })}
                />
                <Input
                    type='text'
                    label="Class"
                    placeholder='Enter your class'
                    value={studentObj.userClass}
                    onChangeEvent={(e) => setStudentObj({ ...studentObj, userClass: e.target.value })}
                />
                <FormControl component="fieldset" margin="normal" required>
                    <FormLabel>Gender</FormLabel>
                    <RadioGroup
                        row
                        name="gender"
                        value={studentObj.gender || 'N/A'}
                        onChange={(e) => setStudentObj({ ...studentObj, gender: e.target.value })}
                    >
                        <FormControlLabel value="Male" control={<Radio />} label="Male" />
                        <FormControlLabel value="Female" control={<Radio />} label="Female" />
                        <FormControlLabel value="Other" control={<Radio />} label="Other" />
                    </RadioGroup>
                </FormControl>
                <Button onClick={handleSubmit} size="large" variant="contained" color="primary" fullWidth>
                    {openLoader ? <CircularProgress size={24} sx={{ color: 'white' }} /> : "Register"}
                </Button>

            </Box>
        </Container>
    );
};

export default StudentRegistrationForm;
