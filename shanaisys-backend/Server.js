const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 9000;

/* Middleware */
app.use(cors());
app.use(express.json());

/* Routes */
app.get('/', (req, res) => {res.status(200).send('Server is running')});
app.use('/manufacturing', require('./routes/manufacturing/manufacturing.route'));

app.listen(PORT, () => { console.log(`Server is listening on PORT: ${PORT}`) });