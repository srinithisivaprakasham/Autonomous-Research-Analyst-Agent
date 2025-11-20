import { useState } from 'react';
import { TopicInput } from './components/TopicInput';
import { ResearchAgent } from './components/ResearchAgent';
import { FileText } from 'lucide-react';

export default function App() {
  const [currentTopic, setCurrentTopic] = useState<string>('');
  const [isResearching, setIsResearching] = useState(false);

  const handleStartResearch = (topic: string) => {
    setCurrentTopic(topic);
    setIsResearching(true);
  };

  const handleReset = () => {
    setCurrentTopic('');
    setIsResearching(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-slate-900">Autonomous Research Analyst Agent</h1>
              <p className="text-slate-600 text-sm">AI-powered technical research and analysis</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {!isResearching ? (
          <TopicInput onStartResearch={handleStartResearch} />
        ) : (
          <ResearchAgent topic={currentTopic} onReset={handleReset} />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 py-6 text-center text-slate-500 text-sm">
        <p>Powered by AI • Autonomous Research Technology</p>
      </footer>
    </div>
  );
}
