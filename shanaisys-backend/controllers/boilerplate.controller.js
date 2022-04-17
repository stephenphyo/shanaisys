const mysqlPool = require('../../database/mysqldb.js');

const estcostCtrl = {
    create: (req, res) => {
        mysqlPool.getConnection((err, conn) => {
            if (!err) {
                conn.query(query, values, (err, rows) => {
                    if (!err) {
                        res.status(201).send({ message: 'Successfully Created' });
                    } else {
                        res.status(403).send({ message: 'Record Creation Failed', error: err.message });
                    }
                });
                conn.release();
            } else {
                res.stauts(500).send({ message: 'Internal Server Error', error: err.message });
            }
        })
    },

    view: (req, res) => {
        res.status(200).send("View OK");
    },

}

module.exports = estcostCtrl;