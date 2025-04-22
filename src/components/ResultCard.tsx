
import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Brain, AlertCircle, Check } from 'lucide-react';

export interface Confidence {
  [key: string]: number;
}

interface ResultCardProps {
  predictedClass: string | null;
  confidences: Confidence | null;
  isLoading?: boolean;
}

const ResultCard: React.FC<ResultCardProps> = ({ 
  predictedClass, 
  confidences, 
  isLoading = false 
}) => {
  const getSeverityColor = (classification: string) => {
    switch (classification) {
      case "Non Demented":
        return "bg-green-500";
      case "Very Mild Dementia":
        return "bg-yellow-500";
      case "Mild Dementia":
        return "bg-orange-500";
      case "Moderate Dementia":
        return "bg-red-500";
      default:
        return "bg-neural-accent";
    }
  };

  const getSeverityIcon = (classification: string) => {
    switch (classification) {
      case "Non Demented":
        return <Check className="h-5 w-5 text-green-500" />;
      case "Very Mild Dementia":
      case "Mild Dementia":
      case "Moderate Dementia":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Brain className="h-5 w-5 text-neural-accent" />;
    }
  };

  const getConfidenceBarColor = (confidence: number) => {
    if (confidence > 0.7) return "bg-green-500";
    if (confidence > 0.4) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Card className="neural-card p-5 animate-fade-in">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="bg-neural-primary/20 p-2 rounded-full">
            <Brain className="h-5 w-5 text-neural-accent" />
          </div>
          <h3 className="text-lg font-semibold text-white">Diagnosis Results</h3>
        </div>

        {isLoading ? (
          <div className="space-y-4 py-4">
            <div className="h-7 w-3/4 bg-neural-primary/20 rounded animate-pulse"></div>
            <div className="space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="h-4 w-32 bg-neural-primary/20 rounded animate-pulse"></div>
                  <div className="h-2 flex-1 bg-neural-primary/20 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        ) : predictedClass ? (
          <>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-neural-primary/20">
              {getSeverityIcon(predictedClass)}
              <span className="text-lg font-medium text-white">
                {predictedClass}
              </span>
              <span className={`ml-auto h-3 w-3 rounded-full ${getSeverityColor(predictedClass)}`}></span>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-medium text-neural-highlight/80">Confidence Scores</h4>
              {confidences && Object.entries(confidences).map(([label, confidence]) => (
                <div key={label} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white/80">{label}</span>
                    <span className="text-sm font-medium text-white/90">{(confidence * 100).toFixed(1)}%</span>
                  </div>
                  <Progress 
                    value={confidence * 100} 
                    className="h-2 bg-neural-primary/20" 
                    indicatorClassName={getConfidenceBarColor(confidence)}
                  />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="py-8 text-center">
            <p className="text-neural-highlight/70">Upload an MRI image to see results</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ResultCard;
