const passport = require('passport');
const {getUserById} = require('../controllers/users-controller');
const LocalStrategy = require('passport-local').Strategy;

const { confirmLogIn } =require('../controllers/users-controller');

passport.serializeUser((user, done) => {
done(null, user.UserID)
});

passport.deserializeUser( async (UserID, done) => {
    try{
        const user = await getUserById(UserID);
        done(null, user);
    } catch (e) {
        done(e)
    }
})

const strategy =new LocalStrategy({
    passwordField: 'userPassword',
    usernameField: 'userEmail',
    passReqToCallback: true
    }, 
    async (req, userEmail, userPassword, callback) => {
        try{
            const user = await confirmLogIn(req);
            if (user.hasOwnProperty('message')) {
                throw new Error(user.message);
            }
            return callback(null, user);
        } catch (e) {
            return callback(e);
        }
});

passport.use('localStrategy', strategy);