import React, { useState, useEffect } from 'react';
import DisplayNav from '../../components/DisplayNav';
import Cookies from 'js-cookie';

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
      alert('Please select a candidate.');
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
        alert('Vote cast successfully!');
      } else {
        alert(data.message || 'An error occurred while voting.');
      }
    } catch (error) {
      console.error('Error during voting:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <>
      <DisplayNav />
      <div className="container">
        <h1 className="mt-5">Apply for Vote</h1>
        <div className="form-group">
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

        <button className="btn btn-primary mt-3" onClick={handleVote}>
          Submit Vote
        </button>
      </div>
    </>
  );
}

export default ApplyVote;
