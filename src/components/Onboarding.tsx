import React, { useState } from 'react';
import { UserData } from '../types';
import { Upload, Target, Clock, Briefcase, ChevronRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface OnboardingProps {
  onComplete: (data: UserData) => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<UserData>({
    goal: '',
    dailyHours: 2,
    totalMonths: 3,
    experienceLevel: 'Beginner',
  });
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        const base64Data = base64.split(',')[1];
        setFormData({
          ...formData,
          cvFile: {
            data: base64Data,
            mimeType: file.type,
          },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="max-w-2xl mx-auto py-16 px-4">
      <div className="mb-12 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-600 text-white mb-6 shadow-lg shadow-brand-200"
        >
          <Sparkles className="w-8 h-8" />
        </motion.div>
        <h1 className="text-5xl font-display font-bold mb-4 text-gradient">Design Your Future</h1>
        <p className="text-slate-500 text-lg">Tell us where you want to go, and we'll build the path to get you there.</p>
      </div>

      <div className="flex justify-between mb-12 relative max-w-md mx-auto">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -z-10 -translate-y-1/2"></div>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
              step >= i ? 'bg-brand-600 border-brand-600 text-white shadow-lg shadow-brand-200' : 'bg-white border-slate-200 text-slate-400'
            }`}
          >
            {step > i ? <CheckCircle2 className="w-6 h-6" /> : <span className="font-bold">{i}</span>}
          </div>
        ))}
      </div>

      <motion.div
        key={step}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="glass p-10 rounded-[2.5rem]"
      >
        {step === 1 && (
          <div className="space-y-8">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Target className="w-6 h-6 text-brand-600" />
                <h2 className="text-2xl font-bold text-slate-800">What is your goal?</h2>
              </div>
              <p className="text-slate-500">Be as specific as possible for the best results.</p>
            </div>
            <textarea
              className="w-full p-5 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-brand-100 focus:border-brand-500 outline-none min-h-[160px] text-lg transition-all bg-white/50"
              placeholder="e.g., I want to become a Senior Cloud Architect specializing in AWS and Kubernetes..."
              value={formData.goal}
              onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
            />
            <button
              onClick={nextStep}
              disabled={!formData.goal}
              className="w-full py-5 bg-brand-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-brand-700 transition-all shadow-lg shadow-brand-200 disabled:opacity-50 active:scale-95"
            >
              Continue <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Briefcase className="w-6 h-6 text-brand-600" />
                <h2 className="text-2xl font-bold text-slate-800">Experience & Background</h2>
              </div>
              <p className="text-slate-500">How would you describe your current level?</p>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                <button
                  key={level}
                  onClick={() => setFormData({ ...formData, experienceLevel: level })}
                  className={`py-4 rounded-2xl border-2 transition-all font-semibold ${
                    formData.experienceLevel === level
                      ? 'bg-brand-50 border-brand-600 text-brand-700 shadow-sm'
                      : 'bg-white border-slate-100 text-slate-500 hover:border-slate-300'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>

            <div className="relative group">
              <input
                type="file"
                id="cv-upload"
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.txt"
              />
              <label
                htmlFor="cv-upload"
                className="flex flex-col items-center justify-center w-full p-10 border-2 border-dashed border-slate-200 rounded-3xl cursor-pointer hover:border-brand-500 transition-all group-hover:bg-brand-50/50 group-hover:shadow-inner"
              >
                <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-4 group-hover:bg-brand-100 transition-colors">
                  <Upload className="w-7 h-7 text-slate-400 group-hover:text-brand-600" />
                </div>
                <span className="text-base font-semibold text-slate-700">
                  {fileName || "Upload your CV (Optional)"}
                </span>
                <span className="text-sm text-slate-400 mt-1">AI will analyze gaps in your background</span>
              </label>
            </div>

            <div className="flex gap-4">
              <button
                onClick={prevStep}
                className="flex-1 py-5 border-2 border-slate-100 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-all active:scale-95"
              >
                Back
              </button>
              <button
                onClick={nextStep}
                className="flex-1 py-5 bg-brand-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-brand-700 transition-all shadow-lg shadow-brand-200 active:scale-95"
              >
                Continue <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-brand-600" />
                <h2 className="text-2xl font-bold text-slate-800">Time Commitment</h2>
              </div>
              <p className="text-slate-500">How much time can you dedicate to this goal?</p>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Daily Commitment</label>
                  <span className="text-3xl font-display font-bold text-brand-600">{formData.dailyHours}h</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="12"
                  step="0.5"
                  value={formData.dailyHours}
                  onChange={(e) => setFormData({ ...formData, dailyHours: parseFloat(e.target.value) })}
                  className="w-full h-3 bg-slate-100 rounded-full appearance-none cursor-pointer accent-brand-600"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Journey Duration</label>
                  <span className="text-3xl font-display font-bold text-brand-600">{formData.totalMonths}m</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="24"
                  value={formData.totalMonths}
                  onChange={(e) => setFormData({ ...formData, totalMonths: parseInt(e.target.value) })}
                  className="w-full h-3 bg-slate-100 rounded-full appearance-none cursor-pointer accent-brand-600"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={prevStep}
                className="flex-1 py-5 border-2 border-slate-100 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-all active:scale-95"
              >
                Back
              </button>
              <button
                onClick={() => onComplete(formData)}
                className="flex-1 py-5 bg-brand-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-brand-700 transition-all shadow-lg shadow-brand-200 active:scale-95"
              >
                Generate Roadmap
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
