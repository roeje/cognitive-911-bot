"use strict";

const mongoose = require('mongoose');

const _callSchema = {

   dialogAction: {
      slots: {
         PickupDate: {type: Date},
         PickupTime: {type: String},
         FlowerType: {type: String}
      },
      type: {type: String, default: ""}
   },
   sessionAttributes: {
      Price: {type: Number}
   }
}

module.exports = mongoose.Schema(_callSchema, {timestamps: true});
