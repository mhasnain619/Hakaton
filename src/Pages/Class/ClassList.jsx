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
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from '../../FirebaseConfiq';
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
export default function ClassList() {
    let [refresh, setRefresh] = React.useState(false)
    const [classes, setClasses] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const navigate = useNavigate()
    React.useEffect(() => {
        const fetchClassess = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "class"));
                const classData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setClasses(classData);
            } catch (error) {
                console.error("Error fetching teachers:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchClassess();
    }, [refresh]);

    const deleteClass = async (id) => {
        await deleteDoc(doc(db, "class", id));
        setLoading(true);
        setRefresh(!refresh)
    }
    const goToAddClassList = () => {
        navigate('/class/class-form')
    }
    const goToUpdateClass = (id) => {
        navigate(`/class/class-list/${id}`)
    }
    return (
        <Box sx={{ display: 'inline-block', width: '100%', marginTop: '50px !important' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <Typography variant='h4' sx={{ fontSize: '23px', fontWeight: '600', color: '#474749' }}>
                    Class List
                </Typography>
                <Button onClick={goToAddClassList} size='medium' variant='contained'>
                    Add New Class
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Id</StyledTableCell>
                            <StyledTableCell>Full Name</StyledTableCell>
                            <StyledTableCell>Qualification</StyledTableCell>
                            <StyledTableCell>Phone</StyledTableCell>
                            <StyledTableCell>Date</StyledTableCell>
                            <StyledTableCell>Gender</StyledTableCell>
                            <StyledTableCell>E-mail</StyledTableCell>
                            <StyledTableCell>Controls</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (<TableRow>
                            <TableCell colSpan={9} align="center">
                                <CircularProgress />
                            </TableCell>
                        </TableRow>) : classes.length > 0 ? (
                            classes.map((clas) => (
                                <StyledTableRow key={clas.id}>
                                    <StyledTableCell>{clas.id ? clas.id.slice(0, 5) : 'N/A'}</StyledTableCell>
                                    <StyledTableCell>{clas.classUserFullName || 'N/A'}</StyledTableCell>
                                    <StyledTableCell>{clas.classUserQualification || 'N/A'}</StyledTableCell>
                                    <StyledTableCell>{clas.classUserPhone || 'N/A'}</StyledTableCell>
                                    <StyledTableCell>{clas.classUserDate || 'N/A'}</StyledTableCell>
                                    <StyledTableCell>{clas.gender || 'N/A'}</StyledTableCell>
                                    <StyledTableCell>{clas.classUserEmail || 'N/A'}</StyledTableCell>
                                    <Box className='controls'>
                                        <Button onClick={() => deleteClass(clas.id)} sx={{ mx: 1 }} variant='contained'>Delete</Button>
                                        <Button onClick={() => goToUpdateClass(clas.id)} sx={{ mx: 1 }} variant='contained'>Update</Button>
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