const mongoose = require("mongoose");

const healthSchema = require('./HealthSchema.js');

module.exports = mongoose.model('Health', healthSchema, 'health')