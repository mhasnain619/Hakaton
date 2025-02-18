import React, { useState } from "react";
import Input from "../../Components/Input/Input";
import { Box, Button, CircularProgress, Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import './TeacherRegistration.css'
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../FirebaseConfiq";
const TeacherRegistrationForm = () => {
    let [openLoader, setOpenLoader] = useState(false)
    let [teacherObj, setTeacherObj] = useState({
        teacherName: '',
        teacherSchool: '',
        teacherClass: '',
        teacherNumber: '',
        teacherEmail: '',
        gender: ''
    });

    const navigate = useNavigate()

    const handleSubmit = async () => {
        setOpenLoader(true)
        if (teacherObj.teacherName == '' || teacherObj.gender == '' || teacherObj.teacherEmail == '' || teacherObj.teacherClass == '' || teacherObj.teacherNumber == '') {
            setOpenLoader(false)
            alert('Please fill all the fields')
            return;
        }
        try {
            const docRef = await addDoc(collection(db, "teachers"), teacherObj);
            setTeacherObj({ teacherName: '', gender: '', teacherEmail: '', teacherClass: '', teacherSchool: '', })
            setOpenLoader(false)
            navigate('/teacher/teacher-list')
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }

    };

    return (
        <Container sx={{ py: 8 }} maxWidth="sm">
            <Box className='formBox'>
                <Typography className="teacherRegistrationName" variant="h4" gutterBottom>
                    Teacher Registration Form
                </Typography>
                <Input
                    type='text'
                    label="Teacher Name"
                    placeholder='Enter your full name'
                    value={teacherObj.teacherName}
                    onChangeEvent={(e) => setTeacherObj({ ...teacherObj, teacherName: e.target.value })}
                />
                <Input
                    type='text'
                    label="School Name"
                    placeholder='Enter your school namae'
                    value={teacherObj.teacherSchool}
                    onChangeEvent={(e) => setTeacherObj({ ...teacherObj, teacherSchool: e.target.value })}
                />
                <Input
                    type='text'
                    label="Class"
                    placeholder='Enter your class'
                    value={teacherObj.teacherClass}
                    onChangeEvent={(e) => setTeacherObj({ ...teacherObj, teacherClass: e.target.value })}
                />
                <Input
                    type='number'
                    label="Number"
                    placeholder='Enter your phone number'
                    value={teacherObj.teacherNumber}
                    onChangeEvent={(e) => setTeacherObj({ ...teacherObj, teacherNumber: e.target.value })}
                />
                <Input
                    type='email'
                    label="Teacher Email"
                    placeholder='Enter your email'
                    value={teacherObj.teacherEmail}
                    onChangeEvent={(e) => setTeacherObj({ ...teacherObj, teacherEmail: e.target.value })}
                />
                <FormControl component="fieldset" margin="normal" required>
                    <FormLabel>Gender</FormLabel>
                    <RadioGroup
                        row
                        name="gender"
                        value={teacherObj.gender || ''}
                        onChange={(e) => setTeacherObj({ ...teacherObj, gender: e.target.value })}
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

export default TeacherRegistrationForm;
