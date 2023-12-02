const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware

const app = express();
const PORT = 5004;

app.use(cors()); // Enable CORS for all routes

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/contact', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  number: String,
  message: String,
});

const Contact = mongoose.model('Contact', contactSchema);

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, number, message } = req.body;
    const contact = new Contact({ name, email, number, message });
    await contact.save();
    res.status(201).json({ message: 'Contact saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
