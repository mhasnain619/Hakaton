import React, { useEffect, useState } from "react";
import Input from "../../Components/Input/Input";
import { Box, Button, Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import '../../Pages/Class/ClassForm.css'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../FirebaseConfiq';
import { doc, updateDoc } from "firebase/firestore";
const Updateteacher = () => {
    const [loading, setLoading] = React.useState(true);
    const [data, setData] = React.useState([]);
    let [teacherUpdateObj, setTeacherUpdateObj] = useState({
        teacherName: '',
        teacherSchool: '',
        teacherClass: '',
        gender: '',
        teacherEmail: '',
    });
    let navigate = useNavigate()
    //  getting user object with id
    const { id } = useParams()
    // console.log(id);
    React.useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "teachers"));
                const teacherData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setData(teacherData)
                // console.log(filterData);
            } catch (error) {
                console.error("Error fetching teachers:", error);
                setLoading(false);
            }
        };
        fetchTeachers();
    }, []);
    React.useEffect(() => {
        let filterData = data?.filter((e) => e.id === id);
        if (filterData.length > 0) {
            setTeacherUpdateObj(filterData[0]);
        }
    }, [data]);



    const updateteacher = () => {
        const update = updateDoc(doc(db, 'teachers', id), teacherUpdateObj)
        console.log('class object is ', teacherUpdateObj);
        setTeacherUpdateObj({ teacherName: '', teacherEmail: '', gender: '', teacherClass: '', teacherSchool: '' });
        navigate('/teacher/teacher-list')
    };

    return (
        <Container sx={{ py: 8 }} maxWidth="sm">
            <Box className='formBox'>
                <Typography sx={{ fontWeight: 'bold' }} variant="h4" gutterBottom>
                    Update teacher Registration Form
                </Typography>
                <Input
                    type='text'
                    label="Name"
                    placeholder='Enter your full name'
                    value={teacherUpdateObj.teacherName}
                    onChangeEvent={(e) => setTeacherUpdateObj({ ...teacherUpdateObj, teacherName: e.target.value })}
                />
                <Input
                    type='text'
                    label="School Name"
                    placeholder='Enter your last name'
                    value={teacherUpdateObj.teacherSchool}
                    onChangeEvent={(e) => setTeacherUpdateObj({ ...teacherUpdateObj, teacherSchool: e.target.value })}
                />
                <Input
                    type='text'
                    label="Class"
                    placeholder='Enter your Class'
                    value={teacherUpdateObj.teacherClass}
                    onChangeEvent={(e) => setTeacherUpdateObj({ ...teacherUpdateObj, teacherClass: e.target.value })}
                />
                <Input
                    type='text'
                    label="Email"
                    placeholder='Enter your email'
                    value={teacherUpdateObj.teacherEmail}
                    onChangeEvent={(e) => setTeacherUpdateObj({ ...teacherUpdateObj, teacherEmail: e.target.value })}
                />
                <FormControl component="fieldset" margin="normal" required>
                    <FormLabel>Gender</FormLabel>
                    <RadioGroup
                        row
                        name="gender"
                        value={teacherUpdateObj.gender || ''}
                        onChange={(e) => setTeacherUpdateObj({ ...teacherUpdateObj, gender: e.target.value })}
                    >
                        <FormControlLabel value="Male" control={<Radio />} label="Male" />
                        <FormControlLabel value="Female" control={<Radio />} label="Female" />
                        <FormControlLabel value="Other" control={<Radio />} label="Other" />
                    </RadioGroup>
                </FormControl>
                <Button onClick={updateteacher} size="large" variant="contained" color="primary" fullWidth>
                    Update
                </Button>
            </Box>
        </Container>
    );
};

export default Updateteacher;
