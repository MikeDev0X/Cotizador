const jwt = require('jsonwebtoken');
const config = require('../config/jwt');
/////////
const mysql = require('mysql');
const mysqlConfig = require('../helpers/mysql-config.js');
const conexion = mysql.createConnection(mysqlConfig);


module.exports.addProduct = (req, res) =>{

    const name = req.body.name;
    const hasTransducer = req.body.hasTransducer;
    const description = req.body.description;
    const singlePrice = req.body.singlePrice;

    const sql = `INSERT INTO Product (name, hasTransducer, description, singlePrice) VALUES(?,?,?,?)`

    conexion.query(sql, [name, hasTransducer, description, singlePrice], (error, results)=>{
        if(error)
            res.send(error);
        else{
            res.json(results.insertId);
        }
    })

}

module.exports.getProducts = (req, res) =>{

    const sql = 'SELECT * FROM Product';

    conexion.query(sql, (error,results)=>{
        if(error)
            res.send(error);
        else{
            res.json(results);
        }
    })

}

module.exports.getHasTransducer = (req, res) =>{

    const idProduct = req.params.idProduct;
    const sql = 'SELECT hasTransducer FROM Product WHERE idProduct = ?';

    conexion.query(sql, [idProduct], (error, results) => {
        if (error)
            res.send(error);
        else {
            res.json(results);
        }
    })

}

module.exports.getAllTransducers = (req, res) => {

    const sql = `SELECT DISTINCT name FROM Transducer WHERE name NOT LIKE 'NONE'`;

    conexion.query(sql, (error, results) => {
        if (error)
            res.send(error);
        else {
            res.json(results);
        }
    })

}

module.exports.getTransducersFrom = (req, res) => {

    const idProduct = req.params.idProduct;

    const sql = `SELECT name, idTransducer FROM Transducer WHERE idProduct = ?`;

    conexion.query(sql, [idProduct],(error, results) => {
        if (error)
            res.send(error);
        else {
            res.json(results);
        }
    })

}

module.exports.addMultipleTransducers = (req,res) =>{

    const query = `INSERT INTO Transducer (idProduct, name) VALUES ?`;
    const values = req.body;

    const newArray = [];

    console.log(values);
    for(let d = 0; d < values.length; d++){ // create bidimensional array with data
        newArray.push([values[d].idProduct, values[d].name]);
    }

    console.log(newArray);

    conexion.query(query, [newArray], (error, results) => {
        if(error)
            res.send(error);
        else{
            console.log(results);
            res.json(results);
        }
    })

}