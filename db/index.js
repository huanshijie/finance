
const AppDao = require('./dao');
const CostRespository = require('./cost-repository');

const dao = new AppDao('./app.db');
const costRepo = new CostRespository(dao);

module.exports = {costRepo};