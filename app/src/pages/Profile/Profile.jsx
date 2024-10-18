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
            <div className="d-flex justify-content-center align-items-center mt-4" style={{ width: '80%', height: '100vh', backgroundColor: '#EAE6F5', padding: '10px', margin: '0 auto' }}>
            <section style={{ padding: '2rem 0', height: '90vh' }}>
                <div className="container">
                    
                <div className="card">
    <div className="card-body text-center"> {/* Center the card body content */}
        <h4 className='text-center'>Profile</h4>
        <img 
            className='mb-3' // Add some margin below the image
            src="/images/profile.jpg" 
            alt="profile" 
            style={{ width: '100px' }} // Set width to 100px
        />
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
