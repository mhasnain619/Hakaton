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
// import AdmissionForm from './Pages/Admission/AdmissionForm';
// import SchoolTeacherRegistration from './Pages/School/SchoolTeacherRegistration';
// import SchoolStudentRegistration from './Pages/School/StudentRegistration';
import FeesStructureCard from './Pages/Fees/FeesStructure';
import FeeVoucher from './Pages/Fees/FeesVoucher';
import FeeSubmission from './Pages/Fees/FeesSubmission';
import UserProfile from './Components/Profile/Profile';
import StudentList from './Pages/CustomerManagement/StudentList';
import SubjectList from './Pages/PaymentManagement/SubjectList';
// import ExamScheduleCard from './Pages/Exam/ExamSchedule';
// import ExamResultCard from './Pages/Exam/ExamResult';
import UpdateClass from './Pages/Class/UpdateClass';
// import UpdateStudent from './Pages/CustomerManagement/UpdateStudent';
// import Updateteacher from './Pages/RoomManagement/UpdateTeacher';
// import UpdateSubject from './Pages/PaymentManagement/UpdateSubject';
// import UpdateSyllabus from './Pages/Survices/UpdateSyllabus';
import AuthRoute from './Components/ProtectedRoutes/AuthRoute';
import ProtectedRoute from './Components/ProtectedRoutes/ProtectedRoute';
// import NotFound from './Components/NotFound/NotFound';
import RoomList from './Pages/BookingManagement/RoomList';
import AddRoom from './Pages/BookingManagement/AddRoom';
import BookingDetails from './Pages/BookingManagement/BookingDetail';
import CustomerDetails from './Pages/CustomerManagement/CsutomerDetails';
import OurServices from './Pages/Survices/OurServices';
import BookingPayment from './Pages/PaymentManagement/BookingPayments';
import RoomDetail from './Pages/RoomManagement/RoomDetail';
import OurRooms from './Pages/RoomManagement/OurRooms';

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


            {/* student Routes */}
            {/* <Route path="student/student-registration" element={<StudentRegistrationForm />} />
            <Route path="student/student-list" element={<StudentList />} />
            <Route path="student/student-list/:id" element={<UpdateStudent />} /> */}
            <Route path="customer/customer-details" element={<CustomerDetails />} />

            {/* Rooms Routes */}
            <Route path="rooms/our-rooms" element={<OurRooms />} />
            <Route path="rooms/our-rooms/:roomId" element={<RoomDetail />} />

            {/* Booking Management */}
            <Route path="rooms/add-room" element={<AddRoom />} />
            <Route path="rooms/room-list" element={<RoomList />} />
            <Route path="rooms/room-list/:roomId" element={<BookingDetails />} />


            {/* Subjects Routes */}
            {/* <Route path="subject/add-subject" element={<SubjectRegistrationForm />} />
            <Route path="subject/subject-list" element={<SubjectList />} />
            <Route path="subject/subject-list/:id" element={<UpdateSubject />} /> */}
            <Route path="Booking/booking-payments" element={<BookingPayment />} />

            {/* Syllabus Routes */}
            {/* <Route path="syllabus/add-syllabus" element={<SyllabusForm />} />
            <Route path="syllabus/syllabus-list" element={<SyllabusList />} />
            <Route path="syllabus/syllabus-list/:id" element={<UpdateSyllabus />} /> */}
            <Route path="services/services-list" element={<OurServices />} />

            {/* School Routes */}
            {/* <Route path="school/school-student-registration" element={< SchoolStudentRegistration />} /> */}
            {/* <Route path="school/school-teacher-registration" element={< SchoolTeacherRegistration />} /> */}

            {/* Class Routes */}
            <Route path="class/class-form" element={<ClassForm />} />
            <Route path="class/class-list" element={<ClassList />} />
            <Route path='class/class-list/:id' element={<UpdateClass />} />

            {/*Routes Admission Form  */}
            {/* <Route path="admission/admission-form" element={<AdmissionForm />} /> */}


            {/* Routes Fees */}
            <Route path="fees/fees-structure" element={<FeesStructureCard />} />
            <Route path="fees/fees-voucher" element={<FeeVoucher />} />
            <Route path="fees/fees-submission" element={<FeeSubmission />} />

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
