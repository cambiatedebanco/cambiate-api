require('dotenv').config();
const conn = require('../conn')
const nodemailer = require('nodemailer');
const queries_usuario = require('../query_string/cla_scanner_usuarios')
var login = require('../login');
const SUCCESS_STATUS = 200;
const SERVER_ERROR_STATUS = 500;


const insertClaCeoUsuario = (request, response) => {
    // TODO CHECK EXPRESS-VALIDATOR
    let body = request.body;
    values = [
        body.rut, body.email, body.nombres, body.apellido_paterno, body.apellido_materno,
        body.puesto_real, body.es_ejecutivo, body.sucursal, body.nivel_acceso, body.marca_vigencia,
        body.dv, body.fecha_actualizacion, body.usuario_actualiza, body.id_cargo
    ]
    return conn.executeQuery(queries_usuario.insert_usuario(), values)
        .then(result => {
            if (!body.es_caja) {
                return login.firebaseAdmin.auth().createUser({
                        email: body.email,
                        emailVerified: false,
                        password: 'ramdomSecret',
                        displayName: body.nombres,
                        disabled: false
                    })
                    .then(createResult => {
                        return login.firebaseAdmin.auth().generatePasswordResetLink(body.email)
                    }).then(link => {
                        // replace lang param to spanish
                        let url = link.substring(0, link.length - 2) + "es"
                        var transporter = nodemailer.createTransport({
                            service: 'SendGrid',
                            auth: {
                                user: 'apikey',
                                pass: process.env.SENDGRID_API_KEY
                            }
                        })
                        const mailOptions = {
                            from: `Caja Los Andes <${process.env.MAIL_EMITTER}>`,
                            to: body.email,
                            subject: 'Credenciales CeoCrm',
                            html: `<html>
                            <head>
                            <title>Ceo Crm</title>
                            
                            </head>
                            <body>
                          
                            <table width="650" height="726" border="0" align="center" cellpadding="0" cellspacing="0" id="m_875951394608878385Tabla_01" style="border:1px solid #efefef">
                                    <tbody><tr>
                                        <td colspan="5" align="center"></td>
                                        </tr><tr>
                                            <td colspan="5">
                                                <img src="https://ceocrm.cajalosandes.cl/assets/images/banner_cla_reset_password.jpg" width="650" height="73" border="0" style="display:block" class="CToWUd">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="5">
                                                <img src="https://ceocrm.cajalosandes.cl/assets/images/banner_main_reset_password.jpg" width="650" height="258" border="0" style="display:block" class="CToWUd a6T" tabindex="0"><div class="a6S" dir="ltr" style="opacity: 0.01; left: 603px; top: 295px;"><div id=":qf" class="T-I J-J5-Ji aQv T-I-ax7 L3 a5q" role="button" tabindex="0" aria-label="Descargar el archivo adjunto " data-tooltip-class="a1V" data-tooltip="Descargar"><div class="aSK J-J5-Ji aYr"></div></div></div>
                                            </td>
                                        </tr>
                                        <tr>
                            
                                            <th width="197" height="52" bgcolor="#FFFFFF">
                                                <font face="Open Sans" size="3" color="#4175a4">
                                                                <strong>Estimado (a)</strong>
                                                            </font>
                                            </th>
                                            <td colspan="2">
                                                <img src="https://sucursalvirtual2.cajalosandes.cl/ccafandes/Plantillas/images/a01_05.png" width="374" height="52" border="0" style="display:block" class="CToWUd">
                                            </td>
                            
                                        </tr>
                                        <tr>
                                            <th height="122" colspan="3">
                                                <font face="Open Sans" size="2" color="#4175a4">
                                                    <div style="margin-left:2rem;margin-right:2rem">
                                                                        <span>Para finalizar el proceso de cambio de clave, ingresa aquí:</span>
                                                                        <br>
                                                                        <div>
                                                                            <a href="${url}">Cambiar clave</a>
                                                                        </div>
                                                                         <br>
                                                             
                                                                        <span>
                                                                        Una vez cambiada la contraseña debes dirigirte al siguiente link 
                                                                        </span>
                                                                        <br>
                                                                        <div>
                                                                         https://ceocrm.cajalosandes.cl/#/login-externo
                                                                        </div>
                                                                        <br>
                                                                        <br>
                                                                        <span>Te deseamos un buen día,</span>
                                                                        <br>
                                                                        <span>Caja Los Andes</span>
                                                                        </div>
                                                                    </font>
                                                <br>
                                            </th>
                                        </tr>
                                        <tr>
                                            <td colspan="3">
                            
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                            </td>
                                            <td>
                                            </td>
                                            <td>
                            
                                            </td>
                                        </tr>
                                        <tr>
                            
                                        </tr>
                                        <tr>
                                            <td height="48" colspan="3" align="center">
                                                <font face="Open Sans" size="1" color="#6f6f6f">
                                                                                                <strong>En caso de dudas, comunícate con grupoceocrm@cajalosandes.cl</strong>
                                                                                                <strong><br>
                                                        Las Cajas de Compensación son fiscalizadas por la Superintendencia de Seguridad Social (<a href="http://www.suceso.cl" target="_blank" data-saferedirecturl="https://www.google.com/url?q=http://www.suceso.cl&amp;source=gmail&amp;ust=1596559411559000&amp;usg=AFQjCNGy2rg2RzGFVa82ig-6GTkNyUF2WA">www.suceso.cl</a>)
                                                    </strong>
                                                                                            </font>
                                            </td>
                                        </tr>
                            
                                        <tr>
                                            <td colspan="5">
                                                <img src="https://ceocrm.cajalosandes.cl/assets/images/footer_reset_password.jpg" width="650" height="66" border="0" style="display:block" class="CToWUd">
                                            </td>
                                        </tr>
                                </tbody></table>
                            
                            
                            </body>
                            </html>`
                        }
                        return transporter.sendMail(mailOptions)
                    })
            }
            return true;
        }).then(res => {
            return response.status(SUCCESS_STATUS).send({});
        })
        .catch(error => {
            console.error(error);
            return response.status(SERVER_ERROR_STATUS).send(error);

        })
}

const deleteClaCeoUsuario = (request, response) => {
    let rut_persona = request.query.id
    if (typeof rut_persona === 'undefined') {
        throw new Error('Parametro id requerido')
    }
    return conn.executeQuery(queries_usuario.get_usuarios_by_rut(), [rut_persona])
        .then(result => {
            if (result) {
                return result.rows[0].email;
            }
            return false;
        }).then(result_email => {
            if (result_email) {
                checkUserInFirebase(result_email);
            }
            return false;
        })
        .then(result => {
            return conn.executeQuery(queries_usuario.delete_usuario(rut_persona))
        }).then(
            _ => { return response.status(200).json({}) }
        )
        .catch(err => {
            console.error(err);
            return response.status(500).send('Algo salio mal')
        })
}

const getClaCeoUsuario = (request, response) => {
    let rut = request.query.id
    let email = request.query.email;

    if (typeof rut === 'undefined' && typeof email === 'undefined' && cargo === 'undefined') {
        throw new Error('Parametro id requerido')
    }
    let query = typeof rut === 'undefined' ?
        queries_usuario.get_usuarios_by_email(email) :
        queries_usuario.get_usuarios_by_rut(rut)
    let param = typeof rut === 'undefined' ? email : rut

    return conn.executeQuery(query, [param])
        .then(res => {
            return response.status(200).json(res.rows)
        })
        .catch(err => {
            console.error(err);
            return response.status(500).send('Algo salio mal')
        })
}


module.exports = {
    insertClaCeoUsuario,
    deleteClaCeoUsuario,
    getClaCeoUsuario,
}

const checkUserInFirebase = (result_email) => {
    login.firebaseAdmin.auth().getUserByEmail(result_email).then(result => {
        return deleteFirebase(result);
    }).catch(error => {
        return;
    })
}

const deleteFirebase = (user) => {
    return login.firebaseAdmin.auth().deleteUser(user.uid).then(_ => { return true }).catch(error => {
        return;
    })
}