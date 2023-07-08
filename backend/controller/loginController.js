const jwt = require('jsonwebtoken');
const config = require('../config/jwt');
const mysql = require('mysql');
const mysqlConfig = require('../helpers/mysql-config');
const conexion = mysql.createConnection(mysqlConfig);
const crypto = require('crypto');

module.exports.login = (req, res) => {

    const name = req.body.name;
    const password_ = req.body.password_;

    const sql = `SELECT idUser FROM Admin WHERE name = ?`
        //const sql2 = `SELECT SHA2(contrasena,224) FROM usuario WHERE nickname=?`
    const sql2 = `SELECT password_ FROM Admin WHERE name = ? `
        //const sql3 = `SELECT contrasena FROM usuario WHERE contrasena = SHA2(?,224)`

    let idUser;
    let resultName;
    let resultPassword;

    let mensaje = 'User or password updated' //mensaje updated
    let token = '';

    const payload = {
        id: 1,
        name: req.body.name
    }

    console.log(req.body);

    function Fun(pw) {

        conexion.query(sql, [name], (error, results) => {
            if (error)
                res.send(error);
            else {

                if (results[0] != undefined) {

                    resultName = results[0];
                    idUser = resultName.idUser;

                    conexion.query(sql2, [name], (error, results2, fields) => {

                        if (error)
                            
                            res.send(error);
                        else {

                            resultPassword = results2[0].password_;

                            let pwd = pw;
                            pwd = crypto.createHash('sha224')
                                .update(pwd)
                                .digest('hex');

                            if (resultName != undefined) {
                                console.log(resultPassword);

                                if (resultPassword === pwd) {
                                    token = jwt.sign(payload, config.key, { expiresIn: 7200 })
                                    mensaje = 'Authenticated user'

                                }
                            }
                        }

                        res.json({
                            mensaje,
                            token,
                            idUser
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

    Fun(password_);
}