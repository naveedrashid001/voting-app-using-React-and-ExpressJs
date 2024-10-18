import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function SingleCandidate() {
  const { id } = useParams(); // Get the candidate ID from the URL
  const [candidate, setCandidate] = useState(null);

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/candidate/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch candidate');
        }
        const data = await response.json();
        setCandidate(data);
      } catch (error) {
        console.error('Error fetching candidate:', error);
      }
    };

    fetchCandidate();
  }, [id]);

  if (!candidate) return <div>Loading...</div>;

  return (
    <div className="container mt-3 d-flex justify-content-center align-items-center" style={{ height: '80vh',backgroundColor: "#EAE6F5", padding:"15px"  }}>
      <div className="card text-center" style={{ width: '40%' }}>
        <div className="card-body"> 
          <h2 className="card-title">{candidate.name}</h2>
          <p className="card-text"><strong>Party:</strong> {candidate.party}</p>
          <p className="card-text"><strong>Age:</strong> {candidate.age}</p>
          <p className="card-text"><strong>Vote Count:</strong> {candidate.voteCount}</p>
          {/* Add more candidate details as needed */}
        </div>
      </div>
    </div>
  );
}

export default SingleCandidate;
