const express = require('express');
const path = require('path');
const uuid = require('./helpers/uuid');
const review = require('./db/review');
const fs = require('fs')
const util = require('util')

const PORT = process.env.PORT || 3001;


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
  res.status(200).json(review);
});


app.post('/api/notes', (req, res) => {
  
  console.info(`${req.method} request received to add a review`);

  
  const { title, text } = req.body;

  
  if (req.body) {
    const newReview = {
     title,
     text,
    };

    const response = {
      status: 'success',
      body: newReview,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting review');
  }
});

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile('./db/jnotes.json').then((data) => res.json(JSON.parse(data)));
});

app.listen(PORT, () => console.log(`App listening on port http://localhost:${PORT}`));
