import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Using js-cookie for handling cookies

function LogIn({ setSelectedPage }) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    mobile: '',
    address: '',
    cnicNumber: '',
    password: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Use useNavigate for navigation

  useEffect(() => {
    setSelectedPage('LogIn');
  }, [setSelectedPage]);

  // Handle input changes for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      const response = await fetch('http://localhost:4000/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Full response data:', data); // Log the full response for debugging

        const token = data.token; // Access the token from response
        if (token) {
          Cookies.set('authToken', token, { expires: 1 }); // Set the cookie
          console.log('Token set in cookies:', token);
          navigate('/HomePage'); // Redirect to HomePage after successful registration
        } else {
          console.error('Token is undefined. Check the backend response structure.');
        }
      } else {
        const errorData = await response.json();
        console.error('Error registering user:', errorData.message || response.statusText);
        setErrorMessage(errorData.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Enter Name" value={formData.name} onChange={handleChange} required />
        <input type="number" name="age" placeholder="Enter Age" value={formData.age} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Enter Email" value={formData.email} onChange={handleChange} required />
        <input type="text" name="mobile" placeholder="Enter Mobile" value={formData.mobile} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Enter Address" value={formData.address} onChange={handleChange} required />
        <input type="text" name="cnicNumber" placeholder="Enter CNIC Number" value={formData.cnicNumber} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Enter Password" value={formData.password} onChange={handleChange} required />
        <button type="submit">Submit</button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}

export default LogIn;
