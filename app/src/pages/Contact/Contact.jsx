import React from 'react'
import { useEffect } from 'react';

function Contact({setSelectedPage}) {
    useEffect(() => {
        setSelectedPage('Contact Us');
      }, [setSelectedPage]);
  return (
    <div>Contact</div>
  )
}

export default Contact
