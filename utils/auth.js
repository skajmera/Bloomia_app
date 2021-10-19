const passport =require("passport")
const GoogleStrategy = require('passport-google-oauth2').Strategy;
require('dotenv').config();

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
        done(null, user);
});
// ||process.env.clientID
// process.env.clientSecret,
// process.env.callbackURL,
passport.use(new GoogleStrategy({
        clientID:"361344985500-l946e4ra5nv3fgf66sgi26msg0euo2no.apps.googleusercontent.com",
        clientSecret:"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",
        callbackURL:"https://bloomia.herokuapp.com/auth/google/callback",
        passReqToCallback   : true
    },
    function(request, accessToken, refreshToken, profile, done) {
            return done(null, profile);
    }
));
