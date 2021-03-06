var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

router.get('/', (req, res) => {
    res.send('GET OK');
})

router.post('/', (req, res, next) => {
    MongoClient.connect( "mongodb://admin:admin@ds127391.mlab.com:27391/rider2yby", (err, db) => {
        if (err) {
            console.log('Error: ' + err);
            return false;
        }
        let user = {
            name: req.body.name,
            email: req.body.email,
            image: req.body.image,
            user_id: req.body.user_id
        };
        let query = { _id: ObjectId(req.body.club_id) };
        // res.send(query);
        // res.end();
        db.collection('clubs').update(query, { '$pull': { 'users': user } }, (err, nInserted) => {
            if (err) {
                console.log(err);
                return false;
            }
            res.send('Removed : ' + nInserted);
            res.end();
        });
        db.close();
    });
});
module.exports = router;