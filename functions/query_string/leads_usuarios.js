var format = require('pg-format');

const getLeadsByColaboradores = (campana, sucursal, values) => {
    let query = format(`select id, periodo_carga, idcampana, idsucursal, rut_colaborador 
    from bd_analitica.cla_ceo_micartera_campanas
    where rut_colaborador in (%L) 
    and (nuevo = 1 or (nuevo = 0 and gestionado = 0))
    and idcampana = %s
    and idsucursal = %s
    and activo = 1`, values, campana, sucursal);

    return query;
}



const updateAsignLeads = (idsucursal, idusuario, emailusuario, values) => {
    let query = format(`UPDATE bd_analitica.cla_ceo_micartera_campanas
    SET idsucursal = %s, rut_colaborador= %s, email_colaborador= '%s', nuevo = 1, gestionado = 0
    where id in (select id 
                          from bd_analitica.cla_ceo_micartera_campanas
                          where id in (%L))`, idsucursal, idusuario, emailusuario, values);
    return query;
}

const getLeadsBySucursal = () => {
    let query = `select id 
    from bd_analitica.cla_ceo_micartera_campanas
    where sucursal = $1 
    and idcampana = $2
    and (nuevo = 1 or (nuevo = 0 and gestionado = 0))
    and activo = 1`;

    return query;
}

module.exports = {
    getLeadsByColaboradores,
    updateAsignLeads,
    getLeadsBySucursal
}