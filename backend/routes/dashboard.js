const express = require('express');
const router = express.Router();
const { getDashboardData, DEFAULT_USER_ID } = require('../db');

// GET /api/dashboard/:userId
router.get('/dashboard/:userId?', async (req, res) => {
  try {
    const userId = req.params.userId || req.headers['x-user-id'] || DEFAULT_USER_ID;
    console.log(`[API /dashboard] Fetching past assessments for user: ${userId}...`);

    const data = await getDashboardData(userId);

    return res.status(200).json({
      success: true,
      data: {
        userId,
        diagnostics: data.diagnostics || [],
        weather: data.weather || [],
        market: data.market || []
      }
    });
  } catch (err) {
    console.error('[API /dashboard Error]', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch dashboard history.',
      details: [err.message]
    });
  }
});

module.exports = router;
