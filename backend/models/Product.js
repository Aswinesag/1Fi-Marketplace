const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
    storage: {type: String, required: true},
    priceOffset: { type: Number, default: 0 },
    finishes: [{type: String}]
});

const emiPlanSchema = new mongoose.Schema({
    monthlyAmount: {type: Number, required: true},
    tenureMonths: {type: Number, required: true},
    interestRate: {type: Number, required: true},
    cashback: {type: Number, default: 0}
});

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    slug: {type: String, required: true, unique: true},
    tag: {type: String, default: "NEW"},
    mrp: {type: Number, required: true},
    price: {type: Number, required: true},
    image: {type: String, required: true},
    variants: [variantSchema],
    emiPlans: [emiPlanSchema]
}, {timestamps: true});

module.exports = mongoose.model('Product', productSchema);