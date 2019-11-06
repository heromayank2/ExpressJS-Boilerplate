const express = require("express");
const router = express.Router();
const User = require('../../models/User')
const Facilities = require('../../models/Facilites')
const Package = require('../../models/Package')
const passport = require('passport');
var auth = require('../auth')

router.post('/package', auth.required, (req, res) => {
    const { body: { package, facilities } } = req
    const finalPackage = new Package(package);
    const finalFacilities = new Facilities(facilities)
    return finalPackage.save().then((finalPackage) => {
        finalFacilities.save().then((finalFacilities) => {
            return res.json({ package: finalPackage, facilities: finalFacilities })

        })
    })

})

router.delete('/package/:pid', auth.required, (req, res) => {
    const { payload: { id, type } } = req
    var pid = req.params.pid
    if (type == "admin") {
        return Package.deleteById({ package_id: pid })
            .then((package) => {
                Facilities.deleteById({ package_id: pid }).then(() => {
                    return req.send("Deleted Package With ID: " + package.package_id)
                })

            }).catch(err => {
                return req.sendStatus(404)
            })
    } else {
        return User.findById(id).then((user) => {
            if (user.package_id == pid) {
                return Package.deleteById({ package_id: pid })
                    .then((package) => {
                        Facilities.deleteById({ package_id: pid }).then(() => {
                            return req.send("Deleted Package With ID: " + package.package_id)
                        })
                    }).catch(err => {
                        return req.sendStatus(404)
                    })
            } else {
                return res.sendStatus(403)
            }

        })
    }
})

router.put('/package/:pid', auth.required, (req, res) => {
    const { payload: { id, type } } = req
    var pid = req.params.pid

    // Make new Package
    var newPackage = new Package()
    if (type == "admin") {
        // change 1
        return Package.updateById({})
            .then((package) => {
                return req.send("Updated Package With ID: " + package.package_id)
            }).catch(err => {
                return req.sendStatus(404)
            })
    } else {
        return User.findById(id).then((user) => {
            if (user.package_id == pid) {
                // change 2
                return Package.updateById({})
                    .then((package) => {
                        return req.send("Updated Package With ID: " + package.package_id)
                    }).catch(err => {
                        return req.sendStatus(404)
                    })
            } else {
                return res.sendStatus(403)
            }

        })
    }
})

router.get('/package', auth.required, (req, res) => {
    const { payload: { id } } = req
    return User.findById(id).then((user) => {
        var package_id = user.package_id
        Package.findById(package_id).then((package) => {
            if (package) {
                Facilities.findById({ package_id }).then((facilities) => {
                    return res.json({ package: package, facilities })
                })
            } else {
                return res.sendStatus(404)
            }
        })
    })

})

module.exports = router