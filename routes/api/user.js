const express = require("express");
const router = express.Router();
const User = require('../../models/User')
const Package = require('../../models/Package')
const passport = require('passport');
var auth = require('../auth')

router.post('/', auth.optional, (req, res, next) => {
    const { body: { user } } = req;

    if (!user.email) {
        return res.status(422).json({
            errors: {
                email: 'is required',
            },
        });
    }

    if (!user.password) {
        return res.status(422).json({
            errors: {
                password: 'is required',
            },
        });
    }

    const finalUser = new User(user);

    finalUser.setPassword(user.password);

    return finalUser.save()
        .then(() => res.json({ user: finalUser.toAuthJSON() }));
});

router.post('/login', auth.optional, (req, res, next) => {
    const { body: { user } } = req;

    if (!user.email) {
        return res.status(422).json({
            errors: {
                email: 'is required',
            },
        });
    }

    if (!user.password) {
        return res.status(422).json({
            errors: {
                password: 'is required',
            },
        });
    }

    return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
        if (err) {
            return next(err);
        }

        if (passportUser) {
            const user = passportUser;
            user.token = passportUser.generateJWT();
            return res.json({ user: user.toAuthJSON() }).send("You are in");
        }

        return status(400).info;
    })(req, res, next);
});

router.get('/profile', auth.required, (req, res, next) => {
    const { payload: { id } } = req;

    return User.findById(id)
        .then((user) => {
            if (!user) {
                return res.sendStatus(400);
            } else {
                if (user.package_id) {
                    Package.findById({ package_id: user.package_id }).then((package) => {
                        if (!package) {
                            return res.json({ user: user.toAuthJSON(), package });
                        }
                        return res.json({ user: user.toAuthJSON() });
                    })
                }
                return res.json({ user: user.toAuthJSON() });
            }
        });
});

// Yet to be made
router.post('/forgot/password', auth.optional, (req, res) => {
    const { body: { username, newpassword } } = req
    return User.updateById({ username })
})



module.exports = router;