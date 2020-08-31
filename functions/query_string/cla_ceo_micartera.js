var format = require('pg-format');

const getMicarteraCreditosSocioOrAgente = () => {
    let query = `select t1.id, t1.rutint, t1.rut, t1.nombre nombres, 
    t1.probabilidad, t1.grupo, t1.idcampana, t3.nombre, t1.monto, t1.email_colaborador
    from bd_analitica.cla_ceo_micartera_campanas t1 
	inner join bd_analitica.cla_ceo_campana t3
    on t1.idcampana = t3.idcampana
    where t1.idsucursal in (select idsucursal from bd_analitica.cla_ceo_usuario_sucursal where idusuario = $1)
	and nuevo=1 and t1.probabilidad is not null and t1.activo = 1 and t3.eslead = false
	order by t1.probabilidad desc
    `
    return query;
}

const getMicarteraCreditosColaborador = () => {
    let query = `select t1.id, t1.rutint, t1.rut, t1.nombre nombres, t1.probabilidad, 
    t1.grupo, t1.idcampana, t3.nombre, t1.monto, t1.email_colaborador
    from bd_analitica.cla_ceo_micartera_campanas t1 
	inner join bd_analitica.cla_ceo_campana t3
    on t1.idcampana = t3.idcampana
    where rut_colaborador= $1 and nuevo=1 and t1.probabilidad is not null and t1.activo = 1 and t3.eslead = false
	order by t1.probabilidad desc
    `
    return query;
}


const getMicarteraCreditosGestionadoSocioOrAgente = () => {
    let query = `select t1.id, t1.rutint, t1.rut, t1.nombre nombres, t1.probabilidad, 
    t1.grupo, t1.id_estado, t1.idcampana, t3.nombre, t1.monto, t1.email_colaborador
    from bd_analitica.cla_ceo_micartera_campanas t1 
	inner join bd_analitica.cla_ceo_campana t3
    on t1.idcampana = t3.idcampana
    where t1.idsucursal in (select idsucursal from bd_analitica.cla_ceo_usuario_sucursal where idusuario = $1)
    and nuevo=0 
    and gestionado=1 
    and t1.probabilidad is not null 
    and t1.activo = 1  
    and t3.eslead = false
    order by t1.fecha_gestion desc
    `
    return query;
}

const getMicarteraCreditosGestionado = () => {
    let query = `select t1.id, t1.rutint, t1.rut, t1.nombre nombres, 
    t1.probabilidad, t1.grupo, t1.id_estado, t1.idcampana, t3.nombre, t1.monto, t1.email_colaborador
    from bd_analitica.cla_ceo_micartera_campanas t1 
	inner join bd_analitica.cla_ceo_campana t3
    on t1.idcampana = t3.idcampana
    where rut_colaborador = $1 
    and nuevo=0 
    and gestionado = 1 
    and t1.probabilidad is not null 
    and t1.activo = 1  
    and t3.eslead = false 
    order by t1.fecha_gestion desc
    `
    return query;
}

const getMicarteraCreditosPendientesSocioOrAgente = () => {
    let query = `select t1.id, t1.rutint, t1.rut, t1.nombre nombres, t1.probabilidad, 
    t1.grupo, t1.id_estado, t1.idcampana, t3.nombre, t1.monto, t1.email_colaborador
    from bd_analitica.cla_ceo_micartera_campanas t1 
	inner join bd_analitica.cla_ceo_campana t3
    on t1.idcampana = t3.idcampana
    where t1.idsucursal in (select idsucursal from bd_analitica.cla_ceo_usuario_sucursal where idusuario = $1)
    and nuevo=0 
    and gestionado=0 
    and t1.probabilidad is not null 
    and t1.activo = 1  
    and t3.eslead = false 
    order by t1.probabilidad desc
    `
    return query;
}

const getMicarteraCreditosPendientes = () => {
    let query = `select t1.id, t1.rutint, t1.rut, t1.nombre nombres, t1.probabilidad, 
    t1.grupo, t1.id_estado, t1.idcampana, t3.nombre, t1.monto, t1.email_colaborador
    from bd_analitica.cla_ceo_micartera_campanas t1 
	inner join bd_analitica.cla_ceo_campana t3
    on t1.idcampana = t3.idcampana
    where rut_colaborador = $1 
    and nuevo=0 
    and gestionado=0 
    and t1.probabilidad is not null 
    and t1.activo = 1  
    and t3.eslead = false 
    order by t1.probabilidad desc
    `
    return query;
}

const getMicarteraCreditos_totalSocioOrAgente = () => {
    let query = `select count(distinct t1.rutint) n_total  , 
    sum(coalesce(gestionado, 0)) n_gestion
    from bd_analitica.cla_ceo_micartera_campanas t1 
    inner join bd_analitica.cla_ceo_campana t2
	on (t1.idcampana = t2.idcampana)
    where t1.idsucursal in (select idsucursal from bd_analitica.cla_ceo_usuario_sucursal where idusuario = $1)
    and t1.probabilidad is not null 
    and t1.activo = 1  
    and t2.eslead = false
    `
    return query;
}

const getMicarteraCreditos_total = () => {
    let query = `select count(distinct t1.rutint) n_total  , 
    sum(coalesce(gestionado, 0)) n_gestion
    from bd_analitica.cla_ceo_micartera_campanas t1 
    inner join  bd_analitica.cla_ceo_campana t2
	on (t1.idcampana = t2.idcampana)
    where t1.rut_colaborador = $1 
    and t1.probabilidad is not null 
    and t1.activo = 1  
    and t2.eslead = false
    `
    return query;
}

const getMicartera_ejecutivos = () => {
    let query = `select  
    colaborador_sucursal.rut,
    CONCAT(colaborador_sucursal.apellido_paterno ,' ' , colaborador_sucursal.nombres) nombre,
    count(distinct t2.id) registros,
    sum(case when gestionado=1 then 1 else 0 end) gestionados
    
    from
    (select u.rut, u.email, us.idsucursal 
    from bd_analitica.cla_ceo_usuarios u inner join
    bd_analitica.cla_ceo_usuario_sucursal us on (u.rut = us.idusuario and u.id_cargo in (1,2) )) agente_sucursal,
    (select u.rut, u.nombres,  u.apellido_paterno,us.idsucursal 
    from bd_analitica.cla_ceo_usuarios u inner join
    bd_analitica.cla_ceo_usuario_sucursal us on (u.rut = us.idusuario and u.id_cargo <> 2 )) colaborador_sucursal,
    bd_analitica.cla_ceo_micartera_campanas t2  
    where 
    agente_sucursal.idsucursal = colaborador_sucursal.idsucursal
    and agente_sucursal.idsucursal = colaborador_sucursal.idsucursal and colaborador_sucursal.rut = t2.rut_colaborador
    and t2.activo=1 and t2.tipo_campana in (7,6) and agente_sucursal.rut=$1
    group by CONCAT(colaborador_sucursal.apellido_paterno ,' ' , colaborador_sucursal.nombres),
    colaborador_sucursal.rut
    order by CONCAT(colaborador_sucursal.apellido_paterno ,' ' , colaborador_sucursal.nombres)
    `
    return query;
}

module.exports = {
    getMicarteraCreditosSocioOrAgente,
    getMicarteraCreditosColaborador,
    getMicarteraCreditosGestionadoSocioOrAgente,
    getMicarteraCreditosGestionado,
    getMicarteraCreditosPendientesSocioOrAgente,
    getMicarteraCreditosPendientes,
    getMicarteraCreditos_totalSocioOrAgente,
    getMicarteraCreditos_total,
    getMicartera_ejecutivos


}