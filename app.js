var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA = 8080;

var app = express();

const queriesRouter = require("./src/routes/queries");
const empresaRouter = require("./src/routes/empresa");
const enderecoRouter = require("./src/routes/endereco");
const slackRouter = require("./src/routes/GoogleSlackRoute");
const planoRouter = require("./src/routes/plano");
const usuarioRouter = require("./src/routes/usuario");
const relatorioRouter = require("./src/routes/relatorio");
const maquinaRouter = require("./src/routes/maquina")


app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(express.static(path.join(__dirname, "public")));


app.use(cors());

app.use("/", queriesRouter);
app.use("/empresa", empresaRouter);
app.use("/endereco", enderecoRouter);
app.use("/plano", planoRouter);
app.use("/", slackRouter);
app.use("/usuario", usuarioRouter);
app.use("/relatorio", relatorioRouter );
app.use("/maquina", maquinaRouter);

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public/acesso', '404.html'));
});

app.listen(PORTA, function () {
    console.log(`Visualização é http://localhost:${PORTA}`)
})