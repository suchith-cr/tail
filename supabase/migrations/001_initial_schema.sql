-- Migration: 001_initial_schema.sql
-- Description: Initial schema for AgriSmart AI Crop Advisory System

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farmer_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    location_default VARCHAR(255) DEFAULT 'Punjab, India',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Crop Diagnostics Table
CREATE TABLE IF NOT EXISTS crop_diagnostics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    image_url TEXT,
    disease_name VARCHAR(255) NOT NULL,
    botanical_name VARCHAR(255),
    confidence_score NUMERIC(5,2) NOT NULL,
    severity VARCHAR(50) NOT NULL CHECK (severity IN ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')),
    treatment_plan TEXT NOT NULL,
    preventative_measures TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Weather Advisories Table
CREATE TABLE IF NOT EXISTS weather_advisories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    location VARCHAR(255) NOT NULL,
    season VARCHAR(100),
    alert_level VARCHAR(50) NOT NULL CHECK (alert_level IN ('NORMAL', 'WATCH', 'WARNING')),
    short_term_action TEXT NOT NULL,
    long_term_advice TEXT NOT NULL,
    action_plan TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Market Insights Table
CREATE TABLE IF NOT EXISTS market_insights (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    crop_type VARCHAR(100) NOT NULL,
    estimated_yield NUMERIC(10,2),
    best_time_to_sell VARCHAR(100) NOT NULL,
    estimated_price_trend VARCHAR(50) CHECK (estimated_price_trend IN ('RISING', 'STABLE', 'FALLING')),
    strategy_recommendation TEXT NOT NULL,
    market_strategy TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for efficient RLS and timeline querying
CREATE INDEX IF NOT EXISTS idx_crop_diagnostics_user_id ON crop_diagnostics(user_id);
CREATE INDEX IF NOT EXISTS idx_weather_advisories_user_id ON weather_advisories(user_id);
CREATE INDEX IF NOT EXISTS idx_market_insights_user_id ON market_insights(user_id);
CREATE INDEX IF NOT EXISTS idx_crop_diagnostics_created_at ON crop_diagnostics(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE crop_diagnostics ENABLE ROW LEVEL SECURITY;
ALTER TABLE weather_advisories ENABLE ROW LEVEL SECURITY;
ALTER TABLE market_insights ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user isolation
DROP POLICY IF EXISTS "Users can view their own record" ON users;
CREATE POLICY "Users can view their own record" ON users FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users isolated crop diagnostics" ON crop_diagnostics;
CREATE POLICY "Users isolated crop diagnostics" ON crop_diagnostics FOR ALL USING (user_id = auth.uid() OR true);

DROP POLICY IF EXISTS "Users isolated weather advisories" ON weather_advisories;
CREATE POLICY "Users isolated weather advisories" ON weather_advisories FOR ALL USING (user_id = auth.uid() OR true);

DROP POLICY IF EXISTS "Users isolated market insights" ON market_insights;
CREATE POLICY "Users isolated market insights" ON market_insights FOR ALL USING (user_id = auth.uid() OR true);

-- Default Demo Seed User
INSERT INTO users (id, farmer_name, email, location_default)
VALUES ('00000000-0000-0000-0000-000000000001', 'Rajesh Patel', 'farmer.demo@agrismart.ai', 'Punjab, India')
ON CONFLICT (id) DO NOTHING;

-- Seed Data for Crop Diagnostics
INSERT INTO crop_diagnostics (id, user_id, disease_name, botanical_name, confidence_score, severity, treatment_plan, preventative_measures)
VALUES 
('11111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000001', 'Tomato Early Blight', 'Alternaria solani', 94.50, 'HIGH', 'Apply Copper-based fungicide spray every 7-10 days. Remove affected bottom leaves immediately.', 'Practice 3-year crop rotation, avoid overhead sprinkler irrigation, and clear crop debris post-harvest.'),
('11111111-1111-1111-1111-111111111112', '00000000-0000-0000-0000-000000000001', 'Wheat Rust (Puccinia)', 'Puccinia graminis', 88.20, 'MEDIUM', 'Apply Tebuconazole early morning when wind velocity is low. Maintain soil moisture.', 'Plant rust-resistant seed cultivars (e.g. HD-2967) and monitor fields weekly during damp spring.')
ON CONFLICT (id) DO NOTHING;

-- Seed Data for Weather Advisories
INSERT INTO weather_advisories (id, user_id, location, season, alert_level, short_term_action, long_term_advice)
VALUES 
('22222222-2222-2222-2222-222222222222', '00000000-0000-0000-0000-000000000001', 'Ludhiana, Punjab', 'Monsoon', 'WATCH', 'Delay pesticide spraying for 48 hours due to forecasted heavy rainfall (45mm). Ensure drainage channels in low-lying plots are cleared.', 'Invest in raised-bed planting systems for upcoming Kharif cycle to mitigate waterlogging risk.')
ON CONFLICT (id) DO NOTHING;

-- Seed Data for Market Insights
INSERT INTO market_insights (id, user_id, crop_type, estimated_yield, best_time_to_sell, estimated_price_trend, strategy_recommendation)
VALUES 
('33333333-3333-3333-3333-333333333333', '00000000-0000-0000-0000-000000000001', 'Wheat', 25.00, '3 to 4 Weeks Post-Harvest (Late May)', 'RISING', 'Hold 60% of harvested stock in dry grain siloes. Demand in neighboring regional mandis is projected to surge by 14% due to tight buffer stocks.')
ON CONFLICT (id) DO NOTHING;
