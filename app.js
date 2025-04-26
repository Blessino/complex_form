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
  const { first, last, email, phone } = req.body;
  const age = Number(req.body.age);

  //Server-side validation {
  if (!first || !last || !email || !age || !phone) {
    return res.render('form', { error: 'All fields are required to process' });
  }

  if (isNaN(age) || age < 1 || age > 120) {
    return res.render('form', {
      error: 'Age must be a number between 1 - 120',
    });
  }

  //checking of data is existed
  let submission = submissions.find((s) => s.email || s.phone);

  //Store in temporary array
  if (!submission) {
    submission = { first, last, email, age, phone };
    submissions.push(submission);
  }

  // Redirecting to result
  res.redirect(`/result?email=${encodeURIComponent(email)}`);
});

//GET result
app.get('/result', (req, res) => {
  const { email } = req.query;

  const submission = submissions.find((s) => s.email);

  if (!submission) {
    return res.redirect('/');
  }

  const { first, last, age, phone } = submission;

  //Render result
  res.render('result', { first, last, email, age, phone, submissions });
});

app.listen(port, () => {
  console.log(`App running on port http://localhost:${port}...`);
});
