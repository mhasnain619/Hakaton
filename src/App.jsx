import { Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ResponsiveDrawer from './Components/Dashboard/Dashboard';
import Home from './Pages/Home/Home';
import Profile from './Components/Profile/Profile';
import "@fontsource/montserrat";  // Defaults to weight 400
import "@fontsource/montserrat/700.css"; // Specify bold weight
import './index.css';  // Ensure global styles are applied
import ContactPage from './Pages/Contact/Contact';
import LoginPage from './Access/Login/Login';
import SignupPage from './Access/Signup/Signup';
// import StudentRegistrationForm from './Pages/CustomerManagement/StudentRegistration';
// import DataTable from './Pages/CustomerManagement/StudentList';
// import TeacherRegistrationForm from './Pages/RoomManagement/TeacherRegistration';
// import TeacherList from './Pages/RoomManagement/TeachertList';
// import SubjectRegistrationForm from './Pages/PaymentManagement/AddSubject';
// import AddSubject from './Pages/PaymentManagement/SubjectList';
// import SyllabusForm from './Pages/Survices/SyllabusForm';
// import SyllabusList from './Pages/Survices/SyllabusList';
import ClassList from './Pages/Class/ClassList';
import ClassForm from './Pages/Class/ClassForm';
import FeesStructureCard from './Pages/Fees/FeesStructure';
import FeeVoucher from './Pages/Fees/FeesVoucher';
import FeeSubmission from './Pages/Fees/FeesSubmission';
import UserProfile from './Components/Profile/Profile';
import UpdateClass from './Pages/Class/UpdateClass';

import AuthRoute from './Components/ProtectedRoutes/AuthRoute';
import ProtectedRoute from './Components/ProtectedRoutes/ProtectedRoute';
// import NotFound from './Components/NotFound/NotFound';
import RoomList from './Pages/BookingManagement/RoomList';
import AddRoom from './Pages/BookingManagement/AddRoom';
import BookingDetails from './Pages/BookingManagement/BookingDetail';
import CustomerDetails from './Pages/CustomerManagement/CsutomerDetails';
import BookingPayment from './Pages/PaymentManagement/BookingPayments';
import RoomDetail from './Pages/RoomManagement/RoomDetail';
import OurRooms from './Pages/RoomManagement/OurRooms';
import Services from './Pages/Services/OurServices';
import AddServices from './Pages/Services/OurServices';
import ServicesList from './Pages/Services/ServicesList';
import InventoryManagement from './Pages/InventoryManagement/Inventory';

// Material UI Theme
const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat, sans-serif',
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        {/* Access */}

        <Route element={<AuthRoute />}>
          <Route path="home" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>

        {/* Protected Route */}

        <Route element={<ProtectedRoute />}>

          {/* dashboard */}
          <Route path="/*" element={<ResponsiveDrawer />}>

            {/* profile */}
            <Route path="profile" element={<UserProfile />} />


            {/* Customer Routes */}

            <Route path="customer/customer-details" element={<CustomerDetails />} />

            {/* Rooms Routes */}
            <Route path="rooms/our-rooms" element={<OurRooms />} />
            <Route path="rooms/our-rooms/:roomId" element={<RoomDetail />} />

            {/* Booking Management */}
            <Route path="rooms/add-room" element={<AddRoom />} />
            <Route path="rooms/room-list" element={<RoomList />} />
            <Route path="rooms/room-list/:roomId" element={<BookingDetails />} />


            {/* Booking Payments Routes */}

            <Route path="Booking/booking-payments" element={<BookingPayment />} />

            {/* services Routes */}

            <Route path="services/add-services" element={<AddServices />} />
            <Route path="services/services-list" element={<ServicesList />} />

            {/* Inventory Management Routes*/}
            <Route path="inventory" element={<InventoryManagement />} />



            {/* Routes for Exams */}
            {/* <Route path="exam/exam-schedule" element={<ExamScheduleCard />} /> */}
            {/* <Route path="exam/exam-result" element={<ExamResultCard />} /> */}
            <Route path="profile" element={<Profile />} />
            <Route path="contact" element={<ContactPage />} />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Route>
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
