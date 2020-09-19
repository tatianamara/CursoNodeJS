const mongodb = require('mongodb');
const getDb = require('../util/database').getdb;

class Product {
    constructor(title, price, description, imageUrl, id) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this._id = id;
    }

    save() {
        const db = getDb();
        let dbOp;
        if (this._id) {
            dbOp = db.collection('product')
            .updateOne({_id = new mongodb.ObjectID(this.id)}, {$set: this});
        } else {
            dbOp = db.collection('product').insertOne(this);
        }
        return db.Op
            .then(result => {
                console.log(result);
            })
            .catch(err => console.log(err));
    }

    static fetchAll() {
        const db = getDb();
        return db.collection('product')
            .find()
            .toArray()
            .then(products => {
                // console.log(products);
                return products;
            })
            .catch(err => console.log(err));
    }

    static findById(prodId) {
        const db = getDb();
        return db
            .collection('product')
            .find({ _id: new mongodb.ObjectID(prodId) })
            .next()
            .then(product => {
                console.log(product);
                return product;
            })
            .catch(err => console.log(err));
    }
}

module.exports = Product;