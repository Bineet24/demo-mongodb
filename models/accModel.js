const mongoose = require('mongoose');


const accSchema = new mongoose.Schema(
    {
      Name: {
        type: String,
        required: [true, 'A account must have a name'],
       
      },
      Phone:{
        type:String
      },
      Id:{
        type:String
      },
        email: {
        type: String,
        lowercase: true,
       // validate: [validator.isEmail, 'Please provide a valid email']
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
  
//Virtual populate
accSchema.virtual('contacts', {
  ref: 'Con',
  foreignField: 'Account',
  localField: '_id'
});


  const Acc = mongoose.model('Acc', accSchema);

  module.exports = Acc;
