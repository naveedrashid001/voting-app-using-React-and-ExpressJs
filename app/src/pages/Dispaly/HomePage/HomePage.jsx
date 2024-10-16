import React from 'react';
import { Link } from 'react-router-dom';
import DisplayNav from '../../../components/DisplayNav';

function HomePage() {
  return (
    <>
    <DisplayNav />
    <section style={{ backgroundColor: '#EAE6F5', padding: '2rem 0', height: '90vh' }}>
      {/* Only HomePage content, no Navbar */}
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 mt-5">
            <h1 className="fw-bold">MAKE YOUR VOICE HEARD WITH OUR APP</h1>
            <p className="lead">
              "Voting is the expression of our commitment to ourselves, one another, this country, and this world."
            </p>
            <Link to="/ApplyVote"> 
              <button className="btn btn-primary btn-lg">Activate Your Vote</button>
            </Link>
          </div>
          <div className="col-md-6 mt-5">
            <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src="/images/image1.jpg"
                    className="d-block w-100 rounded-circle"
                    alt="First slide"
                    style={{ 
                      border: '5px solid #7D3C98', 
                      height: '400px',  // Set a fixed height
                      objectFit: 'cover' // Keep aspect ratio
                    }}
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="/images/image2.jpg"
                    className="d-block w-100 rounded-circle"
                    alt="Second slide"
                    style={{ 
                      border: '5px solid #7D3C98',
                      height: '400px',
                      objectFit: 'cover'
                    }}
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="/images/image3.jpg"
                    className="d-block w-100 rounded-circle"
                    alt="Third slide"
                    style={{ 
                      border: '5px solid #7D3C98',
                      height: '400px',
                      objectFit: 'cover'
                    }}
                  />
                </div>
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}

export default HomePage;
