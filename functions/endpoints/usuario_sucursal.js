
const conn = require('../conn')
const queries_us_suc = require("../query_string/usuario_sucursal");

const SUCCESS_STATUS = 200;
const SERVER_ERROR_STATUS = 500;

const updateSucursalDestino = async (request, response) => {
    let values = [request.body.destino, request.body.origen]
    try {
        await conn.executeQuery(queries_us_suc.deleteAgenteSucursal(), [request.body.origen])
        await conn.executeQuery(queries_us_suc.updatUsSucUsers(), values)
        await conn.executeQuery(queries_us_suc.setAtiende(), values)
        return response.status(SUCCESS_STATUS).send()
    }
    catch (error) {
        return response.status(SERVER_ERROR_STATUS)
    }
}

const getUsuariosPorSucursal = async (request, response) => {
    let idsucursal = request.query.idsucursal;
    conn.executeQuery(queries_us_suc.getUsuariosPorSucursal(), [idsucursal])
        .then(
            (result) => {
                const rows =  result.rows;
                return response.status(SUCCESS_STATUS).send(rows)}
            )
        .catch(
            error => {
                return response.status(SERVER_ERROR_STATUS).send(error)
            })

}


module.exports = {
    updateSucursalDestino,
    getUsuariosPorSucursal
}