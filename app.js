var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA = 8080;

var app = express();

var usuarioRouter = require("./src/routes/usuario");
<<<<<<< HEAD

const slackRouter = require("./src/routes/GoogleSlackRoute");
=======
const slackRouter = require("./src/routes/GoogleSlackRoute");
const cargoRouter = require("./src/routes/cargo");
>>>>>>> ad191f8d53f94f0a96ae5cd76b9589b1826f1441

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());
<<<<<<< HEAD

=======
>>>>>>> ad191f8d53f94f0a96ae5cd76b9589b1826f1441
app.use(slackRouter);
app.use("/usuario", usuarioRouter);
app.use("/cargo", cargoRouter);

app.listen(PORTA, function () {
    console.log(`Visualização é http://localhost:${PORTA}`)
})

