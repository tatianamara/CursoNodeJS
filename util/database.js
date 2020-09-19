const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
    MongoClient.connect(
        'mongodb+srv://tatiana:mongo_tatiana@cluster0.tzuqw.mongodb.net/<dbname>?retryWrites=true&w=majority'
        )
        .then(client => {
            console.log('Connected!')
            callback(client);
        })
        .catch(err => console.log(err));
}
module.exports = mongoConnect;