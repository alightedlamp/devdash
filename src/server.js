const express = require('express');
const expressHandlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const passport = require('passport');

require('dotenv').config();
const keys = require('./config/keys');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.listen(PORT, () => console.log(`App running on port ${PORT}`));
