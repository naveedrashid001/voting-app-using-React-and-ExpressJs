import { useEffect } from 'react';
import '../Home/styling/Home.css';

function About({ setSelectedPage }) {
  useEffect(() => {
    setSelectedPage('About');
  }, [setSelectedPage]);

  return (
    <div className="container mt-5">
  <h2 className='gradient-text text-center'>About Me</h2> {/* Centered heading */}
   {/* Centered Image */}
   <div className="d-flex justify-content-center mt-4 mb-4">
        <img 
          src="https://i.imgur.com/1vy6WME_d.jpeg?maxwidth=520&shape=thumb&fidelity=high" 
          alt="Profile" 
          style={{ width: '240px', height: '240px' }} // Fixed width and height
          className="rounded-circle" // Fully rounded image
        />
      </div>
  <div className="row gx-5 shadow border-0 rounded-5 p-3 mb-5" style={{ width: "70%", margin: "0 auto" }}>
    <div className="d-flex flex-column align-items-center justify-content-center text-center">
     
      {/* Centered Paragraph */}
      <p style={{ textAlign: 'justify', maxWidth: '800px' }}>
      As a passionate full-stack developer, I am dedicated to crafting robust, scalable solutions and delivering exceptional user experiences through continuous learning, collaboration, and active engagement in the developer community. I thrive on the challenge of transforming complex requirements into intuitive, user-friendly applications that not only meet client expectations but also elevate the overall digital experience. My technical toolkit includes advanced skills in JavaScript, HTML, CSS, and frameworks like React and Node.js, enabling me to build dynamic web applications from the ground up  </p> 
    </div>
  </div>
</div>

  );
}

export default About;
