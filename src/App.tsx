import { useState } from 'react';
import { UserData, LearningRoadmap } from './types';
import Onboarding from './components/Onboarding';
import RoadmapDisplay from './components/RoadmapDisplay';
import { generateRoadmap } from './services/gemini';
import { Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

export default function App() {
  const [roadmap, setRoadmap] = useState<LearningRoadmap | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOnboardingComplete = async (data: UserData) => {
    setLoading(true);
    setError(null);
    try {
      const generated = await generateRoadmap(data);
      setRoadmap(generated);
    } catch (err) {
      console.error(err);
      setError('Failed to generate your roadmap. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {!roadmap && !loading && (
          <motion.div
            key="onboarding"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Onboarding onComplete={handleOnboardingComplete} />
          </motion.div>
        )}

        {loading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex flex-col items-center justify-center bg-slate-50 z-50 p-6 text-center"
          >
            <div className="relative mb-8">
              <div className="absolute inset-0 animate-ping bg-brand-600/10 rounded-full"></div>
              <div className="relative glass p-8 rounded-full border-brand-100">
                <Sparkles className="w-16 h-16 text-brand-600 animate-pulse" />
              </div>
            </div>
            <h2 className="text-4xl font-display font-bold mb-4 text-gradient">Crafting Your Journey</h2>
            <p className="text-slate-500 max-w-md text-lg">
              Our AI is analyzing your goals and background to create a perfectly tailored learning path...
            </p>
            <div className="mt-12 flex items-center gap-3 text-brand-600 font-bold bg-brand-50 px-6 py-3 rounded-full border border-brand-100">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="uppercase tracking-widest text-xs">Processing data</span>
            </div>
          </motion.div>
        )}

        {roadmap && !loading && (
          <motion.div
            key="roadmap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="fixed top-8 right-8 z-40 no-print">
              <button
                onClick={() => setRoadmap(null)}
                className="glass px-6 py-3 rounded-full text-sm font-bold hover:bg-brand-600 hover:text-white transition-all shadow-lg active:scale-95"
              >
                Create New Path
              </button>
            </div>
            <RoadmapDisplay roadmap={roadmap} />
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 glass px-8 py-4 rounded-2xl text-red-600 font-bold flex items-center gap-3 border-red-100 shadow-2xl shadow-red-900/10 z-50">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
          <span>{error}</span>
          <button onClick={() => setError(null)} className="ml-4 text-slate-400 hover:text-slate-900">✕</button>
        </div>
      )}
      <SpeedInsights />
    </div>
  );
}
