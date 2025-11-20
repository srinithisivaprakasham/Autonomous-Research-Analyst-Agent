import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ResearchProgress } from './ResearchProgress';
import { SourceList } from './SourceList';
import { FinalReport } from './FinalReport';
import { simulateResearch } from '../utils/researchSimulator';
import type { ResearchState, ResearchSource } from '../types/research';

interface ResearchAgentProps {
  topic: string;
  onReset: () => void;
}

export function ResearchAgent({ topic, onReset }: ResearchAgentProps) {
  const [state, setState] = useState<ResearchState>({
    phase: 'initializing',
    progress: 0,
    sources: [],
    report: null,
    currentStep: 'Initializing research agent...'
  });

  useEffect(() => {
    const runResearch = async () => {
      // Phase 1: Initializing
      setState(prev => ({ ...prev, phase: 'initializing', progress: 5, currentStep: 'Initializing AI research agent...' }));
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Phase 2: Searching
      setState(prev => ({ ...prev, phase: 'searching', progress: 15, currentStep: 'Searching academic databases and technical resources...' }));
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Generate sources
      const sources = simulateResearch(topic);
      
      // Add sources one by one
      for (let i = 0; i < sources.length; i++) {
        setState(prev => ({
          ...prev,
          progress: 20 + (i / sources.length) * 30,
          currentStep: `Found source ${i + 1}/${sources.length}: ${sources[i].title}`,
          sources: sources.slice(0, i + 1)
        }));
        await new Promise(resolve => setTimeout(resolve, 800));
      }

      // Phase 3: Analyzing
      setState(prev => ({ ...prev, phase: 'analyzing', progress: 55, currentStep: 'Analyzing source credibility and relevance...' }));
      await new Promise(resolve => setTimeout(resolve, 2000));

      setState(prev => ({ ...prev, progress: 65, currentStep: 'Extracting key insights and patterns...' }));
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Phase 4: Synthesizing
      setState(prev => ({ ...prev, phase: 'synthesizing', progress: 75, currentStep: 'Synthesizing information across sources...' }));
      await new Promise(resolve => setTimeout(resolve, 2000));

      setState(prev => ({ ...prev, progress: 85, currentStep: 'Generating executive summary...' }));
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Phase 5: Generating Report
      setState(prev => ({ ...prev, phase: 'generating', progress: 90, currentStep: 'Formatting final report...' }));
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Complete
      const report = generateReport(topic, sources);
      setState(prev => ({ 
        ...prev, 
        phase: 'complete', 
        progress: 100, 
        currentStep: 'Research complete!',
        report 
      }));
    };

    runResearch();
  }, [topic]);

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        {state.phase !== 'complete' ? (
          <motion.div
            key="progress"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <ResearchProgress 
              phase={state.phase}
              progress={state.progress}
              currentStep={state.currentStep}
              topic={topic}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>

      {state.sources.length > 0 && state.phase !== 'complete' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <SourceList sources={state.sources} />
        </motion.div>
      )}

      {state.phase === 'complete' && state.report && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <FinalReport 
            report={state.report} 
            sources={state.sources}
            topic={topic}
            onReset={onReset}
          />
        </motion.div>
      )}
    </div>
  );
}

function generateReport(topic: string, sources: ResearchSource[]) {
  const topicLower = topic.toLowerCase();
  
  return {
    title: `Technical Analysis: ${topic}`,
    executiveSummary: `This comprehensive research report examines ${topic}, synthesizing insights from ${sources.length} authoritative sources including academic publications, industry white papers, and technical documentation. The analysis reveals key trends, implementation strategies, and future directions in this rapidly evolving domain.`,
    keyFindings: [
      `Current state of ${topic} demonstrates significant maturation with widespread adoption across enterprise environments`,
      'Industry leaders have identified scalability and security as primary challenges requiring immediate attention',
      'Emerging best practices emphasize automation, observability, and integration with existing infrastructure',
      'Cost optimization and performance tuning remain critical factors for successful implementation',
      'The technology landscape is rapidly evolving with new tools and frameworks emerging quarterly'
    ],
    sections: [
      {
        title: 'Overview',
        content: `${topic} represents a significant advancement in modern technical infrastructure. Our research indicates that organizations implementing these technologies report improved efficiency, reduced operational overhead, and enhanced system reliability. The fundamental principles underlying this approach have been validated through extensive real-world deployments across diverse use cases.`
      },
      {
        title: 'Technical Architecture',
        content: `The architectural patterns associated with ${topic} emphasize modularity, scalability, and resilience. Key components include distributed processing layers, intelligent orchestration systems, and robust monitoring frameworks. Leading implementations leverage containerization, microservices patterns, and declarative configuration management to achieve optimal results.`
      },
      {
        title: 'Implementation Strategies',
        content: 'Successful deployments follow a phased approach: initial proof-of-concept, limited production rollout, and gradual scaling. Organizations should prioritize security hardening, performance benchmarking, and comprehensive documentation. Integration with existing systems requires careful planning and often benefits from incremental migration strategies.'
      },
      {
        title: 'Challenges and Solutions',
        content: 'Common challenges include complexity in initial setup, learning curve for development teams, and integration with legacy systems. However, these can be mitigated through comprehensive training programs, adoption of standardized tooling, and engagement with community best practices. Many organizations find that early investment in automation pays significant dividends.'
      },
      {
        title: 'Future Outlook',
        content: `The future of ${topic} appears promising, with continued innovation in automation, AI-assisted optimization, and enhanced security features. Industry analysts predict continued growth in adoption rates, particularly in cloud-native environments. Emerging trends suggest increased focus on sustainability, cost efficiency, and developer experience improvements.`
      }
    ],
    recommendations: [
      'Begin with a small-scale pilot project to validate approach and build team expertise',
      'Invest in comprehensive training and certification programs for technical staff',
      'Establish clear governance policies and security standards before broad deployment',
      'Implement robust monitoring and observability from the outset',
      'Engage with community resources and consider managed service options for initial deployments',
      'Plan for iterative improvement and regular reassessment of implementation strategies'
    ],
    conclusion: `${topic} offers substantial benefits for organizations seeking to modernize their technical infrastructure. While implementation requires careful planning and sustained effort, the long-term advantages in terms of efficiency, scalability, and maintainability make it a worthwhile investment. Success depends on strong leadership support, adequate resource allocation, and commitment to continuous learning and improvement.`
  };
}
