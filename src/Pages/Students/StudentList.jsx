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
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function StudentList() {
    let [refresh, setRefresh] = React.useState(false)
    let [openLoader, setOpenLoader] = React.useState(false)
    const [students, setStudents] = React.useState([])
    const navigate = useNavigate()
    React.useEffect(() => {
        const fetchStudents = async () => {
            setOpenLoader(true)
            try {
                const querySnapshot = await getDocs(collection(db, "students"));
                const studentData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setStudents(studentData)
            } catch (error) {
                console.error("Error fetching students:", error);
            }
            setOpenLoader(false)
        }
        fetchStudents()
    }, [refresh])
    const deleteStudent = async (id) => {
        await deleteDoc(doc(db, "students", id));
        setRefresh(!refresh)
    }
    const goToAddStudent = () => {
        navigate('/student/student-registration')
    }
    const GotoUpdateStudent = (id) => {
        navigate(`/student/student-list/${id}`)
    }

    return (
        <Box sx={{ display: 'inline-block', width: '100%', marginTop: '50px !important' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <Typography variant='h4' sx={{ fontSize: '23px', fontWeight: '600', color: '#474749' }}>
                    Student List
                </Typography>
                <Button onClick={goToAddStudent} size='medium' variant='contained'>
                    Add New Student
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead sx={{}}>
                        <TableRow>
                            <StyledTableCell>Id</StyledTableCell>
                            <StyledTableCell>Student Name</StyledTableCell>
                            <StyledTableCell>School Name</StyledTableCell>
                            <StyledTableCell>Class</StyledTableCell>
                            <StyledTableCell>E-mail</StyledTableCell>
                            <StyledTableCell>Number</StyledTableCell>
                            <StyledTableCell>Gender</StyledTableCell>
                            <StyledTableCell>Controls</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {openLoader ? (
                            <TableRow>
                                <TableCell colSpan={8} align="center">
                                    <CircularProgress />
                                </TableCell>
                            </TableRow>
                        ) : students.length > 0 ? (
                            students.map((e, i) => (
                                <StyledTableRow key={i}>
                                    <StyledTableCell>{e.id ? e.id.slice(0, 5) : 'N/A'}</StyledTableCell>
                                    <StyledTableCell>{e.userName || 'N/A'}</StyledTableCell>
                                    <StyledTableCell>{e.schoolStuSchoolName || 'N/A'}</StyledTableCell>
                                    <StyledTableCell>{e.userClass || 'N/A'}</StyledTableCell>
                                    <StyledTableCell>{e.userEmail || 'N/A'}</StyledTableCell>
                                    <StyledTableCell>{e.userNumber || 'N/A'}</StyledTableCell>
                                    <StyledTableCell>{e.gender || 'N/A'}</StyledTableCell>
                                    <Box className='controls'>
                                        <Button onClick={() => deleteStudent(e.id)} sx={{ mx: 1 }} variant='contained'>Delete</Button>
                                        <Button onClick={() => GotoUpdateStudent(e.id)} sx={{ mx: 1 }} variant='contained'>Update</Button>
                                    </Box>
                                </StyledTableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={8} align="center">
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