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
import ProtectedRoute from './ProtectedRoute'; // Import the ProtectedRoute component
import AdmainPage from './pages/AdmainPage/AdmainPage';
import NotFound from './pages/NotFound/NotFound';
import SingleCandidate from './pages/SingleCandidate/SingleCandidate'; // Import the SingleCandidate component
import ApplyVote from './pages/ApplyVote/ApplyVote'; // Import the ApplyVote component
import RemoveAdmin from './pages/AdmainPage/components/RemoveAdmin';
import Removecandidate from './pages/AdmainPage/components/Removecandidate';
import Addcandidate from './pages/AdmainPage/components/Addcandidate';
import AddAdmin from './pages/AdmainPage/components/AddAdmin';

function AppRoutes() {
  const [selectedPage, setSelectedPage] = useState('');
  const location = useLocation();

  const isHiddenNavbar = 
    location.pathname === '/HomePage' || 
    location.pathname === '/Profile' || 
    location.pathname === '/AdmainPage' || 
    location.pathname === '/NewResults' || 
    location.pathname === '/LogOut' || 
    location.pathname === '/ApplyVote'||
    location.pathname === '/addadmin'||
    location.pathname === '/Addcandidate'||
    location.pathname === '/removeadmin'||
    location.pathname === '/Removecandidate';

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
        <Route path="/HomePage" element={<ProtectedRoute element={<HomePage />} />} />
        <Route path="/candidate/:id" element={<SingleCandidate />} /> {/* New route for individual candidate */}
        <Route path="*" element={<NotFound />} />

        {/* Use ProtectedRoute to wrap protected components */}
        <Route path="/Profile" element={<ProtectedRoute element={<Profile />} />} />
        <Route path="/AdmainPage" element={<ProtectedRoute element={<AdmainPage />} />} />
        <Route path="/ApplyVote" element={<ProtectedRoute element={<ApplyVote />} />} /> 
        {/* Admin page route */}
        <Route path="/addadmin" element={<ProtectedRoute element={<AddAdmin />} />} /> 
        <Route path="/Addcandidate" element={<ProtectedRoute element={<Addcandidate />} />} /> 

        <Route path="/removeadmin" element={<ProtectedRoute element={<RemoveAdmin />} />} /> 
        <Route path="/Removecandidate" element={<ProtectedRoute element={<Removecandidate />} />} /> 



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
