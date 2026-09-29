const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../../.env') });

async function runMigration() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.warn('[Migration Warning] DATABASE_URL is not set in .env file.');
    console.log('[Migration Info] Please set DATABASE_URL (or SUPABASE_SERVICE_ROLE_KEY) to execute remote migrations.');
    console.log('[Migration Info] Note: AgriSmart AI server operates in resilient fallback mode when DB URL is absent.');
    return;
  }

  console.log('[Migration] Connecting to Supabase / PostgreSQL...');
  const pool = new Pool({
    connectionString: dbUrl,
    ssl: dbUrl.includes('supabase') || process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  });

  const sqlPath = path.join(__dirname, '../../supabase/migrations/001_initial_schema.sql');
  if (!fs.existsSync(sqlPath)) {
    console.error(`[Migration Error] Schema file not found at ${sqlPath}`);
    process.exit(1);
  }

  const sql = fs.readFileSync(sqlPath, 'utf8');

  try {
    console.log('[Migration] Executing migration script 001_initial_schema.sql...');
    await pool.query(sql);
    console.log('[Migration Success] All tables, indexes, RLS policies, and seed records applied successfully!');
  } catch (err) {
    console.error('[Migration Execution Failed]', err.message);
  } finally {
    await pool.end();
  }
}

if (require.main === module) {
  runMigration();
}

module.exports = { runMigration };
