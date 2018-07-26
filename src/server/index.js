require('env2')('config.env');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dbConnection = require('./models/connection');
const routes = require('./controllers/routes');
const fileUpload = require('express-fileupload');

const PORT = 8000;

const app = express();

var corsOptions = {
  origin: '*',
  credentials:  true
}

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb',extended: false }));
app.use(fileUpload())
app.use('/api/v1/', routes);
app.use(express.static(path.join(__dirname, '../../public')));
app.use('/*', express.static(path.join(__dirname,'..','..','public','index.html')));

dbConnection.once('open', () => {
  console.log('connection to database established successfully');
  app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
  });
});
