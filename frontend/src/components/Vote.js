import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom'; // Import Navigate from react-router-dom

function Vote() {
  const [candidates, setCandidates] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [logout, setLogout] = useState(false); // State to control logout
  const [votingStarted, setVotingStarted] = useState(true); // Track if voting has started

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/candidates/getcandidate');
      if (response.ok) {
        const data = await response.json();
        setCandidates(data);
        if (data.length === 0) {
          setVotingStarted(false); // No candidates available, voting not started
        }
      } else {
        throw new Error('Failed to fetch candidates');
      }
    } catch (error) {
      console.error('Error fetching candidates:', error); // Log error for debugging
      setVotingStarted(false); // Set to false if there's an error
    }
  };

  const handleVote = async (candidateId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found in localStorage');
      }

      const response = await fetch(`http://localhost:3000/api/votes/${candidateId}`, {
        method: 'POST',
        headers: {
          'x-auth-token': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.alreadyVoted) {
          setAlertMessage('You have already voted for this candidate.');
        } else {
          setAlertMessage('Vote successful.');
        }
      } else {
        throw new Error(data.message || 'Failed to vote.');
      }

      setIsAlertVisible(true);

      setTimeout(() => {
        setIsAlertVisible(false);
        handleLogout(); // Automatically logout after 3 seconds
      }, 3000);
    } catch (error) {
      setAlertMessage('Voting failed. Please try again.');
      setIsAlertVisible(true);
      console.error('Error in handleVote:', error); // Log error for debugging
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token from localStorage
    setLogout(true); // Set logout state to true
  };

  if (logout) {
    return <Navigate to="/" />; // Redirect to login page if logout state is true
  }

  return (
    <div id="vote-form" className="container mt-5">
      <h2>Candidate Voting</h2>
      {!votingStarted ? (
        <div className="alert alert-warning" role="alert">
          Voting has not started yet. 
          <button className="btn btn-secondary ms-2" onClick={handleLogout}>Logout</button>
        </div>
      ) : candidates.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No candidates available for voting. 
          <button className="btn btn-secondary ms-2" onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3>Candidates</h3>
            <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
          </div>
          {candidates.map(candidate => (
            <div key={candidate._id} className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{candidate.name}</h5>
                <p className="card-text">Party: {candidate.party}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => handleVote(candidate._id)}
                >
                  Vote
                </button>
              </div>
            </div>
          ))}
        </>
      )}

      {isAlertVisible && (
        <div className="alert alert-info mt-3" role="alert">
          {alertMessage}
        </div>
      )}
    </div>
  );
}

export default Vote;
