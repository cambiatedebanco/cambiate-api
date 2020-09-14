var format = require('pg-format');


const getCreditosByRut = () => {
    let query = `select credito_total, credito_utilizado, credito_saldo 
    from bd_analitica.cb_credito_compra
    where idusuario = $1`;

    return query;
}

const insertCreditos = () => {
    let query = `insert into bd_analitica.cb_credito_compra(
        idusuario, credito_total, credito_utilizado, credito_saldo) values(
            $1,$2,0,0
        )`
    return query;
}

const updateCreditos = () => {
    let query = `update bd_analitica.cb_credito_compra SET credito_total = 0, credito_utilizado = $1
    where idusuario = $2`
    return query;
}

const getConfiguradorOferta = () => {
    let query = `select
    cantidad,
    costo_total,
    valor_untario,
    tipo,
    es_popular
    from bd_analitica.cb_configurador_oferta
    order by cantidad asc`;

    return query;
}

const updateCreditosTotal = () => {
    let query = `update bd_analitica.cb_credito_compra SET credito_total = $1, credito_utilizado = 0
    where idusuario = $2`
    return query;
}

const getTramoPrecio = () => {
    let query = `select 
    idtramo,
    desde,
    hasta,
    precio
    from bd_analitica.cb_tramo_precios order by idtramo`;

    return query;
}

const getStatus = () => {
    let query = `
    SET TIME ZONE 'America/Santiago'
    SELECT id, flow_order, commerce_order, status, subject, currency, amount, payer,
    payment_date, payment_media, payment_amount, payment_currency,   rut
       FROM bd_analitica.cb_flow_payment_order
       where rutint=$1
       order by id desc
       limit 1;`

    return query;
}

module.exports = {
    getCreditosByRut,
    insertCreditos,
    updateCreditos,
    getConfiguradorOferta,
    updateCreditosTotal,
    getTramoPrecio,
    getStatus
}