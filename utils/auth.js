const passport =require("passport")
const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
        done(null, user);
});

passport.use(new GoogleStrategy({
        clientID:"361344985500-l946e4ra5nv3fgf66sgi26msg0euo2no.apps.googleusercontent.com",
        clientSecret:"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",
        callbackURL: "http://localhost:3000/auth/google/callback",
        passReqToCallback   : true
    },
    function(request, accessToken, refreshToken, profile, done) {
            return done(null, profile);
    }
));
