const Product = require('../models/product');
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => { //this path works like route from React, will recognize every path with "/"
    Product.findAll()
        .then(products => {
            res.render('shop/product-list', {
                prods: products,
                pageTitle: 'All Products',
                path: '/products',
                hasProducts: products.length > 0
                // code for handlebars template
                /*productCSS: true,
                activeShop: true*/
            }) //we don't need to construct the path, because we set as default in app.js
        })
        .catch(err => console.log(err));
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findByPk(prodId)
    .then(product => {
        res.render('shop/product-details', {
            product: product,
            pageTitle: product.title,
            path: '/products'
        })
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
    Product.findAll()
        .then(products => {
            res.render('shop/index', {
                prods: products,
                pageTitle: 'Shop',
                path: '/',
                hasProducts: products.length > 0
            })
        })
        .catch(err => console.log(err));
};

exports.getCart = (req, res, next) => {
    Cart.getProducts(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for (product of products) {
                const cartProductData = cart.products.find(prod => prod.id === product.id);
                if (cartProductData) {
                    cartProducts.push({ productData: product, qty: cartProductData.qty });
                }
            }
            res.render('shop/cart', {
                pageTitle: 'Your Cart',
                path: '/cart',
                products: cartProducts
            });
        })
    });
};

exports.postCart = (req, res, next) => { // only will receive post requests 
    const prodId = req.body.productId;
    console.log(prodId);
    Product.findById(prodId, (product) => {
        Cart.addProduct(prodId, product.price);
        console.log(product);
    });
    res.redirect('/cart');
};

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.deleteProduct(prodId, product.price);
        res.redirect('/cart');
    });
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        pageTitle: 'Your Orders',
        path: '/orders'
    });
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout',
        path: '/checkout'
    });
};