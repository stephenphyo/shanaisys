const mysqlPool = require("../../database/mysqldb.js");

const inquiryCtrl = {
  create: (req, res) => {
    mysqlPool.getConnection((err, conn) => {
      if (!err) {
        let r = req.body;
        const query = `INSERT INTO inquiries 
                ('inquiry_degree', 'employee_id', 'contact_name',
                'department_id', 'department_name', 'customer_id',
                'customer_name', 'customer_contact_name',
                'delivery_destination_id' , 'delivery_name',
                'delivery_person_name', 'title', 'article_number',
                'article_name', 'quantity', 'desired_delivery_date',
                'estimated_delivery_date', 'amount_type', 'desired_amount',
                'remarks', 'specifications', 'input_date', 'status', 'updated_at',
                'created_at') VALUES ?`;

        const values = [[r.inquiry_degree]];
        conn.query(query, [values], (err, rows) => {
          if (!err) {
            res.status(201).send({ message: "Successfully Created" });
          } else {
            res
              .status(403)
              .send({ message: "Not Authorized", error: err.message });
          }
        });
        conn.release();
      } else {
        res
          .status(500)
          .send({ message: "Internal Server Error", error: err.message });
      }
    });
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
            res
              .status(403)
              .send({ message: "Fetch Failed", error: err.message });
          }
        });
        conn.release();
      } else {
        res
          .status(500)
          .send({ message: "Internal Server Error", error: err.message });
      }
    });
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
            res
              .status(403)
              .send({ message: "Record does not exist", error: err.message });
          }
        });
        conn.release();
      } else {
        res
          .status(500)
          .send({ message: "Internal Server Error", error: err.message });
      }
    });
  },

  delete: (req, res) => {
    mysqlPool.getConnection((err, conn) => {
      if (!err) {
        const query = `
                DELETE FROM estimated_costs
                WHERE id = ${req.params.id}`;
        conn.query(query, (err, rows) => {
          if (!err) {
            res.status(200).send({ message: "Delete Success" });
          } else {
            res
              .status(403)
              .send({ message: "Delete Failed", error: err.message });
          }
        });
        conn.release();
      } else {
        res
          .status(500)
          .send({ message: "Internal Server Error", error: err.message });
      }
    });
  },
};

module.exports = inquiryCtrl;
