const {Router}=require('express');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const couponController=require('../controllers/couponController');

const router = Router();


router.get('/coupon',couponController.coupon_get);
router.post('/coupon', urlencodedParser, function (req, res) {  
    const obj=JSON.parse(JSON.stringify(req.body));
    const jsondata= Object.keys(obj)[0];
    const toUpdate=JSON.parse((jsondata));
    couponController.coupon_post(toUpdate,res);
    
});

router.post('/couponAdd', urlencodedParser, function (req, res) {  
    const obj=JSON.parse(JSON.stringify(req.body));
    const jsondata= Object.keys(obj)[0];
    const toAdd=JSON.parse((jsondata));
    couponController.coupon_add(toAdd,res);
    
});

router.post('/couponGetOne', urlencodedParser, function (req, res) {  
    const obj=JSON.parse(JSON.stringify(req.body));
    const jsondata= Object.keys(obj)[0];
    const toUpdate=JSON.parse((jsondata));
    couponController.coupon_post(toUpdate,res);
    
});

router.post('/couponDisc', urlencodedParser, function (req, res) {  
    const obj=JSON.parse(JSON.stringify(req.body));
    const jsondata= Object.keys(obj)[0];
    const toUpdate=JSON.parse((jsondata));
    // console.log(toUpdate);
    couponController.coupon_disc(toUpdate,res);
    
});

module.exports=router;