const mysqlPool = require('../../../database/mysqldb.js');

const estcostCtrl = {

    create: (req, res) => {
        let r = req.body;
        mysqlPool.getConnection((err, conn) => {
            if (!err) {
                query = `INSERT INTO estimated_costs (
                    customer_id, inquiry_id, classification,
                    drawing_id, product_name, material_cost, purchase_cost, outsourcing_cost,
                    surface_treatment_cost, transportation_cost, variable_cost, total_man_hours,
                    manpower_cost, multiplier, product_cost, product_sale_price, indirect_profit_exp,
                    special_note, change_date
                    ) VALUES ?`;
                values = [[
                    r.customer_id, r.inquiry_id, r.classification, r.drawing_id, r.product_name, r.material_cost,
                    r.purchase_cost, r.outsourcing_cost, r.surface_treatment_cost, r.transportation_cost,
                    r.variable_cost, r.total_man_hours, r.manpower_cost, r.multiplier, r.product_cost,
                    r.product_sale_price, r.indirect_profit_exp, r.special_note, r.change_date
                ]];
                const c = conn.query(query, [values], (err, rows) => {
                    if (!err) {
                        res.status(201).send({ message: 'Successfully Created' });
                    } else {
                        res.status(403).send({ message: 'Record Creation Failed', error: err.message });
                    }
                });
                console.log(c);
                conn.release();
            } else {
                res.stauts(500).send({ message: 'Internal Server Error', error: err.message });
            }
        })
    },

    index: (req, res) => {
        mysqlPool.getConnection((err, conn) => {
            if (!err) {
                const query = `
                SELECT estimated_costs.*, companies.company_name_1
                FROM estimated_costs
                LEFT JOIN companies
                ON estimated_costs.customer_id = companies.company_id
                ORDER BY estimated_costs.id`;
                conn.query(query, (err, rows) => {
                    if (!err) {
                        res.status(200).send(rows);
                    } else {
                        res.status(403).send({ message: 'Fetch Failed', error: err.message });
                    }
                });
                conn.release();
            } else {
                res.status(500).send({ message: 'Internal Server Error', error: err.message });
            }
        })
    },

    view: (req, res) => {
        mysqlPool.getConnection((err, conn) => {
            if (!err) {
                const query = `
                SELECT * FROM estimated_costs
                WHERE id = ${req.params.id}`;
                conn.query(query, (err, rows) => {
                    if (!err) {
                        res.status(200).send(rows[0]);
                    } else {
                        res.status(403).send({ message: 'Record does not exist', error: err.message });
                    }
                });
                conn.release();
            } else {
                res.status(500).send({ message: 'Internal Server Error', error: err.message });
            }
        })
    },

    delete: (req, res) => {
        mysqlPool.getConnection((err, conn) => {
            if (!err) {
                const query = `
                DELETE FROM estimated_costs
                WHERE id = ${req.params.id}`;
                conn.query(query, (err, rows) => {
                    if (!err) {
                        res.status(200).send({ message: 'Delete Success' });
                    } else {
                        res.status(403).send({ message: 'Delete Failed', error: err.message });
                    }
                });
                conn.release();
            } else {
                res.status(500).send({ message: 'Internal Server Error', error: err.message });
            }
        })
    }

}

module.exports = estcostCtrl;