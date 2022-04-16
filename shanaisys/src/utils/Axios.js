const axios = require('axios');

const api = axios.create({
    baseURL: "http://localhost:9000",
})

module.exports = api;