var format = require('pg-format');
const { body } = require('express-validator');

const cla_ceo_insert_cotizacion = () => {
    let query = `insert into "bd_analitica".cla_ceo_micartera_campanas(rut, rutint, nombre, phone_number, email, created_time, fecha,  
          platform, origen, monto, ruta, "timestamp", periodo_carga, activo,hipoteca,credito,tarjeta,destino,idcampana)
    values ($1, $2, $3, $4, $5, $6, $7, 'cb', $8, $9,    
        $10, $11, $12,   1,$13,$14, $15,$16,20)
    `


    return query;
}

const cla_ceo_insert_cotiza = (values) => {
    let query = format(`insert into "bd_analitica".cla_ceo_micartera_campanas(rut, rutint, nombre, phone_number, email, created_time, fecha,  
          platform, origen, monto, ruta, "timestamp", periodo_carga, hipoteca,credito,tarjeta,destino,idcampana)
    values %L`, values)

    return query;
}


const getLeadsColaborador = (rut_colaborador, nuevo, gestionado, fechaInicio, fechaFin) => {
    let query = format(`select l.rut, l.rutint, l.nombre, l.phone_number, l.email, l.created_time, l.tipo_campana, 
    l.califica, l.monto, l.estado_base, l.monto_simulado, l.rut_colaborador, l.email_colaborador, l.star, l.id, 
    c.nombre as nombre_campana, l.id_estado, l.nuevo, l.gestionado, l.comuna
    from bd_analitica.cla_ceo_micartera_campanas l inner join  bd_analitica.cla_ceo_campana c
	on (l.idcampana = c.idcampana) 
    where 
    l.rut_colaborador = %s 
    and (l.nuevo = %s and l.gestionado = %s)           
    and l.activo = 1
    and c.eslead = true
    and (l.fecha >= %s and l.fecha <= %s)
    order by l.id desc`, rut_colaborador, nuevo, gestionado, fechaInicio, fechaFin);

    return query;
}

const getLeadsSupervisor = (rut_colaborador, nuevo, gestionado, fechaInicio, fechaFin) => {
    let query = format(`select l.rut, l.rutint, l.nombre, l.phone_number, l.email, l.created_time, l.tipo_campana, 
    l.califica, l.monto, l.estado_base, l.monto_simulado, l.rut_colaborador, l.email_colaborador, l.star, l.id, 
    c.nombre as nombre_campana, l.id_estado, l.nuevo, l.gestionado, l.comuna
    from bd_analitica.cla_ceo_micartera_campanas l inner join  bd_analitica.cla_ceo_campana c
	on (l.idcampana = c.idcampana) 
    inner join bd_analitica.cla_ceo_supervisor_campana_celula s 
	on (l.idcampana = s.idcampana)
    where 
    s.idusuario = %s 
    and (l.nuevo = %s and l.gestionado = %s)           
    and (l.fecha >= %s and l.fecha <= %s)
    and l.activo = 1
    and c.eslead = true
    order by l.fecha desc, l.probabilidad desc`, rut_colaborador, nuevo, gestionado, fechaInicio, fechaFin);
    console.log(query);
    return query;
}

const getLeadsPropensosColaborador = (rut_colaborador, fechaInicio, fechaFin) => {
    let query = format(`select l.rut, l.rutint, l.nombre, l.phone_number, l.email, l.created_time, l.tipo_campana, 
    l.califica, l.monto, l.estado_base, l.monto_simulado, l.rut_colaborador, l.email_colaborador, l.star, l.id, 
    c.nombre as nombre_campana, l.id_estado, l.nuevo, l.gestionado, l.comuna
    from bd_analitica.cla_ceo_micartera_campanas l inner join  bd_analitica.cla_ceo_campana c
	on (l.idcampana = c.idcampana)
    where 
    l.rut_colaborador = %s     
    and (l.fecha >= %s and l.fecha <= %s)
    and l.star = 1
    and l.activo = 1
    and c.eslead = true
    order by l.fecha desc, l.probabilidad desc`, rut_colaborador, fechaInicio, fechaFin);

    return query;
}

const getLeadsPropensosSupervisor = (rut_colaborador, fechaInicio, fechaFin) => {
    let query = format(`select l.rut, l.rutint, l.nombre, l.phone_number, l.email, l.created_time, l.tipo_campana, 
    l.califica, l.monto, l.estado_base, l.monto_simulado, l.rut_colaborador, l.email_colaborador, l.star, l.id, 
    c.nombre as nombre_campana, l.id_estado, l.nuevo, l.gestionado, l.comuna
    from bd_analitica.cla_ceo_micartera_campanas l inner join  bd_analitica.cla_ceo_campana c
	on (l.idcampana = c.idcampana)
	inner join bd_analitica.cla_ceo_supervisor_campana_celula s 
	on (l.idcampana = s.idcampana)
    where 
    s.idusuario = %s 
    and (l.fecha >= %s and l.fecha <= %s)
    and l.star = 1
    and l.activo = 1
    and c.eslead = true
    order by l.fecha desc, l.probabilidad desc`, rut_colaborador, fechaInicio, fechaFin);

    return query;
}

const getLeadById = () => {
    let query = `select
	l.id, l.created_time,l.rut,l.nombre,l.comuna,l.id_region,l.phone_number,l.email,
    l.id_estado,l.monto,l.observaciones,l.rut_colaborador,l.email_colaborador,l.idcampana, 
    c.nombre as nombre_campana, l.nuevo, l.gestionado, l.comuna, l.timestamp, l.rutint
    from bd_analitica.cla_ceo_micartera_campanas l inner join  bd_analitica.cla_ceo_campana c
	on (l.idcampana = c.idcampana)
    where l.id = $1
    and l.activo = 1`


    return query;
}

const getRegiones = () => {
    let query = `select
	id_region,  latitud, nombre_region, longitud
    from bd_analitica.cla_ceo_regiones order by id_region `

    return query;
}

const updatePendienteLead = (fecha_gestion, id) => {
    let query = `update "bd_analitica".cla_ceo_micartera_campanas SET fecha_gestion = '${fecha_gestion}', nuevo = 0, accion = 'U'
    where id = ${id}`
    return query;
}

const getAllLeadsColaborador = (rut_colaborador, fechaInicio, fechaFin) => {
    let query = format(`select l.rut, l.rutint, l.nombre, l.phone_number, l.email, l.created_time, l.tipo_campana, 
    l.califica, l.monto, l.estado_base, l.monto_simulado, l.rut_colaborador, l.email_colaborador, l.star, l.id, 
    c.nombre as nombre_campana, l.id_estado, l.nuevo, l.gestionado, l.comuna
    from bd_analitica.cla_ceo_micartera_campanas l inner join  bd_analitica.cla_ceo_campana c
	on (l.idcampana = c.idcampana) 
    where 
    l.rut_colaborador = %s 
    and (l.fecha >= %s and l.fecha <= %s)
    and l.activo = 1
    and c.eslead = true
    order by l.fecha desc, l.probabilidad desc`, rut_colaborador, fechaInicio, fechaFin);

    return query;
}

const getAllLeadsBySupervisor = (rut_colaborador, fechaInicio, fechaFin) => {
    let query = format(`select l.rut, l.rutint, l.nombre, l.phone_number, l.email, l.created_time, l.tipo_campana, 
    l.califica, l.monto, l.estado_base, l.monto_simulado, l.rut_colaborador, l.email_colaborador, l.star, l.id, 
    c.nombre as nombre_campana, l.id_estado, l.nuevo, l.gestionado, l.comuna
    from bd_analitica.cla_ceo_micartera_campanas l inner join  bd_analitica.cla_ceo_campana c
	on (l.idcampana = c.idcampana) 
	inner join bd_analitica.cla_ceo_supervisor_campana_celula s 
	on (l.idcampana = s.idcampana)
    where 
    s.idusuario = %s 
    and (l.fecha >= %s and l.fecha <= %s)
    and l.activo = 1
    and c.eslead = true
    order by l.fecha desc, l.probabilidad desc`, rut_colaborador, fechaInicio, fechaFin);

    return query;
}

const getResumenLeadsColaborador = (rut_colaborador, fechaInicio, fechaFin) => {
    let query = format(`select count(1) total,
    sum(case when l.star = 1 then 1 else 0 end) propensos,
    sum(case when l.nuevo = 1 then 1 else 0 end) nuevos,
    sum(case when l.nuevo = 0 and l.gestionado = 0 then 1 else 0 end) pendientes,
    sum(case when l.gestionado = 1 then 1 else 0 end) gestionados
    from bd_analitica.cla_ceo_micartera_campanas l 
    inner join  bd_analitica.cla_ceo_campana c
	on (l.idcampana = c.idcampana) 
    where 
    l.rut_colaborador = %s 
    and (l.fecha >= %s and l.fecha <= %s)
    and l.activo = 1
    and c.eslead = true`, rut_colaborador, fechaInicio, fechaFin);

    return query;
}

const getResumenLeadsSupervisor = (rut_colaborador, fechaInicio, fechaFin) => {
    let query = format(`select count(1) total,
    sum(case when l.star = 1 then 1 else 0 end) propensos,
    sum(case when l.nuevo = 1 then 1 else 0 end) nuevos,
    sum(case when l.nuevo = 0 and l.gestionado = 0 then 1 else 0 end) pendientes,
    sum(case when l.gestionado = 1 then 1 else 0 end) gestionados
    from bd_analitica.cla_ceo_micartera_campanas l 
	inner join bd_analitica.cla_ceo_supervisor_campana_celula s 
    on (l.idcampana = s.idcampana)
    inner join  bd_analitica.cla_ceo_campana c
	on (l.idcampana = c.idcampana) 
    where 
    s.idusuario = %s 
    and (l.fecha >= %s and l.fecha <= %s)
    and l.activo = 1
    and c.eslead = true`, rut_colaborador, fechaInicio, fechaFin);

    return query;
}



const updateLead = () => {
    let query = `update "bd_analitica".cla_ceo_micartera_campanas set 
      id_estado = $1, email = $2, nombre = $3, phone_number = $4, rut = $5,
      observaciones = $6, nuevo = $7, gestionado = $8, rut_colaborador = $9, 
      email_colaborador = $10, fecha_gestion = $11, monto = $12, accion = 'U'
     where id = $13`

    return query;

}

const getTop11LeadsColaborador = () => {
    let query = `select l.rut, l.rutint, l.nombre, l.phone_number, l.email, l.created_time, l.tipo_campana, 
    l.califica, l.monto, l.estado_base, l.monto_simulado, l.rut_colaborador, l.email_colaborador, l.star, l.id, 
    c.nombre as nombre_campana, l.id_estado, l.nuevo, l.gestionado, l.comuna
    from bd_analitica.cla_ceo_micartera_campanas l inner join  bd_analitica.cla_ceo_campana c
	on (l.idcampana = c.idcampana) 
    where 
    l.rut_colaborador = $1 
    and l.nuevo = 1
    and l.activo = 1 
    and c.eslead = true
    order by l.created_time desc
    limit 11`

    return query;
}

const getTop11Supervisor = () => {
    let query = `select l.rut, l.rutint, l.nombre, l.phone_number, l.email, l.created_time, l.tipo_campana, 
    l.califica, l.monto, l.estado_base, l.monto_simulado, l.rut_colaborador, l.email_colaborador, l.star, l.id, 
    c.nombre as nombre_campana, l.id_estado, l.nuevo, l.gestionado, l.comuna
    from bd_analitica.cla_ceo_micartera_campanas l inner join  bd_analitica.cla_ceo_campana c
	on (l.idcampana = c.idcampana) 
    inner join bd_analitica.cla_ceo_supervisor_campana_celula s 
	on (l.idcampana = s.idcampana)
    where 
    s.idusuario = $1  
    and l.nuevo = 1
    and l.activo = 1
    and c.eslead = true
    order by l.created_time desc
    limit 11`

    return query;
}

const getAllEjecutivosCampana = () => {

    let query = `select c.idcampana, u.rut, lower(u.email) email
	from bd_analitica.cla_ceo_usuarios_campana c
	inner join bd_analitica.cla_ceo_usuarios u
	on (c.idusuario = u.rut) order by u.email`

    return query;

}

const updateEjecutivoLead = () => {
    let query = `update "bd_analitica".cla_ceo_micartera_campanas SET rut_colaborador = $1, email_colaborador = $2, accion = 'U'
    where id = $3`
    return query;
}
const getLeadsSupervisor_total = () => {
    let query = `select count(distinct t1.rutint) n_total  , 
    coalesce(sum(coalesce(gestionado, 0)),0) n_gestion
    from bd_analitica.cla_ceo_micartera_campanas t1 
    inner join  bd_analitica.cla_ceo_campana t2 
	on (t1.idcampana = t2.idcampana)
	inner join bd_analitica.cla_ceo_supervisor_campana_celula t3
	on (t1.idcampana = t3.idcampana)
    where t3.idusuario = $1
    and t1.activo = 1  
    and t2.eslead = true
    `
    return query;
}
const getLeads_total = () => {
    let query = `select count(distinct t1.rutint) n_total  , 
    coalesce(sum(coalesce(gestionado, 0)),0) n_gestion
    from bd_analitica.cla_ceo_micartera_campanas t1 
    inner join  bd_analitica.cla_ceo_campana t2
	on (t1.idcampana = t2.idcampana)
    where t1.rut_colaborador = $1
    and t1.activo = 1  
    and t2.eslead = true
    `;

    return query;
}

const getLeadByBanco = () => {
    let query = `select
	l.id, l.created_time,l.rut,l.nombre,l.comuna,l.id_region,l.phone_number,l.email,
    l.id_estado,l.monto_cursado,l.observaciones,l.rut_colaborador,l.email_colaborador,l.idcampana, 
    c.nombre as nombre_campana, l.nuevo, l.gestionado, l.comuna, b.nombre nombre_banco, o.nombre banco_origen, l.monto, t.precio
    from bd_analitica.cla_ceo_micartera_campanas l 
	inner join  bd_analitica.cla_ceo_campana c
	on (l.idcampana = c.idcampana)
	inner join  bd_analitica.cla_ceo_banco b
	on (l.destino = b.idbanco)
	inner join  bd_analitica.cla_ceo_banco o
    on (l.origen::integer = o.idbanco)
    inner join bd_analitica.cb_tramo_precios t 
    on (l.monto >= t.desde and l.monto <= t.hasta)
    where l.destino = $1
    and l.activo = 1
    and rut_colaborador is null
    order by l.id desc`


    return query;
}



const updateAsignLeads = () => {
    let query = `update bd_analitica.cla_ceo_micartera_campanas 
    SET rut_colaborador = $1,
    email_colaborador = $2
    where id = $3`
    return query;
}
module.exports = {
    getLeadsColaborador,
    getLeadsPropensosColaborador,
    getLeadById,
    getRegiones,
    updatePendienteLead,
    updateLead,
    getAllLeadsColaborador,
    getResumenLeadsColaborador,
    getTop11LeadsColaborador,
    getAllLeadsBySupervisor,
    getResumenLeadsSupervisor,
    getLeadsPropensosSupervisor,
    getLeadsSupervisor,
    getTop11Supervisor,
    getAllEjecutivosCampana,
    updateEjecutivoLead,
    getLeadsSupervisor_total,
    getLeads_total,
    cla_ceo_insert_cotizacion,
    getLeadByBanco,
    updateAsignLeads,
    cla_ceo_insert_cotiza
}