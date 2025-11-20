import { useState } from 'react';
import { Search, Sparkles, Zap, BookOpen, TrendingUp, FileText } from 'lucide-react';

interface TopicInputProps {
  onStartResearch: (topic: string) => void;
}

export function TopicInput({ onStartResearch }: TopicInputProps) {
  const [topic, setTopic] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      onStartResearch(topic.trim());
    }
  };

  const exampleTopics = [
    'Quantum Computing Applications in Cryptography',
    'Edge Computing Architecture Best Practices',
    'Transformer Models in Natural Language Processing',
    'Kubernetes Security and Compliance',
    'Blockchain Consensus Mechanisms',
    'WebAssembly Performance Optimization'
  ];

  const handleExampleClick = (exampleTopic: string) => {
    setTopic(exampleTopic);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full mb-6">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span className="text-blue-700 text-sm">AI-Powered Research</span>
        </div>
        <h2 className="text-slate-900 mb-4">
          What would you like to research today?
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Enter any technical topic and let our AI agent autonomously gather, analyze, and synthesize 
          information into a comprehensive executive report.
        </p>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., Microservices Architecture Patterns"
            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 placeholder:text-slate-400"
          />
        </div>
        <button
          type="submit"
          disabled={!topic.trim()}
          className="w-full mt-4 px-6 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors shadow-lg hover:shadow-xl"
        >
          <span className="flex items-center justify-center gap-2">
            <Zap className="w-5 h-5" />
            Start Autonomous Research
          </span>
        </button>
      </form>

      {/* Example Topics */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-slate-600" />
          <h3 className="text-slate-900">Example Research Topics</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {exampleTopics.map((exampleTopic, index) => (
            <button
              key={index}
              onClick={() => handleExampleClick(exampleTopic)}
              className="text-left px-4 py-3 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-lg transition-colors group"
            >
              <div className="flex items-start gap-2">
                <TrendingUp className="w-4 h-4 text-slate-400 group-hover:text-blue-500 mt-0.5 flex-shrink-0" />
                <span className="text-slate-700 text-sm">{exampleTopic}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center p-4">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Search className="w-6 h-6 text-blue-600" />
          </div>
          <h4 className="text-slate-900 mb-1">Autonomous Search</h4>
          <p className="text-slate-600 text-sm">
            Automatically gathers information from multiple sources
          </p>
        </div>
        <div className="text-center p-4">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Sparkles className="w-6 h-6 text-purple-600" />
          </div>
          <h4 className="text-slate-900 mb-1">Intelligent Analysis</h4>
          <p className="text-slate-600 text-sm">
            Evaluates source reliability and synthesizes insights
          </p>
        </div>
        <div className="text-center p-4">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <FileText className="w-6 h-6 text-green-600" />
          </div>
          <h4 className="text-slate-900 mb-1">Structured Reports</h4>
          <p className="text-slate-600 text-sm">
            Generates executive-level summaries and presentations
          </p>
        </div>
      </div>
    </div>
  );
}