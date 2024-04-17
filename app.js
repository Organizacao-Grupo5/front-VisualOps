var express = require("express");
var cors = require("cors");
var path = require("path");
// var PORTA = 8080;
var PORTA = process.env.AMBIENTE_PROCESSO == "desenvolvimento" ? 3333 : 8080;

var app = express();

var cadastroRouter = require("./src/routes/cadastro");

const slackRouter = require("./src/routes/GoogleSlackRoute");

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use(slackRouter);
app.use("/cadastro", cadastroRouter);

app.listen(PORTA, function () {
    console.log(`Visualização é http://localhost:${PORTA}`)
})

