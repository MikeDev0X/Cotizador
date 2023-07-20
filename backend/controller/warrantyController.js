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