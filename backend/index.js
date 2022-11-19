const express = require('express');
const mongoose = require ("mongoose");
const app = express();


// app.use (express.static('public'));

app.set('view engine', 'ejs');

const dbURI= 'mongodb+srv://Nishant8917:Dungeon@8917@cluster0.qvrpeky.mongodb.net/?retryWrites=true&w=majority';
mongoose . connect (dbURI, { useNewUrlParser : true, useUnifiedTopology: true, useCreateIndex: true })
.then ((result) => app.listen (3000))
.catch((err) => console . log(err));

app.get('/',(req, res) => res.render("home"));


app.listen(4000);
