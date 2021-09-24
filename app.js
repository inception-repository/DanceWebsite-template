const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

//body-parser ek middle-ware h jo hum use kar sakte h
const bodyparser = require("body-parser");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactdance', {useNewUrlParser: true, useUnifiedTopology: true});
const port = 8000;

//define mongoose schema like mysql table
const contactschema = new mongoose.Schema({
    name: String,
    phone:String,
    email:String,
    address:String,
    description:String
  });
  const contact = mongoose.model('contact', contactschema);



// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
app.get('/', (req, res)=>{
    // const con = "This is the best content on the internet so far so use it wisely"
    const params = { }
    res.status(200).render('home.pug', params);
})
//endpoint
app.get('/contact', (req, res)=>{
    // const con = "This is the best content on the internet so far so use it wisely"
    const params = { }
    res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res)=>{
    // const con = "This is the best content on the internet so far so use it wisely"
    var mydata = new contact(req.body);
    mydata.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item did not saved in database")
    })
    // res.status(200).render('contact.pug');
})
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
