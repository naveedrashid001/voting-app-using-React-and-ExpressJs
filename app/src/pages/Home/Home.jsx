import { useEffect } from 'react';
import './styling/Home.css';
import SecondSection from './components/SecondSection';
import Condaidate from '../Condaidate/Condaidate'; // Fixed the import spelling
import About from '../About/About'; // Fixed the import spelling
import { Link } from 'react-router-dom';


function Home({ setSelectedPage }) {
  useEffect(() => {
    setSelectedPage('Home');
  }, [setSelectedPage]);

  return (
    <div className="container mt-0">
      <div className="hero-section text-center">
        {/* Badge */}
        <div className="mt-3">
          <span className="custom-badge">Design · Engr Naveed Rashid</span>
        </div>

        {/* Subheading */}
        <h5 className="subheading mt-4">Your Vote, Your Power</h5>

        {/* Main Heading */}
        <h1 className="display-4 gradient-text mt-3">
          Cast Your Vote, Shape Your Future
        </h1>

        {/* Buttons */}
        <div className="mt-5">
        <Link to="/LogIn">
        <button type="button" class="btn btn-outline-success me-2" data-mdb-ripple-init data-mdb-ripple-color="dark">Get Started</button> </Link>
        <Link to="/Results">
        <button type="button" class="btn btn-outline-info" data-mdb-ripple-init data-mdb-ripple-color="dark">View Vote Results</button>
         </Link>
        </div>

        <div className='divCenter'>
          <SecondSection />
        </div>

        {/* Candidates */}
        <div className='divCenter'>
          <Condaidate setSelectedPage={setSelectedPage} /> {/* Pass setSelectedPage to Condaidate */}
        </div>

        {/* about Me */}
        <div className='divCenter'>
          <About setSelectedPage={setSelectedPage} /> {/* Pass setSelectedPage to About */}
        </div>
      </div>
    </div>
  );
}

export default Home;
