const mongoose = require('mongoose');
const account = require('./accModel');

const conSchema = new mongoose.Schema(
    {
      FirstName: {
        type: String,
      },
      LastName: {
        type: String,
        required: [true, 'A Contact must have a name'],
      },
      Id:{
        type:String
      },
      MobilePhone:{
        type:String
      },  
      Email: {
        type: String,
        lowercase: true,
       // validate: [validator.isEmail, 'Please provide a valid email']
      },
      Account__c:{
        type: mongoose.Schema.ObjectId,
        ref: 'Acc'
      },
       test:{
        type:String
      },
      createdAt: {
        type: Date,
        default: Date.now(),
        select: false
      }
    },
    {
      toJSON: { virtuals: true },
      toObject: { virtuals: true }
    }
  );
  conSchema.pre(/^find/, function(next) {

    this.populate({
      path: 'Account__c',
      select: 'name '
    }); 
    next();
  });
  
  const Con = mongoose.model('Con', conSchema);

  module.exports = Con;
