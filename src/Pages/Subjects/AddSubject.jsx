import React, { useState } from "react";
import Input from "../../Components/Input/Input";
import { Box, Button, CircularProgress, Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import './AddSubject.css'
import { collection, addDoc } from "firebase/firestore";
import { db } from '../../FirebaseConfiq';

const SubjectRegistrationForm = () => {
    let [openLoader, setOpenLoader] = useState(false)
    let [subjectObj, setSubjectObj] = useState({
        subjectName: '',
        subjectClass: '',
        selectGroup: ''
    });

    const navigate = useNavigate()

    const handleSubmit = async () => {
        setOpenLoader(true)
        if (subjectObj.subjectName == '' || subjectObj.subjectClass == '' || subjectObj.selectGroup == '') {
            setOpenLoader(false)
            alert('Please fill all the fields')
            return;
        }
        try {
            console.log("Firestore instance: ", db);
            const docRef = await addDoc(collection(db, "subjects"), subjectObj);
            console.log("Document written with ID: ", docRef.id);
            setSubjectObj({ subjectName: '', subjectClass: '', selectGroup: '' });
            navigate('/subject/subject-list');
        } catch (error) {
            console.error("Error adding document: ", error);
        }
        setOpenLoader(false)
    };
    return (
        <Container sx={{ py: 8 }} maxWidth="sm">
            <Box className='formBox'>
                <Typography className="addSubName" sx={{ fontWeight: 'bold' }} variant="h4" gutterBottom>
                    Add Subject
                </Typography>
                <Input
                    type='text'
                    label="Subject Name"
                    placeholder='Enter your subject name'
                    value={subjectObj.subjectName}
                    onChangeEvent={(e) => setSubjectObj({ ...subjectObj, subjectName: e.target.value })}
                />

                <Input
                    type='text'
                    label="Class"
                    placeholder='Enter your class'
                    value={subjectObj.subjectClass}
                    onChangeEvent={(e) => setSubjectObj({ ...subjectObj, subjectClass: e.target.value })}
                />
                <FormControl component="fieldset" margin="normal" required>
                    <FormLabel>Select Group</FormLabel>
                    <RadioGroup
                        row
                        name="selectGroup"
                        value={subjectObj.selectGroup || ''}
                        onChange={(e) => setSubjectObj({ ...subjectObj, selectGroup: e.target.value })}
                    >
                        <FormControlLabel value="General-Science" control={<Radio />} label="General-Science" />
                        <FormControlLabel value="Pre-Engineering" control={<Radio />} label="Pre-Engineering" />
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

export default SubjectRegistrationForm;
