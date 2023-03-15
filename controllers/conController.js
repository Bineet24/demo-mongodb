const Con = require('./../models/conModel');
const Acc = require('./../models/accModel');

exports.getAllCons = async (req, res) => {
  try {
    const Cons = await Con.find();
  

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: Cons.length,
      data: {
        Cons
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.createCon = async (req, res) => {
    try {
       const results=[];
      req.body.map(async id=>{ 
      // console.log(id.externalId);
      if(id.externalId){
      const acc=await Acc.findOne({externalId: {$eq:id.externalId} }).lean()
      // console.log(acc._id.toString());
      // console.log(typeof(acc._id.toString()));
      const newCon = await Con.create(id);
      results.push(newCon._id);
       updateCon = await Con.findByIdAndUpdate(newCon._id.toString(), {Account:""+acc._id} );
      // id.test=acc._id.toString(); 
      // console.log(id);
      const temp=await Con.find(newCon._id);
        // results.push(temp);
    // console.log(updateCon);
      }
     })
      // const newCon = await Con.insertMany(req.body);
      // const newCon = await Con.create(req.body);
  
      res.status(201).json({
        status: 'success',
        // data: {
        //   updateCon
        // } 
      });
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: err
      });
    }
  };

 
exports.checkBody = async(req, res, next) => {
  req.body.map(async id=>{ 
    //  console.log(id.externalId);
    // const searchObject= req.body.find((ac) => ac.externalId==id.externalId);
    // // console.log(searchObject);
    // const newAcc= await Acc.updateMany({externalId:id.externalId},searchObject);
    if(id.externalId){ 
     const acc=await Acc.findOne({externalId: {$eq:id.externalId} })
      if(!acc){
        const searchObject= req.body.find((ac) => ac.externalId==id.externalId);
        console.log(searchObject); 
        const newAcc = await Acc.create(searchObject); 
      }
    } 
  })
  next();
};
exports.getCon = async (req, res) => {
  try {

    const con = await Con.findById(req.params.id);

    // Tour.findOne({ _id: req.params.id })

    res.status(200).json({
      status: 'success',
      data: {
        con
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};
 
exports.updateCon = async (req, res) => {
  try {
    // const newCon = await Con.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true
    // });
    req.body.map(async id=>{
      // console.log(id.externalId);
      const searchObject= req.body.find((ac) => ac.externalId==id.externalId);
      // console.log(searchObject);
      const newAcc= await Con.updateMany({externalId:id.externalId},searchObject);
   
    })
    res.status(200).json({
      status: 'success',
      data: {
        newCon
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};
  
exports.deleteCon = async (req, res) => {
  try {
    // await Con.findByIdAndDelete(req.params.id);
    
    req.body.map(async id=>{

      await Con.deleteOne({externalId:Object.values(id)});
    })
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