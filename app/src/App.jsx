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

function AppRoutes() {
  const [selectedPage, setSelectedPage] = useState('');

  // Moved useLocation here so it's within Router's context
  const location = useLocation();
  
  // Update condition to check for both HomePage and Profile routes
  const isHiddenNavbar = location.pathname === '/HomePage' || location.pathname === '/Profile' || location.pathname === '/NewResults' || location.pathname === '/LogOut' || location.pathname === '/ApplyVote';

  return (
    <div>
      {/* Conditionally render Navbar only if not on HomePage or Profile */}
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
        <Route path="/Profile" element={<Profile />} />
        <Route path="/ApplyVote" element={<ApplyVote />} />
        <Route path="/NewResults" element={<NewResults />} />
        <Route path="/LogOut" element={<LogOut />} />


      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      {/* Ensure AppRoutes is wrapped in Router */}
      <AppRoutes />
    </Router>
  );
}

export default App;
