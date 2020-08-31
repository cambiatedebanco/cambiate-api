var format = require('pg-format');
var ID_CARGO_AGENTE = 2;
var ID_CARGO_EJECUTIVO = 1;
var ID_COLABORADOR = 3;
var OTRO_CARGO = null
const getSucursalesDisponiblesPorCargo = () => {
    let query = `select idsucursal, nombre_sucursal from "bd_analitica".cla_ceo_sucursal where idsucursal not in 
    (select us_su.idsucursal from "bd_analitica".cla_ceo_usuarios us
    inner join "bd_analitica".cla_ceo_usuario_sucursal as us_su
    on us.rut = us_su.idusuario
    where us.id_cargo = $1)
    `
    return query;
}

const getUsuariosPorSucursal = () => {
    let query = `select us.rut, us.nombres, us.apellido_paterno, us.apellido_materno, us.email, us_su.idsucursal 
    from "bd_analitica".cla_ceo_usuarios us
    inner join "bd_analitica".cla_ceo_usuario_sucursal as us_su 
    on us.rut = us_su.idusuario 
    where us_su.idsucursal = $1
    `
    return query;
}

const deleteByUser = () => {
    let query = `delete from "bd_analitica".cla_ceo_usuario_sucursal where idusuario = $1`
    return query;
}

const getUsuariosPorCargoSuc = () => {
    // OCURRE QUE EXISTEN DOS AGENTES ..
    let query = `select rut, nombres, us.id_cargo, ca.nombre as nombre_cargo from "bd_analitica".cla_ceo_usuario_sucursal as us_suc
    inner join 
    "bd_analitica".cla_ceo_usuarios as us on us.rut = us_suc.idusuario
    inner join 
    "bd_analitica".cla_ceo_cargo as ca on ca.idcargo = us.id_cargo
    where us.id_cargo = $1 and us_suc.idsucursal = $2`
    return query;
}

const add = (values) => {
    let query = format(`insert into "bd_analitica".cla_ceo_usuario_sucursal
     (idusuario,idsucursal, created_time)VALUES %L`, values)
    return query;
}


const getSucursalesUsuario = () => {
    let query = `select suc.nombre_sucursal, suc.idsucursal from "bd_analitica".cla_ceo_usuario_sucursal as  us_suc
    inner join "bd_analitica".cla_ceo_sucursal as suc
    on suc.idsucursal = us_suc.idsucursal
    where us_suc.idusuario = $1`
    return query;
}

const getSucursalesByRutUsuario = () => {
    let query = `select us_suc.idsucursal, suc.nombre_sucursal from "bd_analitica".cla_ceo_usuario_sucursal as  us_suc
    inner join "bd_analitica".cla_ceo_sucursal as suc
    on suc.idsucursal = us_suc.idsucursal
    where us_suc.idusuario = $1`
    return query;
}

// dejar agente sin sucursal
const deleteAgenteSucursal = () => {
    let query = `delete from "bd_analitica".cla_ceo_usuario_sucursal 
    where idusuario = ANY(
    select us_suc.idusuario from "bd_analitica".cla_ceo_usuario_sucursal as us_suc
    inner join "bd_analitica".cla_ceo_usuarios as us on us.rut = us_suc.idusuario
    where us.id_cargo = ${ID_CARGO_AGENTE} and idsucursal = $1)`
    return query;
}

const deleteDotacion = (idsucursal) => {
    // revisar cargo
    let query = `delete from "bd_analitica".cla_ceo_usuario_sucursal where idusuario in
                    (select us_suc.idusuario from "bd_analitica".cla_ceo_usuario_sucursal as us_suc 
                    inner join "bd_analitica".cla_ceo_usuarios us  on us.rut = us_suc.idusuario
                    where us_suc.idsucursal = ${idsucursal} and  us.id_cargo = ${ID_COLABORADOR})`
    return query
}

const insertDotacion = (values, idsucursal) => {
    let query = format(`insert into "bd_analitica".cla_ceo_usuario_sucursal(idusuario,idsucursal, created_time) VALUES %L`, values)
    return query;
}

const updatUsSucUsers = () => {
    let query = `update "bd_analitica".cla_ceo_usuario_sucursal SET idsucursal = $1 WHERE idsucursal = $2`
    return query;
}

const getAgentesSinSucursal = () => {
    let query = `select rut, nombres from "bd_analitica".cla_ceo_usuarios 
    where id_cargo =  ${ID_CARGO_AGENTE}  and rut not in (select distinct idusuario from "bd_analitica".cla_ceo_usuario_sucursal)
    `
    return query;
}

const getDotacionSucursalAgente = () => {
    // REVISAR ID CARGO PARA USUARIOS DISPONIBLES.
    let query = `select CAST(us_suc.idusuario AS TEXT) as rut, concat(rut,' - ', nombres) as nombres from "bd_analitica".cla_ceo_usuario_sucursal as us_suc
    inner join "bd_analitica".cla_ceo_usuarios as us on us.rut = us_suc.idusuario
    where us_suc.idusuario != $1 and us_suc.idsucursal = $2 
    and us.id_cargo = ${ID_COLABORADOR}`
    return query;
}

const getDotacionDisponible = () => {
    let query = `
    select us.rut, concat(rut,' - ', nombres) as nombres from "bd_analitica".cla_ceo_usuarios as us
    where us.id_cargo = ${ID_COLABORADOR} and us.rut not in (select distinct idusuario from "bd_analitica".cla_ceo_usuario_sucursal)
    `
    return query;
}


module.exports = {
    updatUsSucUsers,
    getSucursalesDisponiblesPorCargo,
    getUsuariosPorSucursal,
    getUsuariosPorCargoSuc,
    getAgentesSinSucursal,
    getSucursalesUsuario,
    deleteByUser,
    add,
    getSucursalesByRutUsuario,
    deleteAgenteSucursal,
    getDotacionSucursalAgente,
    getDotacionDisponible,
    deleteDotacion,
    insertDotacion

}