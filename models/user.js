const mongodb = require('mongodb');
const getDb = require('../util/database').getdb;

class User {
    constructor(username, email, cart, id) {
        this.name = username;
        this.email = email;
        this.cart = cart;
        this._id = id;
    }

    save() {
        const db = getDb();
        return db.collection('users').insertOne(this);
    }

    addToCart(product) {
        // const cartProduct = this.cart.items.findIndex(cp => {
        //     return cp._id === product._id;
        // });
        const updatedCart = {
            items: [{productId: new mongodb.ObjectID(product._id), quantity: 1}]
        }; //create a object with additional propertie - quantity
        const db = getDb();
        return db.collection('users').updateOne(
            {_id: new mongodb.ObjectID(this._id)}, 
            {$set: {cart: updatedCart}}
            );
    }

    static findById(userId) {
        const db = getDb();
        return db
            .collection('users')
            .findOne({ _id: new mongodb.ObjectID(userId) })
            .then(user => {
                return user;
            })
            .catch(err => {
                console.log(err);
              });
    }
}

module.exports = User;