const Coupon = require("../models/coupons");
const Coupon_Log = require("../models/coupon_log");


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

const checkCoupon=function(coupon,product,res){
  const today=new Date();
  const pdate=new Date(product.date);
  console.log('pdate',product.date);
  // console.log(coupon.endDate<pdate,'yo',coupon.endDate,pdate);
  // console.log(coupon.startDate<pdate,'yo',coupon.endDate,pdate);

  if(product.coupon_type!==coupon.type){
    res.status(400).send('coupon type does not match');
    return;
  }
  else if(product.coupon_status!==coupon.status){
    res.status(400).send('coupon status dont match');
    return;
  }
  else if(product.coupon_value!==coupon.value){
    res.status(400).send('coupon value dont match');
    return;
  }
  else if(!product.date){
    res.status(417).send('date is out of range');
    return;
  }
  else if(coupon.endDate<pdate || coupon.startDate>pdate){
    res.status(417).send('date is out of range');
    return;
  }
  else if(coupon.category!==product.category){
    res.status(400).send('coupon category dont match')
    return;
  }
  else if(coupon.status!=='Active'){
    res.status(417).send('coupon is not active');
    return;
  }
  else if(coupon.limit<1 && coupon.limit!==null){
    coupon.status='In-Active';
    couponAdd({details:coupon});
    res.status(417).send('coupon limit is over');
    return ;
  }
  else{
    if(coupon.limit===null){
      res.status(200).send(`coupon applied, limit: ${coupon.limit}`);
      userlog(product.user_id,product.product_id,product.date,product.code);
      return;
    }
    else{
      coupon.limit-=1;
      couponAdd({details:coupon});
      res.status(200).send(`coupon applied, limit: ${coupon.limit}`);
      userlog(product.user_id,product.product_id,product.date,product.code);
      return;
    }
    
  }
}



const userlog=async(userid,productid,date,code)=>{
  console.log(userid,productid,date,code);
  today=new Date();
  const log = await Coupon_Log.create({User_id:userid,Product_id:productid,Date:date,Coupon_Code:code,Cur_Date:today});
  return;
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






  const couponApplied = async (product,res)=>{

    try {
      const couponArr=[];
        for await (const doc of Coupon.findOne({code:product.code})) {

            couponArr.push(doc);
            
        }
        // console.log(couponArr);     
        if(couponArr.length!==0){
          
          const check=checkCoupon(couponArr[0],product,res);
        }
        else{
          res.status(404).send('coupon code not found');
        }

      // const coupon = await Coupon.create(toAdd.details);
      // console.log(coupon);
      // res.status(201).json({ coupon: coupon._id });
    }
    catch(err) {
      res.status(500).send(err)
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


module.exports.coupon_applied = async (product, res) => {
  couponApplied(product,res)

}


module.exports.coupon_disc = async (toFind, res) => {
  couponDiscount(toFind,res);

}

