"use strict";

const mongoose = require('mongoose');

const _callSchema = new mongoose.Schema({
   transcript: {type: String, required: false, trim: true},
   createdAt: {type: Date, default: Date.now},
   callerFirstName: {type: String, required: true, trim: true},
   callerLastName: {type: String, required: true, trim: true}
});

module.exports = mongoose.model('Call', _callSchema);
