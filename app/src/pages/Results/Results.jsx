import React from 'react'
import { useEffect } from 'react';

function Results({setSelectedPage}) {
  useEffect(() => {
    setSelectedPage('Result');
  }, [setSelectedPage]);
  return (
    <div>Results</div>
  )
}

export default Results;