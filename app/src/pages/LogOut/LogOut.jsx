import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify'; // Import Toast components
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

function LogOut({ setSelectedPage }) {
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedPage('LogOut');

    // Clear all stored authentication data (cookies and localStorage)
    Cookies.remove('authToken');
    Cookies.remove('userEmail');
    localStorage.removeItem('userId');
    localStorage.removeItem('userCNIC');
    localStorage.removeItem('isAdmin');

    // Display a success message after clearing auth data
    toast.success('Logged out successfully! Redirecting to login page...');

    // Redirect to the login page after a delay
    setTimeout(() => {
      navigate('/LogIn');
    }, 2000); // 2-second delay for the toast to show before redirecting
  }, [navigate, setSelectedPage]);

  return (
    <section className="py-5">
      <div className="container px-5">
        <div className="bg-light rounded-4 py-5 px-4 px-md-5">
          <div className="text-center mb-5">
            <div>
              <img
                className="feature rounded-3 mb-3"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjsU9I6rvcOTugnfsbL9l8L8OnW9ZlE7qdyg&s"
                alt="pakFlag"
                style={{ width: '100px' }}
              />
            </div>
            <h1 className="fw-bolder">Log Out</h1>
            <p className="lead">You have been logged out successfully.</p>
          </div>
          <div className="row gx-5 justify-content-center">
            <div className="col-lg-8 col-xl-6">
              {/* Display logout success message */}
              <div className="alert alert-success text-center">
                <strong>Success!</strong> You have been logged out.
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer /> {/* Add ToastContainer for notifications */}
    </section>
  );
}

export default LogOut;
