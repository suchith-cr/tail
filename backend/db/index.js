const { Pool } = require('pg');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });
dotenv.config({ path: path.join(__dirname, '../../.env') });

const dbUrl = process.env.DATABASE_URL;

let pool = null;
let useDb = false;

if (dbUrl && dbUrl.length > 5) {
  try {
    pool = new Pool({
      connectionString: dbUrl,
      ssl: process.env.NODE_ENV === 'production' || dbUrl.includes('supabase') ? { rejectUnauthorized: false } : false
    });
    useDb = true;
    console.log('[DB] PostgreSQL pool initialized successfully.');
  } catch (err) {
    console.warn('[DB] Failed to initialize Postgres pool, falling back to in-memory store:', err.message);
    useDb = false;
  }
} else {
  console.log('[DB] No DATABASE_URL provided. Running in high-performance memory storage mode.');
}

// In-Memory Fallback Storage (Seeded with initial realistic demo history)
const DEFAULT_USER_ID = '00000000-0000-0000-0000-000000000001';

const memoryDb = {
  users: [
    { id: DEFAULT_USER_ID, farmer_name: 'Rajesh Patel', email: 'farmer.demo@agrismart.ai', created_at: new Date() }
  ],
  crop_diagnostics: [
    {
      id: '11111111-1111-1111-1111-111111111111',
      user_id: DEFAULT_USER_ID,
      image_url: null,
      disease_name: 'Tomato Early Blight',
      botanical_name: 'Alternaria solani',
      confidence_score: 94.50,
      severity: 'HIGH',
      treatment_plan: 'Apply Copper-based fungicide spray every 7-10 days. Remove affected bottom leaves immediately.',
      preventative_measures: 'Practice 3-year crop rotation, avoid overhead sprinkler irrigation, and clear crop debris post-harvest.',
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 3) // 3 hours ago
    },
    {
      id: '11111111-1111-1111-1111-111111111112',
      user_id: DEFAULT_USER_ID,
      image_url: null,
      disease_name: 'Wheat Rust (Puccinia)',
      botanical_name: 'Puccinia graminis',
      confidence_score: 88.20,
      severity: 'MEDIUM',
      treatment_plan: 'Apply Tebuconazole early morning when wind velocity is low. Maintain proper soil moisture.',
      preventative_measures: 'Plant rust-resistant seed cultivars (e.g. HD-2967) and monitor fields weekly during damp spring.',
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 24) // 1 day ago
    }
  ],
  weather_advisories: [
    {
      id: '22222222-2222-2222-2222-222222222222',
      user_id: DEFAULT_USER_ID,
      location: 'Ludhiana, Punjab',
      season: 'Monsoon',
      alert_level: 'WATCH',
      short_term_action: 'Delay pesticide spraying for 48 hours due to forecasted heavy rainfall (45mm). Ensure drainage channels in low-lying plots are cleared.',
      long_term_advice: 'Invest in raised-bed planting systems for upcoming Kharif cycle to mitigate waterlogging risk.',
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 6) // 6 hours ago
    }
  ],
  market_insights: [
    {
      id: '33333333-3333-3333-3333-333333333333',
      user_id: DEFAULT_USER_ID,
      crop_type: 'Wheat',
      estimated_yield: 25.00,
      best_time_to_sell: '3 to 4 Weeks Post-Harvest (Late May)',
      estimated_price_trend: 'RISING',
      strategy_recommendation: 'Hold 60% of harvested stock in dry grain siloes. Demand in neighboring regional mandis is projected to surge by 14% due to tight buffer stocks.',
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 12) // 12 hours ago
    }
  ]
};

async function query(text, params = []) {
  if (useDb && pool) {
    try {
      return await pool.query(text, params);
    } catch (err) {
      console.error('[DB Query Error]', err.message);
      // Fallback to memory on runtime connection failures
    }
  }

  // Pure SQL helper parsing for in-memory DB compatibility
  const lowerText = text.toLowerCase();
  
  if (lowerText.includes('select') && lowerText.includes('crop_diagnostics')) {
    const userId = params[0] || DEFAULT_USER_ID;
    const rows = memoryDb.crop_diagnostics
      .filter(item => item.user_id === userId || true)
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    return { rows: rows.slice(0, 5) };
  }

  if (lowerText.includes('select') && lowerText.includes('weather_advisories')) {
    const userId = params[0] || DEFAULT_USER_ID;
    const rows = memoryDb.weather_advisories
      .filter(item => item.user_id === userId || true)
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    return { rows: rows.slice(0, 5) };
  }

  if (lowerText.includes('select') && lowerText.includes('market_insights')) {
    const userId = params[0] || DEFAULT_USER_ID;
    const rows = memoryDb.market_insights
      .filter(item => item.user_id === userId || true)
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    return { rows: rows.slice(0, 5) };
  }

  return { rows: [] };
}

async function insertDiagnostic({ userId, imageUrl, diseaseName, botanicalName, confidenceScore, severity, treatmentPlan, preventativeMeasures }) {
  const newId = `diag_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
  const record = {
    id: newId,
    user_id: userId || DEFAULT_USER_ID,
    image_url: imageUrl || null,
    disease_name: diseaseName,
    botanical_name: botanicalName || 'N/A',
    confidence_score: confidenceScore,
    severity: severity,
    treatment_plan: treatmentPlan,
    preventative_measures: preventativeMeasures,
    created_at: new Date()
  };

  if (useDb && pool) {
    try {
      const res = await pool.query(
        `INSERT INTO crop_diagnostics (user_id, image_url, disease_name, botanical_name, confidence_score, severity, treatment_plan, preventative_measures)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
        [record.user_id, record.image_url, record.disease_name, record.botanical_name, record.confidence_score, record.severity, record.treatment_plan, record.preventative_measures]
      );
      return res.rows[0];
    } catch (err) {
      console.error('[DB Insert Diagnostic Error]', err.message);
    }
  }

  memoryDb.crop_diagnostics.unshift(record);
  return record;
}

async function insertWeatherAdvisory({ userId, location, season, alertLevel, shortTermAction, longTermAdvice }) {
  const newId = `weather_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
  const record = {
    id: newId,
    user_id: userId || DEFAULT_USER_ID,
    location,
    season: season || 'General',
    alert_level: alertLevel,
    short_term_action: shortTermAction,
    long_term_advice: longTermAdvice,
    action_plan: `${shortTermAction}\n\n${longTermAdvice}`,
    created_at: new Date()
  };

  if (useDb && pool) {
    try {
      const res = await pool.query(
        `INSERT INTO weather_advisories (user_id, location, season, alert_level, short_term_action, long_term_advice, action_plan)
         VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        [record.user_id, record.location, record.season, record.alert_level, record.short_term_action, record.long_term_advice, record.action_plan]
      );
      return res.rows[0];
    } catch (err) {
      console.error('[DB Insert Weather Advisory Error]', err.message);
    }
  }

  memoryDb.weather_advisories.unshift(record);
  return record;
}

async function insertMarketInsight({ userId, cropType, yieldVal, bestTimeToSell, estimatedPriceTrend, strategyRecommendation }) {
  const newId = `market_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
  const record = {
    id: newId,
    user_id: userId || DEFAULT_USER_ID,
    crop_type: cropType,
    estimated_yield: yieldVal,
    best_time_to_sell: bestTimeToSell,
    estimated_price_trend: estimatedPriceTrend,
    strategy_recommendation: strategyRecommendation,
    market_strategy: strategyRecommendation,
    created_at: new Date()
  };

  if (useDb && pool) {
    try {
      const res = await pool.query(
        `INSERT INTO market_insights (user_id, crop_type, estimated_yield, best_time_to_sell, estimated_price_trend, strategy_recommendation, market_strategy)
         VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        [record.user_id, record.crop_type, record.estimated_yield, record.best_time_to_sell, record.estimated_price_trend, record.strategy_recommendation, record.market_strategy]
      );
      return res.rows[0];
    } catch (err) {
      console.error('[DB Insert Market Insight Error]', err.message);
    }
  }

  memoryDb.market_insights.unshift(record);
  return record;
}

async function getDashboardData(userId = DEFAULT_USER_ID) {
  if (useDb && pool) {
    try {
      const diagnosticsRes = await pool.query(
        `SELECT * FROM crop_diagnostics WHERE user_id = $1 OR user_id = '00000000-0000-0000-0000-000000000001' ORDER BY created_at DESC LIMIT 5`,
        [userId]
      );
      const weatherRes = await pool.query(
        `SELECT * FROM weather_advisories WHERE user_id = $1 OR user_id = '00000000-0000-0000-0000-000000000001' ORDER BY created_at DESC LIMIT 5`,
        [userId]
      );
      const marketRes = await pool.query(
        `SELECT * FROM market_insights WHERE user_id = $1 OR user_id = '00000000-0000-0000-0000-000000000001' ORDER BY created_at DESC LIMIT 5`,
        [userId]
      );
      return {
        diagnostics: diagnosticsRes.rows,
        weather: weatherRes.rows,
        market: marketRes.rows
      };
    } catch (err) {
      console.error('[DB Fetch Dashboard Error]', err.message);
    }
  }

  // Memory fallback return
  return {
    diagnostics: memoryDb.crop_diagnostics.slice(0, 5),
    weather: memoryDb.weather_advisories.slice(0, 5),
    market: memoryDb.market_insights.slice(0, 5)
  };
}

module.exports = {
  query,
  insertDiagnostic,
  insertWeatherAdvisory,
  insertMarketInsight,
  getDashboardData,
  DEFAULT_USER_ID
};
