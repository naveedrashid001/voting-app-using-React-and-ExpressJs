import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VotingSection from '../Dispaly/HomePage/HomePage';

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
  const [isRegistered, setIsRegisteredLocal] = useState(false); // Local state to track registration

  useEffect(() => {
    setSelectedPage('LogIn');
  }, [setSelectedPage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

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
        console.log('User registered:', data);
        
        // Set the state to true to render VotingSection component
        setIsRegisteredLocal(true);
        setIsRegistered(true); // Update the parent state if necessary
      } else {
        console.error('Error registering user:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (isRegistered) {
    // Render VotingSection component after successful registration
    return <VotingSection />
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder='Enter Name' onChange={handleChange} required /> <br />
      <input type="number" name="age" placeholder='Enter Age' onChange={handleChange} required /> <br />
      <input type="email" name="email" placeholder='Enter Email' onChange={handleChange} required /> <br />
      <input type="text" name="address" placeholder='Enter Address' onChange={handleChange} required /> <br />
      <input type="number" name="cnicNumber" placeholder='Enter CNIC' onChange={handleChange} required /> <br />
      <input type="password" name="password" placeholder='Enter Password' onChange={handleChange} required /> <br />
      <input type="text" name="mobile" placeholder='Enter Phone No' onChange={handleChange} required /> <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default LogIn;
