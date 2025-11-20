import { useState } from 'react';
import { motion } from 'motion/react';
import { FileText, Download, RotateCcw, Presentation, FileJson, Copy, Check } from 'lucide-react';
import type { ResearchReport, ResearchSource } from '../types/research';

interface FinalReportProps {
  report: ResearchReport;
  sources: ResearchSource[];
  topic: string;
  onReset: () => void;
}

export function FinalReport({ report, sources, topic, onReset }: FinalReportProps) {
  const [activeTab, setActiveTab] = useState<'report' | 'slides' | 'json'>('report');
  const [copied, setCopied] = useState(false);

  const handleCopyReport = () => {
    const reportText = formatReportAsText(report, sources);
    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (format: 'txt' | 'json') => {
    let content: string;
    let filename: string;
    let mimeType: string;

    if (format === 'json') {
      content = JSON.stringify({ report, sources, topic }, null, 2);
      filename = `research-report-${Date.now()}.json`;
      mimeType = 'application/json';
    } else {
      content = formatReportAsText(report, sources);
      filename = `research-report-${Date.now()}.txt`;
      mimeType = 'text/plain';
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Success Banner */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <Check className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-slate-900">Research Complete!</h3>
              <p className="text-slate-600">
                Analyzed {sources.length} sources to generate comprehensive insights
              </p>
            </div>
          </div>
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <RotateCcw className="w-4 h-4 text-slate-600" />
            <span className="text-slate-700">New Research</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200">
        <div className="flex items-center border-b border-slate-200">
          <button
            onClick={() => setActiveTab('report')}
            className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors ${
              activeTab === 'report'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Executive Report</span>
          </button>
          <button
            onClick={() => setActiveTab('slides')}
            className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors ${
              activeTab === 'slides'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Presentation className="w-4 h-4" />
            <span>Slide Deck</span>
          </button>
          <button
            onClick={() => setActiveTab('json')}
            className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors ${
              activeTab === 'json'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileJson className="w-4 h-4" />
            <span>Raw Data</span>
          </button>

          {/* Action Buttons */}
          <div className="ml-auto px-4 flex items-center gap-2">
            <button
              onClick={handleCopyReport}
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-green-600">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-600" />
                  <span className="text-slate-700">Copy</span>
                </>
              )}
            </button>
            <button
              onClick={() => handleDownload('txt')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {activeTab === 'report' && <ReportView report={report} sources={sources} />}
          {activeTab === 'slides' && <SlidesView report={report} sources={sources} />}
          {activeTab === 'json' && <JsonView report={report} sources={sources} topic={topic} />}
        </div>
      </div>
    </motion.div>
  );
}

function ReportView({ report, sources }: { report: ResearchReport; sources: ResearchSource[] }) {
  return (
    <div className="prose prose-slate max-w-none">
      <h1>{report.title}</h1>
      
      <div className="bg-blue-50 border-l-4 border-blue-600 p-4 my-6">
        <h2 className="mt-0 mb-2">Executive Summary</h2>
        <p className="mb-0">{report.executiveSummary}</p>
      </div>

      <h2>Key Findings</h2>
      <ul>
        {report.keyFindings.map((finding, index) => (
          <li key={index}>{finding}</li>
        ))}
      </ul>

      {report.sections.map((section, index) => (
        <div key={index}>
          <h2>{section.title}</h2>
          <p>{section.content}</p>
        </div>
      ))}

      <h2>Recommendations</h2>
      <ol>
        {report.recommendations.map((rec, index) => (
          <li key={index}>{rec}</li>
        ))}
      </ol>

      <h2>Conclusion</h2>
      <p>{report.conclusion}</p>

      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mt-8">
        <h3 className="mt-0">Sources Referenced</h3>
        <ul className="mb-0">
          {sources.map((source, index) => (
            <li key={source.id} className="text-sm">
              {source.author}. "{source.title}." {source.type}. {source.date}.
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function SlidesView({ report, sources }: { report: ResearchReport; sources: ResearchSource[] }) {
  const slides = [
    {
      title: report.title,
      subtitle: 'Autonomous Research Analysis',
      type: 'cover'
    },
    {
      title: 'Executive Summary',
      content: report.executiveSummary,
      type: 'content'
    },
    {
      title: 'Key Findings',
      points: report.keyFindings.slice(0, 5),
      type: 'bullets'
    },
    ...report.sections.map(section => ({
      title: section.title,
      content: section.content,
      type: 'content'
    })),
    {
      title: 'Recommendations',
      points: report.recommendations,
      type: 'bullets'
    },
    {
      title: 'Conclusion',
      content: report.conclusion,
      type: 'content'
    },
    {
      title: 'Sources',
      sources: sources,
      type: 'sources'
    }
  ];

  return (
    <div className="space-y-4">
      {slides.map((slide, index) => (
        <div key={index} className="bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-slate-300 rounded-lg p-8 aspect-video flex flex-col">
          <div className="text-sm text-slate-500 mb-4">Slide {index + 1} / {slides.length}</div>
          
          {slide.type === 'cover' && (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <h1 className="text-slate-900 mb-2">{slide.title}</h1>
              <p className="text-slate-600">{slide.subtitle}</p>
            </div>
          )}

          {slide.type === 'content' && (
            <div>
              <h2 className="text-slate-900 mb-4">{slide.title}</h2>
              <p className="text-slate-700">{slide.content}</p>
            </div>
          )}

          {slide.type === 'bullets' && (
            <div>
              <h2 className="text-slate-900 mb-4">{slide.title}</h2>
              <ul className="space-y-2">
                {slide.points?.map((point, i) => (
                  <li key={i} className="text-slate-700 flex gap-2">
                    <span className="text-blue-600">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {slide.type === 'sources' && (
            <div>
              <h2 className="text-slate-900 mb-4">{slide.title}</h2>
              <div className="grid grid-cols-2 gap-3">
                {slide.sources?.map((source, i) => (
                  <div key={i} className="text-sm bg-white p-3 rounded border border-slate-200">
                    <div className="text-slate-900 mb-1">{source.title}</div>
                    <div className="text-xs text-slate-500">{source.author} • {source.date}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function JsonView({ report, sources, topic }: { report: ResearchReport; sources: ResearchSource[]; topic: string }) {
  const jsonData = {
    topic,
    generatedAt: new Date().toISOString(),
    report,
    sources,
    metadata: {
      totalSources: sources.length,
      averageCredibility: (sources.reduce((sum, s) => sum + s.credibilityScore, 0) / sources.length).toFixed(1),
      sourceTypes: {
        academic: sources.filter(s => s.type === 'academic').length,
        industry: sources.filter(s => s.type === 'industry').length,
        documentation: sources.filter(s => s.type === 'documentation').length
      }
    }
  };

  return (
    <div className="bg-slate-900 rounded-lg p-6 overflow-auto max-h-[600px]">
      <pre className="text-green-400 text-sm">
        <code>{JSON.stringify(jsonData, null, 2)}</code>
      </pre>
    </div>
  );
}

function formatReportAsText(report: ResearchReport, sources: ResearchSource[]): string {
  let text = `${report.title}\n${'='.repeat(report.title.length)}\n\n`;
  text += `EXECUTIVE SUMMARY\n${'-'.repeat(17)}\n${report.executiveSummary}\n\n`;
  text += `KEY FINDINGS\n${'-'.repeat(12)}\n`;
  report.keyFindings.forEach((finding, i) => {
    text += `${i + 1}. ${finding}\n`;
  });
  text += '\n';
  
  report.sections.forEach(section => {
    text += `${section.title.toUpperCase()}\n${'-'.repeat(section.title.length)}\n${section.content}\n\n`;
  });
  
  text += `RECOMMENDATIONS\n${'-'.repeat(15)}\n`;
  report.recommendations.forEach((rec, i) => {
    text += `${i + 1}. ${rec}\n`;
  });
  text += '\n';
  
  text += `CONCLUSION\n${'-'.repeat(10)}\n${report.conclusion}\n\n`;
  
  text += `SOURCES\n${'-'.repeat(7)}\n`;
  sources.forEach((source, i) => {
    text += `${i + 1}. ${source.author}. "${source.title}." ${source.type}. ${source.date}.\n`;
  });
  
  return text;
}
