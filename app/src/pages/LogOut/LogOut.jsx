import React from 'react';
import DisplayNav from '../../components/DisplayNav';

function LogOut() {
  return (
    <>
      <DisplayNav selectedPage="LogOut" />
      <div className="container mt-5">
        <h2>Log Out</h2>
        <p>You have been logged out successfully.</p>
      </div>
    </>
  );
}

export default LogOut;
