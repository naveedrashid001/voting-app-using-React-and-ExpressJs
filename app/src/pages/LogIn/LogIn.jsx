import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LogIn({ setSelectedPage, setIsRegistered }) {
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
        console.log('User registered:', data); // This will log the response from your backend

        // Redirect to HomePage after successful registration
        navigate('/HomePage'); 
      } else {
        const errorData = await response.json();
        console.error('Error registering user:', errorData.message || response.statusText);
        
        // Check if the error message is about duplicate email or CNIC
        if (errorData.message === 'User with this email or CNIC already exists') {
          setErrorMessage('User with this email or CNIC already exists. Please try a different one.');
        } else {
          setErrorMessage('Registration failed. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An unexpected error occurred. Please try again.');
    }
};


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Enter Name" onChange={handleChange} required /> <br />
        <input type="number" name="age" placeholder="Enter Age" onChange={handleChange} required /> <br />
        <input type="email" name="email" placeholder="Enter Email" onChange={handleChange} required /> <br />
        <input type="text" name="address" placeholder="Enter Address" onChange={handleChange} required /> <br />
        <input type="number" name="cnicNumber" placeholder="Enter CNIC" onChange={handleChange} required /> <br />
        <input type="password" name="password" placeholder="Enter Password" onChange={handleChange} required /> <br />
        <input type="text" name="mobile" placeholder="Enter Phone No" onChange={handleChange} required /> <br />
        <button type="submit">Submit</button>
      </form>

      {/* Display error message if it exists */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}

export default LogIn;
