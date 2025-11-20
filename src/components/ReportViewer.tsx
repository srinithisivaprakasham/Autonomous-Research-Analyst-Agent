import { useState } from 'react';
import { FileText, TrendingUp, BarChart, Link as LinkIcon, Lightbulb, Download } from 'lucide-react';
import { ResearchReport } from '../App';

interface ReportViewerProps {
  report: ResearchReport;
}

export function ReportViewer({ report }: ReportViewerProps) {
  const [activeTab, setActiveTab] = useState<'summary' | 'findings' | 'analysis' | 'sources' | 'recommendations'>('summary');

  const handleDownload = () => {
    const reportText = `
AUTONOMOUS RESEARCH REPORT
Topic: ${report.topic}
Generated: ${new Date(report.generatedAt).toLocaleString()}

═══════════════════════════════════════════════════════════════

EXECUTIVE SUMMARY
${report.executiveSummary}

KEY FINDINGS
${report.keyFindings.map((f, i) => `${i + 1}. ${f}`).join('\n')}

DETAILED ANALYSIS
${report.detailedAnalysis.map(section => `
${section.section.toUpperCase()}
${section.content}
`).join('\n')}

RECOMMENDATIONS
${report.recommendations.map((r, i) => `${i + 1}. ${r}`).join('\n')}

SOURCES
${report.sources.map((s, i) => `
${i + 1}. ${s.title}
   URL: ${s.url}
   Reliability: ${s.reliability}%
   Summary: ${s.summary}
   Published: ${s.datePublished}
`).join('\n')}
    `.trim();

    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `research-report-${report.topic.toLowerCase().replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Report Header */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-slate-500 mb-2">
              <FileText className="w-4 h-4" />
              <span>Research Report</span>
            </div>
            <h1 className="text-slate-900 mb-2">{report.topic}</h1>
            <p className="text-slate-600">
              Generated on {new Date(report.generatedAt).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mt-6 border-b border-slate-200 overflow-x-auto">
          <button
            onClick={() => setActiveTab('summary')}
            className={`px-4 py-3 transition-colors whitespace-nowrap ${
              activeTab === 'summary'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Executive Summary
          </button>
          <button
            onClick={() => setActiveTab('findings')}
            className={`px-4 py-3 transition-colors whitespace-nowrap ${
              activeTab === 'findings'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Key Findings
          </button>
          <button
            onClick={() => setActiveTab('analysis')}
            className={`px-4 py-3 transition-colors whitespace-nowrap ${
              activeTab === 'analysis'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Detailed Analysis
          </button>
          <button
            onClick={() => setActiveTab('sources')}
            className={`px-4 py-3 transition-colors whitespace-nowrap ${
              activeTab === 'sources'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sources
          </button>
          <button
            onClick={() => setActiveTab('recommendations')}
            className={`px-4 py-3 transition-colors whitespace-nowrap ${
              activeTab === 'recommendations'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Recommendations
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        {activeTab === 'summary' && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-6 h-6 text-blue-600" />
              <h2 className="text-slate-900">Executive Summary</h2>
            </div>
            <div className="prose max-w-none">
              <p className="text-slate-700 leading-relaxed">{report.executiveSummary}</p>
            </div>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-blue-900">{report.keyFindings.length}</div>
                <div className="text-blue-700">Key Findings</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="text-purple-900">{report.sources.length}</div>
                <div className="text-purple-700">Sources Analyzed</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-green-900">{report.recommendations.length}</div>
                <div className="text-green-700">Recommendations</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'findings' && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              <h2 className="text-slate-900">Key Findings</h2>
            </div>
            <div className="space-y-4">
              {report.keyFindings.map((finding, index) => (
                <div key={index} className="flex gap-4 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">
                    {index + 1}
                  </div>
                  <p className="text-slate-700 flex-1">{finding}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'analysis' && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <BarChart className="w-6 h-6 text-blue-600" />
              <h2 className="text-slate-900">Detailed Analysis</h2>
            </div>
            <div className="space-y-8">
              {report.detailedAnalysis.map((section, index) => (
                <div key={index}>
                  <h3 className="text-slate-900 mb-4">{section.section}</h3>
                  <p className="text-slate-700 leading-relaxed">{section.content}</p>
                  {index < report.detailedAnalysis.length - 1 && (
                    <div className="border-b border-slate-200 mt-8"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'sources' && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <LinkIcon className="w-6 h-6 text-blue-600" />
              <h2 className="text-slate-900">Sources & References</h2>
            </div>
            <div className="space-y-4">
              {report.sources.map((source, index) => (
                <div key={index} className="border border-slate-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="text-slate-900 flex-1">{source.title}</h3>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <div className="text-slate-700">Reliability:</div>
                      <div className={`px-3 py-1 rounded-full ${
                        source.reliability >= 90 
                          ? 'bg-green-100 text-green-700'
                          : source.reliability >= 80
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {source.reliability}%
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-600 mb-3">{source.summary}</p>
                  <div className="flex items-center justify-between">
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      <LinkIcon className="w-4 h-4" />
                      View Source
                    </a>
                    <div className="text-slate-500">{source.datePublished}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'recommendations' && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Lightbulb className="w-6 h-6 text-blue-600" />
              <h2 className="text-slate-900">Strategic Recommendations</h2>
            </div>
            <div className="space-y-4">
              {report.recommendations.map((recommendation, index) => (
                <div key={index} className="flex gap-4 p-6 border-l-4 border-blue-600 bg-blue-50 rounded-r-lg">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">
                    {index + 1}
                  </div>
                  <p className="text-slate-700 flex-1">{recommendation}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
