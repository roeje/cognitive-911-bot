"use strict";

const mongoose = require('mongoose');

const _callSchema = {

   dialogAction: {
      slots: {
         Name: {type: String},
         Location: {type: String},
         Phone: {type: String},
         EmergencyType: {type: String},
         EmergencyDetails: {type: String},
         CallerRole: {type: String}
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
      locationLong: {type: String, default: ""},
      transcript: {type: String, default: ""}
   },
   sessionAttributes: {
      PriorityValue: {type: Number, default: null},
      closed: {type: Boolean, default: false},
      DuplicationKeywords: {type: Array, default: []},
      CallTranscript: {type: String, default: ""}
   },
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
