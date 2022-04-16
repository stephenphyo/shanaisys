// const module = require('module');

const estcostCtrl = {
    create: (req, res) => {
        res.status(201).send("Create OK");
    },

    view: (req, res) => {
        res.status(200).send("View OK");
    },

}

module.exports = estcostCtrl;