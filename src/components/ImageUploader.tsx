import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface ImageUploaderProps {
  onImageSelected: (file: File) => void;
  onAnalyze: () => void;
  selectedFile: File | null;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected, onAnalyze, selectedFile }) => {
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const processFile = (file: File) => {
    // Check if the file is an image
    if (!file.type.match('image.*')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPEG, PNG, etc.)",
        variant: "destructive"
      });
      return;
    }
    
    // Preview the image
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
    
    // Pass the file to the parent component
    onImageSelected(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl(null);
    onImageSelected(null);
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="w-full animate-fade-in">
      <div 
        onClick={!previewUrl ? handleClick : undefined}
        className={`neural-card h-64 flex flex-col items-center justify-center p-6 transition-all duration-300 ${
          dragActive ? 'border-neural-accent border-2 scale-[1.01] shadow-lg shadow-neural-accent/20' : ''
        } ${previewUrl ? 'border-neural-accent/50' : 'cursor-pointer hover:border-neural-accent/30'}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {previewUrl ? (
          <div className="relative w-full h-full">
            <img 
              src={previewUrl} 
              alt="Brain MRI Preview" 
              className="w-full h-full object-contain rounded animate-scale-in"
            />
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveImage();
              }}
              className="absolute top-2 right-2 bg-neural-primary/80 rounded-full p-1 hover:bg-neural-accent transition-colors"
            >
              <X className="h-4 w-4 text-white" />
            </button>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center text-center">
              <div className="bg-neural-accent/10 p-3 rounded-full mb-4">
                <Upload className="h-6 w-6 text-neural-accent" />
              </div>
              <p className="text-neural-highlight mb-2">Upload Brain MRI Image</p>
              <p className="text-sm text-muted-foreground max-w-xs">
                Drop your MRI image here, or click to browse
              </p>
            </div>
          </>
        )}
        
        <input
          ref={inputRef}
          type="file"
          id="file-upload"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
      </div>
      
      {!previewUrl && (
        <div className="flex justify-center mt-4">
          <Button 
            onClick={handleClick}
            className="bg-neural-primary hover:bg-neural-secondary transition-colors"
          >
            <ImageIcon className="mr-2 h-4 w-4" />
            Select MRI Image
          </Button>
        </div>
      )}
      
      {previewUrl && (
        <div className="mt-4 flex justify-center">
          <Button 
            onClick={onAnalyze}
            className="bg-neural-primary hover:bg-neural-secondary transition-colors"
            disabled={!selectedFile}
          >
            Analyze MRI
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
