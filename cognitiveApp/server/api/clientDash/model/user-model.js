"use strict";

const mongoose = require('mongoose');

const _userSchema = {
   username: {type: String, unique : true, required : true, dropDups: true},
   token: {type: String, required : true},   
}

module.exports = mongoose.Schema(_userSchema, {timestamps: true});
