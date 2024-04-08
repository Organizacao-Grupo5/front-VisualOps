var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA = 8080;

var app = express();

const slackRouter = require("./src/routes/slack");

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/slack", slackRouter);

app.listen(PORTA, function () {
    console.log(`Visualização é http://localhost:${PORTA}`)
})

