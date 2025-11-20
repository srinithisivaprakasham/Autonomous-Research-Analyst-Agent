import { motion } from 'motion/react';
import { ExternalLink, Star, Calendar, Users } from 'lucide-react';
import type { ResearchSource } from '../types/research';

interface SourceListProps {
  sources: ResearchSource[];
}

export function SourceList({ sources }: SourceListProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
      <h3 className="text-slate-900 mb-4">Sources Discovered</h3>
      <div className="space-y-3">
        {sources.map((source, index) => (
          <motion.div
            key={source.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 bg-slate-50 border border-slate-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-slate-900">{source.title}</h4>
                  <span className={`px-2 py-0.5 text-xs rounded-full ${
                    source.type === 'academic'
                      ? 'bg-purple-100 text-purple-700'
                      : source.type === 'documentation'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {source.type}
                  </span>
                </div>
                <p className="text-sm text-slate-600 mb-2">{source.description}</p>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <span>{source.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{source.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span>{source.credibilityScore}/10 credibility</span>
                  </div>
                </div>
              </div>
              <button className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
                <ExternalLink className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
