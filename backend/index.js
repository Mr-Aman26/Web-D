const express = require('express');
const mongoose = require ("mongoose");
const app = express();
const authRoutes = require('./routes/authRoutes');

// app.use (express.static('public'));

app.set('view engine', 'ejs');
// mongodb+srv://sanchit:diehardfan@cluster0.lxmxcq5.mongodb.net/AirEv?retryWrites=true&w=majority
const dbURI= 'mongodb+srv://Nishant8917:Dungeon8917@cluster0.qvrpeky.mongodb.net/Login_Details?retryWrites=true&w=majority';
mongoose.connect (dbURI, { useNewUrlParser : true, useUnifiedTopology: true})
.then((result) => app.listen (3000))
.catch((err) => console . log(err));

app.get('/',(req, res) => res.render("home"));

app.use(authRoutes);

// app.listen(4000);

