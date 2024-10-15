import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Condaidate from './pages/Condaidate/Condaidate';
import Results from './pages/Results/Results';
import FAQ from './pages/FAQ/FAQ';
import Contact from './pages/Contact/Contact';
import SignIn from './pages/SignIn/SignIn';
import LogIn from './pages/LogIn/LogIn';
import HomePage from './pages/Dispaly/HomePage/HomePage';
import { useState } from 'react';
import Profile from './pages/Profile/Profile';
import NewResults from './pages/NewResults/NewResults';
import LogOut from './pages/LogOut/LogOut';
import ApplyVote from './pages/ApplyVote/ApplyVote';
import ProtectedRoute from './ProtectedRoute'; // Import the ProtectedRoute component

function AppRoutes() {
  const [selectedPage, setSelectedPage] = useState('');
  const location = useLocation();

  const isHiddenNavbar = 
    location.pathname === '/HomePage' || 
    location.pathname === '/Profile' || 
    location.pathname === '/NewResults' || 
    location.pathname === '/LogOut' || 
    location.pathname === '/ApplyVote';

  return (
    <div>
      {/* Conditionally render Navbar only if not on specified routes */}
      {!isHiddenNavbar && <Navbar selectedPage={selectedPage} />}
      <Routes>
        <Route path="/" element={<Home setSelectedPage={setSelectedPage} />} />
        <Route path="/Condaidate" element={<Condaidate setSelectedPage={setSelectedPage} />} />
        <Route path="/Results" element={<Results setSelectedPage={setSelectedPage} />} />
        <Route path="/FAQ" element={<FAQ setSelectedPage={setSelectedPage} />} />
        <Route path="/about" element={<About setSelectedPage={setSelectedPage} />} />
        <Route path="/Contact" element={<Contact setSelectedPage={setSelectedPage} />} />
        <Route path="/SignIn" element={<SignIn setSelectedPage={setSelectedPage} />} />
        <Route path="/LogIn" element={<LogIn setSelectedPage={setSelectedPage} />} />
        <Route path="/HomePage" element={<HomePage />} />

        {/* Use ProtectedRoute to wrap protected components */}
        <Route path="/Profile" element={<ProtectedRoute element={<Profile />} />} />
        <Route path="/ApplyVote" element={<ProtectedRoute element={<ApplyVote />} />} />
        <Route path="/NewResults" element={<ProtectedRoute element={<NewResults />} />} />
        <Route path="/LogOut" element={<LogOut />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
