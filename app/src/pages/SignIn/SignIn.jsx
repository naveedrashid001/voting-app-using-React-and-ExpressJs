import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Using js-cookie for handling cookies
import { ToastContainer, toast } from 'react-toastify'; // Import Toast components
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

function SignIn({ setSelectedPage }) {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        email: '',
        mobile: '',
        address: '',
        cnicNumber: '',
        password: ''
    });

    const navigate = useNavigate(); // Use useNavigate for navigation

    useEffect(() => {
        setSelectedPage('SignIn');
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

        if (formData.password.length < 7 || formData.password.length > 14) {
            toast.error('Password must be between 8 and 14 characters long.'); // Show error toast notification
            return; // Stop form submission if the validation fails
        } 
        // Age validation
          if (formData.age < 18 || formData.age > 100) {
           toast.error('You are not eligible to vote'); // Show error toast notification
            return; // Stop form submission if the validation fails
          }


        try {
            const response = await fetch('http://localhost:4000/api/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const text = await response.text(); // Read response as text

            if (response.ok) {
                const data = JSON.parse(text); // Parse the JSON response
                console.log('Full response data:', data); // Log the full response for debugging

                const { token, userId } = data; // Access the token and user ID from response
                if (token) {
                    Cookies.set('authToken', token, { expires: 1 }); // Set the cookie
                    localStorage.setItem('userId', userId); // Store user ID in local storage
                    console.log('Token set in cookies:', token);
                    console.log('User ID stored in local storage:', userId);
                    
                    // Show success toast notification
                    toast.success('Registration successful! Redirecting to login page...');

                    // Redirect to LogIn page after a short delay for the notification to show
                    setTimeout(() => {
                        navigate('/LogIn');
                    }, 2000); // Delay of 2 seconds
                } else {
                    console.error('Token is undefined. Check the backend response structure.');
                    toast.error('Registration successful, but token is missing. Please contact support.');
                }
            } else {
                // Handle error response
                const errorMessage = text || 'User already exists. Please try a different email or CNIC.';
                console.error('Error registering user:', errorMessage);
                toast.error(errorMessage); // Show error toast notification
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('An unexpected error occurred. Please try again.');
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
                        <h1 className="fw-bolder">Sign In</h1>
                    </div>
                    <div className="row gx-5 justify-content-center">
                        <div className="col-lg-8 col-xl-6">
                            <form onSubmit={handleSubmit} id="signInForm">
                                {/* Input fields for sign up */}
                                <div className="form-floating mb-3">
                                    <input
                                        className="form-control"
                                        id="name" 
                                        name="name" 
                                        type="text"
                                        placeholder="Enter your name..."
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                    <label htmlFor="name">Name</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        className="form-control"
                                        id="age"
                                        name="age"
                                        type="number"
                                        placeholder="Enter your age..."
                                        value={formData.age}
                                        onChange={handleChange}
                                        required
                                    />
                                    <label htmlFor="age">Age</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="Enter your email..."
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                    <label htmlFor="email">Email address</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        className="form-control"
                                        id="mobile"
                                        name="mobile"
                                        type="text"
                                        placeholder="Enter your mobile..."
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        required
                                    />
                                    <label htmlFor="mobile">Mobile</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        className="form-control"
                                        id="address"
                                        name="address"
                                        type="text"
                                        placeholder="Enter your address..."
                                        value={formData.address}
                                        onChange={handleChange}
                                        required
                                    />
                                    <label htmlFor="address">Address</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        className="form-control"
                                        id="cnicNumber"
                                        name="cnicNumber"
                                        type="text"
                                        placeholder="Enter your CNIC Number..."
                                        value={formData.cnicNumber}
                                        onChange={handleChange}
                                        required
                                    />
                                    <label htmlFor="cnicNumber">CNIC Number</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="Enter your password..."
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                    <label htmlFor="password">Password</label>
                                </div>
                                <button
                                    className="d-grid btn btn-primary btn-lg form-control"
                                    type="submit"
                                >
                                    Sign In
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer /> {/* Add ToastContainer for notifications */}
        </section>
    );
}

export default SignIn;
