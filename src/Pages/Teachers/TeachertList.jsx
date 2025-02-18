import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../FirebaseConfiq';
import { doc, deleteDoc } from "firebase/firestore";
import './TeacherRegistration.css'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function TeacherList() {
    let [refresh, setRefresh] = React.useState(false)
    const [teachers, setTeachers] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const navigate = useNavigate();

    React.useEffect(() => {
        const fetchTeachers = async () => {
            setLoading(true)
            try {
                const querySnapshot = await getDocs(collection(db, "teachers"));
                const teacherData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setTeachers(teacherData);
            } catch (error) {
                console.error("Error fetching teachers:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTeachers();
    }, [refresh]);
    const deleteStudent = async (id) => {
        await deleteDoc(doc(db, "teachers", id));
        setRefresh(!refresh)
    }
    const goToAddTeacher = () => {
        navigate('/teacher/teacher-registration');
    };

    const goToUpdateTeacher = (id) => {
        navigate(`/teacher/teacher-list/${id}`);
    };

    return (
        <Box sx={{ display: 'inline-block', width: '100%', marginTop: '50px !important' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <Typography variant='h4' sx={{ fontSize: '23px', fontWeight: '600', color: '#474749' }}>
                    Teacher List
                </Typography>
                <Button onClick={goToAddTeacher} size='medium' variant='contained'>
                    Add New Teacher
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Id</StyledTableCell>
                            <StyledTableCell>Teacher Name</StyledTableCell>
                            <StyledTableCell>School Name</StyledTableCell>
                            <StyledTableCell>Class</StyledTableCell>
                            <StyledTableCell>Email</StyledTableCell>
                            <StyledTableCell>Number</StyledTableCell>
                            <StyledTableCell>Gender</StyledTableCell>
                            <StyledTableCell>Controls</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={9} align="center">
                                    <CircularProgress />
                                </TableCell>
                            </TableRow>
                        ) : teachers.length > 0 ? (
                            teachers.map((teacher) => (
                                <StyledTableRow key={teacher.id}>
                                    <StyledTableCell>{teacher.id ? teacher.id.slice(0, 5) : 'N/A'}</StyledTableCell>
                                    <StyledTableCell>{teacher.teacherName || 'N/A'}</StyledTableCell>
                                    <StyledTableCell>{teacher.teacherSchool || 'N/A'}</StyledTableCell>
                                    <StyledTableCell>{teacher.teacherClass || 'N/A'}</StyledTableCell>
                                    <StyledTableCell>{teacher.teacherEmail || 'N/A'}</StyledTableCell>
                                    <StyledTableCell>{teacher.teacherNumber || 'N/A'}</StyledTableCell>
                                    <StyledTableCell>{teacher.gender || 'N/A'}</StyledTableCell>
                                    <Box className='controls'>
                                        <Button onClick={() => deleteStudent(teacher.id)} sx={{ mx: 1 }} variant='contained'>Delete</Button>
                                        <Button onClick={() => goToUpdateTeacher(teacher.id)} sx={{ mx: 1 }} variant='contained'>Update</Button>
                                    </Box>
                                </StyledTableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={9} align="center">
                                    No Data Available
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
