const express = require('express');
const cors = require('cors');
const connectDB = require('./dataBase');
const app = express();

connectDB();
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/authentication'), (req, res) => { });


const port = 5000;
app.listen(port, () => console.log(`http://localhost:${port}`))