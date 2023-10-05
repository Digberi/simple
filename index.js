//simple server that returns the env variables
const express = require('express');
const app = express();

require('dotenv').config();

const text = `FIRST_ENV: ${process.env.FIRST_ENV}
SECOND_ENV: ${process.env.SECOND_ENV}
SECRET_ENV: ${process.env.SECRET_ENV}
`;



app.get('/', (req, res) => {
  res.send(text);
});

app.listen(3000, () => console.log('Server ready'));