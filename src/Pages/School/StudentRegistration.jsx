import React, { useState } from "react";
import Input from "../../Components/Input/Input";
import { Box, Button, CircularProgress, Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import './StudentRegistration.css'
import { collection, addDoc } from "firebase/firestore";
import { db } from '../../FirebaseConfiq';
const SchoolStudentRegistration = () => {
    let [openLoader, setOpenLoader] = useState(false)

    let [schoolStudentObj, setSchoolStudentObj] = useState({
        userName: '',
        userEmail: '',
        userClass: '',
        schoolStuSchoolName: '',
        gender: ''
    });

    const navigate = useNavigate()

    const handleSubmit = async () => {
        setOpenLoader(true)
        if (schoolStudentObj.userName == '' || schoolStudentObj.userEmail == '' || schoolStudentObj.userClass == '' || schoolStudentObj.schoolStuSchoolName == '' || schoolStudentObj.gender == '') {
            setOpenLoader(false)
            alert('Please fill all the fields')
            return;
        }
        try {
            const docRef = await addDoc(collection(db, "students"), schoolStudentObj);
            setSchoolStudentObj({ userName: '', userEmail: '', userClass: '', schoolStuSchoolName: '', gender: '' });
            navigate('/student/student-list');
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    return (
        <Container sx={{ py: 8 }} maxWidth="sm">
            <Box className='formBox'>
                <Typography className="studentRegistrationName" variant="h4" gutterBottom>
                    Student Registration Form
                </Typography>
                <Input
                    type='text'
                    label="Full Name"
                    placeholder='Enter your full name'
                    value={schoolStudentObj.userName}
                    onChangeEvent={(e) => setSchoolStudentObj({ ...schoolStudentObj, userName: e.target.value })}
                />
                <Input
                    type='text'
                    label="Email"
                    placeholder='Enter your email'
                    value={schoolStudentObj.userEmail}
                    onChangeEvent={(e) => setSchoolStudentObj({ ...schoolStudentObj, userEmail: e.target.value })}
                />
                <Input
                    type='text'
                    label="School Name"
                    placeholder='Enter your school name'
                    value={schoolStudentObj.schoolStuSchoolName}
                    onChangeEvent={(e) => setSchoolStudentObj({ ...schoolStudentObj, schoolStuSchoolName: e.target.value })}
                />
                <Input
                    type='text'
                    label="Class"
                    placeholder='Enter your class'
                    value={schoolStudentObj.userClass}
                    onChangeEvent={(e) => setSchoolStudentObj({ ...schoolStudentObj, userClass: e.target.value })}
                />
                <FormControl component="fieldset" margin="normal" required>
                    <FormLabel>Gender</FormLabel>
                    <RadioGroup
                        row
                        name="gender"
                        value={schoolStudentObj.gender || ''}
                        onChange={(e) => setSchoolStudentObj({ ...schoolStudentObj, gender: e.target.value })}
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

export default SchoolStudentRegistration;
