"use strict";

const mongoose = require('mongoose');

const _callSchema = {
   transcript: {type: String, required: true, trim: true},
   createdAt: {type: Date, default: Date.now},
   callerFirstName: {type: String, required: true, trim: true},
   callerLastName: {type: String, required: true, trim: true}
}

module.exports = mongoose.Schema(_callSchema);
