const Acc = require('./../models/accModel');



exports.createAcc = async (req, res) => {
    try {
      console.log(req.body);
      const newAcc = await Acc.insertMany(req.body);
  
      res.status(201).json({
        status: 'success',
        data: {
           newAcc
        }
      });
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: err
      });
    }
  };

  
exports.getAllAccs = async (req, res) => {
  try {
    const Accs = await Acc.find();
  

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: Accs.length,
      data: {
        Accs
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};
 
exports.getAcc = async (req, res) => {
  try {
    const acc = await Acc.findById(req.params.id).populate('contacts');
    // Tour.findOne({ _id: req.params.id })

    res.status(200).json({
      status: 'success',
      data: {
        acc
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
}; 
exports.updateAcc = async (req, res) => {
  try {
    // const newAcc = await Acc.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true
    // });
    // console.log(req.body);
  
    req.body.map(async id=>{
      // console.log(id.externalId);
      const searchObject= req.body.find((ac) => ac.externalId__c==id.externalId__c);
      // console.log(searchObject);
      const newAcc= await Acc.updateMany({externalId__c:id.externalId__c},searchObject);
   
    })
    // const newAcc= await Acc.updateMany(req.params.id, req.body)
   
    res.status(200).json({
      status: 'success',
      // data: {
      //   newAcc
      // }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};
  
exports.deleteAcc = async (req, res) => {
  try {
  
    req.body.map(async id=>{

      await Acc.deleteOne({Id:id.Description});
    })
   // await Acc.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};
