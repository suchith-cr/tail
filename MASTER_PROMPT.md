# MASTER PROMPT: AI-POWERED AGRICULTURE CROP ADVISORY ASSISTANT (AGRISMART AI)

> **Instructions for the AI Coding Agent**: You are to execute the implementation of the full-stack web application specified below. Follow every requirement, architectural specification, database DDL, API route contract, Zod schema, Gemini SDK configuration, and frontend component design precisely. Do NOT truncate code, leave `// TODO` placeholders, skip error handling, or mock core features with static placeholders unless explicitly instructed. Build a complete, production-grade application ready for deployment.

---

## 1. HEADER & SYSTEM PERSONA ROLE

You are a **Principal AI Systems Architect**, **Senior Full-Stack Engineer**, and **Lead Prompt Engineer** with deep expertise in AgriTech, Computer Vision, Predictive Market Analytics, and Rural UX Accessibility.

Your goal is to build **AgriSmart AI** — an enterprise-ready, AI-powered agricultural advisory application designed to empower smallholder and commercial farmers by resolving three critical challenges:
1. **Crop Disease Identification & Remediations**: Rapid image-based diagnosis using multimodal generative AI with organic and chemical treatment roadmaps.
2. **Weather Risk Mitigation**: Hyperlocal microclimate insights and actionable agricultural alerts (irrigation, frost, flood, heatwave protection).
3. **Market Price Intelligence & Sell Strategy**: Predictive price trend analysis and market location matching to determine the optimal harvest window and selling location for maximum profit.

You write clean, modular, highly maintainable, performant, and secure code adhering to industry best practices.

---

## 2. CORE MISSION DIRECTIVE

- **Zero Placeholders**: Every file created must contain complete, functional code. Do not output snippet stubs like `// add other routes here` or `/* CSS goes here */`.
- **End-to-End Type Safety**: Enforce Zod validation on both the client (form inputs) and server (API requests and Gemini response parsing).
- **Resilient AI Architecture**: Server-side execution of all `@google/genai` calls with structured JSON output enforcement (`responseSchema`), safety handling, gracefully managed API retries, and comprehensive fallback responses.
- **Production SQL Database**: Complete PostgreSQL schema with primary keys, foreign keys, indexes, timestamps, enums, and Row Level Security (RLS) policies.
- **Rural UX Excellence**: Clean responsive UI using Tailwind CSS, high contrast visual cues, color-coded severity badges, interactive chart visualizations, and integrated browser-native Web Speech API for voice narration.

---

## 3. PRODUCT GOAL

To build **AgriSmart AI** — a unified digital crop advisor platform accessible via web and mobile web browsers.

### Key Value Propositions
- **Save Crops**: Early disease detection prevents crop loss through visual AI analysis within seconds.
- **Save Resources**: Dynamic weather-driven irrigation schedules reduce water and labor waste.
- **Maximize Revenue**: AI-driven market intelligence enables farmers to sell at peak prices in the highest-yielding mandis (markets).
- **Accessibility**: Multi-language support (English, Hindi, Spanish, Swahili) with voice read-aloud functionality to ensure accessibility across literacy levels.

---

## 4. MANDATORY FEATURES

### Feature 1: Multimodal Crop Disease Scanner & Diagnostic Center
- **Image Capture & Dropzone**: Drag-and-drop file upload or live camera access (supports `.jpeg`, `.jpg`, `.png`, `.webp`, up to 10MB).
- **Gemini Multimodal Vision Scanner**: Analyzes uploaded crop leaf/plant images using `gemini-2.5-flash` vision capabilities.
- **Diagnostic Output Card**:
  - **Disease/Pest Identification**: Common name & botanical/scientific name (or "Healthy Crop" confirmation).
  - **Confidence & Severity Score**: Visual percentage meter and status badge (Low, Moderate, High, Severe).
  - **Symptom Analysis**: Bulleted breakdown of observed visual anomalies.
  - **Dual Remediation Plan**:
    - *Organic / Eco-Friendly Treatments*: Low-cost natural sprays, composting adjustments, biological controls.
    - *Chemical / Conventional Treatments*: Specific active ingredients, dosage recommendations, and safety precautions.
  - **Preventive Measures**: Long-term field practices to avoid recurrence.

### Feature 2: Microclimate Weather Risk & Smart Irrigation Advisor
- **Location Selector**: Geo-location browser autodetect, interactive search, or manual farm coordinate selection.
- **Agri-Weather Dashboard**: Current temperature, humidity, wind speed, precipitation probability, solar radiation, and 7-day forecast.
- **Smart Farming Alerts**: Automatically flags high-risk events (e.g., unexpected frost, heatwave stress, torrential rain leading to root rot).
- **Irrigation Calculator**: Recommends daily watering needs (Liters per Acre / millimeter equivalent) based on crop growth stage, soil type, and upcoming rainfall.

### Feature 3: Market Price Intelligence & Harvest/Sale Optimizer
- **Crop Price Tracker**: Visual historical and predicted price chart (7-day past trend + 14-day AI forecast).
- **Optimal Sale Timing Calculator**: Recommends whether to "Hold Harvest", "Sell Immediately", or "Harvest within 5-7 Days" for maximum ROI.
- **Mandi / Market Comparison Engine**: Compares prices across 3+ nearby regional markets factoring in distance, estimated transport cost per quintal/ton, and net profit margin.

### Feature 4: Farm & Historical Advisory Management Dashboard
- **Farm Profile Creator**: Record farm location, total acreage, primary crops, soil type (Clay, Loam, Sandy, Black, Silt), and irrigation source.
- **Advisory History Log**: View past disease diagnoses, saved market recommendations, and weather logs.
- **Exportable PDF Report**: Generate downloadable advisory summary reports for offline access or sharing with local extension officers.

### Feature 5: Multilingual Voice & Rural UX Features
- **Language Switcher**: Instant localization (English, Hindi, Spanish, Swahili, Telugu).
- **Text-to-Speech (TTS) Narration**: Click-to-listen button on every advisory card utilizing Web Speech API (`window.speechSynthesis`).

---

## 5. TECHNOLOGY REQUIREMENTS

- **Frontend**: React.js (v18+ with Vite), Tailwind CSS (v3+), Lucide React Icons, Recharts (for price/weather data visualization), Framer Motion (micro-animations).
- **Backend**: Node.js (v20+) with Express.js REST API framework.
- **Database**: PostgreSQL (Replit Postgres / standard PostgreSQL) utilizing `pg` connection pool with raw SQL or Drizzle ORM.
- **AI SDK**: `@google/genai` (Official Google Gen AI SDK for Node.js).
  - Primary Model: `gemini-2.5-flash` (Structured vision & fast JSON generation).
  - Secondary Model: `gemini-2.5-pro` (Complex market trend reasoning).
- **Validation**: Zod (v3+) for runtime schema validation on client and server.
- **File Uploads**: `multer` memory storage for server-side image processing.
- **Security & Utility**: `helmet`, `cors`, `express-rate-limit`, `dotenv`.

---

## 6. APPLICATION PAGES (ROUTES)

| Route Path | Page Title | Primary Purpose & Key Components |
| :--- | :--- | :--- |
| `/` | Landing Page | Feature showcase, hero section, quick stats, quick access buttons. |
| `/dashboard` | Farmer Dashboard | Farm overview metrics, active weather warnings, recent scans, market price quick snapshot. |
| `/disease-diagnosis` | Disease Scanner | Drag-and-drop camera upload, live scan progress indicator, diagnostic output card, TTS player. |
| `/weather-alerts` | Weather & Irrigation | Microclimate weather widget, risk alert badges, 7-day forecast, interactive irrigation calculator. |
| `/market-insights` | Market Intelligence | Crop selector, Recharts trend graph, optimal sell recommendation banner, mandi comparison table. |
| `/my-farms` | Farm Management | Farm creation modal, list of registered plots, crop history logs, saved advisories. |
| `/settings` | Settings & Profile | Language preferences, voice speed toggles, unit system selection (Metric/Imperial). |

---

## 7. USER FLOW

```
[ Farmer Opens App ]
       │
       ├─► Select Language (English / Hindi / Spanish / Swahili)
       │
       ├─► Navigate to /disease-diagnosis
       │     ├─ Upload/Take photo of affected plant leaf
       │     ├─ AI analyzes image with Gemini 2.5 Flash Vision
       │     └─ View Diagnosis: Disease name, severity %, organic/chemical remedies, listen to Audio
       │
       ├─► Navigate to /weather-alerts
       │     ├─ Set Farm Location / Use GPS
       │     ├─ AI evaluates microclimate risks (e.g., High Frost Risk in 48h)
       │     └─ View Irrigation Recommendation (e.g., Skip watering today due to 80% rain forecast)
       │
       ├─► Navigate to /market-insights
       │     ├─ Select Crop & Target Quantity
       │     ├─ AI generates 14-day price prediction chart
       │     └─ Receive Actionable Strategy: "Hold harvest for 4 days — Price expected to rise +12% at Apex Mandi"
       │
       └─► Save Advisory to /my-farms profile or Export PDF
```

---

## 8. TARGET DOMAINS & CATEGORIZATION

### Crop Categories
- **Cereals & Grains**: Wheat, Rice/Paddy, Maize/Corn, Barley, Sorghum, Millet.
- **Vegetables**: Tomato, Potato, Onion, Chili, Eggplant/Brinjal, Cabbage, Cucumber.
- **Fruits**: Apple, Banana, Mango, Citrus/Orange, Grape, Papaya.
- **Legumes & Pulses**: Chickpea, Soybean, Lentil, Groundnut/Peanut.
- **Cash Crops**: Cotton, Sugarcane, Coffee, Tea, Rubber.

### Disease Categories
- Fungal Infection, Bacterial Blight, Viral Wilt, Pest / Insect Damage, Nutrient Deficiency (Nitrogen, Potassium, Iron), Environmental Stress (Sunscald, Frost Damage), Healthy Crop.

### Weather Risk Categories
- Drought Risk, Torrential Rain / Flood Risk, Frost / Freeze Warning, Heatwave Stress, High Wind Hazard, Optimal Conditions.

### Market Categories & Selling Options
- Wholesale Grain Mandi, Direct Retail Market, Agricultural Cooperative, Processing Plant B2B, Regional Farmers Market.

---

## 9. FORM & ADVISORY CONFIGURATION

### Form 1: Crop Disease Scanning Form
- **Image File**: `file` (Required, image/jpeg, image/png, image/webp, max 10MB).
- **Crop Type**: `string` (Optional - auto-detect if blank, or manually selected).
- **Observed Plant Part**: `enum` (`LEAF`, `STEM`, `FRUIT`, `ROOT`, `WHOLE_PLANT`).
- **Notes / Additional Symptoms**: `string` (Optional context, e.g., "Leaves yellowing for 3 days").

### Form 2: Weather & Irrigation Query Form
- **Latitude / Longitude**: `number` (Required coordinates).
- **Farm Id**: `uuid` (Required if registered).
- **Soil Type**: `enum` (`CLAY`, `LOAM`, `SANDY`, `BLACK`, `SILT`).
- **Crop Growth Stage**: `enum` (`SEEDLING`, `VEGETATIVE`, `FLOWERING`, `FRUITING`, `HARVEST_READY`).

### Form 3: Market Intelligence & Sell Strategy Form
- **Crop Name**: `string` (Required).
- **Yield Quantity**: `number` (Required, in Quintals / Tons / Kg).
- **Current Location / Region**: `string` (Required).
- **Max Transport Radius**: `number` (Default: 50 km).

### Form 4: Farm Profile Registration Form
- **Farm Name**: `string` (Required).
- **Location Name**: `string` (Required).
- **Total Area (Acres)**: `number` (Required).
- **Primary Crops**: `array of strings` (Required).
- **Soil Type**: `enum` (Required).
- **Water Source**: `enum` (`BOREWELL`, `CANAL`, `RAIN FED`, `DRIP_IRRIGATION`).

---

## 10. DATABASE SCHEMA (PRODUCTION SQL FOR POSTGRESQL)

Execute this complete PostgreSQL DDL script to instantiate the database structure:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Define Enums
CREATE TYPE user_role AS ENUM ('FARMER', 'EXTENSION_WORKER', 'ADMIN');
CREATE TYPE soil_type_enum AS ENUM ('CLAY', 'LOAM', 'SANDY', 'BLACK', 'SILT');
CREATE TYPE growth_stage_enum AS ENUM ('SEEDLING', 'VEGETATIVE', 'FLOWERING', 'FRUITING', 'HARVEST_READY');
CREATE TYPE severity_level_enum AS ENUM ('HEALTHY', 'LOW', 'MODERATE', 'HIGH', 'SEVERE');
CREATE TYPE sell_action_enum AS ENUM ('SELL_NOW', 'HOLD_HARVEST', 'GRADUAL_SELL', 'URGENT_CLEARANCE');

-- Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(20),
    preferred_language VARCHAR(10) DEFAULT 'en',
    role user_role DEFAULT 'FARMER',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Farms Table
CREATE TABLE farms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    farm_name VARCHAR(100) NOT NULL,
    location_name VARCHAR(150) NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    area_acres DECIMAL(8, 2) NOT NULL,
    soil_type soil_type_enum NOT NULL DEFAULT 'LOAM',
    primary_crops TEXT[] NOT NULL,
    water_source VARCHAR(50) DEFAULT 'BOREWELL',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Disease Diagnoses Table
CREATE TABLE disease_diagnoses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farm_id UUID REFERENCES farms(id) ON DELETE SET NULL,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    detected_disease VARCHAR(150) NOT NULL,
    scientific_name VARCHAR(150),
    confidence_score DECIMAL(5, 2) NOT NULL,
    severity_level severity_level_enum NOT NULL,
    symptoms JSONB NOT NULL DEFAULT '[]'::jsonb,
    organic_remedies JSONB NOT NULL DEFAULT '[]'::jsonb,
    chemical_remedies JSONB NOT NULL DEFAULT '[]'::jsonb,
    preventive_measures JSONB NOT NULL DEFAULT '[]'::jsonb,
    raw_ai_response JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Weather Alerts & Advisories Table
CREATE TABLE weather_alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farm_id UUID REFERENCES farms(id) ON DELETE CASCADE,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    temperature_c DECIMAL(4, 1) NOT NULL,
    humidity_percent INT NOT NULL,
    precipitation_mm DECIMAL(5, 2) NOT NULL,
    risk_level VARCHAR(50) NOT NULL,
    risk_title VARCHAR(150) NOT NULL,
    risk_description TEXT NOT NULL,
    irrigation_recommendation TEXT NOT NULL,
    action_items JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Market Price Historical & Predictions Table
CREATE TABLE market_prices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    crop_name VARCHAR(100) NOT NULL,
    market_name VARCHAR(150) NOT NULL,
    region VARCHAR(100) NOT NULL,
    current_price_per_quintal DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'INR',
    price_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Sale & Market Recommendations Table
CREATE TABLE sale_recommendations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    crop_name VARCHAR(100) NOT NULL,
    quantity_quintals DECIMAL(8, 2) NOT NULL,
    recommended_action sell_action_enum NOT NULL,
    predicted_optimal_price DECIMAL(10, 2) NOT NULL,
    optimal_sell_date DATE NOT NULL,
    expected_profit_gain_percent DECIMAL(5, 2),
    recommended_markets JSONB NOT NULL DEFAULT '[]'::jsonb,
    strategy_reasoning TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Advisory History Log Table
CREATE TABLE advisory_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    advisory_type VARCHAR(50) NOT NULL, -- 'DISEASE', 'WEATHER', 'MARKET'
    summary TEXT NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Indexes for High Performance
CREATE INDEX idx_farms_user_id ON farms(user_id);
CREATE INDEX idx_disease_diagnoses_user_id ON disease_diagnoses(user_id);
CREATE INDEX idx_disease_diagnoses_farm_id ON disease_diagnoses(farm_id);
CREATE INDEX idx_weather_alerts_farm_id ON weather_alerts(farm_id);
CREATE INDEX idx_market_prices_crop_region ON market_prices(crop_name, region);
CREATE INDEX idx_sale_recommendations_user_id ON sale_recommendations(user_id);

-- Automatic Updated_At Trigger Function
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_timestamp();
CREATE TRIGGER trg_farms_updated_at BEFORE UPDATE ON farms FOR EACH ROW EXECUTE FUNCTION update_timestamp();
```

---

## 11. ROW LEVEL SECURITY (RLS) / DATA ISOLATION RULES

Enforce PostgreSQL Row Level Security to ensure strict multi-tenant isolation so farmers can only query and mutate their own data:

```sql
-- Enable RLS on user-specific tables
ALTER TABLE farms ENABLE ROW LEVEL SECURITY;
ALTER TABLE disease_diagnoses ENABLE ROW LEVEL SECURITY;
ALTER TABLE weather_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE sale_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE advisory_logs ENABLE ROW LEVEL SECURITY;

-- Security Policy Helper Concept (assuming session setting or JWT app_user_id)
-- Farms RLS
CREATE POLICY farms_user_isolation ON farms
    FOR ALL
    USING (user_id = NULLIF(current_setting('app.current_user_id', true), '')::UUID);

-- Disease Diagnoses RLS
CREATE POLICY disease_diagnoses_user_isolation ON disease_diagnoses
    FOR ALL
    USING (user_id = NULLIF(current_setting('app.current_user_id', true), '')::UUID);

-- Weather Alerts RLS
CREATE POLICY weather_alerts_user_isolation ON weather_alerts
    FOR ALL
    USING (farm_id IN (SELECT id FROM farms WHERE user_id = NULLIF(current_setting('app.current_user_id', true), '')::UUID));

-- Sale Recommendations RLS
CREATE POLICY sale_recommendations_user_isolation ON sale_recommendations
    FOR ALL
    USING (user_id = NULLIF(current_setting('app.current_user_id', true), '')::UUID);

-- Advisory Logs RLS
CREATE POLICY advisory_logs_user_isolation ON advisory_logs
    FOR ALL
    USING (user_id = NULLIF(current_setting('app.current_user_id', true), '')::UUID);
```

---

## 12. BACKEND API ROUTES

All endpoints are prefixed with `/api` and return standard JSON formats: `{ success: boolean, data?: any, error?: string }`.

| Method | Endpoint Path | Description | Request Body Payload | Status Codes |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/demo-user` | Initialize or fetch demo user context | `{ email?: string }` | 200, 500 |
| `GET` | `/api/farms` | List all farms for authenticated user | Header: `x-user-id` | 200, 401, 500 |
| `POST` | `/api/farms` | Create a new farm plot | `FarmInputSchema` (Zod) | 201, 400, 500 |
| `POST` | `/api/diagnosis/scan` | Upload crop image & analyze via Gemini Vision | `multipart/form-data` (`image`, `cropType`, `notes`) | 200, 400, 500 |
| `GET` | `/api/diagnosis/history` | Get past disease scan logs | Query: `limit`, `farmId` | 200, 500 |
| `GET` | `/api/weather/advisory` | Fetch live weather & compute risk advisory | Query: `lat`, `lon`, `cropType`, `soilType` | 200, 400, 500 |
| `GET` | `/api/market/prices` | Fetch crop price trends & nearby mandis | Query: `cropName`, `region` | 200, 400, 500 |
| `POST` | `/api/market/recommendation`| Compute AI sell timing & market profit analysis | `MarketQuerySchema` (Zod) | 200, 400, 500 |
| `GET` | `/api/advisory/summary/:id` | Fetch composite farm advisory summary | Params: `id` | 200, 404, 500 |

---

## 13. GEMINI SDK SETUP & SERVER-SIDE SECURITY

Implement server-side initialization using `@google/genai` (Google Gen AI SDK).

### Crucial Implementation Guidelines
1. **Import Syntax**: Use `import { GoogleGenAI } from '@google/genai';`
2. **Instance Creation**: Instantiate `const ai = new GoogleGenAI({});` (it automatically pulls `process.env.GEMINI_API_KEY`).
3. **Model Names**: Always use `gemini-2.5-flash` or `gemini-2.5-pro`.
4. **Structured JSON Output**: Always provide `config: { responseMimeType: "application/json", responseSchema: ... }` to guarantee strictly typed JSON parsing without fragile regular expressions.
5. **Image Processing**: Convert Multer file memory buffers into base64 inline objects:
   ```javascript
   const inlineData = {
     inlineData: {
       data: req.file.buffer.toString("base64"),
       mimeType: req.file.mimetype
     }
   };
   ```

### Server Utilities File (`server/services/geminiService.js`):
```javascript
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.GEMINI_API_KEY) {
  console.warn('WARNING: GEMINI_API_KEY environment variable is missing.');
}

export const ai = new GoogleGenAI({});
```

---

## 14. AI SYSTEM PROMPT

Pass this Master System Instruction to Gemini calls across all advisory modules:

```text
You are "AgriSmart Master AI" — an elite Agronomist, Plant Pathologist, Microclimate Specialist, and Agricultural Economist.

YOUR OPERATIONAL PRINCIPLES:
1. ACCURACY & PRACTICALITY: Provide clear, scientifically sound, actionable agricultural guidance suitable for smallholder and commercial farmers.
2. DUAL REMEDIATIONS: Always provide BOTH organic/natural remedies (low-cost, sustainable) AND conventional chemical treatments (with exact precautions and active ingredients).
3. SAFETY FIRST: Highlight severe pathogen risks and environmental safety warnings (e.g., proper PPE when applying pesticides, chemical withdrawal periods before harvest).
4. LOCALIZED CLIMATE SENSITIVITY: Tailor irrigation and field intervention advice to soil type, upcoming rainfall, and extreme weather risks.
5. ECONOMIC OPTIMIZATION: When analyzing market options, calculate realistic net margins considering transport overheads and price trends.
6. COMPASSIONATE & RURAL ACCESSIBLE TONE: Use encouraging, clear, simple language free from unnecessary academic jargon.

OUTPUT RULE: You MUST return strictly valid JSON matching the exact provided schema. Never include markdown wrap blocks like ```json in the output if JSON response mode is active.
```

---

## 15. DETAILED AI PROMPTS & JSON SCHEMAS

### Prompt 1: Crop Disease Scanner (Multimodal Vision)
- **Model**: `gemini-2.5-flash`
- **User Prompt**:
  ```text
  Analyze this crop image. Identify if any crop disease, pest infestation, nutrient deficiency, or environmental damage is present.
  If the plant is healthy, indicate "Healthy Crop".
  Additional Context from Farmer: Crop Name = "${cropType || 'Auto-Detect'}", Symptoms = "${notes || 'None provided'}".
  ```
- **Gemini Response Schema Specification**:
  ```javascript
  export const diseaseResponseSchema = {
    type: Type.OBJECT,
    properties: {
      diseaseName: { type: Type.STRING, description: "Name of the identified disease or 'Healthy Crop'" },
      scientificName: { type: Type.STRING, description: "Scientific name of pathogen or plant" },
      confidenceScore: { type: Type.NUMBER, description: "Confidence percentage 0 to 100" },
      severityLevel: { type: Type.STRING, enum: ["HEALTHY", "LOW", "MODERATE", "HIGH", "SEVERE"] },
      symptoms: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "List of visual symptoms observed"
      },
      organicRemedies: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "Organic, eco-friendly treatment steps"
      },
      chemicalRemedies: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "Chemical remedies with active ingredients and safety warnings"
      },
      preventiveMeasures: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "Long term field management tips to prevent re-infection"
      },
      summaryAudioscript: { type: Type.STRING, description: "Simple 3-sentence read-aloud summary for voice narration" }
    },
    required: ["diseaseName", "confidenceScore", "severityLevel", "symptoms", "organicRemedies", "chemicalRemedies", "preventiveMeasures", "summaryAudioscript"]
  };
  ```

### Prompt 2: Microclimate Weather Risk & Smart Irrigation Advisor
- **Model**: `gemini-2.5-flash`
- **User Prompt**:
  ```text
  Evaluate agricultural risk and water management requirements based on the following meteorological and field conditions:
  - Temperature: ${temp}°C
  - Humidity: ${humidity}%
  - 48-Hour Rain Forecast: ${rain48h} mm
  - Soil Type: ${soilType}
  - Crop Growth Stage: ${growthStage}
  - Crop Type: ${cropType}

  Generate an actionable risk assessment and a precise daily irrigation schedule.
  ```
- **Gemini Response Schema Specification**:
  ```javascript
  export const weatherAdvisorySchema = {
    type: Type.OBJECT,
    properties: {
      riskLevel: { type: Type.STRING, enum: ["LOW", "MODERATE", "HIGH", "CRITICAL"] },
      riskTitle: { type: Type.STRING, description: "Short title of primary weather hazard (e.g. High Frost Risk, Root Rot Warning)" },
      riskDescription: { type: Type.STRING, description: "Detailed explanation of potential crop impact" },
      irrigationAction: { type: Type.STRING, enum: ["SKIP_IRRIGATION", "REDUCE_WATERING", "NORMAL_IRRIGATION", "INCREASE_WATERING", "EMERGENCY_DRAINAGE"] },
      recommendedWaterLitersPerAcre: { type: Type.NUMBER, description: "Estimated recommended water amount" },
      irrigationAdvice: { type: Type.STRING, description: "Actionable watering guidelines" },
      actionItems: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "Step-by-step protective field measures for the farmer"
      }
    },
    required: ["riskLevel", "riskTitle", "riskDescription", "irrigationAction", "recommendedWaterLitersPerAcre", "irrigationAdvice", "actionItems"]
  };
  ```

### Prompt 3: Market Intelligence & Optimal Harvest Strategy
- **Model**: `gemini-2.5-pro`
- **User Prompt**:
  ```text
  Analyze market prices, transport economics, and supply trends for crop: "${cropName}".
  - Quantity Available: ${quantity} Quintals
  - Current Regional Average Price: ${currentPrice} INR/Quintal
  - Farmer Location: ${location}

  Provide price forecast for next 14 days, optimal sell timing recommendation, and market comparison breakdown.
  ```
- **Gemini Response Schema Specification**:
  ```javascript
  export const marketStrategySchema = {
    type: Type.OBJECT,
    properties: {
      recommendedAction: { type: Type.STRING, enum: ["SELL_NOW", "HOLD_HARVEST", "GRADUAL_SELL", "URGENT_CLEARANCE"] },
      optimalSellWindow: { type: Type.STRING, description: "Best date window to sell (e.g. Within 3-5 days)" },
      predictedPeakPrice: { type: Type.NUMBER, description: "Predicted highest price per quintal" },
      expectedProfitGainPercent: { type: Type.NUMBER, description: "Estimated % increase in profit by following advice" },
      strategyReasoning: { type: Type.STRING, description: "Market logic behind the recommendation" },
      priceForecast14Days: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            day: { type: Type.STRING },
            predictedPrice: { type: Type.NUMBER }
          },
          required: ["day", "predictedPrice"]
        }
      },
      recommendedMarkets: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            marketName: { type: Type.STRING },
            distanceKm: { type: Type.NUMBER },
            currentPricePerQuintal: { type: Type.NUMBER },
            estimatedTransportCostPerQuintal: { type: Type.NUMBER },
            netProfitPerQuintal: { type: Type.NUMBER },
            rating: { type: Type.STRING }
          },
          required: ["marketName", "distanceKm", "currentPricePerQuintal", "estimatedTransportCostPerQuintal", "netProfitPerQuintal"]
        }
      }
    },
    required: ["recommendedAction", "optimalSellWindow", "predictedPeakPrice", "expectedProfitGainPercent", "strategyReasoning", "priceForecast14Days", "recommendedMarkets"]
  };
  ```

---

## 16. ZOD VALIDATION REQUIREMENTS

Create TypeScript/JavaScript Zod schemas in `shared/schema.js` or `server/validators/`:

```javascript
import { z } from 'zod';

// Farm Creation Schema
export const FarmInputSchema = z.object({
  farmName: z.string().min(2, "Farm name must be at least 2 characters"),
  locationName: z.string().min(2, "Location name is required"),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  areaAcres: z.number().positive("Area must be a positive number"),
  soilType: z.enum(['CLAY', 'LOAM', 'SANDY', 'BLACK', 'SILT']),
  primaryCrops: z.array(z.string()).min(1, "Select at least one crop"),
  waterSource: z.string().default('BOREWELL')
});

// Disease Diagnosis Query Schema
export const DiseaseQuerySchema = z.object({
  cropType: z.string().optional(),
  notes: z.string().max(500, "Notes cannot exceed 500 characters").optional()
});

// Weather Advisory Query Schema
export const WeatherQuerySchema = z.object({
  lat: z.coerce.number().min(-90).max(90),
  lon: z.coerce.number().min(-180).max(180),
  cropType: z.string().default('General'),
  soilType: z.enum(['CLAY', 'LOAM', 'SANDY', 'BLACK', 'SILT']).default('LOAM'),
  growthStage: z.enum(['SEEDLING', 'VEGETATIVE', 'FLOWERING', 'FRUITING', 'HARVEST_READY']).default('VEGETATIVE')
});

// Market Recommendation Query Schema
export const MarketQuerySchema = z.object({
  cropName: z.string().min(2, "Crop name is required"),
  quantityQuintals: z.number().positive("Quantity must be positive"),
  region: z.string().min(2, "Region is required"),
  currentPrice: z.number().positive().optional()
});
```

---

## 17. FRONTEND COMPONENTS LIST

Organize the React frontend using a modular component hierarchy:

```
client/src/
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx            # App bar with language selector & brand
│   │   ├── Footer.jsx            # Helpful quick links & emergency contacts
│   │   └── PageContainer.jsx     # Consistent layout padding wrapper
│   ├── common/
│   │   ├── SeverityBadge.jsx     # Visual color-coded tag (Green/Yellow/Orange/Red)
│   │   ├── AudioNarrator.jsx     # Web Speech TTS player widget
│   │   ├── LoadingSpinner.jsx    # Animated loading indicator
│   │   └── ErrorAlert.jsx        # Dismissible error banner
│   ├── disease/
│   │   ├── ImageUploader.jsx     # Drag-and-drop / camera input dropzone
│   │   ├── DiagnosticCard.jsx    # Results container (Symptoms, remedies)
│   │   └── RemedyTabbedView.jsx  # Toggle between Organic & Chemical remedies
│   ├── weather/
│   │   ├── MicroclimateCard.jsx  # Temperature, humidity, precipitation gauge
│   │   ├── RiskAlertBanner.jsx   # High-priority warning box
│   │   └── IrrigationWidget.jsx  # Recommended water intake visualization
│   ├── market/
│   │   ├── PriceChart.jsx        # Recharts line graph (Historical + Forecast)
│   │   ├── SellStrategyBanner.jsx# Recommendation callout ("HOLD" vs "SELL NOW")
│   │   └── MandiTable.jsx        # Mandi comparison table with net profit math
│   └── farm/
│       ├── FarmCard.jsx          # Individual farm plot display card
│       └── FarmModal.jsx         # Create/Edit farm plot form modal
├── hooks/
│   ├── useSpeech.js              # Custom hook wrapping window.speechSynthesis
│   ├── useGeolocation.js         # Custom hook for browser GPS coords
│   └── useLanguage.js           # Multi-language dictionary context hook
├── pages/
│   ├── LandingPage.jsx
│   ├── Dashboard.jsx
│   ├── DiseaseScanPage.jsx
│   ├── WeatherPage.jsx
│   ├── MarketPage.jsx
│   ├── FarmsPage.jsx
│   └── SettingsPage.jsx
├── services/
│   └── api.js                    # Axios / Fetch client methods
└── App.jsx                       # Main React router & layout context provider
```

---

## 18. SECURITY REQUIREMENTS

1. **API Key Secrecy**: The `GEMINI_API_KEY` must **NEVER** be exposed in client-side JS bundles or headers. All requests pass through Express server routes.
2. **File Upload Hardening**:
   - Limit uploaded image sizes to **10MB**.
   - Validate file MIME types strictly (`image/jpeg`, `image/png`, `image/webp`).
   - Store files in memory buffer (`multer.memoryStorage()`) and stream directly to base64 for AI processing without leaving residual server files.
3. **Rate Limiting**: Protect backend endpoints with `express-rate-limit`:
   - `/api/diagnosis/scan`: Max 10 requests per 15-minute window per IP.
   - General API routes: Max 100 requests per 15-minute window per IP.
4. **Input Sanitization**: Validate all inputs via Zod schemas to protect against SQL Injection and XSS attacks.
5. **HTTP Headers**: Enable `helmet()` middleware to enforce CSP, HSTS, and frameguard protections.

---

## 19. ENVIRONMENT VARIABLES TEMPLATE

Create a `.env.example` file in the root directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Connection
DATABASE_URL=postgresql://postgres:password@localhost:5432/agri_smart_db

# Google Gemini API Key
GEMINI_API_KEY=AIzaSyYourActualGeminiApiKeyHere

# External Weather API (Optional / Fallback)
OPENWEATHER_API_KEY=your_openweather_api_key_here

# App Security
SESSION_SECRET=super_secret_agricultural_key_change_me
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

---

## 20. SUGGESTED FOLDER STRUCTURE

```
agri-smart-ai/
├── client/
│   ├── public/
│   │   └── favicon.ico
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── server/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── diagnosisController.js
│   │   ├── farmController.js
│   │   ├── marketController.js
│   │   └── weatherController.js
│   ├── middleware/
│   │   ├── errorMiddleware.js
│   │   ├── rateLimiter.js
│   │   └── uploadMiddleware.js
│   ├── routes/
│   │   ├── diagnosisRoutes.js
│   │   ├── farmRoutes.js
│   │   ├── marketRoutes.js
│   │   └── weatherRoutes.js
│   ├── services/
│   │   ├── geminiService.js
│   │   └── weatherService.js
│   ├── validators/
│   │   └── schemas.js
│   ├── index.js
│   └── package.json
├── database/
│   └── schema.sql
├── .env.example
├── .gitignore
├── README.md
└── package.json
```

---

## 21. IMPLEMENTATION PHASES

### Phase 1: Core Setup & Database Initialization
- Set up root, server, and client package manifests.
- Configure Tailwind CSS, Vite, and Express server with CORS & Helmet.
- Execute SQL DDL in PostgreSQL database to create tables, indexes, and RLS policies.

### Phase 2: Gemini SDK Integration & Validation Layer
- Configure `@google/genai` SDK in `server/services/geminiService.js`.
- Write Zod validation schemas for all inbound request bodies and Gemini structured JSON outputs (`responseSchema`).
- Set up Multer file upload middleware with image MIME type checks.

### Phase 3: Backend Controller & API Endpoint Development
- Implement `/api/diagnosis/scan` with Multer + Gemini Vision analysis.
- Implement `/api/weather/advisory` combining weather API metrics with Gemini agricultural risk assessment.
- Implement `/api/market/recommendation` for 14-day price forecasting & mandi comparison.
- Implement `/api/farms` CRUD controllers for user farm management.

### Phase 4: Frontend Development & Reactive UI Componentry
- Build responsive layout (Navbar, Footer, Audio Narrator, Language Context).
- Implement interactive Disease Scanner page with live image dropzone and tabbed remedy views.
- Construct Weather Advisory page with irrigation meter and risk banners.
- Build Market Intelligence page with Recharts trend graphs and comparison tables.
- Build Farm Profile management dashboard.

### Phase 5: Voice Accessibility, Polish & Verification
- Integrate Web Speech API (`window.speechSynthesis`) for multi-lingual read-aloud TTS narration.
- Run end-to-end user testing across all routes.
- Verify zero missing imports, zero stubbed functions, and strict error handling.

---

## 22. ACCEPTANCE CRITERIA

Before declaring the application complete, ensure the implementation satisfies every criterion:

- [ ] **Functional Disease Scanner**: Successfully accepts an image upload, communicates with `@google/genai` using `gemini-2.5-flash`, and renders disease identification, severity %, organic remedies, and chemical remedies.
- [ ] **Functional Weather Advisory**: Correctly accepts coordinates/farm context, computes microclimate risks, and renders recommended watering volumes with actionable field tips.
- [ ] **Functional Market Strategy**: Generates a 14-day price trend chart (using Recharts), delivers an optimal selling recommendation ("HOLD" or "SELL NOW"), and displays a market comparison table.
- [ ] **Working Farm Management**: Allows farmers to create and view farm plots with stored acreage, soil type, and primary crops.
- [ ] **Accessibility & Voice Support**: Audio playback button functions cleanly on diagnostic cards using Web Speech API without crashing.
- [ ] **Strict Structured JSON**: Server uses `config.responseSchema` with `@google/genai` to guarantee strict JSON schema returns without regex post-processing.
- [ ] **Database Integrity**: PostgreSQL tables, indexes, enums, and RLS policies script executes cleanly without syntax errors.
- [ ] **Code Quality**: Zero `// TODO` comments, zero missing imports, zero blank placeholder components, and full Zod validation coverage.

---

## 23. FINAL INSTRUCTION TO CODING AGENT

**BEGIN EXECUTION NOW.**

Start with Phase 1 by creating the folder structure, configuring the environment, establishing the PostgreSQL schema, setting up the `@google/genai` SDK service, building out all Express REST endpoints, and constructing the complete React + Tailwind frontend UI. Follow all specifications outlined above to produce a complete, production-grade application.
