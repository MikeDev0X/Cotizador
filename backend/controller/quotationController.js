const jwt = require('jsonwebtoken');
const config = require('../config/jwt');
/////////
const mysql = require('mysql');
const mysqlConfig = require('../helpers/mysql-config.js');
const conexion = mysql.createConnection(mysqlConfig);


module.exports.getLastQuotation = (req, res) =>{
    const query = `SELECT MAX(idQuotation) as MAX FROM Quotation`;

    conexion.query(query, (error, results)=>{
        if(error)
            res.send(error);
        else{
            res.json(results);
        }

    })

}

module.exports.addQuotation = (req, res) =>{

    const idAdmin = req.body.idAdmin;
    const idWarranty = req.body.idWarranty;
    const validity = req.body.validity;
    const deliveryTime = req.body.deliveryTime;
    const deliveryCost = req.body.deliveryCost;
    const observations = req.body.observations;
    const total = req.body.total;

    const sql = `INSERT INTO Quotation (idAdmin, idWarranty, validity, deliveryTime, deliveryCost, observations, total) VALUES(?,?,?,?,?,?,?)`

    conexion.query(sql, [description, details, singlePrice], (error, results)=>{
        if(error)
            res.send(error)
        else{
            res.json(results)
        }
    })

}