const getSucursalLike = () => {
    let query =`select idsucursal, nombre_sucursal from "bd_analitica".cla_ceo_sucursal where 
    nombre_sucursal like $1`
    return query;
}

module.exports = {
    getSucursalLike
}