import { aauLogoBase64 } from "../constants/image";

// Image utilities for PDF generation and processing
export class ImageUtils {
  private static logoCache: string | null = null;
  
  /**
   * Load AAU logo and convert to base64 data URL
   */
  static async loadAAULogo(): Promise<string> {
    // Return cached version if available
    if (this.logoCache) {
      return this.logoCache;
    }
    
    try {
      // Try to load the actual logo from public folder
      const response = await fetch('/aau-logo.png');
      if (response.ok) {
        const blob = await response.blob();
        const dataUrl = await this.blobToDataUrl(blob);
        this.logoCache = dataUrl;
        return dataUrl;
      }
    } catch (error) {
      console.warn('Failed to load AAU logo, falling back to generated logo:', error);
    }
    
    // Fallback to generated logo
    const fallbackLogo = await this.createFallbackLogo();
    this.logoCache = fallbackLogo;
    return fallbackLogo;
  }
  
  /**
   * Convert blob to data URL
   */
  private static blobToDataUrl(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('Failed to convert blob to data URL'));
      reader.readAsDataURL(blob);
    });
  }
  
  /**
   * Create a fallback AAU logo using canvas
   */
  static async createFallbackLogo(): Promise<string> {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        resolve(this.createSimpleFallbackLogo());
        return;
      }
      
      // Set canvas size
      canvas.width = 120;
      canvas.height = 120;
      
      // Create circular background
      ctx.fillStyle = '#024F33'; // AAU green
      ctx.beginPath();
      ctx.arc(60, 60, 58, 0, 2 * Math.PI);
      ctx.fill();
      
      // Add white border
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 4;
      ctx.stroke();
      
      // Add "AAU" text
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 24px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('AAU', 60, 60);
      
      // Add subtitle
      ctx.font = 'bold 10px Arial';
      ctx.fillText('UGANDA', 60, 85);
      
      resolve(canvas.toDataURL('image/png'));
    });
  }
  
  /**
   * Simple fallback logo as data URL
   */
  private static createSimpleFallbackLogo(): string {
    // Simple 1x1 pixel transparent PNG as absolute fallback
    return aauLogoBase64;
  }
  
  /**
   * Process image for PDF - ensure it's a valid data URL
   */
  static async processImageForPDF(imageUrl: string): Promise<string> {
    if (!imageUrl) {
      return await this.loadAAULogo();
    }
    
    // If it's already a data URL, return it
    if (imageUrl.startsWith('data:')) {
      return imageUrl;
    }
    
    try {
      // Try to fetch and convert to data URL
      const response = await fetch(imageUrl);
      if (response.ok) {
        const blob = await response.blob();
        return await this.blobToDataUrl(blob);
      }
    } catch (error) {
      console.warn('Failed to process image for PDF:', error);
    }
    
    // Fallback to AAU logo
    return await this.loadAAULogo();
  }
  
  /**
   * Pre-load images for better PDF performance
   */
  static async preloadImages(): Promise<void> {
    try {
      await this.loadAAULogo();
      console.log('✅ Images preloaded successfully');
    } catch (error) {
      console.warn('⚠️ Image preloading failed:', error);
    }
  }
  
  /**
   * Clear image cache
   */
  static clearCache(): void {
    this.logoCache = null;
  }
}

export default ImageUtils;
