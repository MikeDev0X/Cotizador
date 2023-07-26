const jwt = require('jsonwebtoken');
const config = require('../config/jwt');
const mysql = require('mysql');
const mysqlConfig = require('../helpers/mysql-config.js');
const conexion = mysql.createConnection(mysqlConfig);

module.exports.getWarranties = (req, res) =>{

    const query = `SELECT * FROM Warranty WHERE idProduct = ?`;
    const idProduct = req.params.idProduct;

    conexion.query(query, [idProduct], (error, results)=>{
        if(error)
            res.send(error);
        else{
            res.json(results);
        }
    })

}

module.exports.getIdWarranty = (req, res) =>{
    const query = `SELECT idWarranty FROM Warranty WHERE idProduct = ? AND name = ?`;
    const idProduct = req.params.idProduct;
    const name = req.params.name;

    conexion.query(query,[idProduct, name], (error, results)=>{
        if(error)
            res.send(error);
        else{
            res.json(results);
        }

    })

}

module.exports.getAllWarranties = (req, res) =>{
    const query = `SELECT DISTINCT name FROM Warranty`;

    conexion.query(query, (error, results)=>{
        if (error)
            res.send(error);
        else {
            res.json(results);
        }

    })

}

module.exports.addMultipleWarranties = (req, res) => {

    const query = `INSERT INTO Warranty (idProduct, name) VALUES ?`;
    const values = req.body;


    const newArray = [];

    console.log(values);
    for (let d = 0; d < values.length; d++) { // create bidimensional array with data
        newArray.push([values[d].idProduct, values[d].name]);
    }

    console.log(newArray);

    conexion.query(query, [newArray], (error, results) => {
        if (error)
            res.send(error);
        else
            res.json(results);
    })

}