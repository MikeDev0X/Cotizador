const jwt = require('jsonwebtoken');
const config = require('../config/jwt');
/////////
const mysql = require('mysql');
const mysqlConfig = require('../helpers/mysql-config.js');
const conexion = mysql.createConnection(mysqlConfig);


module.exports.addProduct = (req, res) =>{

    const description = req.body.description;
    const details = req.body.details;
    const singlePrice = req.body.singlePrice;

    const sql = `INSERT INTO Product (description, details, singlePrice) VALUES(?,?,?)`

    conexion.query(sql, [description, details, singlePrice], (error, results)=>{
        if(error)
            res.send(error);
        else{
            res.json(results);
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

module.exports.getTransducers = (req, res) =>{

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