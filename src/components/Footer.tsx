import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-neural-primary/10 border-t border-neural-accent/10 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-neural-highlight font-semibold mb-4">About</h4>
            <p className="text-sm text-white/70">
              Dementia Dreamscape is an AI-powered platform designed to assist in the early detection
              of dementia through MRI analysis.
            </p>
          </div>
          
          <div>
            <h4 className="text-neural-highlight font-semibold mb-4">Important Notice</h4>
            <p className="text-sm text-white/70">
              This tool is for educational and research purposes only. It is not a substitute for
              professional medical diagnosis or advice.
            </p>
          </div>
          
          <div>
            <h4 className="text-neural-highlight font-semibold mb-4">Contact</h4>
            <p className="text-sm text-white/70">
              For questions or support, please reach out to me at <a href="mailto:arittrabag@gmail.com" className="text-neural-highlight hover:text-neural-accent">arittrabag@gmail.com</a>
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-neural-accent/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/50">
            © {new Date().getFullYear()} Arittra Bag. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 