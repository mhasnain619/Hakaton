import { Box } from '@mui/material'
import './home.css'

const Home = () => {
    return (
        <Box className='mainBox' sx={{ py: 6 }}>
            <h2>Welcome to the Learning Management System (LMS)</h2>
            <p>Our <strong>Learning Management System (LMS)</strong> is designed to simplify and enhance the management of educational institutions, making learning more accessible and administration more efficient.</p>

            <h3>Why Choose Our LMS?</h3>
            <ul>
                <li><strong>✅ Student & Teacher Management : </strong> <br /> Easily register, track, and manage students and teachers.</li>
                <li><strong>✅ Subjects & Syllabus Organization : </strong> <br /> Keep subjects and syllabi well-structured for a better learning experience.</li>
                <li><strong>✅ Admissions & Fees Tracking : </strong> <br /> Streamline the admission process and manage fee collections effortlessly.</li>
                <li><strong>✅ Class & School Administration : </strong> <br /> Organize classes, timetables, and institutional details in one place.</li>
                <li><strong>✅ Exam Management : </strong> <br /> Conduct, evaluate, and store exam results efficiently.</li>
            </ul>

            <h3>Key Features</h3>
            <ol>
                <li><strong>📌 User-Friendly Dashboard : </strong> <br /> Access all features with an intuitive interface.</li>
                <li><strong>📌 Secure & Reliable : </strong> <br /> Data security is our priority to ensure a safe experience.</li>
                <li><strong>📌 Efficient Workflow : </strong> <br /> Save time and effort with an all-in-one educational management system.</li>
            </ol>

            <h2>Get Started Today!</h2>
            <p>Navigate through the menu to explore the full functionality of our LMS and experience seamless educational management. 🚀</p>
        </Box >
    )
}

export default Home
