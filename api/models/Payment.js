const mongoose = require('mongoose');
const {Schema} = mongoose;

const paymentSchema = new Schema({
    number: {type: String, require: true},
    trxn_id:{type: String, require: true},
    amount:{type: String, require: true},
},
{timestamps:true}
);
const PaymentModel = mongoose.model('Payment', paymentSchema);

module.exports = PaymentModel;