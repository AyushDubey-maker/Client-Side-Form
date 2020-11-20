const express=require("express");
const path=require("path");
const bodyParser= require("body-parser")
const app=express();
const port=80;

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/clientForm', {useNewUrlParser: true, useUnifiedTopology: true});
const clientFormSchema = new mongoose.Schema({
    username: String,
    email: String,
   
    password: String,
    password2: String
    
  });

  const clientFormData = mongoose.model('form', clientFormSchema);

// app.use(express.static('static',options))
//EXPRESS SPECIFIC STUFF
 
app.use('/client-side-form',express.static('static'));

app.use(express.urlencoded());


var engines = require('consolidate');

app.set('views', __dirname + '/client-side-form');
app.engine('html', engines.mustache);
app.set('view engine', 'html');

app.get('/', function (req, res) {
 
    const params={}
    res.status(200).render('client-side.html',params);
   });
   app.get('form', function (req, res) {
 
    const params={}
    res.status(200).render('client-side.html',params);
   });
   // This is post Request for app.
   app.post('form', function (req, res) {
    var MyData=new clientFormData(req.body);
        MyData.save().then(()=>{
            res.send("This Item Is Saved");
            
        }).catch(()=>{
            res.status(400).send("Item Was Not Saved To Database");
        });
       
        // res.status(200).render('client-side.html');
       });

   app.listen(port,()=>{
    console.log(`The app is runnimg on port ${port}`)
    
});