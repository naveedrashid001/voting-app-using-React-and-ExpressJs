import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import Cookies from 'js-cookie';

function LogIn({ setSelectedPage }) {
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedPage('LogIn');
  }, [setSelectedPage]);

  // Handle form submission for login
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
  
    console.log('Form data:', data);
  
    try {
      const response = await fetch('http://localhost:4000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      console.log('Response status:', response.status);
  
      if (response.ok) {
        const responseData = await response.json();
        console.log('Login successful:', responseData);
  
        if (responseData.token) {
          // Store token, user details, and user email
          Cookies.set('authToken', responseData.token, { expires: 1 });
          Cookies.set('userEmail', data.email, { expires: 1 }); // Store email in cookies
          localStorage.setItem('userId', responseData.userId);
          localStorage.setItem('userCNIC', data.cnic);
  
          console.log('Token stored in cookies:', Cookies.get('authToken'));
          console.log('User Email stored in cookies:', Cookies.get('userEmail'));
          console.log('UserId stored in localStorage:', localStorage.getItem('userId'));
          console.log('User CNIC stored in localStorage:', localStorage.getItem('userCNIC'));
  
          // Fetch all CNICs to check for admin rights
          const adminResponse = await fetch('http://localhost:4000/api/cnic/all');
          const adminData = await adminResponse.json();
          const adminCNICs = adminData.map(item => item.cnic);
  
          // Check if the user's CNIC matches any admin CNIC
          if (adminCNICs.includes(data.cnic)) {
            localStorage.setItem('isAdmin', 'true'); // Store admin status
          } else {
            localStorage.setItem('isAdmin', 'false'); // Set as regular user
          }
  
          // Always redirect to HomePage after login
          navigate('/HomePage');
        } else {
          console.error('Token is undefined in the response:', responseData);
          alert('Login successful, but token is missing in the response. Please contact support.');
        }
      } else {
        const errorResponseText = await response.text();
        const errorResponse = errorResponseText ? JSON.parse(errorResponseText) : { message: 'Login failed. Please check your credentials.' };
        console.error('Error during login:', errorResponse);
        alert(errorResponse.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };
  

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
            <h1 className="fw-bolder">Log In</h1>
          </div>
          <div className="row gx-5 justify-content-center">
            <div className="col-lg-8 col-xl-6">
              <form onSubmit={handleSubmit} id="loginForm">
                {/* Input fields for login */}
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="email" 
                    name="email" 
                    type="email"
                    placeholder="Enter your email..."
                    required
                  />
                  <label htmlFor="email">Email address</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password..."
                    required
                  />
                  <label htmlFor="password">Password</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="cnic"
                    name="cnic" 
                    type="text"
                    placeholder="Enter your CNIC..."
                    required
                  />
                  <label htmlFor="cnic">CNIC</label>
                </div>
                <input
                  className="d-grid btn btn-primary btn-lg form-control"
                  type="submit"
                  value="Log In"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LogIn;
