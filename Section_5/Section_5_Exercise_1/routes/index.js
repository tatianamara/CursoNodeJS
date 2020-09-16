const path = require('path');

const express = require('express');

const router = express.Router();

const users = [];

router.get('/users', (req, res, next) => {
    //res.sendFile(path.join(__dirname, '..', 'views', 'users.html'));
    console.log(users, users.length);
    res.render('users', {
        pageTitle: 'Users',
        path: '/users',
        users
    });
});

// /index => GET
router.get('/', (req, res, next) => {
    //res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
    res.render('index', {
        pageTitle: 'Add User',
        path: '/',
    })
});
// /index => POST
router.post('/', (req, res, next) => {
    console.log(req.body.title);
    users.push({ name: req.body.title });
    res.redirect('/users');
})

module.exports = router;