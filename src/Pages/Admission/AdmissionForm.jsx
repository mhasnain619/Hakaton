import React, { useState } from "react";
import Input from "../../Components/Input/Input";
import { Box, Button, CircularProgress, Container, FormControl, FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import './AdmissionForm.css'
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../FirebaseConfiq";
const AdmissionForm = () => {
    let [openLoader, setOpenLoader] = useState(false)

    let [admissionObj, setAdmissionObj] = useState({
        userName: '',
        userEmail: '',
        userNumber: '',
        userClass: '',
        userSchoolName: '',
        gender: ''
    });

    const navigate = useNavigate()

    // const handleSubmit = () => {
    //     console.log('asmossion obj is ', admissionObj);
    //     setAdmissionObj({ admissionObj: '', admissionLastName: '', userEmail: '', userNumber: '', admissionDate: '', admissionQualification: '', gender: '', admissionFor: '' });
    //     navigate('/student/student-list')
    // };
    const handleSubmit = async () => {
        setOpenLoader(true)
        if (admissionObj.userName == '' || admissionObj.userEmail == '' || admissionObj.userClass == '' || admissionObj.userNumber == '' || admissionObj.gender == '' || admissionObj.userSchoolName == '') {
            setOpenLoader(false)
            alert('Please fill all the fields')
            return;
        }
        try {
            const docRef = await addDoc(collection(db, "students"), admissionObj);
            setAdmissionObj({ userName: '', userEmail: '', userSchoolName: '', admissionDate: '', userNumber: '', gender: '' });
            navigate('/student/student-list');

        } catch (error) {
            console.error("Error adding document: ", error);
        }
        setOpenLoader(false)
    };

    return (
        <Container sx={{ py: 8 }} maxWidth="sm">
            <Box className='formBox'>
                <Typography sx={{ fontWeight: 'bold' }} variant="h4" gutterBottom>
                    Admission Form
                </Typography>
                <Input
                    type='text'
                    label="Name"
                    placeholder='Enter your full name'
                    value={admissionObj.userName}
                    onChangeEvent={(e) => setAdmissionObj({ ...admissionObj, userName: e.target.value })}
                />
                <Input
                    type='text'
                    label="Email"
                    placeholder='Enter your email'
                    value={admissionObj.userEmail}
                    onChangeEvent={(e) => setAdmissionObj({ ...admissionObj, userEmail: e.target.value })}
                />
                <Input
                    type='text'
                    label="School Name"
                    placeholder='Enter your school Nnme'
                    value={admissionObj.userSchoolName}
                    onChangeEvent={(e) => setAdmissionObj({ ...admissionObj, userSchoolName: e.target.value })}
                />
                <Input
                    type='number'
                    label="Phone Number"
                    placeholder='Enter your Phone Number'
                    value={admissionObj.userNumber}
                    onChangeEvent={(e) => setAdmissionObj({ ...admissionObj, userNumber: e.target.value })}
                />

                <Input
                    type='text'
                    label="Class"
                    placeholder='Enter your class'
                    value={admissionObj.userClass}
                    onChangeEvent={(e) => setAdmissionObj({ ...admissionObj, userClass: e.target.value })}
                />
                <FormControl component="fieldset" margin="normal" required>
                    <FormLabel>Gender</FormLabel>
                    <RadioGroup
                        row
                        name="gender"
                        value={admissionObj.gender || ''}
                        onChange={(e) => setAdmissionObj({ ...admissionObj, gender: e.target.value })}
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

export default AdmissionForm;
