import { LearningRoadmap } from '../types';
import { motion } from 'motion/react';
import { Calendar, CheckCircle2, BookOpen, Clock, Trophy, ExternalLink, Sparkles, FileText } from 'lucide-react';

interface RoadmapDisplayProps {
  roadmap: LearningRoadmap;
}

export default function RoadmapDisplay({ roadmap }: RoadmapDisplayProps) {
  return (
    <div className="max-w-5xl mx-auto py-20 px-4 roadmap-grid min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-20"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-50 text-brand-700 text-xs font-bold rounded-full mb-6 tracking-widest uppercase border border-brand-100">
          <Sparkles className="w-3.5 h-3.5" /> Your Personalized Path
        </div>
        <h1 className="text-6xl font-display font-bold mb-8 text-gradient leading-tight">{roadmap.title}</h1>
        <p className="text-2xl text-slate-600 max-w-3xl leading-relaxed font-light">{roadmap.summary}</p>
        
        <div className="flex flex-wrap gap-6 mt-12">
          <div className="flex items-center gap-3 px-6 py-3 glass rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Effort</p>
              <p className="text-lg font-bold text-slate-900">{roadmap.estimatedTotalHours}h</p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-6 py-3 glass rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Curated Phases</p>
              <p className="text-lg font-bold text-slate-900">{roadmap.phases.length}</p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="space-y-24">
        {roadmap.phases.map((phase, phaseIdx) => (
          <motion.section
            key={phase.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            <div className="flex items-center gap-6 mb-12">
              <div className="w-16 h-16 rounded-3xl bg-brand-600 flex items-center justify-center text-white font-bold text-2xl shadow-xl shadow-brand-200">
                {phaseIdx + 1}
              </div>
              <div>
                <h2 className="text-4xl font-display font-bold text-slate-900">{phase.name}</h2>
                <div className="h-1 w-24 bg-brand-600 rounded-full mt-2 opacity-20"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {phase.steps.map((step, stepIdx) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: stepIdx * 0.1 }}
                  className="glass p-8 rounded-[2.5rem] hover:shadow-2xl hover:shadow-brand-900/5 transition-all group border-white/60"
                >
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-2xl font-bold text-slate-800 group-hover:text-brand-600 transition-colors leading-tight">{step.title}</h3>
                    <span className="px-4 py-1.5 bg-brand-50 rounded-full text-[10px] font-black text-brand-600 uppercase tracking-tighter border border-brand-100">
                      {step.duration}
                    </span>
                  </div>
                  
                  <p className="text-slate-600 text-base mb-8 leading-relaxed font-medium opacity-80">
                    {step.description}
                  </p>

                  <div className="space-y-8">
                    <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100">
                      <div className="flex items-center gap-2 mb-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                        <Trophy className="w-3.5 h-3.5 text-brand-500" /> Key Milestones
                      </div>
                      <ul className="space-y-3">
                        {step.milestones.map((m) => (
                          <li key={m} className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                            <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0 mt-0.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-brand-600" />
                            </div>
                            {m}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {step.resources.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                          <BookOpen className="w-3.5 h-3.5 text-brand-500" /> Verified Resources
                        </div>
                        <div className="flex flex-wrap gap-3">
                          {step.resources.map((r) => (
                            <a
                              key={r.url}
                              href={r.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-100 rounded-2xl text-xs font-bold text-slate-700 hover:border-brand-600 hover:text-brand-700 hover:shadow-lg hover:shadow-brand-900/5 transition-all group/link active:scale-95"
                            >
                              {r.title}
                              <ExternalLink className="w-3.5 h-3.5 text-slate-300 group-hover/link:text-brand-600 transition-colors" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-32 p-16 glass rounded-[4rem] text-center relative overflow-hidden group"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-400 via-brand-600 to-brand-800"></div>
        <h2 className="text-5xl font-display font-bold mb-6 text-slate-900">Ready to begin?</h2>
        <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
          This roadmap is your guide, but the journey is yours. Consistency is the key to mastery. We've verified every resource to ensure you have the best start.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 no-print">
          <button 
            onClick={() => {
              window.focus();
              window.print();
            }}
            className="w-full sm:w-auto px-10 py-5 bg-brand-600 text-white rounded-[2rem] font-bold hover:bg-brand-700 hover:scale-105 transition-all shadow-xl shadow-brand-200 flex items-center justify-center gap-3 active:scale-95"
          >
            <FileText className="w-5 h-5" /> Save as PDF
          </button>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-full sm:w-auto px-10 py-5 bg-white border-2 border-slate-100 text-slate-600 rounded-[2rem] font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-3 active:scale-95"
          >
            Back to Top
          </button>
        </div>
        <p className="mt-6 text-sm text-slate-400 no-print">
          Tip: If the print dialog doesn't appear, try opening this app in a new tab.
        </p>
      </motion.div>
    </div>
  );
}
