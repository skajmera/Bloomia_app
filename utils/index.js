const router=require('express').Router()
const passport = require('passport');


const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}

router.get("/", (req, res) => {
    res.json({message: "You are not logged in"})
})

router.get("/failed", (req, res) => {
    res.send("Failed")
})
router.get("/success",isLoggedIn, (req, res) => {
    res.send(`Welcome ${req.user.email}, Name ${req.user.name.givenName}`)
})

router.get('/auth/google',
    passport.authenticate('google', {
            scope:
                ['email', 'profile']
        }
    ));

router.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/failed',
    }),
    function (req, res) {
        res.redirect('/success')

    }
);

router.get("/logout", (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})

module.exports=router;