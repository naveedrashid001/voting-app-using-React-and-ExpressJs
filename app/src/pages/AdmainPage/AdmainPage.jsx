import React from 'react';
import DisplayNav from '../../components/DisplayNav';
import { Link } from 'react-router-dom';

function AdmainPage() {
  return (
    <>
      <DisplayNav />
      <div className="container mt-4" style={{ backgroundColor: "#EAE6F5", padding: "15px", width: "80%", height: "80vh" }}>
        <div className="row mt-2 justify-content-center align-items-center h-100">
          {/* Card 1 */}
          <div className="col-md-4 mb-4 offset-1" >
            <div className="card shadow-lg" style={{  height: '150px' }}>
              <div className="card-body text-center">
                <h4 className="card-title">Add Admin </h4>
                <Link to="/addadmin">
                <button className='btn btn-primary mt-2'>Make New Admin</button>
                </Link>
                
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="col-md-4 mb-4"> 
            <div className="card shadow-lg" style={{ height: '150px' }}>
              <div className="card-body text-center">
              <h4 className="card-title">Remove Admin </h4>
                <Link to="/removeadmin">
                <button className='btn btn-primary mt-2'>Remove Admin</button>
                </Link>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="col-md-4 mb-4 offset-1"> 
            <div className="card shadow-lg" style={{ height: '150px' }}>
              <div className="card-body text-center">
              <h4 className="card-title">Add candidate </h4>
                <Link to="/Addcandidate">
                <button className='btn btn-primary mt-2'>Make New candidate</button>
                </Link>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="col-md-4 mb-4"> 
            <div className="card shadow-lg" style={{ height: '150px' }}>
              <div className="card-body text-center">
              <h4 className="card-title">Remove candidate </h4>
                <Link to="/Removecandidate">
                <button className='btn btn-primary mt-2'>Remove candidate</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdmainPage;
