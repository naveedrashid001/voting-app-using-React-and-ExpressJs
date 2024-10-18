import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'; // Using js-cookie for handling cookies
import DisplayNav from '../../components/DisplayNav';

function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  
  // Fetch user email from cookies
  const userEmail = Cookies.get('userEmail');
  console.log('Retrieved User Email from cookies:', userEmail); // Log the user email

  const fetchUserData = async () => {
    if (!userEmail) {
      setError('User email is not found in cookies.');
      return;
    }

    try {
      const response = await axios.get('http://localhost:4000/api/user/data-by-email', {
        params: { email: userEmail }
      });
      setUser(response.data);
    } catch (err) {
      setError('Error fetching user data');
      console.error('Fetch Error:', err); // Log the detailed error
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []); // Fetch user data on component mount

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>Loading user data...</div>; // Loading state
  }

  return (
    <>
      <DisplayNav />
      <section style={{ padding: '2rem 0', height: '90vh' }}>
        <div className="container">
          <h2>User Profile</h2>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{user.name}</h5>
              <p className="card-text">Email: {user.email}</p>
              <p className="card-text">CNIC: {user.cnicNumber}</p>
              {/* Add any other user details you want to display */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Profile;
