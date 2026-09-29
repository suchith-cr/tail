import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, X, AlertCircle, Sparkles } from 'lucide-react';

export default function ImageUploader({ onImageSelected, selectedImage }) {
  const [isDragging, setIsDragging] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const fileInputRef = useRef(null);

  const processFile = (file) => {
    setErrorMsg(null);
    if (!file) return;

    // Validate type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setErrorMsg('Please upload a valid crop image (.jpg, .jpeg, .png, or .webp).');
      return;
    }

    // Validate size (Max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setErrorMsg('Image size exceeds 5MB limit. Please choose a smaller image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Str = e.target.result;
      onImageSelected(base64Str, file.name);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onImageSelected(null, null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleChange}
        accept="image/jpeg,image/png,image/webp,image/jpg"
        className="hidden"
        id="crop-image-input"
      />

      {selectedImage ? (
        <div className="relative group rounded-2xl overflow-hidden border border-emerald-500/30 bg-slate-900/80 shadow-xl max-h-[380px] flex items-center justify-center">
          <img
            src={selectedImage}
            alt="Uploaded Crop Leaf Specimen"
            className="w-full h-full object-cover max-h-[380px] rounded-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-between p-4">
            <span className="inline-flex items-center gap-1.5 text-xs text-emerald-300 bg-emerald-950/80 px-3 py-1.5 rounded-full border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Image Ready for Vision AI
            </span>
            <button
              onClick={handleClear}
              type="button"
              className="p-2 rounded-full bg-rose-500/80 hover:bg-rose-600 text-white transition-all shadow-md active:scale-90"
              title="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition-all duration-300 flex flex-col items-center justify-center gap-4 ${
            isDragging
              ? 'border-emerald-400 bg-emerald-950/30 scale-[1.01]'
              : 'border-slate-700/80 hover:border-emerald-500/50 bg-slate-900/50 hover:bg-slate-900/80'
          }`}
        >
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
            <UploadCloud className="w-8 h-8" />
          </div>

          <div>
            <p className="text-base font-semibold text-slate-200">
              Drag & Drop Crop Specimen Image
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Supports JPEG, PNG, WEBP (Max 5MB)
            </p>
          </div>

          <button
            type="button"
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition-all inline-flex items-center gap-2"
          >
            <ImageIcon className="w-4 h-4 text-emerald-400" /> Browse Computer Files
          </button>
        </div>
      )}

      {errorMsg && (
        <div className="mt-3 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
          <span>{errorMsg}</span>
        </div>
      )}
    </div>
  );
}
