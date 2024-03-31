var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA = 8080;

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.listen(PORTA, function () {
    console.log(`Visualização é http://localhost:${PORTA}`)
})