const express = require('express');
const Candidate = require('../models/Candidate');

const router = express.Router();

// Add Candidate
router.post('/addcandidate', async (req, res) => {
  const { name, party } = req.body;
  console.log(name.party)
  try {
    const newCandidate = new Candidate({ name, party });
    await newCandidate.save();
    res.json(newCandidate);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get All Candidates
router.get('/getcandidate', async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.delete('/deletecandidate/:id', async (req, res) => {
  const candidateId = req.params.id;

  try {
    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      return res.status(404).json({ msg: 'Candidate not found' });
    }

    await Candidate.findByIdAndDelete(candidateId); 
    res.json({ msg: 'Candidate deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete All Candidates
router.delete('/deleteallcandidates', async (req, res) => {
  try {
    await Candidate.deleteMany({});
    res.json({ msg: 'All candidates deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
