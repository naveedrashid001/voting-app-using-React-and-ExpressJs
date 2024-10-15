import { Link } from 'react-router-dom';
import './Navbar.css';

function DisplayNav({ selectedPage }) {
  return (
    <nav className="navbar navbar-expand navbar-light bg-light navbar-custom mb-0"> 
      <div className="container-fluid">
        <h2 className="navbar-brand text-primary">
          <i className="bi bi-app-indicator text-success me-2"></i>
          {selectedPage ? selectedPage : 'Voting App'}
        </h2>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav">
            {!selectedPage || selectedPage !== 'HomePage' ? (
              <li className="nav-item fw-bold">
                <Link className="nav-link" to="/HomePage">HomePage</Link>
              </li>
            ) : null}
            {!selectedPage || selectedPage !== 'Profile' ? (
              <li className="nav-item fw-bold">
                <Link className="nav-link" to="/Profile">Profile</Link>
              </li>
            ) : null}
            {!selectedPage || selectedPage !== 'ApplyVote' ? (
              <li className="nav-item fw-bold">
                <Link className="nav-link" to="/ApplyVote">Apply For Vote</Link>
              </li>
            ) : null}
            {!selectedPage || selectedPage !== 'NewResults' ? (
              <li className="nav-item fw-bold">
                <Link className="nav-link" to="/NewResults">Results</Link>
              </li>
            ) : null}
          </ul>
        </div>

        {/* Add buttons for Signup and Login */}
        <div className="d-flex ">
        {!selectedPage || selectedPage !== 'LogOut' ? (
              <div className="nav-item fw-bold">
                <Link to="/LogOut" className="btn btn-primary btn-sm me-2 text-bold">Log Out </Link>
              </div>
            ) : null}
        </div>
      </div>
    </nav>
  );
}

export default DisplayNav;
