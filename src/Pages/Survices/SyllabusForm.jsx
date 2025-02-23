import React, { useState } from "react";
import Input from "../../Components/Input/Input";
import { Box, Button, CircularProgress, Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import './SyllabusForm.css'
import { collection, addDoc } from "firebase/firestore";
import { db } from '../../FirebaseConfiq';
const SyllabusForm = () => {
    let [openLoader, setOpenLoader] = useState(false)

    let [syllabusObj, setSyllabusObj] = useState({
        syllabusName: '',
        syllabusClass: '',
        syllabusFile: ''
    });

    const navigate = useNavigate()

    const handleSubmit = async () => {
        setOpenLoader(true)
        if (syllabusObj.syllabusName == '' || syllabusObj.syllabusClass == '' || syllabusObj.syllabusFile == '') {
            setOpenLoader(false)
            alert('Please fill all the fields')
            return;
        }
        try {
            console.log("Firestore instance: ", db);
            const docRef = await addDoc(collection(db, "syllabus"), syllabusObj);
            console.log("Document written with ID: ", syllabusObj);
            setSyllabusObj({ syllabusName: '', syllabusClass: '', syllabusFile: '' });
            navigate('/syllabus/syllabus-list');
        } catch (error) {
            console.error("Error adding document: ", error);
        }
        setOpenLoader(false)
    };

    return (
        <Container sx={{ py: 8 }} maxWidth="sm">
            <Box className='formBox'>
                <Typography className="addSyllabusName" sx={{ fontWeight: 'bold' }} variant="h4" gutterBottom>
                    Add Syllabus
                </Typography>
                <Input
                    type='text'
                    label="Subject Name"
                    placeholder='Enter your subject name'
                    value={syllabusObj.syllabusName}
                    onChangeEvent={(e) => setSyllabusObj({ ...syllabusObj, syllabusName: e.target.value })}
                />

                <Input
                    type='text'
                    label="Class"
                    placeholder='Enter your class'
                    value={syllabusObj.syllabusClass}
                    onChangeEvent={(e) => setSyllabusObj({ ...syllabusObj, syllabusClass: e.target.value })}
                />
                <Input
                    type='file'
                    value={syllabusObj.syllabusFile}
                    onChangeEvent={(e) => setSyllabusObj({ ...syllabusObj, syllabusFile: e.target.value })}
                />

                <Button onClick={handleSubmit} size="large" variant="contained" color="primary" fullWidth>
                    {openLoader ? <CircularProgress size={24} sx={{ color: 'white' }} /> : "Add"}
                </Button>
            </Box>
        </Container>
    );
};

export default SyllabusForm;
