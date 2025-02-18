import React, { useState } from "react";
import Input from "../../Components/Input/Input";
import { Box, Button, CircularProgress, Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import './StudentRegistration.css'
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../FirebaseConfiq";
const SchoolTeacherRegistration = () => {
    let [openLoader, setOpenLoader] = useState(false)

    let [schoolTeacherObj, setSchoolTeacherObj] = useState({
        teacherName: '',
        teacherEmail: '',
        teacherSchool: '',
        teacherClass: '',
        gender: ''
    });

    const navigate = useNavigate()

    const handleSubmit = async () => {
        setOpenLoader(true)
        if (schoolTeacherObj.teacherName == '' || schoolTeacherObj.teacherEmail == '' || schoolTeacherObj.teacherClass == '' || schoolTeacherObj.teacherSchool == '' || schoolTeacherObj.gender == '') {
            setOpenLoader(false)
            alert('Please fill all the fields')
            return;
        }
        try {
            const docRef = await addDoc(collection(db, "teachers"), schoolTeacherObj);
            setSchoolTeacherObj({ teacherName: '', teacherEmail: '', teacherClass: '', teacherSchool: '', gender: '' });
            navigate('/teacher/teacher-list');
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };
    return (
        <Container sx={{ py: 8 }} maxWidth="sm">
            <Box className='formBox'>
                <Typography className="studentRegistrationName" variant="h4" gutterBottom>
                    School Teacher Registration
                </Typography>
                <Input
                    type='text'
                    label="Name"
                    placeholder='Enter your full name'
                    value={schoolTeacherObj.teacherName}
                    onChangeEvent={(e) => setSchoolTeacherObj({ ...schoolTeacherObj, teacherName: e.target.value })}
                />
                <Input
                    type='text'
                    label="Email"
                    placeholder='Enter your email'
                    value={schoolTeacherObj.teacherEmail}
                    onChangeEvent={(e) => setSchoolTeacherObj({ ...schoolTeacherObj, teacherEmail: e.target.value })}
                />
                <Input
                    type='text'
                    label="School Name"
                    placeholder='Enter your school name'
                    value={schoolTeacherObj.teacherSchool}
                    onChangeEvent={(e) => setSchoolTeacherObj({ ...schoolTeacherObj, teacherSchool: e.target.value })}
                />
                <Input
                    type='text'
                    label="Class"
                    placeholder='Enter your class'
                    value={schoolTeacherObj.teacherClass}
                    onChangeEvent={(e) => setSchoolTeacherObj({ ...schoolTeacherObj, teacherClass: e.target.value })}
                />
                <FormControl component="fieldset" margin="normal" required>
                    <FormLabel>Gender</FormLabel>
                    <RadioGroup
                        row
                        name="gender"
                        value={schoolTeacherObj.gender || ''}
                        onChange={(e) => setSchoolTeacherObj({ ...schoolTeacherObj, gender: e.target.value })}
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

export default SchoolTeacherRegistration;
