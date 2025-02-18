import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { FaHome } from "react-icons/fa";
import { useNavigate, Outlet, Link, useLocation } from "react-router-dom";
import jawan from '../../assets/jawan.png';
import { FaUser } from "react-icons/fa";
import { MdContactPage, MdExpandLess, MdExpandMore, MdFeed, MdOutlineAdminPanelSettings } from "react-icons/md";
import './Dashboard.css'
import { Avatar, Button, Collapse, Menu, MenuItem, Tooltip } from '@mui/material';
import { PiExamFill, PiStudentBold } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { MdOutlineSubject } from "react-icons/md";
import { FaBook } from "react-icons/fa";
import { BiSolidSchool } from "react-icons/bi";
import { SiGoogleclassroom } from "react-icons/si";

// import './Layout.css'
const drawerWidth = 230;

function ResponsiveDrawer(props) {
    const navigate = useNavigate();
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [isClosing, setIsClosing] = React.useState(false);
    const [openMenus, setOpenMenus] = React.useState({});
    let location = useLocation()
    const currentPath = location.pathname
    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };


    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleToggle = (name) => {
        setOpenMenus((prev) => ({
            ...prev,
            [name]: !prev[name],
        }));
    };
    const handleLogout = () => {
        localStorage.removeItem('uid')
        navigate('/login')
    }

    const pages = [
        { name: "Home", icon: <FaHome />, route: "/home" },
        {
            name: "Admission", icon: <MdOutlineAdminPanelSettings />, children: [
                { name: "Admission Form", route: "/admission/admission-form" },

            ]
        },

        {
            name: "Students", icon: <PiStudentBold />, children: [
                { name: "Student Registration", route: "/student/student-registration" },
                { name: "Student List", route: "/student/student-list" }
            ]
        },
        {
            name: "Teachers", icon: <FaChalkboardTeacher />, children: [
                { name: "Teacher Registration", route: "/teacher/teacher-registration" },
                { name: "Teacher List", route: "/teacher/teacher-list" }
            ]
        },
        {
            name: "Subjects", icon: <MdOutlineSubject />, children: [
                { name: "Add Subject", route: "/subject/add-subject" },
                { name: "Subjects List", route: "/subject/subject-list" }
            ]
        },
        {
            name: "Syllabus", icon: <FaBook />, children: [
                { name: "Add Syllabus", route: "/syllabus/add-syllabus" },
                { name: "Syllabus List", route: "/syllabus/syllabus-list" }
            ]
        },
        {
            name: "School", icon: <BiSolidSchool />, children: [
                { name: "Student Registration", route: "/school/school-student-registration" },
                { name: "Teacher Registration", route: "/school/school-teacher-registration" }
            ]
        },
        {
            name: "Class", icon: <SiGoogleclassroom />, children: [
                { name: "Class Form", route: "/class/class-form" },
                { name: "Class List", route: "/class/class-list" }
            ]
        },

        {
            name: "Fees", icon: <MdFeed />, children: [
                { name: "Fees Structure", route: "/fees/fees-structure" },
                { name: "Fees Voucher", route: "/fees/fees-voucher" },
                { name: "Fees Submission", route: "/fees/fees-submission" },

            ]
        },
        {
            name: "Exam", icon: <PiExamFill />, children: [
                { name: "Exam Schedule", route: "/exam/exam-schedule" },
                { name: "Exam Result", route: "/exam/exam-result" },
            ]
        },
        { name: "Contact Us", icon: <MdContactPage />, route: "/contact" },
    ];

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            {/* <Toolbar /> */}
            <div className="logo">
                <Link to='/'>
                    <img className="logoImage" height='100%' width='100%' src={jawan} alt="" />
                </Link>
            </div>
            <Divider />
            <List>
                {pages.map((obj, index) => (
                    <div key={index}>
                        <ListItem sx={{ background: obj.route === currentPath ? "#E1E1E2" : '' }} disablePadding>
                            <ListItemButton onClick={() => obj.children ? handleToggle(obj.name) : navigate(obj.route)}>
                                <ListItemIcon sx={{ minWidth: "35px", fontSize: "20px" }}>{obj.icon}</ListItemIcon>
                                <ListItemText primary={obj.name} />
                                {obj.children && (openMenus[obj.name] ? <MdExpandLess /> : <MdExpandMore />)}
                            </ListItemButton>
                        </ListItem>

                        {obj.children && (
                            <Collapse in={openMenus[obj.name]} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {obj.children.map((child, idx) => (
                                        <ListItem sx={{ background: child.route === currentPath ? "#E1E1E2" : '' }} key={idx} disablePadding>
                                            <ListItemButton sx={{ pl: 4 }} onClick={() => {
                                                navigate(child.route)
                                            }}>
                                                <ListItemText primary={child.name} />
                                            </ListItemButton>
                                        </ListItem>
                                    ))}
                                </List>
                            </Collapse>
                        )}
                    </div>
                ))}
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />

            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h5" noWrap component="div">
                        LMS
                    </Typography>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <FaUser style={{ color: 'white' }} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem onClick={() => { handleCloseUserMenu(); navigate('/profile'); }}>
                                Profile
                            </MenuItem>
                            <MenuItem onClick={() => { handleCloseUserMenu(); navigate('/'); }}>
                                Dashboard
                            </MenuItem>
                            <MenuItem onClick={() => { handleCloseUserMenu(); handleLogout(); }}>
                                Logout
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="menu items"
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: "none", sm: "block" },
                        "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{
                    display: 'flex',
                    justifyContent: 'start',
                    alignItems: 'center',
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                }}
            >

                {document.location.pathname === '/' && <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px', py: 6 }}>
                    <h3>
                        Welcome to the Learning Management System (LMS)
                    </h3>

                    <p>
                        This platform is designed to streamline and enhance the management of educational institutions.
                    </p>
                    <h3>
                        Key Features :
                    </h3>
                    <h3>
                        Student Management :
                    </h3>
                    <p>
                        Register students, maintain student lists, and manage their profiles efficiently.
                    </p>

                    <h3>
                        Teacher Management :
                    </h3>
                    <p>
                        Add new teachers, update information, and keep track of their assigned classes and subjects.
                    </p>
                    <h3>
                        Subjects & Syllabus :
                    </h3>
                    <p>
                        Organize subject details and syllabus structures to ensure a structured learning experience.
                    </p>
                    <h3>
                        School & Classes :
                    </h3>
                    <p>
                        Manage school information, class structures, and student-teacher assignments.
                    </p>
                    <h3>
                        Admissions & Fees :
                    </h3>
                    <p>
                        Handle student admissions, fee collection, and payment tracking.
                    </p>
                    <h3>
                        Examinations :
                    </h3>
                    <p>
                        Schedule and manage exams, results, and grading systems.
                    </p>
                    <p>
                        This LMS ensures seamless administrative operations and improves overall academic management.
                    </p>

                </Box>}

                {/* Render nested routes (for dynamic content) */}

                <Outlet />
            </Box>
        </Box>
    );
}

ResponsiveDrawer.propTypes = {
    window: PropTypes.func,
};

export default ResponsiveDrawer;
