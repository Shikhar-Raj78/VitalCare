// routes/claimRoutes.js
const express = require('express');
const protect = require("../middleWare/authMiddleware");
const isAdmin = require("../middleWare/isAdminMiddleware")
const upload = require("../middleWare/multer.middleware")
const router = express.Router();
const {
    fileClaim,
    getAllClaims,
    getClaimById,
    updateClaim,
    deleteClaim,
    getClaimsByUserId,
    updateClaimStatus
} = require('../controllers/claimController');

//Send a new claim in req.body
router.post('/createNewClaim', protect, upload.fields([{ name: 'prescription', maxCount: 1 }]), fileClaim);

router.get('/fetchAllClaims', protect, getAllClaims);

//Send id in params
router.get('/fetchClaimById/:id', protect, getClaimById);

//Send User Id in params
router.get('/fetchClaimByUserId/:id', protect, getClaimsByUserId);

//Send new claim inside req.body and user.id in params to update claim
router.put('/updateClaim/:id', protect, updateClaim);

//Send user.id in params
router.delete('/deleteClaim/:id', protect,deleteClaim);

// Send claim id in params and status in req.body
router.put('/updateClaimStatus/:id', protect, isAdmin, updateClaimStatus);

module.exports = router;
