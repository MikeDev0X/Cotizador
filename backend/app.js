const express = require('express');
const res = require('express/lib/response');
const config = require('./config/jwt');
const login = require('./routes/login');
const product = require('./routes/product');
const warranty = require('./routes/warranty');
const quotation = require('./routes/quotation');
const bodyParser = require("body-parser");

const multer = require('multer');
const cors =require('cors');

const router = express.Router();
////////////////////////

const app = express();
const port = process.env.PORT || 4000;

////////////////
app.use(cors());
app.use(multer().array());
/////////////////

app.use(express.json());
app.set("key", config.key);

app.use('/', login);
app.use('/', product);
app.use('/', warranty);
app.use('/', quotation);
app.use(bodyParser.urlencoded({
    extended: true
}));


//Función callback -> función que se ejecuta como respuesta a un evento o acción
app.listen(port, () =>{
    console.log(`Servidor iniciado en el puerto ${port}`);
})