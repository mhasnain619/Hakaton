import React, { useState } from "react";
import Input from "../../Components/Input/Input";
import { Box, Button, CircularProgress, Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import './ClassForm.css'
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../FirebaseConfiq";
const ClassForm = () => {
    let [openLoader, setOpenLoader] = useState(false)

    let [classObj, setClassObj] = useState({
        classUserFullName: '',
        classUserEmail: '',
        classUserPhone: '',
        classUserDate: '',
        classUserQualification: '',
        gender: ''
    });

    const navigate = useNavigate()

    const handleSubmit = async () => {
        setOpenLoader(true)
        if (classObj.classUserFullName == '' || classObj.classUserEmail == '' || classObj.classUserPhone == '' || classObj.classUserDate == '' || classObj.classUserQualification == '' || classObj.gender == '') {
            setOpenLoader(false)
            alert('Please fill all the fields')
            return;
        }
        try {
            const docRef = await addDoc(collection(db, "class"), classObj);
            setClassObj({ classUserFullName: '', classUserEmail: '', classUserPhone: '', classUserDate: '', classUserQualification: '', gender: '', })
            setOpenLoader(false)
            navigate('/class/class-list')
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }

    };

    return (
        <Container sx={{ py: 8 }} maxWidth="sm">
            <Box className='formBox'>
                <Typography sx={{ fontWeight: 'bold' }} variant="h4" gutterBottom>
                    Class Registration Form
                </Typography>
                <Input
                    type='text'
                    label="Name"
                    placeholder='Enter your full name'
                    value={classObj.classUserFullName}
                    onChangeEvent={(e) => setClassObj({ ...classObj, classUserFullName: e.target.value })}
                />
                <Input
                    type='text'
                    label="Email"
                    placeholder='Enter your email'
                    value={classObj.classUserEmail}
                    onChangeEvent={(e) => setClassObj({ ...classObj, classUserEmail: e.target.value })}
                />
                <Input
                    type='number'
                    label="Phone Number"
                    placeholder='Enter your Phone Number'
                    value={classObj.classUserPhone}
                    onChangeEvent={(e) => setClassObj({ ...classObj, classUserPhone: e.target.value })}
                />
                <Input
                    type='date'
                    value={classObj.classUserDate}
                    onChangeEvent={(e) => setClassObj({ ...classObj, classUserDate: e.target.value })}
                />
                <Input
                    type='text'
                    label="Qualification"
                    placeholder='Enter your last qualification'
                    value={classObj.classUserQualification}
                    onChangeEvent={(e) => setClassObj({ ...classObj, classUserQualification: e.target.value })}
                />
                <FormControl component="fieldset" margin="normal" required>
                    <FormLabel>Gender</FormLabel>
                    <RadioGroup
                        row
                        name="gender"
                        value={classObj.gender || ''}
                        onChange={(e) => setClassObj({ ...classObj, gender: e.target.value })}
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
            {/* <CustomizedTables data={userArray} /> */}
        </Container>
    );
};

export default ClassForm;
