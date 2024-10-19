import React, { useState, useEffect } from 'react';
import DisplayNav from '../../components/DisplayNav';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function ApplyVote() {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Fetch user data from cookies/local storage
    const storedUserId = localStorage.getItem('userId');
    setUserId(storedUserId);

    // Fetch candidates from the API
    const fetchCandidates = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/candidate');
        const data = await response.json();
        setCandidates(data);
      } catch (error) {
        console.error('Error fetching candidates:', error);
      }
    };

    fetchCandidates();
  }, []);

  const handleVote = async () => {
    if (!selectedCandidate) {
      toast.error('Please select a candidate.');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          candidateId: selectedCandidate,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success('Vote cast successfully!');
      } else {
        toast.error(data.message || 'An error occurred while voting.');
      }
    } catch (error) {
      console.error('Error during voting:', error);
      toast.error('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <>
      <DisplayNav />
      <div className="d-flex justify-content-center align-items-center" style={{ height: '90vh', backgroundColor: '#EAE6F5', padding: '10px' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8 mt-0">
              <div className="card shadow p-4">
                <h1 className="text-center">Give Vote</h1>

                <div className="form-group mt-4">
                  <label htmlFor="candidate">Select a candidate:</label>
                  <select
                    id="candidate"
                    className="form-control"
                    value={selectedCandidate}
                    onChange={(e) => setSelectedCandidate(e.target.value)}
                  >
                    <option value="">-- Select a Candidate --</option>
                    {candidates.map((candidate) => (
                      <option key={candidate._id} value={candidate._id}>
                        {candidate.name} - {candidate.party} (Age: {candidate.age})
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  className="btn btn-primary mt-3 w-100"
                  onClick={handleVote}
                >
                  Submit
                </button>

                <ToastContainer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ApplyVote;
