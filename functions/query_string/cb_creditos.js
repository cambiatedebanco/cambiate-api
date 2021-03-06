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
    let query = `update bd_analitica.cb_credito_compra SET credito_utilizado = $1
    where idusuario = $2`
    return query;
}

module.exports = {
    getCreditosByRut,
    insertCreditos,
    updateCreditos
}