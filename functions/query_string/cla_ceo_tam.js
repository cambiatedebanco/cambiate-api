const getAll = () => {
    let query = `select 
    rut, dv, nombres, estado, fecha_solicitud, gestionado, phone_number, email from "bd_analitica".cla_ceo_tam limit 50`
    return query;
}
const getByRut = () => {
    let query = `select rut,tiene_bip, dv, nombres, ap_paterno, ap_materno, fecha_nacimiento,
    email, telefono, dir_calle,
    dir_numero,
    dir_complemento,
    dir_comuna,
    dir_region,
    dir_referencia,
    dir_codigo_postal,
    tipo_trabajador,
    tiene_bip,
    renuncia_bip,
    renuncia_mandato,
    fecha_solicitud,
    fecha_solicitud_int,
    credito_mes,
    credito_monto,
    credito_cuota,
    credito_plazo,
    entidad_pagadora_pension,
    monto_pension,
    beneficios,
    CASE WHEN licencia_medica_6m = 1 THEN 'Si'
    ELSE 'No' END as licencia_medica_6m
    ,
    CASE WHEN callcenter_3m = 1 THEN 'Si'
    ELSE 'No' END as callcenter_3m,
    tiene_credito,
    email_colaborador from "bd_analitica".cla_ceo_tam where rut = $1`
    return query;
}

const getRutLike = () => {
    let query = `select rut, dv, nombres, ap_paterno, ap_materno, fecha_nacimiento,
    email, telefono, dir_calle, dir_numero, dir_comuna,
    tipo_trabajador,
    monto_pension,
    email_colaborador
     from "bd_analitica".cla_ceo_tam where rut = $1`
    return query;
}

const getByMailColaborador = () => {
    let query = `
    select fecha_solicitud,rut, dv, nombres, ap_paterno, ap_materno,email,telefono,dir_calle, 
    dir_numero, dir_complemento, es.nombre_estado
    from "bd_analitica".cla_ceo_tam as tam
    left join "bd_analitica".cla_ceo_estados_tam as es on es.id_estado = tam.id_estado
    where upper(email_colaborador) = upper($1)`
    return query;
}

const getGestionadosBeetweenDate = () => {
    let query = `select 'DT' as tipo_registro, fecha_solicitud,rut, dv, nombres, ap_paterno, ap_materno,email,telefono,dir_calle, 
    dir_numero, dir_complemento, dir_comuna, dir_region, dir_referencia, dir_codigo_postal, descarga ,es.nombre_estado
    from "bd_analitica".cla_ceo_tam as tam
    left join "bd_analitica".cla_ceo_estados_tam as es on es.id_estado = tam.id_estado
    where gestionado = $1 and fecha_solicitud::date between $2 and $3`
    return query;
}

const getGestionados = () => {
    let query = `select 'DT' as tipo_registro, fecha_solicitud,rut, dv, nombres, ap_paterno, ap_materno,email,telefono,dir_calle, 
    dir_numero, dir_complemento, dir_comuna, dir_region, dir_referencia, dir_codigo_postal, es.nombre_estado
    from "bd_analitica".cla_ceo_tam as tam
    left join "bd_analitica".cla_ceo_estados_tam as es on es.id_estado = tam.id_estado
    where gestionado = 1`
    return query;
}

const update = () => {
    let query = `update "bd_analitica".cla_ceo_tam
    set tiene_bip = $2, renuncia_bip = $2, renuncia_mandato = $3,
    email = $4, dir_complemento = $5, dir_comuna = $6, 
    dir_region = $7, dir_referencia = $8, 
    dir_codigo_postal = $9,email_colaborador = $10, id_estado = $11, gestionado=1, fecha_solicitud = NOW()
    where rut = $1`
     return query;
}

const updateDescargados = () => {
    let query = `
    update "bd_analitica".cla_ceo_tam
    set descarga = 1
    where fecha_solicitud::date between $1 and $2
    `
    return query;
}

const getEstados = () => {
    let query = `select id_estado, nombre_estado from "bd_analitica".cla_ceo_estados_tam`
    return query;
}


module.exports = { getAll, getByRut, update, getRutLike, getEstados, getGestionados, getGestionadosBeetweenDate, updateDescargados }