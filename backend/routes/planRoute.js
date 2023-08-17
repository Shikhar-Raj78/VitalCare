// routes/planRoutes.js
const express = require('express');
const protect = require("../middleWare/authMiddleware");
const isAdmin = require("../middleWare/isAdminMiddleware")
const router = express.Router();
const {
    createPlan,
    getAllPlans,
    getPlanById,
    updatePlan,
    deletePlan
} = require("../controllers/planController")

//Send new plan in req.body
router.post('/createPlan', protect, isAdmin, createPlan);
router.get('/getAllPlans', getAllPlans);
//Get plan by plan ID
router.get('/getPlanById/:id', protect, getPlanById);
//Send plan Id in req.params and new plan in req.body
router.put('/updatePlan/:id', protect, isAdmin, updatePlan);
//Send plan Id in req.params
router.delete('/deletePlan/:id', protect, isAdmin, deletePlan);

module.exports = router;
