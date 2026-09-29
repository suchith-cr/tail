const express = require('express');
const router = express.Router();
const { weatherSchema } = require('../utils/validations');
const { generateWeatherAdvisory } = require('../utils/gemini');
const { insertWeatherAdvisory, DEFAULT_USER_ID } = require('../db');

// POST /api/weather-advisory
router.post('/weather-advisory', async (req, res) => {
  try {
    // 1. Zod Validation
    const validationResult = weatherSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: validationResult.error.errors.map(e => e.message)
      });
    }

    const { location, season, userId } = validationResult.data;
    const effectiveUserId = userId || req.headers['x-user-id'] || DEFAULT_USER_ID;

    console.log(`[API /weather-advisory] Generating climate advisory for location: ${location}, season: ${season}...`);

    // 2. Gemini AI Advisory Generation
    const aiResult = await generateWeatherAdvisory(location, season);

    // 3. Save to Supabase / PostgreSQL DB
    const savedRecord = await insertWeatherAdvisory({
      userId: effectiveUserId,
      location,
      season,
      alertLevel: aiResult.alertLevel,
      shortTermAction: aiResult.shortTermAction,
      longTermAdvice: aiResult.longTermAdvice
    });

    return res.status(200).json({
      success: true,
      data: {
        id: savedRecord.id,
        location: savedRecord.location,
        season: savedRecord.season,
        alertLevel: aiResult.alertLevel,
        shortTermAction: aiResult.shortTermAction,
        longTermAdvice: aiResult.longTermAdvice,
        createdAt: savedRecord.created_at
      }
    });

  } catch (err) {
    console.error('[API /weather-advisory Error]', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to generate weather advisory.',
      details: [err.message]
    });
  }
});

module.exports = router;
