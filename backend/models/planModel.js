// models/planModel.js
const mongoose = require('mongoose');

const planSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    coverage: [String],
    cost: {
        premium: { type: Number, required: true },
        deductible: { type: Number, required: true },
        coPayment: { type: Number, required: true },
        outOfPocketMax: { type: Number, required: true }
    },
    targetAudience: { type: String, required: true },
}, { timestamps: true });


const Plan = mongoose.model('Plan', planSchema);
module.exports = Plan;
