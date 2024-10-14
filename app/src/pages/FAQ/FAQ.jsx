import React, { useEffect, useState } from 'react';

function FAQ({ setSelectedPage }) {
  const [openIndex, setOpenIndex] = useState(0); // Set the first FAQ to be open by default

  useEffect(() => {
    setSelectedPage('FAQ');
  }, [setSelectedPage]);

  const faqs = [
    {
      question: "What is the voting process?",
      answer: "To vote, you must first register on our platform. Once registered, you will receive a ballot on the voting day, which you can fill out and submit. Please ensure you check the eligibility criteria before voting.",
    },
    {
      question: "How do I select a candidate?",
      answer: "You can view a table of candidates on our Candidates page. Each candidate's profile includes detailed information, allowing you to make an informed choice. Select your preferred candidate from the list, and proceed with the voting process.",
    },
    {
      question: "What should I do if I have issues with my account?",
      answer: "If you encounter any issues with your account, such as trouble signing up or logging in, please use the 'Forgot Password' feature or contact us via the Contact Us section. You can send a message detailing your issue, and our support team will assist you as soon as possible.",
    },
    {
      question: "Who do I contact for technical support?",
      answer: "If you experience any technical issues while using the app, please reach out to our technical support team through the 'Contact Us' section. Provide details about the issue you are facing, and we will help you resolve it promptly.",
    },
    {
      question: "How is my privacy protected?",
      answer: "Your privacy is of utmost importance to us. All data is end-to-end encrypted, ensuring that no one can see the votes you cast or the specific candidate you choose. We implement stringent data protection measures to maintain your confidentiality and secure your information.",
    },
  ];

  return (
    <div className="container mt-5">
      <h2 className="gradient-text">Frequently Asked Questions (FAQ)</h2>
      <div className="accordion mt-4" id="faqAccordion">
        {faqs.map((faq, index) => (
          <div className="accordion-item" key={index}>
            <h2 className="accordion-header" id={`heading${index}`}>
              <button
                className={`accordion-button ${openIndex !== index ? 'collapsed' : ''}`} 
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse${index}`}
                aria-expanded={openIndex === index}
                aria-controls={`collapse${index}`}
                onClick={() => setOpenIndex(openIndex === index ? null : index)} // Toggle functionality
              >
                {faq.question}
              </button>
            </h2>
            <div
              id={`collapse${index}`}
              className={`accordion-collapse collapse ${openIndex === index ? 'show' : ''}`}
              aria-labelledby={`heading${index}`}
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQ;
