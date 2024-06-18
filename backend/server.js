const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/candidates', require('./routes/candidates'));
app.use('/api/votes', require('./routes/votes'));

const PORT = 3000;
const HOST = '0.0.0.0';
app.listen(PORT, HOST, () => console.log(`Server started on ${HOST}:${PORT}`));
