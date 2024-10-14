import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Condaidate from './pages/Condaidate/Condaidate';
import Results from './pages/Results/Results';
import FAQ from './pages/FAQ/FAQ';
import Contact from './pages/Contact/Contact';
import SignIn from './pages/SignIn/SignIn';
import LogIn from './pages/LogIn/LogIn';
import HomePage from './pages/Dispaly/HomePage/HomePage'


import { useState } from 'react';

function App() {
  const [selectedPage, setSelectedPage] = useState('');

  return (
    <Router>
      <div>
        <Navbar selectedPage={selectedPage} /> {/* Always render the Navbar */}
        <Routes>
          <Route
            path="/"
            element={<Home setSelectedPage={setSelectedPage} />}
          />
          <Route
            path="/Condaidate"
            element={<Condaidate setSelectedPage={setSelectedPage} />}
          />
          <Route
            path="/Results"
            element={<Results setSelectedPage={setSelectedPage} />}
          />
          <Route
            path="/FAQ"
            element={<FAQ setSelectedPage={setSelectedPage} />}
          />
          <Route
            path="/about"
            element={<About setSelectedPage={setSelectedPage} />}
          />
          <Route
            path="/Contact"
            element={<Contact setSelectedPage={setSelectedPage} />}
          />
          <Route
            path="/SignIn"
            element={<SignIn setSelectedPage={setSelectedPage} />}
          />  
          <Route
            path="/LogIn"
            element={<LogIn setSelectedPage={setSelectedPage} />}
          />
          <Route
            path="/HomePage"
            element={<HomePage />}
          />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
