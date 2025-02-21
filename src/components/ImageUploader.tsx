
import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageIcon, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { removeBackground, loadImage } from '@/utils/backgroundRemoval';

export const ImageUploader = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);

  const handleImageUpload = useCallback(async (file: File) => {
    try {
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }

      setIsProcessing(true);
      setOriginalImage(URL.createObjectURL(file));

      const image = await loadImage(file);
      const processedBlob = await removeBackground(image);
      const processedUrl = URL.createObjectURL(processedBlob);
      
      setProcessedImage(processedUrl);
      toast.success('Background removed successfully!');
    } catch (error) {
      console.error('Error processing image:', error);
      toast.error('Failed to process image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file) {
        handleImageUpload(file);
      }
    },
    [handleImageUpload]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleImageUpload(file);
      }
    },
    [handleImageUpload]
  );

  const downloadImage = useCallback(() => {
    if (processedImage) {
      const link = document.createElement('a');
      link.href = processedImage;
      link.download = 'processed-image.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [processedImage]);

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          className={cn(
            'relative min-h-[400px] rounded-xl border-2 border-dashed transition-all',
            isDragging
              ? 'border-primary bg-primary/10'
              : 'border-gray-200 bg-gray-50/50',
            !originalImage && 'hover:border-primary hover:bg-primary/5'
          )}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="file-upload"
            onChange={handleFileInput}
          />
          
          {!originalImage ? (
            <label
              htmlFor="file-upload"
              className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer"
            >
              <Upload className="w-12 h-12 mb-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-600">
                Drop your image here or click to upload
              </span>
              <span className="mt-2 text-xs text-gray-400">
                Supports: PNG, JPG, WEBP
              </span>
            </label>
          ) : (
            <div className="relative w-full h-full">
              <img
                src={originalImage}
                alt="Original"
                className="absolute inset-0 w-full h-full object-contain rounded-lg"
              />
              {isProcessing && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
                  <div className="text-white text-center">
                    <div className="loading-spinner mb-2"></div>
                    <p>Processing...</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="relative min-h-[400px] rounded-xl border-2 border-dashed border-gray-200 bg-[linear-gradient(45deg,#eee_25%,transparent_25%),linear-gradient(-45deg,#eee_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#eee_75%),linear-gradient(-45deg,transparent_75%,#eee_75%)] bg-[length:20px_20px] bg-[position:0_0,0_10px,10px_-10px,-10px_0]">
          {processedImage ? (
            <>
              <img
                src={processedImage}
                alt="Processed"
                className="absolute inset-0 w-full h-full object-contain rounded-lg"
              />
              <button
                onClick={downloadImage}
                className="absolute bottom-4 right-4 px-4 py-2 bg-primary text-white rounded-lg shadow-lg hover:bg-primary/90 transition-colors"
              >
                Download
              </button>
            </>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <ImageIcon className="w-12 h-12 text-gray-400 mb-4" />
              <span className="text-sm font-medium text-gray-600">
                Processed image will appear here
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
