var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA = 8080;

var app = express();

var usuarioRouter = require("./src/routes/usuario");
const slackRouter = require("./src/routes/GoogleSlackRoute");
const cargoRouter = require("./src/routes/cargo");

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());
app.use(slackRouter);
app.use("/usuario", usuarioRouter);
app.use("/cargo", cargoRouter);

app.listen(PORTA, function () {
    console.log(`Visualização é http://localhost:${PORTA}`)
})

