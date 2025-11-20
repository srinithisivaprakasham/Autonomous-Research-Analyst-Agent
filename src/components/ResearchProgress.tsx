import { motion } from 'motion/react';
import { Brain, Search, BarChart3, Lightbulb, FileText, Check } from 'lucide-react';
import type { ResearchPhase } from '../types/research';

interface ResearchProgressProps {
  phase: ResearchPhase;
  progress: number;
  currentStep: string;
  topic: string;
}

export function ResearchProgress({ phase, progress, currentStep, topic }: ResearchProgressProps) {
  const phases = [
    { id: 'initializing', label: 'Initialize', icon: Brain },
    { id: 'searching', label: 'Search', icon: Search },
    { id: 'analyzing', label: 'Analyze', icon: BarChart3 },
    { id: 'synthesizing', label: 'Synthesize', icon: Lightbulb },
    { id: 'generating', label: 'Generate', icon: FileText },
  ];

  const getPhaseIndex = (p: ResearchPhase) => {
    return phases.findIndex(phase => phase.id === p);
  };

  const currentPhaseIndex = getPhaseIndex(phase);

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8">
      {/* Topic Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
          <span className="text-sm text-blue-600">Researching</span>
        </div>
        <h2 className="text-slate-900">{topic}</h2>
      </div>

      {/* Phase Timeline */}
      <div className="mb-8">
        <div className="flex items-center justify-between relative">
          {/* Progress Line */}
          <div className="absolute top-6 left-0 right-0 h-1 bg-slate-200 rounded-full">
            <motion.div
              className="h-full bg-blue-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(currentPhaseIndex / (phases.length - 1)) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Phase Steps */}
          {phases.map((p, index) => {
            const Icon = p.icon;
            const isActive = index === currentPhaseIndex;
            const isComplete = index < currentPhaseIndex;

            return (
              <div key={p.id} className="relative z-10 flex flex-col items-center">
                <motion.div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                    isComplete
                      ? 'bg-green-500'
                      : isActive
                      ? 'bg-blue-600'
                      : 'bg-slate-200'
                  }`}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: isActive ? 1.1 : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {isComplete ? (
                    <Check className="w-6 h-6 text-white" />
                  ) : (
                    <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  )}
                </motion.div>
                <span className={`text-sm ${isActive ? 'text-slate-900' : 'text-slate-500'}`}>
                  {p.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-slate-600">Overall Progress</span>
          <span className="text-sm text-slate-900">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Current Step */}
      <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          <Brain className="w-5 h-5 text-blue-600" />
        </motion.div>
        <p className="text-slate-700">{currentStep}</p>
      </div>
    </div>
  );
}
