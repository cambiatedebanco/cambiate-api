const conn = require('../conn')
const queries_cb_creditos = require('../query_string/cb_creditos')

const getCreditosByRut = (request, response) => {
    let q = request.query.rut;
    conn.executeQuery(queries_cb_creditos.getCreditosByRut(), [q]).
    then(result => {
        return response.status(200).json(result.rows)
    }).catch(error => {
        return response.status(500).json(error)
    })
}

const updateCreditos = (request, response) => {
    let values = request.body;

    conn.executeQuery(queries_cb_creditos.updateCreditos(), [values.utilizado, values.rut]).then(result => {
            return response.status(200).send(result.rows)
        })
        .catch(error => {
            console.error(error);
            return response.status(500).send('Algo salio mal')
        })
}

module.exports = { getCreditosByRut, updateCreditos }