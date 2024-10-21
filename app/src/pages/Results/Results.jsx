import React, { useEffect, useState } from 'react';
import {
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from 'recharts';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Results({ setSelectedPage }) {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    setSelectedPage('Result');

    // Fetch candidate data from the API
    const fetchCandidates = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const response = await fetch('http://localhost:4000/api/candidate');
        const data = await response.json();

        // Sort candidates by voteCount in descending order
        const sortedCandidates = data.sort((a, b) => b.voteCount - a.voteCount);

        setCandidates(sortedCandidates);
      } catch (error) {
        console.error('Error fetching candidates:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchCandidates();
  }, [setSelectedPage]);

  // Prepare data for the chart
  const partyVotes = candidates.reduce((acc, candidate) => {
    if (!acc[candidate.party]) {
      acc[candidate.party] = { name: candidate.party, votes: 0 };
    }
    acc[candidate.party].votes += candidate.voteCount;
    return acc;
  }, {});

  // Round the vote count for chart display
  const chartData = Object.values(partyVotes).map((party) => ({
    ...party,
    votes: Math.round(party.votes), // Ensure vote count is rounded to the nearest integer
  }));

  // Function to handle candidate card click
  const handleCandidateClick = (id) => {
    navigate(`/candidate/${id}`); // Navigate to the candidate's details page
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <img src='/images/loading.gif' alt="Loading" style={{ width: "200px", height: "200px" }} />
      </div>
    ); // Loading state with centered GIF
  }

  return (
    <div className="container mt-4" style={{ backgroundColor: "#EAE6F5", padding: "15px" }}>
      <div className="card shadow mb-4" style={{ width: '70%', margin: '20px auto' }}>
        <div className="card-body">
          <h5 className="card-title text-center">Voting Result</h5>
          <ResponsiveContainer width="100%" height={200}>
            <ComposedChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="votes" fill="#8884d8" stackId="a" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="row">
        {candidates.map((candidate) => (
          <div className="col-md-6 mb-4" key={candidate._id}>
            <div 
              className="card shadow" 
              style={{ maxWidth: '100%', margin: '0 auto', padding: '20px' }} 
              onClick={() => handleCandidateClick(candidate._id)} // Use the click handler
            >
              <div className="d-flex align-items-center">
                {/* Candidate image */}
                <img 
                  src={candidate.image || 'https://via.placeholder.com/150'} // Fallback to placeholder if no image is available
                  alt={candidate.name}
                  className="img-thumbnail"
                  style={{ width: '150px', height: '150px', objectFit: 'cover', marginRight: '15px' }}
                />
                <div className="card-body">
                  <h6 className="card-title">{candidate.name}</h6>
                  <p className="card-text">
                    <strong>Party:</strong> {candidate.party} <br />
                    <strong>Vote Count:</strong> {Math.round(candidate.voteCount)} {/* Round the vote count here */}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Results;
