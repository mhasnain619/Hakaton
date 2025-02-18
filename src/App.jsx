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
import StudentRegistrationForm from './Pages/Students/StudentRegistration';
import DataTable from './Pages/Students/StudentList';
import TeacherRegistrationForm from './Pages/Teachers/TeacherRegistration';
import TeacherList from './Pages/Teachers/TeachertList';
import SubjectRegistrationForm from './Pages/Subjects/AddSubject';
import AddSubject from './Pages/Subjects/SubjectList';
import SyllabusForm from './Pages/Syllabus/SyllabusForm';
import SyllabusList from './Pages/Syllabus/SyllabusList';
import ClassList from './Pages/Class/ClassList';
import ClassForm from './Pages/Class/ClassForm';
import AdmissionForm from './Pages/Admission/AdmissionForm';
import SchoolTeacherRegistration from './Pages/School/SchoolTeacherRegistration';
import SchoolStudentRegistration from './Pages/School/StudentRegistration';
import FeesStructureCard from './Pages/Fees/FeesStructure';
import FeeVoucher from './Pages/Fees/FeesVoucher';
import FeeSubmission from './Pages/Fees/FeesSubmission';
import UserProfile from './Components/Profile/Profile';
import StudentList from './Pages/Students/StudentList';
import SubjectList from './Pages/Subjects/SubjectList';
import ExamScheduleCard from './Pages/Exam/ExamSchedule';
import ExamResultCard from './Pages/Exam/ExamResult';
import UpdateClass from './Pages/Class/UpdateClass';
import UpdateStudent from './Pages/Students/UpdateStudent';
import Updateteacher from './Pages/Teachers/UpdateTeacher';
import UpdateSubject from './Pages/Subjects/UpdateSubject';
import UpdateSyllabus from './Pages/Syllabus/UpdateSyllabus';
import AuthRoute from './Components/ProtectedRoutes/AuthRoute';
import ProtectedRoute from './Components/ProtectedRoutes/ProtectedRoute';
import NotFound from './Components/NotFound/NotFound';

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
            <Route path="student/student-registration" element={<StudentRegistrationForm />} />
            <Route path="student/student-list" element={<StudentList />} />
            <Route path="student/student-list/:id" element={<UpdateStudent />} />

            {/* Teacher Routes */}
            <Route path="teacher/teacher-registration" element={<TeacherRegistrationForm />} />
            <Route path="teacher/teacher-list" element={<TeacherList />} />
            <Route path="teacher/teacher-list/:id" element={<Updateteacher />} />

            {/* Subjects Routes */}
            <Route path="subject/add-subject" element={<SubjectRegistrationForm />} />
            <Route path="subject/subject-list" element={<SubjectList />} />
            <Route path="subject/subject-list/:id" element={<UpdateSubject />} />

            {/* Syllabus Routes */}
            <Route path="syllabus/add-syllabus" element={<SyllabusForm />} />
            <Route path="syllabus/syllabus-list" element={<SyllabusList />} />
            <Route path="syllabus/syllabus-list/:id" element={<UpdateSyllabus />} />

            {/* School Routes */}
            <Route path="school/school-student-registration" element={< SchoolStudentRegistration />} />
            <Route path="school/school-teacher-registration" element={< SchoolTeacherRegistration />} />

            {/* Class Routes */}
            <Route path="class/class-form" element={<ClassForm />} />
            <Route path="class/class-list" element={<ClassList />} />
            <Route path='class/class-list/:id' element={<UpdateClass />} />

            {/*Routes Admission Form  */}
            <Route path="admission/admission-form" element={<AdmissionForm />} />


            {/* Routes Fees */}
            <Route path="fees/fees-structure" element={<FeesStructureCard />} />
            <Route path="fees/fees-voucher" element={<FeeVoucher />} />
            <Route path="fees/fees-submission" element={<FeeSubmission />} />

            {/* Routes for Exams */}
            <Route path="exam/exam-schedule" element={<ExamScheduleCard />} />
            <Route path="exam/exam-result" element={<ExamResultCard />} />

            <Route path="home" element={<Home />} />
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
