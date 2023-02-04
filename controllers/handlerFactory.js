// this contains all general files like crud operations instead of creating different functions

// more of a general functions were all operations are hanadled here

const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');
const slugify = require('slugify');

exports.deleteOne = Model => catchAsync( async (req,res,next) => {

    const doc= await Model.findByIdAndDelete(req.params.id);

    if(!doc){
        return next(new AppError('No document found with that ID', 404));
    }
    res.status(204).json({
        status:'Success',
        data: null
    });
});

exports.insertOne = Model => catchAsync( async (req,res,next) => {

    const doc = await Model.insertMany(req.params.id, req.body);

    if(!doc){
        return next(new AppError('No document found with that ID', 404));
    }
    res.status(204).json({
        status: 'success',
        data: {
          data: doc
        }
    });
    
})

exports.updateOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

// exports.updateOne = Model => catchAsync( async (req,res,next)=>{

//     let address =["propertyName","city","locality","street"],x,p=0,thisAddress=[],thisAddressVal=[];
//     for (x in req.body) {
//         for(let i=0;i<address.length;i++){
//             if(x == address[i]){
//                 thisAddress[p] = x;
//                 thisAddressVal[p] = req.body[x];
//                 p++;
//             }
//         }
//     }   
//     for(let i=0;i<thisAddress.length;i++){
//         req.body[thisAddress[i]+"Slug"] = slugify(thisAddressVal[i],{lower:true});
//     }
//     // console.log(req.body);
//     // console.log(thisAddress);
//     const doc= await Model.findByIdAndUpdate(req.params.id,req.body,{
//         new:true,
//         runValidators:true
//     });

//     if(!doc){
//         return next(new AppError('No document found with that ID', 404));
//     }

//     res.status(200).json({
//         status:'Success',
//         data:{
//             data: doc
//         }
//     });
    
// });

exports.createOne = Model => catchAsync( async (req,res)=>{

    const doc = await Model.create(req.body);
        res.status(201).json({
            status:'success',
            data: {
                data: doc
            }
        });
});

exports.getOne = (Model,popOptions) => catchAsync( async (req,res,next)=>{

    let query = Model.findById(req.params.id);
    if(popOptions){
        query = query.populate(popOptions);
    }
    const doc= await query;

    if(!doc){
        return next(new AppError('No doc found with that ID', 404));
    }
       res.status(200).json({
           status:'Success',
           statusCode:200,
           data:{
               data: doc
           }
       });
       res.status(304).json({
        status:'Success',
        statusCode:304,
        data:{
            data: doc
        }
    });
});

exports.getAll = Model => catchAsync( async (req,res)=>{

    let filter ={};
    if(req.params.propertyId) {
        filter = {property: req.params.propertyId};
    }

    const features = new APIFeatures(Model.find(filter), req.query).filter().sort().limitFields().paginate().bhkValue().propertyValue().range().propertyTypeValue().bathValue().mycity();

         // execute query
         const doc = await features.query;
        
          // send query 
          
          res.status(200).json({
            status: 'Success',
            result: doc.length,
            data: {
              data : doc
            }
        });

});

