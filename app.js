const express = require('express');

const bodyParser = require('body-parser');

const app = express();
const port = 3000;

//Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('form');
});

app.post('/submit', (req, res) => {
  const { first, last, email } = req.body;
  res.render('result', { first, last, email });
});

app.listen(port, () => {
  console.log(`App running on port http://localhost:${port}...`);
});
