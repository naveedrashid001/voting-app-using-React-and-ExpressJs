import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'js-cookie';

function DisplayNav({ selectedPage }) {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Function to handle actual logout
  const handleLogOut = () => {
    setShowModal(false);  // Close the modal
    Cookies.remove('authToken');  // Remove token from cookies
    navigate('/');  // Redirect to the logout page
  };

  // Function to cancel the logout
  const handleCancel = () => {
    setShowModal(false);  // Close the modal
  };

  return (
    <>
      <nav className="navbar navbar-expand navbar-light bg-light navbar-custom mb-0">
        <div className="container-fluid">
          <h2 className="navbar-brand text-primary">
            <i className="bi bi-app-indicator text-success me-2"></i>
            {selectedPage ? selectedPage : 'Voting App'}
          </h2>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul className="navbar-nav">
              {!selectedPage || selectedPage !== 'HomePage' ? (
                <li className="nav-item fw-bold">
                  <Link className="nav-link" to="/HomePage">HomePage</Link>
                </li>
              ) : null}
              {!selectedPage || selectedPage !== 'Profile' ? (
                <li className="nav-item fw-bold">
                  <Link className="nav-link" to="/Profile">Profile</Link>
                </li>
              ) : null}
              {!selectedPage || selectedPage !== 'ApplyVote' ? (
                <li className="nav-item fw-bold">
                  <Link className="nav-link" to="/ApplyVote">Apply For Vote</Link>
                </li>
              ) : null}
              {!selectedPage || selectedPage !== 'NewResults' ? (
                <li className="nav-item fw-bold">
                  <Link className="nav-link" to="/NewResults">Results</Link>
                </li>
              ) : null}
            </ul>
          </div>

          {/* Log Out Button */}
          <div className="d-flex">
            <div className="nav-item fw-bold">
              <button
                className="btn btn-primary btn-sm me-2 text-bold"
                onClick={() => setShowModal(true)}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Logout Confirmation Modal */}
      {showModal && (
        <div 
          className="modal fade show d-block" 
          tabIndex="-1" 
          role="dialog" 
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content" style={{ width: '400px' }}>
              <div className="modal-header">
                <h5 className="modal-title">Confirm Logout</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  aria-label="Close" 
                  onClick={handleCancel}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to log out?</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-danger" onClick={handleLogOut}>
                  Confirm Logout
                </button>
                <button className="btn btn-secondary" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DisplayNav;
