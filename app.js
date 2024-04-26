var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA = 8080;

var app = express();


const slackRouter = require("./src/routes/GoogleSlackRoute");
var usuarioRouter = require("./src/routes/usuario");
const cargoRouter = require("./src/routes/cargo");
const enderecoRouter = require("./src/routes/endereco");

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use(slackRouter);
app.use("/usuario", usuarioRouter);
app.use("/cargo", cargoRouter);
app.use("/endereco", enderecoRouter);

app.listen(PORTA, function () {
    console.log(`Visualização é http://localhost:${PORTA}`)
})

