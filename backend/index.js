require('dotenv').config();
const connectToMongo = require('./db');
connectToMongo();

const express = require('express')
var cors = require('cors')
const app = express()
const port = process.env.port;

app.use(express.json());
app.use(cors())
app.get('/', (req, res) => {
  res.send('Hello Hari!');
})


//Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));
app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})