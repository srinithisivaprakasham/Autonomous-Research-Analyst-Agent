import type { ResearchSource } from '../types/research';

const sourceTemplates = {
  academic: [
    {
      titlePatterns: [
        'A Comprehensive Survey of {topic}: Methods and Applications',
        '{topic}: Theoretical Foundations and Practical Implementations',
        'Advances in {topic}: A Systematic Review',
        'Understanding {topic}: Analysis and Future Directions',
        'The Evolution of {topic} in Modern Systems'
      ],
      authors: [
        'Smith, J. et al.',
        'Johnson, M. & Chen, L.',
        'Williams, R. et al.',
        'Brown, A. & Davis, K.',
        'Martinez, C. et al.'
      ],
      descriptions: [
        'Peer-reviewed academic paper presenting novel research findings and theoretical framework.',
        'Published in a top-tier conference proceedings with rigorous peer review.',
        'Comprehensive literature review synthesizing decades of research.',
        'Empirical study with quantitative analysis and statistical validation.',
        'Theoretical analysis with mathematical proofs and formal verification.'
      ]
    }
  ],
  industry: [
    {
      titlePatterns: [
        'Best Practices for Implementing {topic} at Scale',
        '{topic} in Production: Lessons Learned',
        'Enterprise Guide to {topic} Architecture',
        'Optimizing {topic} for Performance and Reliability',
        'Real-World {topic} Case Studies'
      ],
      authors: [
        'Google Cloud Team',
        'AWS Technical Writers',
        'Microsoft Research',
        'Meta Engineering',
        'Netflix Tech Blog'
      ],
      descriptions: [
        'Industry white paper detailing production implementation strategies.',
        'Technical blog post from leading technology company.',
        'Enterprise architecture guide with proven design patterns.',
        'Case study demonstrating successful large-scale deployment.',
        'Engineering insights from high-traffic production systems.'
      ]
    }
  ],
  documentation: [
    {
      titlePatterns: [
        'Official {topic} Documentation and Reference',
        '{topic} Technical Specification v2.0',
        'Complete Guide to {topic} APIs',
        '{topic} Design Patterns and Examples',
        'Getting Started with {topic}: Official Tutorial'
      ],
      authors: [
        'Official Documentation Team',
        'Core Maintainers',
        'Technical Standards Committee',
        'Open Source Contributors',
        'Project Steering Group'
      ],
      descriptions: [
        'Comprehensive official documentation with API references.',
        'Technical specification defining standard protocols and interfaces.',
        'Community-maintained guide with extensive code examples.',
        'Tutorial series covering fundamental concepts and advanced topics.',
        'Reference implementation with detailed architecture documentation.'
      ]
    }
  ]
};

export function simulateResearch(topic: string): ResearchSource[] {
  const sources: ResearchSource[] = [];
  const sourceTypes: ('academic' | 'industry' | 'documentation')[] = ['academic', 'industry', 'documentation'];
  
  // Generate 8-12 sources
  const numSources = 8 + Math.floor(Math.random() * 5);
  
  for (let i = 0; i < numSources; i++) {
    const type = sourceTypes[i % sourceTypes.length];
    const template = sourceTemplates[type][0];
    
    const titlePattern = template.titlePatterns[Math.floor(Math.random() * template.titlePatterns.length)];
    const title = titlePattern.replace('{topic}', topic);
    
    const author = template.authors[Math.floor(Math.random() * template.authors.length)];
    const description = template.descriptions[Math.floor(Math.random() * template.descriptions.length)];
    
    // Generate date within last 3 years
    const year = 2023 + Math.floor(Math.random() * 3);
    const month = Math.floor(Math.random() * 12) + 1;
    const date = `${year}-${month.toString().padStart(2, '0')}`;
    
    // Credibility score (7-10 for high quality sources)
    const credibilityScore = 7 + Math.floor(Math.random() * 4);
    
    sources.push({
      id: `source-${i}`,
      title,
      author,
      date,
      type,
      url: `https://example.com/research/${i}`,
      description,
      credibilityScore
    });
  }
  
  // Sort by credibility score (highest first)
  return sources.sort((a, b) => b.credibilityScore - a.credibilityScore);
}
