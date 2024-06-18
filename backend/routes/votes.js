const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');
const Candidate = require('../models/Candidate');

const router = express.Router();

// Vote for Candidate
router.post('/:candidateId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.voted) return res.status(400).json({ msg: 'User has already voted' });

    const candidate = await Candidate.findById(req.params.candidateId);
    if (!candidate) return res.status(404).json({ msg: 'Candidate not found' });

    candidate.votes += 1;
    await candidate.save();

    user.voted = true;
    await user.save();

    res.json({ msg: 'Vote cast successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }

  
});

router.delete('/deletevotes', async (req, res) => {
  try {
    // Logic to delete all votes
    await Candidate.updateMany({}, { $set: { votes: 0 } });

    res.json({ msg: 'All votes deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
