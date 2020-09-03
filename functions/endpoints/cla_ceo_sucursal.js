const conn = require('../conn')
const queries_sucursal = require('../query_string/cla_ceo_sucursal')

const getSucursalLike = (request, response) => {
    let q = request.query.q;

    conn.executeQuery(queries_sucursal.getSucursalLike(), [`%${q}%`]).
    then(result => {
        return response.status(200).json(result.rows)
    }).catch(error => {
        return response.status(500).json(error)
    })
}

module.exports = { getSucursalLike }