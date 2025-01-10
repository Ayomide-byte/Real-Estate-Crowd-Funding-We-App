const express = require('express');
const verifyToken = require('../config/authMiddleware'); // Middleware to authenticate JWT

const router = express.Router();

// In-memory database to store investments (mock database)
let investments = [];

// GET: Fetch all investments for the authenticated user
router.get('/', verifyToken, (req, res) => {
  const userId = req.user.id; // Get the user's ID from the JWT payload

  // Filter investments belonging to this user
  const userInvestments = investments.filter((investment) => investment.investorId === userId);

  res.status(200).json({
    success: true,
    message: 'User investments fetched successfully',
    data: userInvestments,
  });
});

// POST: Add a new investment for the authenticated user
router.post('/', verifyToken, (req, res) => {
  const { project, amount } = req.body;

  // Validate input
  if (!project || !amount || isNaN(amount) || amount <= 0) {
    return res.status(400).json({
      success: false,
      message: 'Invalid input: Project and a positive amount are required',
    });
  }

  // Create a new investment object
  const newInvestment = {
    Id: investments.length + 1, // Mock unique ID
    investorId: req.user.id, // Link to the authenticated user
    project,
    amount: parseFloat(amount), // Ensure amount is stored as a number
    createdAt: new Date(), // Timestamp for when the investment is created
  };

  Investments.push(newInvestment); // Add the investment to the mock database

  res.status(201).json({
    success: true,
    message: 'Investment added successfully',
    data: newInvestment,
  });
});

// GET: Fetch details of a specific investment
router.get('/:id', verifyToken, (req, res) => {
  const investmentId = parseInt(req.params.id, 10); // Convert the ID from the URL to an integer
  const userId = req.user.id;

  // Find the investment that matches the ID and belongs to the user
  const investment = investments.find(
    (item) => item.id === investmentId && item.investorId === userId
  );

  if (!investment) {
    return res.status(404).json({
      success: false,
      message: 'Investment not found or you do not have access to it',
    });
  }

  res.status(200).json({
    success: true,
    message: 'Investment details fetched successfully',
    data: investment,
  });
});

// DEletE: Remove a specific investment
router.delete('/:id', verifyToken, (req, res) => {
  const investmentId = parseInt(req.params.id, 10); // Convert the ID from the URL to an integer
  const userId = req.user.id;

  // Find the index of the investment that matches the ID and belongs to the user
  const investmentIndex = investments.findIndex(
    (item) => item.id === investmentId && item.investorId === userId
  );

  if (investmentIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Investment not found or you do not have access to delete it',
    });
  }

  // Remove the investment from the mock database
  investments.splice(investmentIndex, 1);

  res.status(200).json({
    success: true,
    message: 'Investment deleted successfully',
  });
});

module.exports = router;

