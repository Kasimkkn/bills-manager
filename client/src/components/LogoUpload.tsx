
import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Upload, X, Image, Camera } from "lucide-react";
import { useInvoice } from '@/contexts/InvoiceContext';

const LogoUpload = () => {
  const { invoice, updateBusinessInfo } = useInvoice();
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setUploading(true);
    
    try {
      // Convert file to base64 for storage
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        updateBusinessInfo({ logo: result });
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading logo:', error);
      setUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const removeLogo = () => {
    updateBusinessInfo({ logo: undefined });
  };

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium text-foreground">
        Business Logo
      </Label>

      {invoice.businessInfo.logo ? (
        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <img
                src={invoice.businessInfo.logo}
                alt="Business Logo"
                className="w-16 h-16 object-contain rounded-lg border border-border/50"
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Logo uploaded</p>
                <p className="text-xs text-muted-foreground">
                  Your logo will appear on the invoice
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={removeLogo}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card 
          className={`border-2 border-dashed transition-colors cursor-pointer ${
            dragActive 
              ? 'border-primary bg-primary/5' 
              : 'border-border/50 hover:border-primary/50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <CardContent className="p-8">
            <div className="text-center">
              {uploading ? (
                <div className="animate-pulse">
                  <Upload className="w-8 h-8 mx-auto mb-4 text-primary" />
                  <p className="text-sm text-foreground">Uploading logo...</p>
                </div>
              ) : (
                <>
                  <div className="flex justify-center space-x-2 mb-4">
                    <Image className="w-8 h-8 text-muted-foreground" />
                    <Camera className="w-8 h-8 text-muted-foreground lg:hidden" />
                  </div>
                  <p className="text-sm font-medium text-foreground mb-2">
                    Drop your logo here, or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground mb-4">
                    PNG, JPG or SVG up to 5MB
                  </p>
                  <Button variant="outline" size="sm" type="button">
                    <Upload className="w-4 h-4 mr-2" />
                    Choose File
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="hidden"
        capture="environment" // Enable camera on mobile
      />
    </div>
  );
};

export default LogoUpload;
