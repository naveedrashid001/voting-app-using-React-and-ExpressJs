import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import DisplayNav from '../../../components/DisplayNav';
import 'react-toastify/dist/ReactToastify.css';

function AddCandidate() {
    const [name, setName] = useState('');
    const [party, setParty] = useState('');
    const [age, setAge] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const candidateData = {
            name,
            party,
            age,
            description,
            image
        };

        try {
            const response = await axios.post('http://localhost:4000/api/candidate/add', candidateData);
            toast.success(response.data.message); // Show success message
            setName('');
            setParty('');
            setAge('');
            setDescription('');
            setImage('');
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Error occurred while adding candidate');
            }
        }
    };

    return (
        <>
            <DisplayNav />
            <div className="container-fluid" style={{ backgroundColor: "#EAE6F5", padding: "20px",  }}>
                <div className="row justify-content-center align-items-center h-100">
                    <div className="col-md-8 col-lg-6">
                        <div className="card shadow mb-5" style={{ width: '90%', height: '100%' }}>
                            <div className="card-body p-4">
                                <h2 className="card-title text-center mb-4">Add New Candidate</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="party" className="form-label">Party</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="party"
                                            value={party}
                                            onChange={(e) => setParty(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="age" className="form-label">Age</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="age"
                                            value={age}
                                            onChange={(e) => setAge(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">Description</label>
                                        <textarea
                                            className="form-control"
                                            id="description"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            rows="3"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="image" className="form-label">Image URL</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="image"
                                            value={image}
                                            onChange={(e) => setImage(e.target.value)}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary form-control mb-2">Add Candidate</button>
                                        <button
                                            type="button"
                                            className="btn btn-danger form-control"
                                            onClick={() => navigate(-1)} // Go back to the previous page
                                        >
                                            Back
                                        </button>
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

export default AddCandidate;
