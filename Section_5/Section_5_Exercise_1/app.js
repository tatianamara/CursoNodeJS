const path = require('path');
const express = require('express');

const bodyParser = require('body-parser');

const mainRoutes = require('./routes/index');

const app = express();

app.set('view engine', 'ejs'); // this allows to use the ejs package to work with dynamic html
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(mainRoutes);

app.listen(3000);