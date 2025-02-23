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
import { Avatar, Button, Collapse, Container, Menu, MenuItem, Paper, Tooltip } from '@mui/material';
import { PiExamFill, PiStudentBold } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { MdOutlineSubject } from "react-icons/md";
import { FaBook } from "react-icons/fa";
import { BiSolidSchool } from "react-icons/bi";
import { SiGoogleclassroom } from "react-icons/si";

// import './Layout.css'
const drawerWidth = 250;

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
        localStorage.removeItem('role')
        navigate('/login')
    }
    let role = localStorage.getItem('role')

    const pages = [
        {
            name: "Customer Management", icon: <PiStudentBold />, children: [
                { name: "Customer Details", route: "/customer/customer-details", type: "customer" },
            ]
        },
        {
            name: "Room Management", icon: <FaChalkboardTeacher />, children: [
                { name: "Our Rooms", route: "/rooms/our-rooms", type: "customer" },
            ]
        },
        {
            name: "Booking Management", icon: <FaChalkboardTeacher />, children: [
                { name: "Add Room", route: "/rooms/add-room", type: "admin" },
                { name: "Book Room", route: "/rooms/room-list", type: "customer" },
            ]
        },
        {
            name: "Payment Management", icon: <MdOutlineSubject />, children: [
                { name: "Booking Payments", route: "/Booking/booking-payments", type: "customer" }
            ]
        },

        {
            name: "Service Management ", icon: <FaBook />, children: [
                { name: "Add Services", route: "/services/add-services", type: "admin" },
                { name: "Services List", route: "/services/services-list", type: "customer" }
            ]
        },

        {
            name: "Inventory Management", icon: <BiSolidSchool />, children: [
                { name: "Inventory", route: "/inventory", type: "customer" },
            ]
        },
        {
            name: "Report Generation ", icon: <SiGoogleclassroom />, children: [

            ]
        },

        {
            name: "Profile Management", icon: <MdFeed />, children: [
                { name: "Profile", route: "/profile" },

            ]
        },

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
                                        role?.toLowerCase() === "admin" ? <ListItem sx={{ background: child.route === currentPath ? "#E1E1E2" : '' }} key={idx} disablePadding>
                                            <ListItemButton sx={{ pl: 4 }} onClick={() => {
                                                navigate(child.route)
                                            }}>
                                                <ListItemText primary={child.name} />
                                            </ListItemButton>
                                        </ListItem> : child.type !== 'admin' ? <ListItem sx={{ background: child.route === currentPath ? "#E1E1E2" : '' }} key={idx} disablePadding>
                                            <ListItemButton sx={{ pl: 4 }} onClick={() => {
                                                navigate(child.route)
                                            }}>
                                                <ListItemText primary={child.name} />
                                            </ListItemButton>
                                        </ListItem> : ""
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
                    <Typography variant="h5" className="hms" noWrap component="div">
                        Hotel Management System
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

                    <Container maxWidth="lg" sx={{}}>

                        <Typography variant="h4" fontWeight="bold" gutterBottom>
                            Hotel Management System
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            Welcome to the **Hotel Management System**, a powerful and user-friendly platform designed to streamline hotel
                            operations, enhance customer experiences, and manage resources efficiently.
                        </Typography>

                        <Box textAlign="left">
                            <Typography variant="h5" fontWeight="bold" sx={{ mt: 2 }}>
                                🌟 Key Features & Functionalities:
                            </Typography>

                            <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
                                🏠 Room Booking & Management
                            </Typography>
                            <Typography variant="body2">
                                - View available rooms with real-time status updates.<br />
                                - Book, modify, or cancel reservations easily.<br />
                                - Display detailed room information with images and amenities.
                            </Typography>

                            <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
                                🛍️ Inventory Management
                            </Typography>
                            <Typography variant="body2">
                                - Track essential hotel supplies like toiletries and food items.<br />
                                - Add, update, and remove inventory items.<br />
                                - Prevent shortages and ensure smooth operations.
                            </Typography>

                            <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
                                💰 Payments & Billing
                            </Typography>
                            <Typography variant="body2">
                                - Securely process customer payments.<br />
                                - Generate invoices and track outstanding dues.<br />
                                - Integrated with multiple payment options.
                            </Typography>

                            <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
                                📊 Dashboard & Analytics
                            </Typography>
                            <Typography variant="body2">
                                - View hotel performance, revenue, and occupancy rates.<br />
                                - Monitor booking trends and customer preferences.<br />
                                - Generate insightful reports for better decision-making.
                            </Typography>

                            <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
                                🔐 User Authentication & Security
                            </Typography>
                            <Typography variant="body2">
                                - Secure login system using Firebase authentication.<br />
                                - Admins can manage users and assign roles.<br />
                                - Ensures customer data privacy and protection.
                            </Typography>

                            <Typography variant="h5" fontWeight="bold" sx={{ mt: 2 }}>
                                ✅ Why Choose This System?
                            </Typography>
                            <Typography variant="body2">
                                ✔ User-Friendly Interface – Easy navigation and intuitive design.<br />
                                ✔ Real-Time Updates – Live tracking of room status and inventory.<br />
                                ✔ Secure Data Management – Customer and payment details are protected.<br />
                                ✔ Scalable – Suitable for small hotels to large resorts.<br />
                                ✔ Seamless Integration – Works with Firebase, JSON Server, and payment gateways.
                            </Typography>

                            <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
                                🚀 Start managing your hotel effortlessly today!
                            </Typography>
                        </Box>

                    </Container>
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
