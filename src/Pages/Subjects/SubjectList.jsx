import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddSubject.css'
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

export default function SubjectList() {
    let [refresh, setRefresh] = React.useState(false)
    let [openLoader, setOpenLoader] = React.useState(false)
    const [subjects, setSubjects] = React.useState([])
    const navigate = useNavigate()
    React.useEffect(() => {
        const fetchSubjects = async () => {
            setOpenLoader(true)
            try {
                const querySnapshot = await getDocs(collection(db, "subjects"));
                const subjectData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setSubjects(subjectData)
            } catch (error) {
                console.error("Error fetching subjects:", error);
            }
            setOpenLoader(false)
        }
        fetchSubjects()
    }, [refresh])
    const deleteSubject = async (id) => {
        await deleteDoc(doc(db, "subjects", id));
        setRefresh(!refresh)
    }
    const goToAddSubject = () => {
        navigate('/subject/add-subject')
    }
    const GotoUpdateSubject = (id) => {
        navigate(`/subject/subject-list/${id}`)
    }
    return (
        <Box sx={{ display: 'inline-block', width: '100%', marginTop: '50px !important' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <Typography variant='h4' sx={{ fontSize: '23px', fontWeight: '600', color: '#474749' }}>
                    Subject List
                </Typography>
                <Button onClick={goToAddSubject} size='medium' variant='contained'>
                    Add New Subject
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Id</StyledTableCell>
                            <StyledTableCell>Subject Name</StyledTableCell>
                            <StyledTableCell>Class</StyledTableCell>
                            <StyledTableCell>Group</StyledTableCell>
                            <StyledTableCell>Controls</StyledTableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            openLoader ? (
                                <TableRow>
                                    <TableCell colSpan={8} align="center">
                                        <CircularProgress />
                                    </TableCell>
                                </TableRow>
                            ) : subjects.length > 0 ? (
                                subjects.map((e, i) => (
                                    <StyledTableRow key={i}>
                                        <StyledTableCell component="th" scope="row">
                                            {e.id ? e.id.slice(0, 5) : 'N/A'}
                                        </StyledTableCell>
                                        <StyledTableCell component="th" scope="row">
                                            {e.subjectName || 'N/A'}
                                        </StyledTableCell>
                                        <StyledTableCell>{e.subjectClass || 'N/A'}</StyledTableCell>
                                        <StyledTableCell>{e.selectGroup || 'N/A'}</StyledTableCell>
                                        <Box className='controls'>
                                            <Button onClick={() => deleteSubject(e.id)} sx={{ mx: 1 }} variant='contained'>Delete</Button>
                                            <Button onClick={() => GotoUpdateSubject(e.id)} sx={{ mx: 1 }} variant='contained'>Update</Button>
                                        </Box>
                                    </StyledTableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={8} align="center">
                                        No Data Available
                                    </TableCell>
                                </TableRow>
                            )
                        }

                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}