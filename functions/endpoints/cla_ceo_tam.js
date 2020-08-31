const conn = require('../conn')
const queries_tam = require("../query_string/cla_ceo_tam");

const SUCCESS_STATUS = 200;
const SERVER_ERROR_STATUS = 500;

const getAll = async(request, response) => {
    let param = request.query.id;
    let query = typeof param === 'undefined' ? queries_tam.getAll() : queries_tam.getByRut()
    param = typeof param === 'undefined' ? [] : [param]
    try {
        const { rows } = await conn.executeQuery(query, param)
        return response.status(SUCCESS_STATUS).json(rows)
    } catch (error) {
        console.error(error)
        console.error("cla_ceo_tam: getAll")
        return response.status(SERVER_ERROR_STATUS).send(error)
    }
}

const getRutLike = (request, response) => {
    let q = request.query.q;
    conn.executeQuery(queries_tam.getRutLike(), [q]).
    then(_ => {return response.status(SUCCESS_STATUS).json(_.rows)})
        .catch(error => {
            console.error(error)
            console.error("cla_ceo_tam: getRutLike")
            return response.status(SERVER_ERROR_STATUS).send(error)
        })
}
// TODO RENOMBRAR FUNCIÓN
// Retorna los gestionados
// en caso de tener parametros start & end buscara por un rango de fechas
const getByMailColaborador = (request, response) => {
    let start = request.query.start;
    let end = request.query.end;
    let gestionado = request.query.gestionado ;
    let query = queries_tam.getGestionados()
    let params = []
    if(typeof start !== 'undefined' && typeof end !== 'undefined'){
        params = [parseInt(gestionado), new Date(parseInt(start)), new Date(parseInt(end))]
        query = queries_tam.getGestionadosBeetweenDate()
    }
    conn.executeQuery(query, params).
    then(_ => {
            return response.status(SUCCESS_STATUS).json(_.rows)
        })
        .catch(error => {
            console.error(error);
            console.error("cla_ceo_tam: getByMailColaborador")
            return response.status(SERVER_ERROR_STATUS).send(error)
        })
}

const update = (request, response) => {
    let body = request.body;
    values = [
        body.rut,
        body.renunciaBip,
        body.renunciaMandato,
        body.email, body.dirComplemento,
        body.dirComuna, body.dirRegion,
        body.dirReferencia, body.dirCodigoPostal,
        body.emailColaborador.toUpperCase(), body.id_estado
    ]
    conn.executeQuery(queries_tam.update(), values).
    then(_ => response.status(SUCCESS_STATUS).json(_.rows)).
    catch(error => {
        console.log(error)
        console.error("cla_ceo_tam: update")
        return response.status(SERVER_ERROR_STATUS).send(error)
    })
}

const getEstados = (request, response) => {
    conn.executeQuery(queries_tam.getEstados()).
    then(_ => {return response.status(SUCCESS_STATUS).send(_.rows)})
    .catch(error => {
        console.error(error);
        console.error("cla_ceo_tam: getEstados ")
        return response.status(SERVER_ERROR_STATUS).send(error)})
}
const updateDescargados = (request, response) => {
    let body = request.body;
    let params =  [new Date(body.start), new Date(body.end)]
    conn.executeQuery(queries_tam.updateDescargados(), params).
    then(_ => {return response.status(SUCCESS_STATUS).send(_.rows)})
    .catch(error => {
        console.error("cla_ceo_tam: updateDescargados")
        return response.status(SERVER_ERROR_STATUS).send(error)})
}

module.exports = { getAll, getRutLike, getByMailColaborador, update, getEstados, updateDescargados}