const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
    sourceProject: { 
        type: String, 
        required: true,
        default: 'CaspianRow'
    },
    customerName: { type: String },
    customerEmail: { type: String },
    items: [{
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        unitPrice: { type: Number, required: true },
        totalPrice: { type: Number, required: true }
    }],
    subTotal: { type: Number, required: true },
    taxAmount: { type: Number, default: 0 },
    finalTotal: { type: Number, required: true },
    paymentStatus: { 
        type: String, 
        enum: ['Pending', 'Paid', 'Failed'], 
        default: 'Pending' 
    }
}, { timestamps: true });

module.exports = mongoose.model('Bill', billSchema);