import React, { useEffect, useState } from "react";
import Input from "../../Components/Input/Input";
import { Box, Button, Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import '../../Pages/Class/ClassForm.css'
import CircularProgress from '@mui/material/CircularProgress';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../FirebaseConfiq';
import { doc, updateDoc } from "firebase/firestore";
const UpdateStudent = () => {
    let [openLoader, setOpenLoader] = React.useState(false)
    const [data, setData] = React.useState([]);
    let [studentUpdateObj, setStudentUpdateObj] = useState({
        userName: '',
        schoolStuSchoolName: '',
        userClass: '',
        gender: '',
        userEmail: '',
    });
    const navigate = useNavigate()
    //  getting user object with id
    const { id } = useParams()
    // console.log(id);
    React.useEffect(() => {
        const fetchStudents = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "students"));
                const teacherData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setData(teacherData)
                // console.log(filterData);
            } catch (error) {
                console.error("Error fetching teachers:", error);
                setOpenLoader(false);
            }
        };
        fetchStudents();
    }, []);
    React.useEffect(() => {
        let filterData = data?.filter((e) => e.id === id);
        if (filterData.length > 0) {
            setStudentUpdateObj(filterData[0]);
        }
    }, [data]);

    const updateStudent = () => {
        const update = updateDoc(doc(db, 'students', id), studentUpdateObj)
        console.log('class object is ', update);
        setStudentUpdateObj({ userName: '', userEmail: '', userClass: '', schoolStuSchoolName: '', gender: '' });
        navigate('/student/student-list')
    };

    return (
        <Container sx={{ py: 8 }} maxWidth="sm">
            <Box className='formBox'>
                <Typography sx={{ fontWeight: 'bold' }} variant="h4" gutterBottom>
                    Update Student
                </Typography>
                <Input
                    type='text'
                    label="Student Name"
                    placeholder='Enter your full name'
                    value={studentUpdateObj.userName}
                    onChangeEvent={(e) => setStudentUpdateObj({ ...studentUpdateObj, userName: e.target.value })}
                />
                <Input
                    type='text'
                    label="School Name"
                    placeholder='Enter your last name'
                    value={studentUpdateObj.schoolStuSchoolName}
                    onChangeEvent={(e) => setStudentUpdateObj({ ...studentUpdateObj, schoolStuSchoolName: e.target.value })}
                />
                <Input
                    type='text'
                    label="Class"
                    placeholder='Enter your Class'
                    value={studentUpdateObj.userClass}
                    onChangeEvent={(e) => setStudentUpdateObj({ ...studentUpdateObj, userClass: e.target.value })}
                />
                <Input
                    type='text'
                    label="Email"
                    placeholder='Enter your email'
                    value={studentUpdateObj.userEmail}
                    onChangeEvent={(e) => setStudentUpdateObj({ ...studentUpdateObj, userEmail: e.target.value })}
                />
                <FormControl component="fieldset" margin="normal" required>
                    <FormLabel>Gender</FormLabel>
                    <RadioGroup
                        row
                        name="gender"
                        value={studentUpdateObj.gender || ''}
                        onChange={(e) => setStudentUpdateObj({ ...studentUpdateObj, gender: e.target.value })}
                    >
                        <FormControlLabel value="Male" control={<Radio />} label="Male" />
                        <FormControlLabel value="Female" control={<Radio />} label="Female" />
                        <FormControlLabel value="Other" control={<Radio />} label="Other" />
                    </RadioGroup>
                </FormControl>
                <Button onClick={updateStudent} size="large" variant="contained" color="primary" fullWidth>
                    {openLoader ? <CircularProgress size={24} sx={{ color: 'white' }} /> : "Update"}
                </Button>
            </Box>
        </Container>
    );
};

export default UpdateStudent;
