var format = require('pg-format');

const insert_payment = () => {
    let query = `INSERT INTO bd_analitica.cb_flow_payment_order(
        flow_order, commerce_order, request_date, status, subject, currency, amount, payer, merchant_id, pending_info_media, pending_info_date, payment_date, payment_media, payment_conversion_date, payment_conversion_rate, payment_amount, payment_currency, payment_fee, payment_balance, payment_transfer_date, rut, rutint, payment_taxes)
        VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23)`
    return query;
}

module.exports = {
    insert_payment
}