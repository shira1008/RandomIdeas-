const path = require('path');
const express = require('express');
//to be able working on the dev localhost:
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const connectDB = require('./config/db');
connectDB();

const app = express();

//make a static folder:
app.use(express.static(path.join(__dirname, 'public')));

// body parser middleware allow us on the req object to acsess all field we want - req.body.text for example
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// cors middleware
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:5000'],
    credentials: true,
  })
);

app.get('/', (req, res) => {
  res.send({ message: 'hello world' });
});

const ideasRouter = require('./routes/ideas');
app.use('/api/ideas', ideasRouter);

app.listen(port, () => console.log(`server listning on port: ${port}`));
