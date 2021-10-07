const mongoose = require("mongoose");

const financeSchema = require('./FinanceSchema')

module.exports = mongoose.model('Finance', financeSchema, 'finance')