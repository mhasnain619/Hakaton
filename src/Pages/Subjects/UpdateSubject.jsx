import React, { useEffect, useState } from "react";
import Input from "../../Components/Input/Input";
import { Box, Button, Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import './AddSubject.css'
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../FirebaseConfiq";
import { doc, updateDoc } from "firebase/firestore";

const UpdateSubject = () => {
    const [loading, setLoading] = React.useState(true);
    const [data, setData] = React.useState([]);
    let [subjectUpdateObj, setSubjectUpdateObj] = useState({
        subjectName: '',
        subjectClass: '',
        selectGroup: ''
    });
    let navigate = useNavigate()
    //  getting user object with id
    const { id } = useParams()
    React.useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "subjects"));
                const subjectData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setData(subjectData)
            } catch (error) {
                console.error("Error fetching teachers:", error);
                setLoading(false);
            }
        };
        fetchSubjects();
    }, []);
    React.useEffect(() => {
        let filterData = data?.filter((e) => e.id === id);
        if (filterData.length > 0) {
            setSubjectUpdateObj(filterData[0]);
        }
    }, [data]);
    const updateNewSubject = () => {
        const update = updateDoc(doc(db, 'subjects', id), subjectUpdateObj)
        console.log('class object is ', update);
        setSubjectUpdateObj({ subjectName: '', subjectClass: '', selectGroup: '' });
        navigate('/subject/subject-list')
    };

    return (
        <Container sx={{ py: 8 }} maxWidth="sm">
            <Box className='formBox'>
                <Typography sx={{ fontWeight: 'bold' }} variant="h4" gutterBottom>
                    Update Subject
                </Typography>
                <Input
                    type='text'
                    label="Subject Name"
                    placeholder='Enter your first name'
                    value={subjectUpdateObj.subjectName}
                    onChangeEvent={(e) => setSubjectUpdateObj({ ...subjectUpdateObj, subjectName: e.target.value })}
                />
                <Input
                    type='text'
                    label="Class"
                    placeholder='Enter your class'
                    value={subjectUpdateObj.subjectClass}
                    onChangeEvent={(e) => setSubjectUpdateObj({ ...subjectUpdateObj, subjectClass: e.target.value })}
                />
                <FormControl component="fieldset" margin="normal" required>
                    <FormLabel>Group</FormLabel>
                    <RadioGroup
                        row
                        name="Group"
                        value={subjectUpdateObj.selectGroup || ''}
                        onChange={(e) => setSubjectUpdateObj({ ...subjectUpdateObj, selectGroup: e.target.value })}
                    >
                        <FormControlLabel value="General-Science" control={<Radio />} label="General-Science" />
                        <FormControlLabel value="Pre-Engineering" control={<Radio />} label="Pre-Engineering" />
                        <FormControlLabel value="Other" control={<Radio />} label="Other" />
                    </RadioGroup>
                </FormControl>
                <Button onClick={updateNewSubject} size="large" variant="contained" color="primary" fullWidth>
                    Update
                </Button>
            </Box>
        </Container>
    );
};

export default UpdateSubject;
