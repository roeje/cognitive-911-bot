"use strict";

const mongoose = require('mongoose');

const _userSchema = {
   username: {type: String},
   token: {type: String},   
}

module.exports = mongoose.Schema(_userSchema, {timestamps: true});
