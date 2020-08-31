const cla_ceo_stock_creditos_af = (rut) => {
    return `select periodo, rut_persona, rut_empresa, fecha_otorgamiento,
    folio_del_credito, codigo_sucursal,
    tipo_credito,
    numero_cuotas_autorizadas,
    numero_cuotas_emitidas,
    numero_cuotas_pagadas,
    monto_otorgado,
    monto_cuota,
    saldo_capital_final
    from 
    "bd_analitica".cla_ceo_stock_creditos_af where rut_persona = ${rut} order by fecha_otorgamiento desc`;
}

const cla_ceo_timeline_afiliado = (rut, channel) => {
    let query = `select rut_afiliado, id_operador, ejecutivo, canal, comentario, hora_contacto, duracion, tipo_gestion, campana, tipo_interaccion, estado_gestion from
    bd_analitica."cla_ceo_timeline_afiliado" where rut_afiliado = ${rut} order by hora_contacto desc
    `
    if (typeof channel !== 'undefined') {
        let query = `select rut_afiliado, id_operador, ejecutivo, canal, comentario, hora_contacto, duracion, tipo_gestion, campana, tipo_interaccion, estado_gestion from
        bd_analitica."cla_ceo_timeline_afiliado" where rut_afiliado = ${rut} and canal = ${channel} order by hora_contacto desc 
        `
    }
    return query;
}

const cla_ceo_stock_seguro_afiliado = (rut) => {
    let query = `
    select rut_persona, rut_empresa, tipo_de_seguro, tipo_de_plan_seguro, fecha_contrata_seguro, prima_seguro_uf 
    from "bd_analitica".cla_ceo_stock_seguro_af where rut_persona = ${rut} order by fecha_contrata_seguro desc`
    return query;
}

const cla_ceo_stock_ahorro_afiliado = (rut) => {
    let query = `select rut_persona, rut_empresa, fecha_creacion_cta, fecha_apertura_cta,
    tipo_de_cuenta, tipo_de_fondo, tipo_de_descuento, descripcion, monto_apertura_en_pesos, saldo_acumulado_pesos
    from "bd_analitica".cla_ceo_stock_ahorro_af where rut_persona = ${rut}`
    return query
}

const cla_ceo_imagenes_ficha = () => {
    let query = ` select nombre, posicion, activo, url from
     "bd_analitica".cla_ceo_imagenes_componente where componente = $1
     order by posicion asc;`
    return query;
}


const cla_ceo_oferta_auto_full_afiliado = (rut) => {
    let query = `
    select rut_persona, tipo, "YEAR", patente, modelo_auto, deducible_0, deducible_3, deducible_5, deducible_10, predeterminado
    from "bd_analitica".cla_ceo_oferta_auto_full_af where rut_persona = ${rut}`
    return query;
}


const cla_ceo_insert_timeline_afiliado_ceo = () => {
    let query = `insert into "bd_analitica".cla_ceo_timeline_afiliado(rut_afiliado, ejecutivo, id_operador, canal, tipo_gestion, comentario, hora_contacto, tipo_interaccion, campana,  estado_gestion)
    values ($1, $2, $3 , $4, $5, $6, $7, $8, $9, $10)
    `
    return query;
}


const cla_ceo_simulacion_por_ejecutivo = () => {
    let query = `insert into "bd_analitica".cla_credito_simulado(capital_inicial, cuotas, dv_afiliado, email_afiliado, meses_gracia, monto_proyectado, monto_solicitado, nombres, rut, tasa_interes, telefono, uf ,
        ejecutivo) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`;
    return query;
}

// en periodo ?
const cla_cargas_familiares_afiliado = (rut_persona, periodo_sk) => {
    let query = `select periodo_sk, rut_carga_familiar, nombre_carga, fecha_nacimiento_carga, sexo_Carga, tramo_de_af, parentesco, dv_carga, tipo_carga, estado_vigencia, fecha_vencimiento_carga 
    from "bd_analitica".cla_ceo_cargas_familiares where rut_persona = ${rut_persona} and periodo_sk = ${periodo_sk} order by fecha_nacimiento_carga desc`
    return query;
}


const cla_ceo_estados_leads = () => {
    let query = `select idestado, nombre_estado from bd_analitica.cla_ceo_estados_lead where esactivo = true
    order by orden asc`
    return query;
}


const updateGestionBaseLead = (fecha_date_gestion, periodo_gestion, fecha_gestion, rut_persona, id_estado, monto_cursado, observaciones) => {
    /*let sql=`update bd_analitica.cla_ceo_micartera_creditos
    set fecha_date_gestion = '${fecha_date_gestion}', periodo_gestion = ${periodo_gestion}, fecha_gestion = ${fecha_gestion}, id_estado = ${id_estado}, monto_cursado = ${monto_cursado}, gestionado = 1, nuevo = 0, accion = 'U'
    where rut_persona = ${rut_persona}`;*/
    let query = `	update bd_analitica.cla_ceo_micartera_campanas
    set fecha_gestion = '${fecha_date_gestion}', periodo_gestion = ${periodo_gestion}, fecha_gestion_int = ${fecha_gestion}, id_estado = ${id_estado}, monto_cursado = ${monto_cursado}, gestionado = 1, nuevo = 0, accion = 'U', observaciones = '${observaciones}'
    where rutint = ${rut_persona}`;

    return query;
}

const updatePendienteBaseLead = (fecha_date_gestion, periodo_gestion, fecha_gestion, rut_persona) => {
    /*let sql=`update bd_analitica.cla_ceo_micartera_creditos
    set fecha_date_gestion = '${fecha_date_gestion}', periodo_gestion = ${periodo_gestion}, fecha_gestion = ${fecha_gestion}, nuevo = 0, accion = 'U'
    where rut_persona = ${rut_persona} and gestionado = 0 and nuevo = 1`*/

    let query = `update bd_analitica.cla_ceo_micartera_campanas
    set fecha_gestion = '${fecha_date_gestion}', periodo_gestion = ${periodo_gestion}, fecha_gestion_int = ${fecha_gestion}, nuevo = 0, accion = 'U'
    where rutint = ${rut_persona} and gestionado = 0 and nuevo = 1`
    return query;
}


module.exports = {
    cla_ceo_stock_creditos_af,
    cla_ceo_timeline_afiliado,
    cla_ceo_stock_seguro_afiliado,
    cla_ceo_stock_ahorro_afiliado,
    cla_ceo_imagenes_ficha,
    cla_ceo_insert_timeline_afiliado_ceo,
    cla_ceo_oferta_auto_full_afiliado,
    cla_ceo_simulacion_por_ejecutivo,
    cla_cargas_familiares_afiliado,
    cla_ceo_estados_leads,
    updateGestionBaseLead,
    updatePendienteBaseLead
}