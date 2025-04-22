import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ImageUploader from '@/components/ImageUploader';
import ResultCard from '@/components/ResultCard';
import InsightsCard from '@/components/InsightsCard';
import NeuralBackground from '@/components/NeuralBackground';
import { Brain, Database, Activity, SparkleIcon } from 'lucide-react';
import { analyzeMRI } from '@/services/dementiaApi';
import { Confidence } from '@/components/ResultCard';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [predictedClass, setPredictedClass] = useState<string | null>(null);
  const [confidences, setConfidences] = useState<Confidence | null>(null);
  const [insights, setInsights] = useState<string | null>(null);
  const { toast } = useToast();

  const handleImageSelected = (file: File | null) => {
    setSelectedFile(file);
    // Reset analysis results when new image is selected or removed
    setPredictedClass(null);
    setConfidences(null);
    setInsights(null);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    
    try {
      setIsAnalyzing(true);
      
      toast({
        title: "Processing MRI",
        description: "Analyzing brain scan for dementia patterns...",
      });
      
      const result = await analyzeMRI(selectedFile);
      
      setPredictedClass(result.predictedClass);
      setConfidences(result.confidences);
      setInsights(result.insights);
      
      toast({
        title: "Analysis Complete",
        description: `Detected: ${result.predictedClass}`,
        variant: result.predictedClass === "Non Demented" ? "default" : "destructive",
      });
    } catch (error) {
      console.error("Error analyzing image:", error);
      toast({
        title: "Analysis Failed",
        description: "There was an error processing your MRI image.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <NeuralBackground />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <Header />
          
          <section id="about" className="mb-16 neural-card p-8 animate-fade-in">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-4 text-gradient">Dementia Dreamscape</h2>
                <p className="mb-4 text-white/80">
                  Welcome to our advanced AI-powered Alzheimer's detection platform. Our system uses 
                  cutting-edge deep learning to analyze brain MRI scans and identify potential signs of 
                  different stages of dementia.
                </p>
                <p className="text-white/80">
                  Simply upload a brain MRI scan, and our AI will analyze it to provide insights about 
                  potential signs of Alzheimer's disease or related dementias.
                </p>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="w-64 h-64 relative animate-float">
                  <div className="absolute inset-0 bg-neural-accent/20 rounded-full blur-xl"></div>
                  <Brain className="w-64 h-64 text-neural-accent/80" />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
              <FeatureCard 
                icon={<Brain />}
                title="Advanced AI Analysis"
                description="Our deep learning model is trained on thousands of MRI scans to accurately identify patterns of dementia."
              />
              <FeatureCard 
                icon={<Activity />}
                title="Detailed Results"
                description="Get comprehensive analysis of dementia stage with confidence scores for each classification."
              />
              <FeatureCard 
                icon={<SparkleIcon />}
                title="AI-Generated Insights"
                description="Receive AI-generated insights about the findings and potential next steps based on the analysis."
              />
            </div>
          </section>
          
          <section id="detection" className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-gradient">MRI Analysis</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl mb-4 text-white/90">Upload Brain MRI</h3>
                <ImageUploader 
                  onImageSelected={handleImageSelected}
                  onAnalyze={handleAnalyze}
                  selectedFile={selectedFile}
                />
              </div>
              <div>
                <h3 className="text-xl mb-4 text-white/90">Analysis Results</h3>
                <ResultCard 
                  predictedClass={predictedClass} 
                  confidences={confidences} 
                  isLoading={isAnalyzing}
                />
              </div>
            </div>
          </section>
          
          <section id="insights" className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-gradient">AI Insights</h2>
            <InsightsCard insights={insights} isLoading={isAnalyzing} />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="p-6 bg-neural-primary/10 rounded-xl border border-neural-accent/10 hover:border-neural-accent/30 transition-all hover:shadow-lg hover:shadow-neural-accent/10">
      <div className="w-12 h-12 bg-neural-primary/20 rounded-full flex items-center justify-center mb-4 text-neural-accent">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-white mb-2">{title}</h3>
      <p className="text-white/70 text-sm">{description}</p>
    </div>
  );
};

export default Index;
