const express = require('express');
const router = express.Router();
const { marketSchema } = require('../utils/validations');
const { generateMarketInsights } = require('../utils/gemini');
const { insertMarketInsight, DEFAULT_USER_ID } = require('../db');

// POST /api/market-timing
router.post('/market-timing', async (req, res) => {
  try {
    // 1. Zod Validation
    const validationResult = marketSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: validationResult.error.errors.map(e => e.message)
      });
    }

    const { cropType, yield: yieldVal, userId } = validationResult.data;
    const effectiveUserId = userId || req.headers['x-user-id'] || DEFAULT_USER_ID;

    console.log(`[API /market-timing] Generating market insights for crop: ${cropType}, yield: ${yieldVal} tons...`);

    // 2. Gemini AI Market Analytics
    const aiResult = await generateMarketInsights(cropType, yieldVal);

    // 3. Save to Supabase / PostgreSQL DB
    const savedRecord = await insertMarketInsight({
      userId: effectiveUserId,
      cropType,
      yieldVal,
      bestTimeToSell: aiResult.bestTimeToSell,
      estimatedPriceTrend: aiResult.estimatedPriceTrend,
      strategyRecommendation: aiResult.strategyRecommendation
    });

    return res.status(200).json({
      success: true,
      data: {
        id: savedRecord.id,
        cropType: savedRecord.crop_type,
        yield: savedRecord.estimated_yield,
        bestTimeToSell: aiResult.bestTimeToSell,
        estimatedPriceTrend: aiResult.estimatedPriceTrend,
        strategyRecommendation: aiResult.strategyRecommendation,
        createdAt: savedRecord.created_at
      }
    });

  } catch (err) {
    console.error('[API /market-timing Error]', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to generate market insights.',
      details: [err.message]
    });
  }
});

module.exports = router;
