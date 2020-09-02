const conn = require('../conn')
const queries_leads = require('../query_string/cla_ceo_leads')

const getLeadByBanco = (request, response) => {
    let q = request.query.idbanco;
    conn.executeQuery(queries_leads.getLeadByBanco(), [q]).
    then(result => {
        return response.status(200).json(result.rows)
    }).catch(error => {
        return response.status(500).json(error)
    })
}

const updateAsignLeads = (request, response) => {
    let values = request.body;

    conn.executeQuery(queries_leads.updateAsignLeads(), [values.rut, values.email, values.id]).then(result => {
            return response.status(200).send(result.rows)
        })
        .catch(error => {
            console.error(error);
            return response.status(500).send('Algo salio mal')
        })
}

module.exports = { getLeadByBanco, updateAsignLeads }