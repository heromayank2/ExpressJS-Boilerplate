const express = require("express");
const router = express.Router();
const User = require('../../models/Admin')
const Package = require('../../models/Package')
const passport = require('passport');
var auth = require('../auth')

router.get('/', auth.optional, (req, res) => {
    const { body: { admin } } = req;
    if (!admin.aid) {
        return res.status(422).json({
            errors: {
                id: 'is required',
            },
        });
    }

    if (!admin.password) {
        return res.status(422).json({
            errors: {
                password: 'is required',
            },
        });
    }

    const demoAdmin = new Admin(admin);
    demoAdmin.setPassword(admin.password);
    return demoAdmin.save()
        .then(() => res.json({ admin: demoAdmin.toAuthJSON() }));
})

router.post('/login', auth.optional, (req, res) => {
    const { body: { admin } } = req;

    if (!admin.aid) {
        return res.status(422).json({
            errors: {
                id: 'is required',
            },
        });
    }

    if (!admin.password) {
        return res.status(422).json({
            errors: {
                password: 'is required',
            },
        });
    }
    Admin.findOne({ aid: admin.aid }).then((dbAdmin) => {
        console.log("Creating new admin..")
        if (dbAdmin) {
            if (dbAdmin.validatePassword(admin.password)) {
                const admin = dbAdmin;
                admin.token = dbAdmin.generateJWT();
                return res.json({ admin: admin.toAuthJSON() })
            }
        } else {
            return res.send(404)
        }

    })

})

router.get('/dashboard', auth.required, (req, res) => {
    var { payload: { id } } = req
    //  ---NOT WORKING---
    Admin.findOne({ id }).then((admin) => {
        User.find({}).then(users => {
            return res.json({ admin, users })
        })
    })

})

router.get('/current', auth.required, (req, res, next) => {
    const { payload: { id } } = req;

    return Admin.findById(id)
        .then((admin) => {
            if (!admin) {
                return res.sendStatus(400);
            }

            return res.json({ admin: admin.toAuthJSON() });
        });
});

module.exports = router