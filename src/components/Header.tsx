import React from 'react';
import { Brain } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full py-6 px-4 sm:px-6 flex justify-between items-center neural-card mb-8 animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Brain className="h-8 w-8 text-neural-accent animate-pulse-slow" />
          <div className="absolute inset-0 bg-neural-accent/20 rounded-full blur-md animate-pulse-slow"></div>
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">Dementia Dreamscape</h1>
          <p className="text-xs text-neural-highlight/80">AI-Powered Alzheimer's Detection</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
