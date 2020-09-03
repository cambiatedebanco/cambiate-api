// TODO ALTERAR TABLA RUT_AJENTE PARA CLA_SCANNER_USUARIOS EN PRD
const get_usuarios_by_rut = () => {
    let query = `select rut, dv, nombres, apellido_paterno, apellido_materno, 
    email, es_ejecutivo, activo, cargo, fecha_creacion, fecha_actualizacion, sucursal, nivel_acceso, puesto_real, id_cargo, c.nombre as nombre_cargo from "bd_analitica".cla_ceo_usuarios
    left join "bd_analitica".cla_ceo_cargo as c on 
    c.idcargo = id_cargo
    where rut = $1
    `
    return query;
}

const get_usuarios_by_email = () => {
    let query = `select rut, dv, nombres, apellido_paterno, apellido_materno, 
    email, es_ejecutivo, activo, cargo, fecha_creacion, fecha_actualizacion, sucursal, nivel_acceso, puesto_real,id_cargo, idbanco from "bd_analitica".cla_ceo_usuarios
    where UPPER(email) = UPPER($1)
    `


    return query;
}

const getUsersInHierarchy = () => {
    let query = `select rut, dv, nombres, apellido_paterno, apellido_materno,
    email from "bd_analitica".cla_ceo_usuarios
    where id_cargo = $1`
    return query;
}

const getAll = () => {
    let query = `select rut, dv, nombres, apellido_paterno, apellido_materno, 
    email, es_ejecutivo, activo, cargo, fecha_creacion, fecha_actualizacion from "bd_analitica".cla_ceo_usuarios
    order by rut asc`
    return query;
}


const get_usuarios_por_agente = (rut) => {
    let query = `select rut, dv, nombres, apellido_paterno, apellido_materno, 
    email, es_ejecutivo, activo, cargo, fecha_creacion, fecha_actualizacion from "bd_analitica".cla_ceo_usuarios
    where rut_agente = ${rut} and es_ejec = 1
    `
    return query;
}

const delete_usuario = (rut) => {
    let query = `delete from "bd_analitica".cla_ceo_usuarios where rut = ${rut}`
    return query;
}

const update_usuario = () => {
    let query = `update "bd_analitica".cla_ceo_usuarios SET nombres = $1, apellido_materno = $2,
    apellido_paterno = $3, puesto_real =$4, es_ejecutivo=$5, sucursal=$6, nivel_acceso=$7 ,usuario_actualiza=$8, id_cargo=$9
    where rut =$10`
    return query;
}

const insert_usuario = () => {
    let query = `insert into "bd_analitica".cla_ceo_usuarios(
        rut, email, nombres, apellido_paterno, apellido_materno, puesto_real, es_ejecutivo, sucursal, nivel_acceso, marca_vigencia,
        dv, fecha_actualizacion, usuario_actualiza, id_cargo, idbanco, banco) values(
            $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14, $15, $16
        )`
    return query;
}

const updateRolUsuario = (idCargo, rut) => {
    let query = `update "bd_analitica".cla_ceo_usuarios SET id_cargo = ${idCargo}
    where rut = ${rut}`
    return query;
}


module.exports = {
    get_usuarios_by_rut,
    get_usuarios_by_email,
    getAll,
    getUsersInHierarchy,
    get_usuarios_por_agente,
    delete_usuario,
    insert_usuario,
    update_usuario,
    updateRolUsuario
}