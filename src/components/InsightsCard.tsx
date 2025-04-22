import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { SparkleIcon, ChevronDown, ChevronUp } from 'lucide-react';

interface InsightsCardProps {
  insights: string | null;
  isLoading?: boolean;
}

const InsightsCard: React.FC<InsightsCardProps> = ({ insights, isLoading = false }) => {
  const [expanded, setExpanded] = useState(false);
  const [typedInsights, setTypedInsights] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (insights && !isLoading) {
      setTypedInsights('');
      setIsTyping(true);
      let i = 0;
      const intervalId = setInterval(() => {
        setTypedInsights(insights.substring(0, i));
        i++;
        if (i > insights.length) {
          clearInterval(intervalId);
          setIsTyping(false);
          
          // Check if content is overflowing
          if (contentRef.current) {
            setShowReadMore(contentRef.current.scrollHeight > contentRef.current.clientHeight);
          }
        }
      }, 20); // Adjust speed as needed
      
      return () => clearInterval(intervalId);
    }
  }, [insights, isLoading]);

  // Format text with proper line breaks and spacing
  const formatText = (text: string) => {
    return text.split('\n').map((line, index) => {
      // Check if line is a heading (numbered or not)
      const isHeading = /^\d+\.|\bMRI Brain Scan Analysis Report\b/.test(line);
      const headingClass = isHeading ? 'text-neural-highlight font-semibold text-lg mt-6 mb-3' : '';
      
      // Skip empty lines
      if (!line.trim()) return null;
      
      return (
        <p 
          key={index} 
          className={`${headingClass} ${!isHeading ? 'mb-3 text-white/90 leading-relaxed' : ''}`}
        >
          {line.trim()}
        </p>
      );
    });
  };

  return (
    <Card className="neural-card p-5 animate-fade-in overflow-hidden">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="bg-neural-primary/20 p-2 rounded-full">
            <SparkleIcon className="h-5 w-5 text-neural-accent" />
          </div>
          <h3 className="text-lg font-semibold text-white">AI Insights</h3>
        </div>

        {isLoading ? (
          <div className="space-y-3 py-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-4 w-full bg-neural-primary/20 rounded animate-pulse"></div>
            ))}
          </div>
        ) : insights ? (
          <div className="relative">
            <div 
              ref={contentRef}
              className={`transition-all duration-300 ${
                expanded ? 'max-h-none' : 'max-h-[400px] overflow-y-auto pr-4'
              } scrollbar-thin scrollbar-thumb-neural-accent/20 scrollbar-track-neural-primary/10 hover:scrollbar-thumb-neural-accent/30`}
            >
              <div className="space-y-1">
                {formatText(typedInsights)}
                {isTyping && (
                  <span className="inline-block w-1 h-4 bg-neural-accent animate-pulse ml-1"></span>
                )}
              </div>
            </div>
            
            {showReadMore && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-1 mt-4 text-neural-highlight hover:text-neural-accent transition-colors font-semibold"
              >
                {expanded ? (
                  <>
                    <ChevronUp className="h-4 w-4" />
                    <span className="text-sm">Show Less</span>
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4" />
                    <span className="text-sm">Show Full Report</span>
                  </>
                )}
              </button>
            )}
          </div>
        ) : (
          <div className="py-8 text-center">
            <p className="text-neural-highlight/70">Upload an MRI image to generate AI insights</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default InsightsCard;
