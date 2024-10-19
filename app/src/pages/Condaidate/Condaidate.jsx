import React, { useEffect, useState } from 'react';

function Condaidate({ setSelectedPage }) {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setSelectedPage('Condaidate');

    // Fetch candidates from the API
    const fetchCandidates = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/candidate');
        if (!response.ok) {
          throw new Error('Failed to fetch candidate data');
        }
        const data = await response.json();
        setCandidates(data); // Assuming the API returns an array of candidates
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, [setSelectedPage]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center" style={{ height: "100vh" }}>
        <img src='/images/loading.gif' className='text-center mt-5' style={{ width: "200px", height:"200px" }} alt="Loading" />
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <main className="flex-shrink-0">
      <section className="py-5">
        <div className="container px-5 mb-5">
          <div className="text-center mb-5">
            <h1 className="display-5 fw-bolder mb-0">
              <span className="text-gradient d-inline">Candidate List</span>
            </h1>
          </div>
          <div className="row gx-5 justify-content-center">
            <div className="col-lg-11 col-xl-9 col-xxl-8">
              {candidates.map((candidate, index) => (
                <div key={index} className="card overflow-hidden shadow rounded-4 border-0 mb-3">
                  <div className="card-body p-0">
                    <div className="d-flex align-items-center">
                      <img
                        className="img-fluid"
                        src={candidate.image || 'https://via.placeholder.com/300x400'}
                        style={{
                          width: '300px', // Fixed width
                          height: '400px', // Fixed height
                          objectFit: 'cover', // Maintain aspect ratio while covering the entire area
                        }}
                        alt={candidate.name}
                      />
                      <div className="p-5">
                        <h2 className="fw-bolder">{candidate.name}</h2>
                        <p className="mb-1"><strong>Party:</strong> {candidate.party}</p>
                        <p className="mb-1"><strong>Age:</strong> {candidate.age}</p>
                        <p className="mb-1"><strong>Description:</strong> {candidate.description || 'No description available'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Condaidate;
