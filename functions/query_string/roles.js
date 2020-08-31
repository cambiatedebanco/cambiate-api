const getAll = () => {
    let query = `select idcargo, nombre from "bd_analitica".cla_ceo_cargo`
    return query;
}

module.exports = {
    getAll
}