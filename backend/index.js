const express = require('express');
const mongoose = require ("mongoose");
const app = express();
const authRoutes = require('./routes/authRoutes');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const cookieParser=require('cookie-parser');
const cors=require('cors');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
=======

const cors=require('cors');


app.use(cors({
    origin:"http://localhost:3000",
}));

// app.use (express.static('public'));

app.set('view engine', 'ejs');
// mongodb+srv://sanchit:diehardfan@cluster0.lxmxcq5.mongodb.net/AirEv?retryWrites=true&w=majority
const dbURI= 'mongodb+srv://sanchit:diehardfan@cluster0.lxmxcq5.mongodb.net/Footox?retryWrites=true&w=majority';
mongoose.connect (dbURI, { useNewUrlParser : true, useUnifiedTopology: true})
.then((result) => app.listen (4000))
.catch((err) => console . log(err));

const client = new MongoClient(dbURI);


const product=async function(toUpdate,res){
    //console.log('hello',req);
    const database = client.db("Footox");
    const users = database.collection("allproducts");
    if(toUpdate.length==2){
        const filter = { id: toUpdate.id };
        const updateDoc = {
            $set: toUpdate.payload,
          };
        const result = await users.updateOne(filter, updateDoc);
    
    }

    const product_data = await users.find({}).toArray(function(err, result) {
        if (err) throw err;
        //console.log(result);
        res.json(result); 
    });
    
    

        
}


// app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.use(express.static('public/css'));
app.get('/admin1',(req,res)=>
    product(null,res))

app.post('/admin1', urlencodedParser, function (req, res) {  
    console.log('hello');
    const obj=JSON.parse(JSON.stringify(req.body));
    const jsondata= Object.keys(obj)[0];
    const toUpdate=JSON.parse((jsondata));

    console.log(toUpdate.id);

    product(toUpdate,res)
   

    
});


app.use(express.json());
app.use(authRoutes);
app.use(cookieParser());
// app.listen(4000);

app.post('/login',(req,res)=>res.render('home'));
