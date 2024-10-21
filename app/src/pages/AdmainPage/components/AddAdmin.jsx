import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; // Ensure you have react-toastify installed
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import DisplayNav from '../../../components/DisplayNav';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

function AddAdmin() {
    const [cnicNumber, setCnicNumber] = useState('');
    const navigate = useNavigate(); // Initialize navigate

    const handleCnicChange = (e) => {
        setCnicNumber(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('Submitting CNIC:', cnicNumber); // For debugging

        try {
            const response = await axios.post('http://localhost:4000/api/cnic/add-cnic', {
                cnicNumber
            });

            // Check if the response indicates that the user is already an admin
            if (response.data.message.includes("already an admin")) {
                toast.warn(response.data.message); // Show a warning if already an admin
            } else {
                toast.success(response.data.message); // Show success message
            }
        } catch (error) {
            // Show error message
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Error occurred while adding CNIC');
            }
        }
    };

    const handleBack = () => {
        navigate(-1); // Navigate back to the previous page
    };

    return (
      <>
        <DisplayNav />
        <div
            className="container mt-4"
            style={{ backgroundColor: "#EAE6F5", padding: "15px", width: "80%", height: "80vh" }}
        >
            <div className="row mt-2 justify-content-center align-items-center h-100">
                {/* Card for Adding Admin */}
                <div className="col-md-6">
                    <div className="card shadow d-flex" style={{ padding: '20px' }}>
                        <h2 className="card-title text-center">Add Admin by CNIC</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="cnicNumber" className="form-label mb-0">CNIC Number</label> <br />
                                <small className='mt-0' style={{ color: 'red', fontSize:"12px" }}>
                                    CNIC number must be 13 digits
                                </small>
                                <input
                                    type="text"
                                    className="form-control" // Add form-control class for consistent styling
                                    id="cnicNumber"
                                    value={cnicNumber}
                                    onChange={handleCnicChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100 mb-2"> {/* Apply btn-danger */}
                                Add Admin
                            </button>
                        </form>

                        <button
                            className="btn btn-danger w-100" // Add back button with btn-danger class
                            onClick={handleBack}
                        >
                            Back
                        </button>
                    </div>
                </div>
                <ToastContainer /> {/* Toast container to show notifications */}
            </div>
        </div>
      </>
    );
}

export default AddAdmin;
