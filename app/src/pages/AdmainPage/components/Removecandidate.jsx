import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; // Ensure you have react-toastify installed
import DisplayNav from '../../../components/DisplayNav';

function RemoveCandidate() {
    const [candidateId, setCandidateId] = useState('');

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
            <div className="container mt-4" style={{ backgroundColor: "#EAE6F5", padding: "15px", height: "100%" }}>
                <div className="row justify-content-center align-items-center h-100">
                    {/* Card for Removing Candidate */}
                    <div className="col-md-8 col-lg-6">
                        <div className="card shadow mb-5 mt-1" style={{ padding: '20px' }}>
                            <h2 className="card-title text-center">Remove Candidate</h2>
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
                                <button type="submit" className="btn btn-danger">Remove Candidate</button>
                            </form>
                            <ToastContainer />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RemoveCandidate;
