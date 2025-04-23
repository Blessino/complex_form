const express = require('express');

const bodyParser = require('body-parser');

const app = express();
const port = 3000;

//Temporary storage (in-memory)
const submissions = [];

//Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

//GET from
app.get('/', (req, res) => {
  res.render('form', { error: null });
});

//Post form
app.post('/submit', (req, res) => {
  const { first, last, email, age, phone } = req.body;

  //Server-side validation {
  if (!first || !last || !email || !age || !phone) {
    return res.render('form', { error: 'All fields are required to process' });
  }

  if (Number.isNaN(age) || age < 1 || age > 120) {
    return res.render('form', {
      error: 'Age must be a number between 1 - 120',
    });
  }

  //Stoer in temporary array
  submissions.push({ first, last, email, age, phone });

  res.render('result', { first, last, email, age, phone, submissions });
});

app.listen(port, () => {
  console.log(`App running on port http://localhost:${port}...`);
});
