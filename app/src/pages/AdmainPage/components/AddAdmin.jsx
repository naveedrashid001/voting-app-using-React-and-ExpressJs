import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; // Ensure you have react-toastify installed
import DisplayNav from '../../../components/DisplayNav';

function AddAdmin() {
    const [cnicNumber, setCnicNumber] = useState('');

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

    return (
      <>
      <DisplayNav/>
      <div
            className="container mt-4"
            style={{ backgroundColor: "#EAE6F5", padding: "15px", width: "80%", height: "80vh" }}
        >
            <div className="row mt-2 justify-content-center align-items-center h-100">
                {/* Card for Adding Admin */}
                <div className="col-md-6">
                    <div className="card shadow" style={{ padding: '20px' }}>
                        <h2 className="card-title text-center">Add Admin by CNIC</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="cnicNumber" className="form-label mb-0">CNIC Number</label> <br />
                                <small className='mt-0' style={{ color: 'red', fontSize:"12px" }}>
                                    CNIC number must be 13 digits
                                </small>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="cnicNumber"
                                    value={cnicNumber}
                                    onChange={handleCnicChange}
                                    required
                                />
                                {/* Small red text below the input field */}
                                
                            </div>
                            <button type="submit" className="btn btn-primary">Add Admin</button>
                        </form>
                    </div>
                </div>
                {/* ToastContainer needs to be included here */}
                <ToastContainer />
            </div>
        </div>

      </>
            );
}

export default AddAdmin;
