const express = require('express');
const router = express.Router();
const { diseaseSchema } = require('../utils/validations');
const { analyzeCropDisease } = require('../utils/gemini');
const { insertDiagnostic, DEFAULT_USER_ID } = require('../db');

// POST /api/analyze-disease
router.post('/analyze-disease', async (req, res) => {
  try {
    // 1. Zod Validation
    const validationResult = diseaseSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: validationResult.error.errors.map(e => e.message)
      });
    }

    const { image, cropHint, userId } = validationResult.data;
    const effectiveUserId = userId || req.headers['x-user-id'] || DEFAULT_USER_ID;

    // 2. Validate image payload size (Max 5MB / ~7MB Base64 string length)
    if (image.length > 7 * 1024 * 1024) {
      return res.status(400).json({
        success: false,
        error: 'File size too large',
        details: ['Uploaded image must be under 5MB.']
      });
    }

    console.log(`[API /analyze-disease] Processing image analysis for user: ${effectiveUserId}...`);

    // 3. Execute Gemini AI Multimodal Vision Analysis
    const aiResult = await analyzeCropDisease(image, cropHint);

    // 4. Save assessment to Supabase / PostgreSQL DB
    const savedRecord = await insertDiagnostic({
      userId: effectiveUserId,
      imageUrl: null, // base64 images stored securely or omitted in URL field
      diseaseName: aiResult.diseaseName,
      botanicalName: aiResult.botanicalName,
      confidenceScore: aiResult.confidenceScore,
      severity: aiResult.severity,
      treatmentPlan: aiResult.treatmentPlan,
      preventativeMeasures: aiResult.preventativeMeasures
    });

    return res.status(200).json({
      success: true,
      data: {
        id: savedRecord.id,
        diseaseName: aiResult.diseaseName,
        botanicalName: aiResult.botanicalName,
        confidenceScore: aiResult.confidenceScore,
        severity: aiResult.severity,
        treatmentPlan: aiResult.treatmentPlan,
        preventativeMeasures: aiResult.preventativeMeasures,
        createdAt: savedRecord.created_at
      }
    });

  } catch (err) {
    console.error('[API /analyze-disease Error]', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to complete crop disease analysis.',
      details: [err.message]
    });
  }
});

module.exports = router;
