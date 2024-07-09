var express = require('express');
var app = express();

// Pour parser la réponse html du post
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

// Mongoose : librairy connection mongo db
var mongoose = require('mongoose')
const url = "mongodb+srv://cecileb:cecileb123@cluster0.cjsm2cj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(url).then(console.log("Mongo DB connected")).catch(error => console.log(error));

// Pour le rendu de page dans le dossier views
app.set('view engine', 'ejs');


// Methode override pour update et delete
const methodOverride = require('method-override');
app.use(methodOverride('_method'));


var Contact = require('./models/Contact');

// Lire le fichier index.html
var path = require('path')

// CREATE
app.post('/nouveaucontact', function(req, res){

    const Data = new Contact({
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        message: req.body.msg
    });

    Data.save()
    .then(() => {
        console.log("Contact Saved !");
        // ferme la connexion
        res.redirect('/');
    })
    .catch(error => console.log(error));
})

app.get('/contactez-nous', function(req, res){
    res.sendFile(path.resolve("form_exo.html"));
})

app.get('/', function(req, res){

    Contact.find()
    .then((data) => {
        res.render('Home', {dataHome:data});
    })
    .catch(error => console.log(error));
    
})

app.get('/formulairecontact', function(req, res){

    var_a = "Hallo THe World is cruel";
    res.render('NewContact', {var_test: "Youpi", var_test2: var_a});
    
})


// Afficher Update
app.get('/contact/:identifiant', (req, res) => {

    Contact.findOne({
        _id : req.params.identifiant
    }).then(data => {
        res.render('EditContact', {dataEdit:data, plus : "TATORD"});
    })
    .catch(error => console.log(error));
    
})

// UPDATE 
app.put('/updatecontact', function(req, res){

    const Data = {
        prenom : req.body.prenom,
        nom : req.body.nom,
        email : req.body.email,
        message : req.body.msg
    }

    Contact.updateOne({_id : req.body.identifiant}, {$set:Data})
   .then(result => {
    console.log(result);
    console.log("contact updated !");
    res.redirect('/');
 
   }).catch(error => console.log(error));

})


// DELETE 
app.delete('/deletecontact', function(req, res){

    Contact.findOneAndDelete({_id : req.body.identifiant})
   .then(() => {
    console.log("contact deleted !");
    res.redirect('/');
 
   }).catch(error => console.log(error));

})


/*
app.get('/', function(req, res){

    Contact.find()
    .then((data) => {
        console.log(data);
        res.send("Accueil");
        // res.end();
    })
    .catch(error => console.log(error));
})*/

/*


// define routes here...

app.get('/', function(req, res){
    res.send("<html><body><h1>Express c'est nouveau</h1></body></html>");
})

app.get('/formulaire', function(req, res){
    res.sendFile(path.resolve("index.html"));
    })

app.get('/student', function(req, res){
    res.send("<html><body><h1>Page Etudiants</h1></body></html>");
})

app.post('/submit-name', function(req, res){
    // console.log("Votre nom est : " + req.body.nom + " " + req.body.prenom);
    res.send("Votre nom est : " + req.body.nom + " " + req.body.prenom);
    // res.end();
})


// Exo :
app.get('/contactez-nous', function(req, res){
    res.sendFile(path.resolve("form_exo.html"));
})

app.post('/merci', function(req, res){
    // console.log("Votre nom est : " + req.body.nom + " " + req.body.prenom);
    html = "Bonjour " + req.body.nom + " " + req.body.prenom + "<br>";
    html += "Merci de nous avoir contacté.<br>";
    html += "Nous reviendrons vers vous dans les plus brefs délais à cette adresse email : " + req.body.email;

    res.send(html);
    // res.end();
})

// Fin exo */



var server = app.listen(5000, function(){
    console.log('server is running on port 5000');
})