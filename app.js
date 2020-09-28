const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');

const mongoose = require('mongoose');

const controller404 = require('./controllers/404');

const User = require('./models/user');

const app = express();

//app.engine('hbs', expressHbs({ layoutsDir: 'views/layouts/', defaultLayout: 'main-layout.hbs' }));
// seting the default template engine
//app.set('view engine', 'hbs'); // this allows to use the handlebars package to work with dynamic html
// app.set('view engine', 'pug'); // this allows to use the pug package to work with dynamic html
app.set('view engine', 'ejs'); // this allows to use the ejs package to work with dynamic html
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

const { userInfo } = require('os');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById('5f70fed1a0fe1e28f0f07c50')
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(controller404.get404);

mongoose.connect('mongodb+srv://mongo_tatiana:<password>@cluster0.1y1dx.mongodb.net/shop?retryWrites=true&w=majority')
    .then(() => {
        User.findOne().then(user => {
            if (!user){
                const user = new User({
                    name: 'Tatiana',
                    email: 'tati@test.com',
                    cart: {
                        items: []
                    }
                });
                user.save();
            }
        })        
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });