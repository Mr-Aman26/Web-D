const user = require('../models/users');
const jwt = require('jsonwebtoken');




const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, '$foo9Yr$0Bt#toxOONasa-WebD', {
    expiresIn: maxAge
  });
};



const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };
  
    // duplicate email error
    if (err.code === 11000) {
      errors.email = 'that email is already registered';
      return errors;
    }
  
    // validation errors
    if (err.message.includes('Login_Detail validation failed')) {
      // console.log(err);
      Object.values(err.errors).forEach(({ properties }) => {
        // console.log(val);
        // console.log(properties);
        errors[properties.path] = properties.message;
      });
    }
  
    return errors;
  }



module.exports.signup_get=(req,res)=>{
    res.send('signup get')
}

module.exports.login_get=(req,res)=>{
    res.send('login get')
}

module.exports.signup_post = async (req, res) => {
    const { email, password } = req.body;
    
  
    try {
      const user1 = await user.create({ email, password });
      const token = createToken(user1._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(201).json({ user: user1._id });
    }
    catch(err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
   
   
  }

module.exports.login_post=async (req,res)=>{
    const { email, password } = req.body;
    console.log(email);

    try {
      const user1 = await user.login(email, password);
      const token = createToken(user1._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(200).json({ user: user1._id });
      
    } catch (err) {
      res.status(400).json({err:err.message});
      
    }
}