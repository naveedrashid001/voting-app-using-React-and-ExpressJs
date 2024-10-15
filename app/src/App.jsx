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

function AppRoutes() {
  const [selectedPage, setSelectedPage] = useState('');

  // Moved useLocation here so it's within Router's context
  const location = useLocation(); 
  const isLoggedInHomePage = location.pathname === '/HomePage';

  return (
    <div>
      {/* Conditionally render Navbar only if not on HomePage */}
      {!isLoggedInHomePage && <Navbar selectedPage={selectedPage} />}
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
