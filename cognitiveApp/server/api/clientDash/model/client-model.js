"use strict";

const mongoose = require('mongoose');

const _callSchema = {

   dialogAction: {
      slots: {
         FirstName: {type: String},
         Location: {type: String},
         Phone: {type: String},
         Emergency: {type: String}
      },
      type: {type: String, default: ""},
      firstName: {type: String, default: "John"},
      lastName: {type: String, default: "Smith"},
      date: {type: Date},
      dateFormatted: {type: String, default: ""},
      startTime: {type: String, default: ""},
      endTime: {type: String, default: ""},
      locationCity: {type: String, default: ""},
      locationState: {type: String, default: ""},
      locationSpecific: {type: String, default: ""},
      locationLat: {type: String, default: ""},
      locatoinLong: {type: String, default: ""}
   },
   sessionAttributes: {
      Price: {type: Number, default: 25}
   }
}

const _callSchemaOld = {

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
