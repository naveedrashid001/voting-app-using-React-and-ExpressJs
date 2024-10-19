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
            const response = await axios.get(`http://localhost:4000/api/user/data-by-email`, {
                params: { email: userEmail } // Use the email from cookies
            });
            setUser(response.data);
        } catch (err) {
            setError('Error fetching user data');
            console.error('Fetch Error:', err); // Log the detailed error
        }
    };

    useEffect(() => {
        if (userEmail) { // Only fetch user data if userEmail is defined
            fetchUserData();
        } else {
            setError('User email is not found in cookies. Please log in.');
        }
    }, [userEmail]); // Fetch user data when userEmail changes

    if (error) {
        return <div>{error}</div>;
    }

    if (!user) {
        return <div>Loading user data...</div>; // Loading state
    }

    return (
        <>
            <DisplayNav />
            <div className="d-flex justify-content-center align-items-center mt-4" style={{ width: '80%', height: '80vh', backgroundColor: '#EAE6F5', padding: '10px', margin: '0 auto' }}>
                <section style={{ padding: '2rem 0', height: '90vh', overflow: 'hidden' }}>
                    <div className="container d-flex justify-content-center align-items-center" style={{ padding: '20px', width: '100%' }}>
                        <div className='col-sm-4 d-flex flex-column align-items-center justify-content-center' style={{ height: '100%' }}>
                            <img 
                                className='mb-3' // Add some margin below the image
                                src="/images/profile.jpg" 
                                alt="profile" 
                                style={{ width: '100px', borderRadius: '50%' }} // Set width to 100px
                            />
                            <h5 className="card-text text-center"><strong>{user.name}</strong></h5>
                            <p className="card-text text-center"><strong>{user.email}</strong></p>
                        </div>

                        {/* Vertical Line */}
                        <div style={{ height: '80%', borderLeft: '1px solid #ccc', margin: '0 20px' }}></div> 

                        <div className='col-sm-8 d-flex flex-column justify-content-center'>
                            <div className="card-body" style={{ padding: '20px' }}> {/* Center the card body content */}
                                <h4 className='text-center mb-3'>Profile Details</h4>
                                <p className="card-text"><strong>ID:</strong> {user._id}</p>
                                <p className="card-text"><strong>Name:</strong> {user.name}</p>
                                <p className="card-text"><strong>Age:</strong> {user.age}</p>
                                <p className="card-text"><strong>Email:</strong> {user.email}</p>
                                <p className="card-text"><strong>Mobile:</strong> {user.mobile}</p>
                                <p className="card-text"><strong>CNIC:</strong> {user.cnicNumber}</p>
                                <p className="card-text"><strong>Address:</strong> {user.address}</p>
                                <p className="card-text"><strong>Role:</strong> {user.role}</p>
                                <p className="card-text"><strong>Has Voted:</strong> {user.isVoted ? 'Yes' : 'No'}</p>
                                {/* You can omit the password for security reasons */}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default Profile;
