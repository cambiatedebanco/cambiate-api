const getAll = () => {
    let query = `select base.idsucursal, base.esactivo, base.nombre_sucursal as origen, base.idsucursal_atiende, invite.nombre_sucursal as destino, agente.rut, agente.dv, agente.nombres
    from "bd_analitica".cla_ceo_sucursal as base 
    left join "bd_analitica".cla_ceo_sucursal invite on invite.idsucursal = base.idsucursal_atiende
    left join (SELECT rut, dv, nombres, idsucursal FROM "bd_analitica".cla_ceo_usuarios
left JOIN "bd_analitica".cla_ceo_usuario_sucursal as us_suc on us_suc.idusuario = rut
WHERE ID_CARGO = 2) as agente on agente.idsucursal = base.idsucursal where base.idsucursal > 0 order by base.nombre_sucursal
`
    return query;
}

const getDisponible = () => {
    let query = `select idsucursal, nombre_sucursal 
    from "bd_analitica".cla_ceo_sucursal where idsucursal = idsucursal_atiende 
    and esactivo = true and idsucursal > 0`
    return query
}

const setAtiende = () => {
    let query = `update "bd_analitica".cla_ceo_sucursal set idsucursal_atiende = $1
    where idsucursal = $2`
    return query;
}
module.exports = { getAll, getDisponible, setAtiende }