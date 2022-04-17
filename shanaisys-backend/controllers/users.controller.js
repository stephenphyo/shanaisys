const mysqlPool = require('../database/mysqldb.js');
const { v4: uuid } = require('uuid');
const bcrypt = require('bcrypt');
const generateJWT = require('../utils/jwt');

const usersCtrl = {
    getUsers: (req, res) => {
        mysqlPool.getConnection((err, conn) => {
            conn.query(`SELECT * FROM Users`, (err, rows) => {
                if (!err) {
                    res.status(200).send(rows);
                } else {
                    res.status(500).send(err.message);
                }
            })
            console.log(`Connection Limit: ${mysqlPool.config.connectionLimit}`);
            console.log(`Free Connections: ${mysqlPool._freeConnections.length}`);
            console.log(`Used Connections: ${mysqlPool._allConnections.length}`);
            console.log(`Acquiring Connections: ${mysqlPool._acquiringConnections.length}`);
        })
    },

    SignIn: (req, res) => {
        mysqlPool.getConnection((err, conn) => {
            if (!err) {
                conn.query(`SELECT * FROM Users WHERE email='${req.body.email}'`,
                    (err, rows) => {
                        if (!err) {
                            let user = rows[0];
                            console.log(`User: ${user}`);
                            if (rows.length != 0) {
                                // bcrypt.compare is a Promise
                                // It  simply pulls the salt out of the hash and then uses it to hash the password and perform the comparison.
                                // Syntax: bcrypt.compare(password-to-compare, hash, callback)
                                bcrypt.compare(req.body.password, user.password, (bcrypt_err, bcrypt_res) => {
                                    if (bcrypt_err) {
                                        res.status(500).send(err.message);
                                    }
                                    // If there is a response, bcrypt compare promise is resolved, i.e. same password
                                    // else different passwords
                                    if (bcrypt_res) {
                                        res.status(200).send({
                                            userid: user.userid,
                                            firstname: user.firstname,
                                            lastname: user.lastname,
                                            email: user.email,
                                            // isAdmin: user.isAdmin,
                                            jwt: generateJWT({ user })
                                        });
                                    } else {
                                        res.status(401).send({ message: 'Wrong Password' });
                                    }
                                })
                            } else {
                                res.status(401).send({ message: "Email Address Not Found" });
                            }

                        } else {
                            res.status(500).send(err.message);
                        }
                    }
                );
                conn.release();
            } else {
                res.status(500).send(err.message);
            }
        })
        console.log(`Connection Limit: ${mysqlPool.config.connectionLimit}`);
            console.log(`Free Connections: ${mysqlPool._freeConnections.length}`);
            console.log(`Used Connections: ${mysqlPool._allConnections.length}`);
            console.log(`Acquiring Connections: ${mysqlPool._acquiringConnections.length}`);
    },

    SignUp: (req, res) => {
        mysqlPool.getConnection((err, conn) => {
            if (!err) {
                let r = req.body;
                // Generating Salt
                const salt = bcrypt.genSaltSync(10);
                /*
                Hashing Password with Salt
                Salt Length = 29
                Encrypted Password Length = 60
                */
                const password = bcrypt.hashSync(r.password, salt);

                const query = "INSERT INTO Users VALUES ?";
                var values = [[uuid(), r.email, r.fname, r.lname, password, r.gender, salt]];

                // 'values'  is an array of parameters wrapped in an array
                conn.query(query, [values], (err, rows) => {
                    if (!err) {
                        res.status(201).send(`User account: ${r.email} has been created successfully`);
                    } else {
                        res.status(403).send(`User account: ${r.email} failed`);
                    }
                })
            } else {
                res.status(500).send(err.message);
            }
        });
    }
}

module.exports = usersCtrl;