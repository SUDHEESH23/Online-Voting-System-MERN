import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

function AdminDashboard() {
  const [candidates, setCandidates] = useState([]);
  const [candidateName, setCandidateName] = useState('');
  const [candidateParty, setCandidateParty] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [logout, setLogout] = useState(false); // State to control logout

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/candidates/getcandidate');
      if (!response.ok) {
        throw new Error('Failed to fetch candidates');
      }
      const data = await response.json();
      setCandidates(data);
    } catch (error) {
      console.error('Error fetching candidates:', error); // Log error for debugging
    }
  };

  const handleAddCandidate = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found in localStorage');
      }

      const response = await fetch('http://localhost:3000/api/candidates/addcandidate', {
        method: 'POST',
        headers: {
          'x-auth-token': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: candidateName, party: candidateParty }),
      });

      if (!response.ok) {
        throw new Error('Failed to add candidate');
      }

      setAlertMessage('Candidate added successfully.');
      setIsAlertVisible(true);
      setCandidateName('');
      setCandidateParty('');
      fetchCandidates(); // Refresh candidate list
    } catch (error) {
      setAlertMessage('Failed to add candidate.');
      setIsAlertVisible(true);
      console.error('Error adding candidate:', error); // Log error for debugging
    }
  };

  const handleDeleteAllCandidates = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found in localStorage');
      }

      const response = await fetch('http://localhost:3000/api/candidates/deleteallcandidates', {
        method: 'DELETE',
        headers: {
          'x-auth-token': token,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete all candidates');
      }

      setAlertMessage('All candidates deleted successfully.');
      setIsAlertVisible(true);

      await resetUserVotedStatus(); // Reset user voted status

      fetchCandidates(); // Refresh candidate list
    } catch (error) {
      setAlertMessage('Failed to delete all candidates.');
      setIsAlertVisible(true);
      console.error('Error deleting all candidates:', error); // Log error for debugging
    }
  };

  const handleDeleteVotes = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found in localStorage');
      }

      const response = await fetch('http://localhost:3000/api/votes/deletevotes', {
        method: 'DELETE',
        headers: {
          'x-auth-token': token,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete votes');
      }

      setAlertMessage('All votes deleted successfully.');
      setIsAlertVisible(true);

      await resetUserVotedStatus(); // Reset user voted status

      fetchCandidates(); // Refresh candidate list
    } catch (error) {
      setAlertMessage('Failed to delete votes.');
      setIsAlertVisible(true);
      console.error('Error deleting votes:', error); // Log error for debugging
    }
  };

  const resetUserVotedStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found in localStorage');
      }

      const response = await fetch('http://localhost:3000/api/users/resetvotedstatus', {
        method: 'PUT',
        headers: {
          'x-auth-token': token,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to reset user voted status');
      }

      console.log('User voted status reset successfully.');
    } catch (error) {
      console.error('Error resetting user voted status:', error); // Log error for debugging
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
    <div id="admin-dashboard" className="container mt-5">
      <h2>Admin Dashboard</h2>
      <div className="mb-3">
        <label className="form-label">Candidate Name</label>
        <input
          type="text"
          className="form-control"
          value={candidateName}
          onChange={(e) => setCandidateName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Candidate Party</label>
        <input
          type="text"
          className="form-control"
          value={candidateParty}
          onChange={(e) => setCandidateParty(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleAddCandidate}>
        Add Candidate
      </button>

      <h3 className="mt-5">Candidates</h3>
      <ul className="list-group">
        {candidates.map(candidate => (
          <li key={candidate._id} className="list-group-item">
            <strong>{candidate.name}</strong> - {candidate.party} <br />
            Votes: {candidate.votes}
          </li>
        ))}
      </ul>

      <div className="mt-4">
        <button className="btn btn-danger me-3" onClick={handleDeleteAllCandidates}>
          Delete All Candidates
        </button>
        <button className="btn btn-danger" onClick={handleDeleteVotes}>
          Delete All Votes
        </button>
      </div>

      {isAlertVisible && (
        <div className="alert alert-info mt-3" role="alert">
          {alertMessage}
        </div>
      )}

      <button className="btn btn-secondary mt-5" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default AdminDashboard;
