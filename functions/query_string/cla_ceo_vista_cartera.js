var format = require('pg-format');

const getVistaCarteraSocioOrAgente = () => {
    let query = `select count(distinct t1.rutint) n_total
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


const getVistaLeadsSupervisor = () => {
    let query = `select count(distinct t1.rutint) n_total
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

const getVistaColaborador = () => {
    let query = `select coalesce(sum(case when t2.eslead = true then 1 else 0 end),0) n_total_leads,
    coalesce(sum (case when t2.eslead = false then 1 else 0 end),0) n_total_cartera,
    count(distinct t1.rutint) n_total
    from bd_analitica.cla_ceo_micartera_campanas t1 
    inner join  bd_analitica.cla_ceo_campana t2
	on (t1.idcampana = t2.idcampana)
    where t1.rut_colaborador = $1
    and t1.activo = 1  `
    return query;
}

module.exports = {
    getVistaCarteraSocioOrAgente,
    getVistaLeadsSupervisor,
    getVistaColaborador

}