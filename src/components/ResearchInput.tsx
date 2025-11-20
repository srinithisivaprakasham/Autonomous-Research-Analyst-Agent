import { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';

interface ResearchInputProps {
  onStartResearch: (topic: string) => void;
}

const exampleTopics = [
  'Artificial Intelligence and Large Language Models',
  'Blockchain and Web3 Technologies',
  'Quantum Computing Applications',
  'Edge Computing and IoT',
  'Cybersecurity in Cloud Environments',
  'Green Energy Storage Solutions'
];

export function ResearchInput({ onStartResearch }: ResearchInputProps) {
  const [topic, setTopic] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      onStartResearch(topic.trim());
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Sparkles className="w-8 h-8 text-blue-600" />
          <h2 className="text-slate-900">Start Your Research</h2>
        </div>
        
        <p className="text-center text-slate-600 mb-8">
          Enter any technical topic and our AI agent will autonomously gather, analyze, 
          and synthesize information to create a comprehensive report.
        </p>

        <form onSubmit={handleSubmit} className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Artificial Intelligence in Healthcare, Quantum Computing, Blockchain Security..."
              className="w-full pl-12 pr-4 py-4 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <button
            type="submit"
            disabled={!topic.trim()}
            className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            Start Autonomous Research
          </button>
        </form>

        <div>
          <p className="text-slate-500 mb-4">Or try one of these examples:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {exampleTopics.map((example, index) => (
              <button
                key={index}
                onClick={() => setTopic(example)}
                className="text-left px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors text-slate-700 border border-slate-200"
              >
                {example}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-200">
          <h3 className="text-slate-900 mb-4">Agent Capabilities</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <div className="text-slate-900">Multi-Source Collection</div>
                <div className="text-slate-600">Gathers data from diverse sources</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <div className="text-slate-900">Reliability Analysis</div>
                <div className="text-slate-600">Evaluates source credibility</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <div className="text-slate-900">Intelligent Synthesis</div>
                <div className="text-slate-600">Combines insights meaningfully</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <div className="text-slate-900">Structured Output</div>
                <div className="text-slate-600">Generates reports & presentations</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
