const getDb = require('../util/database').getdb;

class Product {
    constructor(title, price, description, imageUrl) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    save() {
        const db = getDb();
        db.collection('product')
            .insertOne(this)
            .then()
            .catch(err => console.log(err));
    }
}

module.exports = Product;