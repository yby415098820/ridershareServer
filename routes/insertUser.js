var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var mongojs = require('mongojs');
var dbPath = "mongodb://admin:admin@ds127391.mlab.com:27391/rider2yby";
var db = mongojs(dbPath);

router.get('/', (req, res) => {
    res.send('GET OK');
})

router.post('/', (req, res, next) => {
    let user = {
        name: req.body.name,
        email: req.body.email,
        image: req.body.image,
        user_id: req.body.user_id
    };
    let query = { _id: ObjectId(req.body.club_id) };
    // res.send(query);
    // res.end();
    db.collection('clubs').update(query, { '$push': { 'users': user } }, (err, nInserted) => {
        if (err) {
            console.log(err);
            return false;
        }
        res.send('Inserted : ' + nInserted);
        res.end();
    });
});
module.exports = router;