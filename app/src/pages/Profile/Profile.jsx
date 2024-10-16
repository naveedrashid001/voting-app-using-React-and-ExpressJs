import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DisplayNav from '../../components/DisplayNav';

function Profile() {
  const [userIP, setUserIP] = useState('');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch the user's IP address
    const fetchIP = async () => {
      try {
        const response = await axios.get('https://api.ipify.org?format=json');
        setUserIP(response.data.ip);
      } catch (error) {
        console.error('Error fetching IP:', error);
      }
    };

    fetchIP();
  }, []);

  useEffect(() => {
    // Fetch user data based on the IP address
    const fetchUserData = async () => {
      if (userIP) {
        try {
          const response = await axios.get(`http://localhost:4000/user/data-by-ip?ip=${userIP}`);
          setUserData(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [userIP]);

  return (
    <>
      <DisplayNav />
      <div className="w-100 h-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: "#EAE6F5", height: "100vh" }}>
        <div className="card border-0" style={{ width: '30rem', height: 'auto', margin: '20px 0' }}>
          <div className="card-body d-flex flex-column justify-content-center">
            <h4 className="card-title text-center">Profile Details</h4>
            {/* Centering the image */}
            <div className="text-center">
              <img className="rounded-circle mt-1 mb-2" width="100px" src="/images/profile.jpg" alt="Profile" />
            </div>
            {userData ? (
              <div className="row">
                <div className="col-md-12"><p><strong>ID:</strong> {userData.users[0]._id}</p></div>
                <div className="col-md-12"><p><strong>Name:</strong> {userData.users[0].name}</p></div>
                <div className="col-md-12"><p><strong>Age:</strong> {userData.users[0].age}</p></div>
                <div className="col-md-12"><p><strong>Email:</strong> {userData.users[0].email}</p></div>
                <div className="col-md-12"><p><strong>Mobile:</strong> {userData.users[0].mobile}</p></div>
                <div className="col-md-12"><p><strong>CNIC:</strong> {userData.users[0].cnicNumber}</p></div>
                <div className="col-md-12"><p><strong>Role:</strong> {userData.users[0].role}</p></div>
                <div className="col-md-12"><p><strong>Is Voted:</strong> {userData.users[0].isVoted ? 'Yes' : 'No'}</p></div>
                <div className="col-md-12"><p><strong>Address:</strong> {userData.users[0].address}</p></div>
              </div>
            ) : (
              <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                <img
                  src="/images/loading.gif"
                  alt="Loading..."
                  style={{ width: '120px', height: '120px', padding: '20px' }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
