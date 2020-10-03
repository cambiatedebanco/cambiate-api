var format = require('pg-format');
const getAll = () => {
    let query = `select idcampana, nombre, created_time, tipo from 
    "bd_analitica".cla_ceo_campana
    where esactivo = true
     order by created_time desc`
    return query
}

const getById = () => {
    let query = `select idcampana, nombre, created_time, tipo from
    "bd_analitica".cla_ceo_campana where idcampana = $1`
    return query;
}


const insert = () => {
    let query = `insert into "bd_analitica".cla_ceo_campana(nombre, created_time, tipo) values($1, $2, $3)`
    return query;
}

const deleteCampain = () => {
    let query = `update "bd_analitica".cla_ceo_campana SET esactivo=false where idcampana = $1`
    return query;
}

const updateCampain = () => {
    let query = `update "bd_analitica".cla_ceo_campana SET nombre = $1,  tipo = $2 where idcampana = $3`
    return query;
}

const getByTipo = () => {
    let query = `select idcampana, nombre, created_time, tipo, esactivo 
    from "bd_analitica".cla_ceo_campana
    where tipo = $1 and esactivo = true`
    return query;
}

const getSupervisoresByCampain = () => {
    let query = `select rut, nombres, apellido_paterno, apellido_materno, email 
    from "bd_analitica".cla_ceo_usuarios u
    inner join "bd_analitica".cla_ceo_supervisor_campana_celula s
    on (u.rut = s.idusuario)
    where idcampana = $1`
    return query;
}

const insertSupervisor = () => {
    let query = `insert into "bd_analitica".cla_ceo_supervisor_campana_celula(idusuario, idcampana, created_time) values($1, $2, $3)`
    return query;
}

const deleteSupervisor = () => {
    let query = `delete from "bd_analitica".cla_ceo_supervisor_campana_celula where idcampana = $1`
    return query;
}

const getColaboradoresByCampain = () => {
    let query = `
select u.rut, u.nombres, u.apellido_paterno, u.apellido_materno, u.email
from "bd_analitica".cla_ceo_usuarios u
inner join "bd_analitica".cla_ceo_usuarios_campana uc
on (u.rut = uc.idusuario)
inner join "bd_analitica".cla_ceo_campana c
on (uc.idcampana = c.idcampana)
where c.tipo = $1 and c.idcampana = $2 and uc.idsucursal = $3`
    return query;
}

const insertColaboradorCampain = (values) => {

    let query = format(`insert into "bd_analitica".cla_ceo_usuarios_campana
     (idusuario, idcampana, idsucursal, prioridad, created_time)VALUES %L`, values)

    return query;
}

const deleteColaboradorCampain = () => {
    let query = `delete from "bd_analitica".cla_ceo_usuarios_campana where idcampana = $1 and idsucursal = $2`
    return query;
}

const getAllSucursales = () => {
    let query = `select idsucursal, nombre_sucursal, created_time, esactivo from 
    "bd_analitica".cla_ceo_sucursal where esactivo = true and idsucursal <> -1 order by idsucursal asc`
    return query
}

const getSucursalById = () => {
    let query = `select idsucursal, nombre_sucursal, idsucursal_atiende from 
    "bd_analitica".cla_ceo_sucursal where idsucursal = $1
    order by idsucursal asc`
    return query
}

const updatePrioridad = () => {
    let query = `update "bd_analitica".cla_ceo_prioridad_leads SET contador = $1 where idcampana = $2 and idsucursal = $3`
    return query;
}

const insertOrUpdatePrioridad = () => {
    let query = `INSERT INTO "bd_analitica".cla_ceo_prioridad_leads (idcampana, idsucursal, prioridad, contador, created_time)
    VALUES ($1, $2, $3, $4, $5)
    ON CONFLICT (idcampana, idsucursal) DO UPDATE SET prioridad = $3, contador = $4, created_time = $5;
    `
    return query;
}

const getPrioridad = () => {
    let query = `select idcampana, idsucursal, prioridad, contador from 
    "bd_analitica".cla_ceo_prioridad_leads where idcampana = $1 and idsucursal = $2`
    return query
}

const getColaboradorByPrioridad = () => {
    let query = `select  u.rut, u.nombres, u.apellido_paterno, 
    u.apellido_materno, lower(u.email) as email, uc.prioridad
    from "bd_analitica".cla_ceo_usuarios u
    inner join "bd_analitica".cla_ceo_usuarios_campana uc
    on (u.rut = uc.idusuario)
    where uc.idcampana = $1 and uc.idsucursal = $2 and uc.prioridad = $3`
    return query;
}

const updateUsuarioCampana = () => {
    let query = `update "bd_analitica".cla_ceo_usuarios_campana SET idusuario = $1
    where idusuario = $2 and idcampana = $3 and idsucursal = $4`
    return query;
}

const updateLeadsByColaborador = () => {
    let query = `update "bd_analitica".cla_ceo_micartera_campanas 
    SET rut_colaborador = $1, email_colaborador = $2, nuevo = 1, gestionado = 0, accion = 'U'
    where rut_colaborador = $3 and idcampana = $4 and idsucursal = $5 and 
    (nuevo = 1 or (nuevo = 0 and gestionado = 0))`
    return query;
}

const getCampanasByColaborador = () => {
    let query = `select idcampana 
    from bd_analitica.cla_ceo_usuarios_campana 
    where idusuario = $1
    group by idcampana`
    return query;
}

const getCampanasBySupervisor = () => {
    let query = `select c.idcampana, c.nombre 
    from bd_analitica.cla_ceo_supervisor_campana_celula sc
    inner join bd_analitica.cla_ceo_campana c
    on (sc.idcampana = c.idcampana)
    where sc.idusuario = $1`
    return query;
}

const getBancos = () => {
    let query = `SELECT idbanco, nombre
FROM bd_analitica.cla_ceo_banco
where esactivo=True and idbanco<>$1
order by orden`;
    return query

}

const getBancosAll = () => {
    let query = `SELECT idbanco, nombre
FROM bd_analitica.cla_ceo_banco
where esactivo=True 
order by random()`;
    return query

}

module.exports = {
    getAll,
    getById,
    insert,
    deleteCampain,
    getByTipo,
    getSupervisoresByCampain,
    getColaboradoresByCampain,
    insertSupervisor,
    deleteSupervisor,
    insertColaboradorCampain,
    deleteColaboradorCampain,
    getAllSucursales,
    updatePrioridad,
    insertOrUpdatePrioridad,
    getPrioridad,
    getColaboradorByPrioridad,
    updateCampain,
    getSucursalById,
    updateUsuarioCampana,
    getCampanasByColaborador,
    updateLeadsByColaborador,
    getCampanasBySupervisor,
    getBancos,
    getBancosAll
}