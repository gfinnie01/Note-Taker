const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3001;


const app = express();

app.use(express.static('public'));

app.get('/api/review', (req, res) => {
  res.status(200).json(review);
});


app.post('/api/review', (req, res) => {
  
  console.info(`${req.method} request received to add a review`);

  
  const { title, text } = req.body;

  
  if (title && text) {
   
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

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
