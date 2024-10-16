import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'js-cookie';

function DisplayNav({ selectedPage, userCNIC }) {
    const [showModal, setShowModal] = useState(false);
    const [adminCNICs, setAdminCNICs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCNICs = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/cnics');
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setAdminCNICs(data.map(item => item.cnic));
            } catch (error) {
                console.error("Error fetching CNICs:", error);
            }
        };

        fetchCNICs();
    }, []);

    const handleLogOut = () => {
        // Remove authToken from cookies
        Cookies.remove('authToken', { path: '/' }); // Ensure path is correct
        console.log("Token removed from cookies.");

        // Optionally clear any user-related state or local storage
        localStorage.removeItem('userId'); // Remove userId if stored in localStorage

        setShowModal(false);
        navigate('/'); // Redirect to home or login page after logout
    };

    const handleCancel = () => {
        setShowModal(false);
    };

    const isValidCNIC = (cnic) => /^\d{13}$/.test(cnic);
    const isAdmin = isValidCNIC(userCNIC) && adminCNICs.includes(userCNIC);

    return (
        <>
            <nav className="navbar navbar-expand navbar-light bg-light navbar-custom mb-0">
                <div className="container-fluid">
                    <h2 className="navbar-brand text-primary">
                        <i className="bi bi-app-indicator text-success me-2"></i>
                        {selectedPage ? selectedPage : 'Voting App'}
                    </h2>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item fw-bold">
                                <Link className="nav-link" to="/HomePage">HomePage</Link>
                            </li>
                            <li className="nav-item fw-bold">
                                <Link className="nav-link" to="/Profile">Profile</Link>
                            </li>
                            {isAdmin && (
                                <li className="nav-item fw-bold">
                                    <Link className="nav-link" to="/AdminPage">AdminPage</Link>
                                </li>
                            )}
                            <li className="nav-item fw-bold">
                                <Link className="nav-link" to="/ApplyVote">Apply For Vote</Link>
                            </li>
                            <li className="nav-item fw-bold">
                                <Link className="nav-link" to="/NewResults">Results</Link>
                            </li>
                            <li className="nav-item fw-bold">
                                <Link className="nav-link" to="#" onClick={() => setShowModal(true)}>LogOut</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Modal for confirmation */}
            {showModal && (
                <div className="modal show d-block" tabIndex="-1" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirmation</h5>
                                <button type="button" className="btn-close" onClick={handleCancel}></button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to logout?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                                <button type="button" className="btn btn-primary" onClick={handleLogOut}>LogOut</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default DisplayNav;
