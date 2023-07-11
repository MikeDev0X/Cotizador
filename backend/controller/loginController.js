const jwt = require('jsonwebtoken');
const config = require('../config/jwt');
const mysql = require('mysql');
const mysqlConfig = require('../helpers/mysql-config.js');
const conexion = mysql.createConnection(mysqlConfig);

module.exports.login = (req, res) => {

    const name = req.body.name;
    const password = req.body.password;

    const sql = `SELECT idAdmin FROM Admin WHERE name = ?`
        //const sql2 = `SELECT SHA2(contrasena,224) FROM usuario WHERE nickname=?`
    const sql2 = `SELECT password FROM Admin WHERE name = ? `
        //const sql3 = `SELECT contrasena FROM usuario WHERE contrasena = SHA2(?,224)`

    let idAdmin;
    let resultName;
    let resultPassword;

    let mensaje = 'login failed' //mensaje updated
    let token = '';

    const payload = {
        id: 1,
        name: req.body.name
    }

    console.log(req.body);

    function Fun(pw){

        conexion.query(sql, [name], (error, results) => {
            if (error)
                res.send(error);
            else {

                if (results[0] != undefined) {

                    resultName = results[0];
                    idAdmin = resultName.idAdmin;

                    conexion.query(sql2, [name], (error, results2) => {

                        if (error)
                            res.send(error);

                        else {
                            resultPassword = results2[0].password;

                            if (resultName != undefined) {
                                console.log(resultPassword);

                                if (resultPassword === pw) {
                                    token = jwt.sign(payload, config.key, { expiresIn: 7200 })
                                    mensaje = 'Authenticated user'
                                }
                            }
                        }

                        res.json({
                            mensaje,
                            token
                        })
                    })

                } else {
                    res.json({
                        mensaje
                    })
                }

            }
        })
    }

    Fun(password);
}