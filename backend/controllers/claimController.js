// controllers/claimController.js
const Claim = require('../models/claimModel');
const uploadOnCloudinary = require('../utils/Cloudinary') 
const fs = require('fs');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

// File a claim
const fileClaim = async (req, res) => {
    try {
        const imageLocalPath = req.files?.prescription?.[0]?.path;

        // Check if prescription file was uploaded
        if (!imageLocalPath) {
            return res.status(400).json({ message: "Doctor's prescription is required" });
        }

        // Upload image to Cloudinary
        const image = await uploadOnCloudinary(imageLocalPath);

        // Remove local file after upload
        fs.unlinkSync(imageLocalPath);

        // Extract other fields from request body
        const { plan, description } = req.body;
        const user = req.user._id;

        // Create new claim
        const newClaim = new Claim({
            user,
            plan,
            description,
            doctorsPrescription: image.url // Assuming `doctorsPrescription` field in your schema
        });

        // Save new claim to database
        await newClaim.save();

        // Respond with the created claim
        res.status(201).json(newClaim);
    } catch (error) {
        console.error("Error in fileClaim:", error);
        res.status(400).json({ message: error.message });
    }
};


// Get all claims
const getAllClaims = async (req, res) => {
    try {
        const claims = await Claim.find().populate('plan');
        res.status(200).json(claims);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a claim by ID
const getClaimById = async (req, res) => {
    try {
        const claim = await Claim.findById(req.params.id).populate('plan');
        // const claim = await Claim.findById(req.user._id).populate('plan');
        if (!claim) {
            return res.status(404).json({ message: 'Claim not found' });
        }
        res.status(200).json(claim);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fetch claims by user ID
const getClaimsByUserId = async (req, res) => {
    try {
        // Convert the userId from string to ObjectId
        const userId = new ObjectId(req.params.id);

        // Find claims where the user field matches the converted ObjectId
        const claims = await Claim.find({ user: userId }).populate('plan');

        if (!claims || claims.length === 0) {
            return res.status(404).json({ message: 'No claims found for this user' });
        }

        res.status(200).json(claims);
    } catch (error) {
        console.error("Error in getClaimsByUserId:", error);
        res.status(500).json({ message: error.message });
    }
};



// Update a claim
const updateClaim = async (req, res) => {
    try {
        const claim = await Claim.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!claim) {
            return res.status(404).json({ message: 'Claim not found' });
        }
        res.status(200).json(claim);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a claim
const deleteClaim = async (req, res) => {
    try {
        const claim = await Claim.findByIdAndDelete(req.params.id);
        if (!claim) {
            return res.status(404).json({ message: 'Claim not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update claim status by admin
const updateClaimStatus = async (req, res) => {
    try {
        const { id } = req.params;  // claim ID from the request parameters
        const { status } = req.body;  // new status from the request body

        // Validate status
        if (!['Approved', 'Rejected'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        // Find the claim by ID
        const claim = await Claim.findById(id).populate('plan user');
        if (!claim) {
            return res.status(404).json({ message: 'Claim not found' });
        }

        // Check if the user is admin
        if (!req.user || req.user.status !== 'admin') {
            return res.status(403).json({ message: 'Unauthorized: Only admin can update claim status' });
        }

        // Update claim status
        claim.status = status;
        await claim.save();

        // If the claim is approved, delete it from the Claim collection
        if (status === 'Approved') {
            const user = claim.user;

            // Remove the plan from the user's appliedPlans array
            user.appliedPlans = user.appliedPlans.filter(planId => !planId.equals(claim.plan._id));
            await user.save();

            // Delete the claim from the Claim collection
            // await Claim.findByIdAndDelete(id);
        }

        res.status(200).json(claim);
    } catch (error) {
        console.error("Error in updateClaimStatus:", error);
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    deleteClaim,
    updateClaim,
    getClaimById,
    getAllClaims,
    fileClaim,
    getClaimsByUserId,
    updateClaimStatus
}