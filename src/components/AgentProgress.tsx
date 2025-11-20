import { Search, Filter, Lightbulb, FileText, CheckCircle } from 'lucide-react';
import { ResearchStage } from '../App';

interface AgentProgressProps {
  stage: ResearchStage;
}

const stageConfig = {
  searching: {
    icon: Search,
    title: 'Searching & Collecting',
    description: 'Scanning multiple databases and sources for relevant information...',
    activities: [
      'Querying academic databases and research papers',
      'Analyzing industry reports and whitepapers',
      'Collecting recent news and developments',
      'Gathering expert opinions and case studies'
    ]
  },
  analyzing: {
    icon: Filter,
    title: 'Analyzing & Filtering',
    description: 'Evaluating source reliability and filtering relevant content...',
    activities: [
      'Assessing source credibility and authority',
      'Cross-referencing facts across multiple sources',
      'Filtering out outdated or low-quality information',
      'Identifying key themes and patterns'
    ]
  },
  synthesizing: {
    icon: Lightbulb,
    title: 'Synthesizing Insights',
    description: 'Combining information to generate meaningful insights...',
    activities: [
      'Connecting related concepts and findings',
      'Identifying trends and implications',
      'Developing key takeaways and conclusions',
      'Formulating strategic recommendations'
    ]
  },
  generating: {
    icon: FileText,
    title: 'Generating Report',
    description: 'Creating structured executive summary and presentation...',
    activities: [
      'Structuring executive summary',
      'Organizing detailed analysis sections',
      'Preparing visual presentation slides',
      'Compiling source references and citations'
    ]
  }
};

export function AgentProgress({ stage }: AgentProgressProps) {
  if (stage === 'idle' || stage === 'complete') return null;

  const config = stageConfig[stage];
  const Icon = config.icon;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
        {/* Header */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="relative">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Icon className="w-8 h-8 text-blue-600 animate-pulse" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-ping"></div>
          </div>
          <div>
            <h2 className="text-slate-900">{config.title}</h2>
            <p className="text-slate-600">{config.description}</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {Object.entries(stageConfig).map(([key, value], index) => {
              const StepIcon = value.icon;
              const isComplete = getStageIndex(stage) > index;
              const isCurrent = stage === key;
              
              return (
                <div key={key} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                        isComplete
                          ? 'bg-green-500 text-white'
                          : isCurrent
                          ? 'bg-blue-600 text-white scale-110'
                          : 'bg-slate-200 text-slate-400'
                      }`}
                    >
                      {isComplete ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <StepIcon className="w-6 h-6" />
                      )}
                    </div>
                    <div className={`mt-2 text-center hidden md:block ${
                      isCurrent ? 'text-slate-900' : 'text-slate-500'
                    }`}>
                      {value.title.split(' ')[0]}
                    </div>
                  </div>
                  {index < Object.entries(stageConfig).length - 1 && (
                    <div className={`flex-1 h-1 mx-2 ${
                      isComplete ? 'bg-green-500' : 'bg-slate-200'
                    }`}></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Current Activities */}
        <div className="bg-slate-50 rounded-xl p-6">
          <h3 className="text-slate-900 mb-4">Current Activities</h3>
          <div className="space-y-3">
            {config.activities.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 animate-fade-in">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 animate-pulse"></div>
                <div className="text-slate-700 flex-1">{activity}</div>
                <div className="flex gap-1">
                  <div className="w-1 h-4 bg-blue-600 rounded animate-wave" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-1 h-4 bg-blue-600 rounded animate-wave" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-1 h-4 bg-blue-600 rounded animate-wave" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="bg-white border border-slate-200 rounded-lg p-4 text-center">
            <div className="text-slate-900">{getStageIndex(stage) * 25 + 25}%</div>
            <div className="text-slate-600">Progress</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-4 text-center">
            <div className="text-slate-900">{Math.floor(Math.random() * 20) + 30}</div>
            <div className="text-slate-600">Sources Found</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-4 text-center">
            <div className="text-slate-900">{Math.floor(Math.random() * 10) + 15}</div>
            <div className="text-slate-600">Key Insights</div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes wave {
          0%, 100% { transform: scaleY(0.5); }
          50% { transform: scaleY(1); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        
        .animate-wave {
          animation: wave 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

function getStageIndex(stage: ResearchStage): number {
  const stages: ResearchStage[] = ['idle', 'searching', 'analyzing', 'synthesizing', 'generating', 'complete'];
  return stages.indexOf(stage);
}
