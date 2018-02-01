var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', "ejs");

//Watson Authentication

var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
var natural_language_understanding = new NaturalLanguageUnderstandingV1({
    "username": "b4bec901-241a-49a8-ae58-bd7b83a185f1",
    "password": "ze8IPxzaPfSs",
    'version_date': '2017-02-27'
});


//Function to compute category

function compute(input) {
    var parameters = {
        'text': input,
        'features': {
            'categories': {}
        }
    };

    natural_language_understanding.analyze(parameters, function (err, response) {
        if (err)
            console.log('error:', err);
        else
            console.log(JSON.stringify(response, null, 2));
    });
}


//Input route

app.get("/", function (req, res) {
    res.render("home")
});



app.post('/input', function (req, res) {
    var input = req.body.input;
    compute(input);
    res.end();
});

//Runserver
app.listen(8000, function() {
    console.log("server is running at 8000");
});