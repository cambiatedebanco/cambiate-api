const conn = require('../conn')
const queries_cb_flow = require('../query_string/cb_flow')

const insert_payment = (request, response) => {
    let body = request;
    console.log('body ==> ', body);

    values = [
        body.flowOrder, body.commerceOrder, body.requestDate, body.status, body.subject, body.currency, body.amount, body.payer, body.merchantId, body.pending_info.media,
        body.pending_info.date, body.paymentData.date, body.paymentData.media, body.paymentData.conversionDate, body.paymentData.conversionRate, body.paymentData.amount, body.paymentData.currency,
        body.paymentData.fee, body.paymentData.balance, body.paymentData.transferDate, body.optional, body.optional, body.paymentData.taxes
    ]
    return conn.executeQuery(queries_cb_flow.insert_payment(), values).then(result => {
            return response.status(200).send(result.rows)
        })
        .catch(error => {
            console.error(error);
            return response.status(500).send('Algo salio mal')
        })
}

module.exports = { insert_payment }