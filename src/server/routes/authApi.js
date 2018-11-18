const express = require('express')
const passport = require('passport');

const Users = require('../db/users');
const Tokens = require('../websocket_handler/tokens');

const router = express.Router();


router.post('/login', passport.authenticate('local'), (req, res) => {

    res.status(204).send();
});


router.post('/signup', function(req, res){

    console.log("before creating" + req.body.userId);
    const created = Users.createUser(req.body.userId);

    if(! created){
        res.status(400).send();
        return;
    }

    passport.authenticate('local')(req, res, () => {
        console.log(req.body);
        req.session.save((err) => {
            if (err) {
                return next(err);
            }
            console.log('right place - authApi')
            console.log(Users.getUser(req.body.userId));
            res.status(204).send();
        });
    });
});


router.post('/logout', function(req, res){

    req.logout();
    res.status(204).send();
});


/*
    Create a one-time random token associated with the current
    logged in user, which is defined by the provided session cookie.
 */
router.post('/wstoken', function (req, res) {

    if(! req.user){
        console.log('wsToken - 401');
        res.status(401).send();
        return;
    }

    const t = Tokens.createToken(req.user.id);

    res.status(201).json({wstoken: t});
});

/*
    Just return the id of the user, if the request is
    authenticated with a valid session cookie
 */
router.get('/user', function (req, res) {
    //console.log(req.user.id);
    console.log(req.user);
    if(! req.user){
        console.log('/user - 401');
        res.status(401).send();
        return;
    }

    res.status(200).json({userId: req.user.id});
});


module.exports = router;
