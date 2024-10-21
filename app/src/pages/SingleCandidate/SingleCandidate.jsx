import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function SingleCandidate() {
  const { id } = useParams(); // Get the candidate ID from the URL
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the single candidate from the API based on the ID from the URL
    const fetchCandidate = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/candidate/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch candidate');
        }
        const data = await response.json();
        setCandidate(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidate();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center" style={{ height: "100vh" }}>
        <img src='/images/loading.gif' className='text-center mt-5' style={{ width: "200px", height: "200px" }} alt="Loading" />
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!candidate) return <div>Loading candidate data...</div>;

  return (
    <div className="container mt-3 d-flex justify-content-center align-items-center" style={{ height: '80vh', backgroundColor: "#EAE6F5", padding: "15px" }}>
      <div className="card shadow" style={{ width: '80%' }}>
        <div className="row g-0">
          {/* 40% width for the image */}
          <div className="col-md-4 d-flex justify-content-center align-items-center" style={{ backgroundColor: '#f8f9fa' }}>
            <img
              src={candidate.image || 'https://via.placeholder.com/300x400'} // Fallback to placeholder if image is missing
              alt={candidate.name}
              className="img-fluid rounded-circle"
              style={{ width: '200px', height: '200px', objectFit: 'cover' }} // Adjust image size
            />
          </div>
          
          {/* 60% width for the candidate data */}
          <div className="col-md-8">
            <div className="card-body">
              <h2 className="card-title">{candidate.name}</h2>
              <p className="card-text"><strong>Party:</strong> {candidate.party}</p>
              <p className="card-text"><strong>Age:</strong> {candidate.age}</p>
              {/* <p className="card-text"><strong>Vote Count:</strong> {candidate.voteCount}</p> */}
              <p className="card-text"><strong>Description:</strong> {candidate.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleCandidate;
