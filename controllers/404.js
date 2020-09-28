exports.get404 = (req, res, next) => {
    // res.status(404).sendFile(path.join(__dirname, 'views', '404-page.html'));
    res.status(404).render('404-page', { 
        pageTitle: 'Page Not Found', 
        path: '/404',
        isAuthenticated: req.isLoggedIn });
};