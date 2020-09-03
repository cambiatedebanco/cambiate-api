const getSucursalLike = () => {
    let query = `select idbanco idsucursal, nombre nombre_sucursal from "bd_analitica".cla_ceo_banco where 
    upper(nombre) like $1`
    return query;
}

module.exports = {
    getSucursalLike
}