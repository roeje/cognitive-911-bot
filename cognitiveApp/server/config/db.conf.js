"use strict";

const mongoose = require('mongoose');
const dbConst = require('../constants/db.json');

module.exports = class DBConfig {
    static init() {
      const URL = (process.env.NODE_ENV === 'production') ? process.env.MONGOHQ_URL
                                                          : dbConst.localhost;
      const URL_NEW = 'mongodb://remoteUser:motorolapassword@ec2-54-242-20-44.compute-1.amazonaws.com:27017/cognitiveApp';	
      mongoose.connect(URL_NEW);
      mongoose.connection.on('error', console.error.bind(console, 'An error ocurred with the DB connection: '));
    }
};
