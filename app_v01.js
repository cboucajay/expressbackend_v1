var express = require('express');
var app = express();

// Pour parser la réponse html du post
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

// Lire le fichier index.html
var path = require('path')

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

// Fin exo



var server = app.listen(5000, function(){
    console.log('server is running on port 5000');
})