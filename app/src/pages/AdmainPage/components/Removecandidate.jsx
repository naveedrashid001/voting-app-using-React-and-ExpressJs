import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; // Ensure react-toastify is installed
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import DisplayNav from '../../../components/DisplayNav';
import 'react-toastify/dist/ReactToastify.css';

function RemoveCandidate() {
    const [candidateId, setCandidateId] = useState('');
    const navigate = useNavigate();

    const handleRemove = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.delete(`http://localhost:4000/api/candidate/remove/${candidateId}`);
            toast.success(response.data.message); // Show success message
            setCandidateId(''); // Clear the input field
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Error occurred while removing candidate');
            }
        }
    };

    return (
        <>
            <DisplayNav />
            <div className="container mt-4" style={{ backgroundColor: "#EAE6F5", padding: "15px", height: "100vh" }}>
                <div className="row justify-content-center align-items-center h-100">
                    {/* Card for Removing Candidate */}
                    <div className="col-md-8 col-lg-6">
                        <div className="card shadow mb-5 mt-1" style={{ padding: '20px', height: '100%' }}>
                            <div className="card-body">
                                <h2 className="card-title text-center mb-4">Remove Candidate</h2>
                                <form onSubmit={handleRemove}>
                                    <div className="mb-3">
                                        <label htmlFor="candidateId" className="form-label">Candidate ID</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="candidateId"
                                            value={candidateId}
                                            onChange={(e) => setCandidateId(e.target.value)}
                                            required
                                        />
                                    </div>
                                    {/* <div className="d-flex justify-content-between"> */}
                                        <button type="submit" className="btn btn-danger form-control mb-2">Remove Candidate</button>
                                        <button
                                            type="button"
                                            className="btn btn-secondary form-control"
                                            onClick={() => navigate(-1)} // Navigate to the previous page
                                        >
                                            Back
                                        </button>
                                    {/* </div> */}
                                </form>
                                <ToastContainer />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RemoveCandidate;
