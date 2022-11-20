const express = require('express');
const mongoose = require ("mongoose");
const app = express();
const authRoutes = require('./routes/authRoutes');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const cookieParser = require('cookie-parser');
const cors = require('cors');


app.use(cors({
    origin:"http://localhost:3000",
}));


// app.use (express.static('public'));

app.set('view engine', 'ejs');
// mongodb+srv://sanchit:diehardfan@cluster0.lxmxcq5.mongodb.net/AirEv?retryWrites=true&w=majority
const dbURI= 'mongodb+srv://Nishant8917:Dungeon8917@cluster0.qvrpeky.mongodb.net/WebD?retryWrites=true&w=majority';
mongoose.connect (dbURI, { useNewUrlParser : true, useUnifiedTopology: true})
.then((result) => app.listen (4000))
.catch((err) => console . log(err));


// app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));

app.use(express.json());
// app.use(authRoutes);
app.use(cookieParser());
// app.listen(4000);

app.post('/login',(req,res)=>res.render('home'));

