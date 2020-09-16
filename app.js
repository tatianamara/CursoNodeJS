const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');

const controller404 = require('./controllers/404');

const app = express(); 

//app.engine('hbs', expressHbs({ layoutsDir: 'views/layouts/', defaultLayout: 'main-layout.hbs' }));
// seting the default template engine
//app.set('view engine', 'hbs'); // this allows to use the handlebars package to work with dynamic html
// app.set('view engine', 'pug'); // this allows to use the pug package to work with dynamic html
app.set('view engine', 'ejs'); // this allows to use the ejs package to work with dynamic html
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(controller404.get404);

app.listen(3000);