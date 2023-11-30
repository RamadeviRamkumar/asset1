const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const apiRoutes = require('./Routes/routes.js');
const assignRoutes = require('./Routes/assignroutes.js');
const asset = require('./Routes/assetroutes.js');
const issue = require('./Routes/issueroutes.js');
const mongodb = require('./Mongo/DB.js');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

const mongo = mongoose.connect(mongodb.url, { useNewUrlParser: true, useUnifiedTopology: true });
mongo.then(() => {
  console.log('Mongo_DB Connected Successfully');
}, error => {
  console.log('Error, While connecting to Mongo_DB something went wrong:', error);
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get('/', (req, res) => res.send('Welcome to Signin Page'));

app.use('/api', apiRoutes);
app.use('/api',assignRoutes);
app.use('/api',asset);
app.use('/api',issue);
module.exports = app;