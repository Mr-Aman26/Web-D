const Coupon = require("../models/coupons");

// module.exports.signup_post = async (req, res) => {
//     const { name,email, password,username,mobile,description } = req.body;
//     console.log(req.body);
  
//     try {
//       const user = await User.create({name,email, password,username,mobile,description });
//       const token = createToken(user._id);
//       res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
//       res.status(201).json({ user: user._id });
//     }
//     catch(err) {
//       const errors = handleErrors(err);
//       res.status(400).json({ errors });
//     }
   
//   }

const checkCoupon=function(coupon,product){
  const today=new Date();
  if(coupon.status!=='Active'){
    return 'nope';
  }
  else if(coupon.limit<1 && coupon.limit!==null){
    coupon.status='In-Active';
    couponAdd({details:coupon});
    return 'nope';
  }
  else if(coupon.endDate<today){
    coupon.status='In-Active';
    couponAdd({details:coupon});
    return 'nope';
  }
  else if(coupon.category!==product.category && coupon.category!=='All'){
    return 'nope';
  }
  else{
    if(coupon.limit===null){
      return 'yes';
    }
    else{
      coupon.limit-=1;
      couponAdd({details:coupon});
      return 'yes';
    }
    
  }
}


const coupon=async function(toUpdate,res){


    if(toUpdate != null && toUpdate.payload){
        const filter = { id: toUpdate.id };
        const updateDoc = {
            $set: toUpdate.payload,
          };
        const result = await Coupon.updateOne(filter, updateDoc);
    
    }

    else if(toUpdate != null && toUpdate.mode){
        const couponArr=[];
        for await (const doc of Coupon.findOne({_id:toUpdate.id})) {

            couponArr.push(doc);
            
        }
        res.json(couponArr);
        return;
        
    }

    else if(toUpdate != null && toUpdate.id){
        await Coupon.deleteOne({ _id: toUpdate.id })
        console.log('deleted');
    }
    const couponArr=[];
    for await (const doc of Coupon.find()) {

        couponArr.push(doc);
        
      }
    res.json(couponArr);

    return;

        
}





const couponAdd = async (toAdd, res) => {

    

  
    try {
      const couponArr=[];
        for await (const doc of Coupon.findOne({code:toAdd.details.code})) {

            couponArr.push(doc);
            
        }
        if(couponArr.length!==0){
          const filter = { code: toAdd.details.code };
          const updateDoc = {
            $set: toAdd.details,
          };
          const result = await Coupon.updateOne(filter, updateDoc);
        }
        else{
          const coupon = await Coupon.create(toAdd.details);
          res.status(201).json({ coupon: coupon._id });
        }

      // const coupon = await Coupon.create(toAdd.details);
      // console.log(coupon);
      // res.status(201).json({ coupon: coupon._id });
    }
    catch(err) {
        console.log(err);
      res.status(400).json({ err });
    }
   
  }








  const couponDiscount = async (toFind, res) => {

    

  
    try {
      const couponArr=[];
        for await (const doc of Coupon.findOne({code:toFind.input})) {

            couponArr.push(doc);
            
        }
        
        if(couponArr.length!==0){
          res.status(201).json({couponArr});
        }
        else{
          const coupon = await Coupon.create(toAdd.details);
          res.status(201).json({ coupon: coupon._id });
        }

      // const coupon = await Coupon.create(toAdd.details);
      // console.log(coupon);
      // res.status(201).json({ coupon: coupon._id });
    }
    catch(err) {
        console.log(err);
      res.status(400).json({ err });
    }
   
  }






  const couponApplied = async (code,product,res)=>{


    try {
      const couponArr=[];
        for await (const doc of Coupon.findOne({code:code})) {

            couponArr.push(doc);
            
        }     
        if(couponArr.length!==0){
          
          const check=checkCoupon(couponArr[0],product);
          if(check==='yes'){
            res.status(201).json(couponArr[0]);
          }
          else{
            res.status(201).json({ coupon: 'not applied' });
          }
          
        }
        else{
          res.status(201).json({ coupon: 'not applied' });
        }

      // const coupon = await Coupon.create(toAdd.details);
      // console.log(coupon);
      // res.status(201).json({ coupon: coupon._id });
    }
    catch(err) {
        console.log(err);
      res.status(400).json({ err });
    }

  }










module.exports.coupon_get = async (toUpdate, res) => {
    coupon(toUpdate,res);
}


module.exports.coupon_post = async (toUpdate, res) => {
    coupon(toUpdate,res);
 
}


module.exports.coupon_add = async (toAdd, res) => {
    couponAdd(toAdd,res)
 
}


module.exports.coupon_applied = async (id,product, res) => {
  couponApplied(id,product,res)

}


module.exports.coupon_disc = async (toFind, res) => {
  couponDiscount(toFind,res);

}

