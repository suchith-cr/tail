import axios from 'axios';

// Base API Axios Client configured for local Express backend
const API = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
    'x-user-id': '00000000-0000-0000-0000-000000000001' // Simulated demo farmer ID
  },
  timeout: 45000 // 45 sec timeout for AI processing
});

/**
 * Fetch 5 most recent assessments for Dashboard history
 */
export const getDashboardHistory = async (userId = '00000000-0000-0000-0000-000000000001') => {
  try {
    const res = await API.get(`/dashboard/${userId}`);
    return res.data;
  } catch (err) {
    console.error('API Error [getDashboardHistory]:', err);
    throw err.response?.data || { error: 'Network error fetching dashboard history' };
  }
};

/**
 * Submit crop image Base64 to AI Disease Scanner
 */
export const analyzeCropDisease = async ({ image, cropHint, userId }) => {
  try {
    const res = await API.post('/analyze-disease', { image, cropHint, userId });
    return res.data;
  } catch (err) {
    console.error('API Error [analyzeCropDisease]:', err);
    throw err.response?.data || { error: 'Network error performing crop disease diagnosis' };
  }
};

/**
 * Submit location & season to AI Weather Advisor
 */
export const getWeatherAdvisory = async ({ location, season, userId }) => {
  try {
    const res = await API.post('/weather-advisory', { location, season, userId });
    return res.data;
  } catch (err) {
    console.error('API Error [getWeatherAdvisory]:', err);
    throw err.response?.data || { error: 'Network error generating weather advisory' };
  }
};

/**
 * Submit crop type & yield to AI Market Tracker
 */
export const getMarketInsights = async ({ cropType, yield: yieldVal, userId }) => {
  try {
    const res = await API.post('/market-timing', { cropType, yield: yieldVal, userId });
    return res.data;
  } catch (err) {
    console.error('API Error [getMarketInsights]:', err);
    throw err.response?.data || { error: 'Network error generating market insights' };
  }
};

export default API;
