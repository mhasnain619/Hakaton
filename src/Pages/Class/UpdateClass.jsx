import React, { useEffect, useState } from "react";
import Input from "../../Components/Input/Input";
import { Box, Button, Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import './ClassForm.css'
import CircularProgress from '@mui/material/CircularProgress';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../FirebaseConfiq';
import { doc, updateDoc } from "firebase/firestore";

const UpdateClass = () => {
    const [data, setData] = React.useState([]);
    let [classUpdateObj, setClassUpdateObj] = useState({
        classUserFullName: '',
        classUserEmail: '',
        classUserPhone: '',
        classUserDate: '',
        classUserQualification: '',
        gender: ''
    });

    //  getting user object with id
    const { id } = useParams()
    // console.log(id);

    const navigate = useNavigate()

    React.useEffect(() => {
        const fetchClass = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "class"));
                const classData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setData(classData)
                // console.log(filterData);
            } catch (error) {
                console.error("Error fetching class:", error);
                setOpenLoader(false);
            }
        };
        fetchClass();
    }, []);
    React.useEffect(() => {
        let filterData = data?.filter((e) => e.id === id);
        if (filterData.length > 0) {
            setClassUpdateObj(filterData[0]);
        }
    }, [data]);

    const updateClass = () => {
        const update = updateDoc(doc(db, 'class', id), classUpdateObj)
        console.log('class object is ', update);
        setClassUpdateObj({ classUserFullName: '', classUserEmail: '', classUserPhone: '', classUserQualification: '', classUserDate: '', gender: '' });
        navigate('/class/class-list')
    };
    return (
        <Container sx={{ py: 8 }} maxWidth="sm">
            <Box className='formBox'>
                <Typography sx={{ fontWeight: 'bold' }} variant="h4" gutterBottom>
                    Update Class Registration Form
                </Typography>
                <Input
                    type='text'
                    label="Full Name"
                    placeholder='Enter your full name'
                    value={classUpdateObj.classUserFullName}
                    onChangeEvent={(e) => setClassUpdateObj({ ...classUpdateObj, classUserFullName: e.target.value })}
                />
                <Input
                    type='text'
                    label="Email"
                    placeholder='Enter your email'
                    value={classUpdateObj.classUserEmail}
                    onChangeEvent={(e) => setClassUpdateObj({ ...classUpdateObj, classUserEmail: e.target.value })}
                />
                <Input
                    type='number'
                    label="Phone Number"
                    placeholder='Enter your Phone Number'
                    value={classUpdateObj.classUserPhone}
                    onChangeEvent={(e) => setClassUpdateObj({ ...classUpdateObj, classUserPhone: e.target.value })}
                />
                <Input
                    type='date'
                    value={classUpdateObj.classUserDate}
                    onChangeEvent={(e) => setClassUpdateObj({ ...classUpdateObj, classUserDate: e.target.value })}
                />
                <Input
                    type='text'
                    label="Qualification"
                    placeholder='Enter your qualification'
                    value={classUpdateObj.classUserQualification}
                    onChangeEvent={(e) => setClassUpdateObj({ ...classUpdateObj, classUserQualification: e.target.value })}
                />
                <FormControl component="fieldset" margin="normal" required>
                    <FormLabel>Gender</FormLabel>
                    <RadioGroup
                        row
                        name="gender"
                        value={classUpdateObj.gender || ''}
                        onChange={(e) => setClassUpdateObj({ ...classUpdateObj, gender: e.target.value })}
                    >
                        <FormControlLabel value="Male" control={<Radio />} label="Male" />
                        <FormControlLabel value="Female" control={<Radio />} label="Female" />
                        <FormControlLabel value="Other" control={<Radio />} label="Other" />
                    </RadioGroup>
                </FormControl>
                <Button onClick={updateClass} size="large" variant="contained" color="primary" fullWidth>
                    Update
                </Button>
            </Box>
        </Container>
    );
};

export default UpdateClass;
