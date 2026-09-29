import React, { useState } from 'react';
import ImageUploader from '../components/ImageUploader';
import AdvisoryCard from '../components/AdvisoryCard';
import { analyzeCropDisease } from '../services/api';
import { ScanLine, Sparkles, Loader2, AlertCircle, CheckCircle2, Sprout } from 'lucide-react';

const FARMING_TIPS = [
  "Tip: Early blight fungal spores travel via water splash; avoid overhead sprinkler watering in late afternoon.",
  "Tip: Always sanitize pruning shears between crop rows to prevent cross-pathogen contamination.",
  "Tip: Copper-based bio-fungicides work best when applied at early sign of leaf spot discoloration.",
  "Tip: Rotating solanaceous crops (tomatoes, potatoes) with legumes rejuvenates soil nitrogen balances."
];

export default function DiseaseScanner() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [cropHint, setCropHint] = useState('');
  const [loading, setLoading] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleImageSelected = (base64, name) => {
    setSelectedImage(base64);
    setFileName(name);
    setError(null);
    setResult(null);
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!selectedImage) {
      setError('Please upload or drag-and-drop a crop specimen image first.');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    // Rotate tip during loading
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % FARMING_TIPS.length);
    }, 3500);

    try {
      const res = await analyzeCropDisease({
        image: selectedImage,
        cropHint: cropHint,
        userId: '00000000-0000-0000-0000-000000000001'
      });

      if (res.success && res.data) {
        setResult(res.data);
      } else {
        setError(res.error || 'Failed to complete vision diagnosis.');
      }
    } catch (err) {
      console.error('Disease scanning failed:', err);
      setError(err.error || err.details?.[0] || 'An unexpected error occurred during image processing.');
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-300">
          <ScanLine className="w-3.5 h-3.5 text-emerald-400" /> Multimodal Vision Diagnostics
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Multimodal Crop Disease Scanner
        </h1>
        <p className="text-sm text-slate-300">
          Upload an image of an affected leaf, stem, or plant tissue. Our Gemini AI engine will diagnose pathogens, severity, and output organic/chemical remedies.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form & Image Upload */}
        <div className="lg:col-span-6 space-y-6">
          <form onSubmit={handleAnalyze} className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-6 shadow-xl">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                1. Upload Specimen Photo (Required)
              </label>
              <ImageUploader
                onImageSelected={handleImageSelected}
                selectedImage={selectedImage}
              />
            </div>

            <div>
              <label htmlFor="crop-hint-input" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                2. Crop Specimen Hint (Optional)
              </label>
              <input
                id="crop-hint-input"
                type="text"
                value={cropHint}
                onChange={(e) => setCropHint(e.target.value)}
                placeholder="e.g. Tomato, Rice, Wheat, Cotton, Maize"
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
              />
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !selectedImage}
              className={`w-full py-4 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-lg ${
                loading || !selectedImage
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                  : 'bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white shadow-emerald-950/50 active:scale-[0.99]'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-emerald-300" />
                  <span>Analyzing Specimen with Gemini Vision...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-emerald-200" />
                  <span>Run Multimodal AI Diagnosis</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Loading Tip or AI Results */}
        <div className="lg:col-span-6">
          {loading ? (
            <div className="glass-panel rounded-2xl p-8 border border-emerald-500/30 text-center space-y-6 animate-pulse">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white">Gemini Multimodal AI Processing</h3>
                <p className="text-xs text-slate-400">Extracting cellular anomalies & matching against agronomic databases...</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-left">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold mb-1">
                  <Sprout className="w-4 h-4" /> Smart Agronomy Tip:
                </div>
                <p className="text-xs text-slate-300 italic">
                  "{FARMING_TIPS[tipIndex]}"
                </p>
              </div>
            </div>
          ) : result ? (
            <AdvisoryCard result={result} type="disease" />
          ) : (
            <div className="glass-panel rounded-2xl p-8 border border-slate-800 text-center text-slate-400 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
                <ScanLine className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-200">Awaiting Specimen Upload</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Upload a plant image on the left panel and click "Run Multimodal AI Diagnosis" to view complete pathogen insights.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
