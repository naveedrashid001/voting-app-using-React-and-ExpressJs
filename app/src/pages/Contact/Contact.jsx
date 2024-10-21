import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com'; // Import EmailJS
import { toast, ToastContainer } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles

function Contact({ setSelectedPage }) {
  const [formData, setFormData] = useState({
    email: '',
    cnic: '',
    message: ''
  });

  useEffect(() => {
    setSelectedPage('Contact Us');
  }, [setSelectedPage]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // CNIC validation: Check if it's exactly 13 digits long
    const cnicRegex = /^\d{13}$/;
    if (!cnicRegex.test(formData.cnic)) {
      toast.error('CNIC must be exactly 13 digits.'); // Show error notification
      return;
    }

    // EmailJS send function
    emailjs
      .send(
        'service_gpdju8r',     // Replace with your EmailJS service ID
        'template_2z6arlr',    // Replace with your EmailJS template ID
        formData,              // Form data (email, CNIC, and message)
        'deBIGx6vUOGlx9J0T'    // Replace with your EmailJS user ID
      )
      .then(
        (result) => {
          toast.success('Message sent successfully!'); // Success notification
          console.log(result.text);
        },
        (error) => {
          toast.error('Failed to send the message, please try again.'); // Error notification
          console.log(error.text);
        }
      );

    // Clear the form after submission
    setFormData({
      email: '',
      cnic: '',
      message: ''
    });
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-4" style={{ width: '80%', height: '85vh', backgroundColor: '#EAE6F5', padding: '15px', margin: '0 auto' }}>
      <div className="card shadow-lg p-4" style={{ width: '50%' }}>
        <h2 className="text-center mb-4">Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="cnic" className="form-label mb-0 p-0">CNIC:</label>
            <div><small className='mt-0 p-0' style={{ color: 'red', fontSize:"12px" }}>
                                    CNIC number must be 13 digits
                                </small></div>
            <input
              type="text"
              name="cnic"
              value={formData.cnic}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="message" className="form-label">Message:</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="form-control"
              style={{ height: '100px' }}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Send Message
          </button>
        </form>
      </div>

      <ToastContainer /> {/* Add ToastContainer to render toast notifications */}
    </div>
  );
}

export default Contact;
