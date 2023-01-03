const {Router}=require('express');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const couponController=require('../controllers/couponController');

const router = Router();


router.patch('/coupon', urlencodedParser, function (req, res) {  
    const obj=JSON.parse(JSON.stringify(req.body));
    const jsondata= Object.keys(obj)[0];
    const toUpdate=JSON.parse((jsondata));
    couponController.coupon_post(toUpdate,res);
    
});

router.delete('/coupon', urlencodedParser, function (req, res) {  ;
    couponController.coupon_post(req.body,res);
    
});

router.post('/coupon', urlencodedParser, function (req, res) {  
    const obj=JSON.parse(JSON.stringify(req.body));
    const jsondata= Object.keys(obj)[0];
    const toAdd=JSON.parse((jsondata));
    couponController.coupon_add(toAdd,res);
    
});

router.get('/coupon', urlencodedParser, function (req, res) {
    couponController.coupon_get(req.query,res);    
});

router.post('/couponDisc', urlencodedParser, function (req, res) {  
    const obj=JSON.parse(JSON.stringify(req.body));
    const jsondata= Object.keys(obj)[0];
    const toUpdate=JSON.parse((jsondata));
    couponController.coupon_disc(toUpdate,res);
    
});

router.get('/couponApplied/:code', urlencodedParser, function (req, res) {
    couponController.coupon_applied(req.params.code,req.body,res);    
});

module.exports=router;