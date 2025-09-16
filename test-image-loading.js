// Test script for image loading functionality
// This can be run in the browser console to test the new ImageUtils
// Make sure to run this after the page loads and ImageUtils is available

(async () => {
  console.log('🔍 Testing enhanced image loading system...');
  
  // Test the ImageUtils directly - check if it's available in window scope
  const ImageUtils = window.ImageUtils;
  
  if (ImageUtils) {
    try {
      console.log('⏳ Loading AAU logo...');
      const logo = await ImageUtils.loadAAULogo();
      console.log('✅ Logo loaded successfully:', logo.substring(0, 100) + '...');
      
      // Test with a sample base64 image (1x1 pixel)
      console.log('⏳ Testing image processing...');
      const testImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChAFyWce9vAAAAABJRU5ErkJggg==';
      const processed = await ImageUtils.processImageForPDF(testImage);
      console.log('✅ Image processing works:', processed.substring(0, 100) + '...');
      
      // Test fallback logo creation
      console.log('⏳ Creating fallback logo...');
      const fallback = await ImageUtils.createFallbackLogo();
      console.log('✅ Fallback logo created:', fallback.substring(0, 100) + '...');
      
      // Test image preloading
      console.log('⏳ Testing image preloading...');
      await ImageUtils.preloadImages();
      
      console.log('🎉 All image loading tests passed!');
      
      // Display results visually
      const testDiv = document.createElement('div');
      testDiv.style.cssText = `
        position: fixed; 
        top: 20px; 
        right: 20px; 
        background: white; 
        border: 2px solid #4CAF50; 
        border-radius: 8px; 
        padding: 16px; 
        z-index: 9999;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      `;
      testDiv.innerHTML = `
        <h3 style="margin: 0 0 12px 0; color: #4CAF50;">✅ Image Tests Passed</h3>
        <div style="margin: 8px 0;">
          <strong>Logo Preview:</strong><br>
          <img src="${logo}" style="width: 60px; height: 60px; border-radius: 50%; border: 2px solid #ddd;" />
        </div>
        <div style="margin: 8px 0;">
          <strong>Fallback Preview:</strong><br>
          <img src="${fallback}" style="width: 60px; height: 60px; border-radius: 50%; border: 2px solid #ddd;" />
        </div>
        <button onclick="this.parentElement.remove()" style="margin-top: 8px; padding: 4px 8px; background: #f44336; color: white; border: none; border-radius: 4px; cursor: pointer;">Close</button>
      `;
      document.body.appendChild(testDiv);
      
    } catch (error) {
      console.error('❌ Image loading test failed:', error);
      
      // Display error visually
      const errorDiv = document.createElement('div');
      errorDiv.style.cssText = `
        position: fixed; 
        top: 20px; 
        right: 20px; 
        background: white; 
        border: 2px solid #f44336; 
        border-radius: 8px; 
        padding: 16px; 
        z-index: 9999;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      `;
      errorDiv.innerHTML = `
        <h3 style="margin: 0 0 12px 0; color: #f44336;">❌ Image Test Failed</h3>
        <p style="margin: 0; color: #666; font-size: 14px;">${error.message}</p>
        <button onclick="this.parentElement.remove()" style="margin-top: 8px; padding: 4px 8px; background: #f44336; color: white; border: none; border-radius: 4px; cursor: pointer;">Close</button>
      `;
      document.body.appendChild(errorDiv);
    }
  } else {
    console.log('❌ ImageUtils not available - make sure it\'s loaded globally');
    console.log('💡 Tip: Import ImageUtils in your main application and attach to window for testing');
    
    // Create a helpful message div
    const infoDiv = document.createElement('div');
    infoDiv.style.cssText = `
      position: fixed; 
      top: 20px; 
      right: 20px; 
      background: white; 
      border: 2px solid #FF9800; 
      border-radius: 8px; 
      padding: 16px; 
      z-index: 9999;
      max-width: 300px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    infoDiv.innerHTML = `
      <h3 style="margin: 0 0 12px 0; color: #FF9800;">⚠️ ImageUtils Not Available</h3>
      <p style="margin: 0; color: #666; font-size: 14px;">
        Run this test after the application loads, or import ImageUtils globally.
      </p>
      <button onclick="this.parentElement.remove()" style="margin-top: 8px; padding: 4px 8px; background: #FF9800; color: white; border: none; border-radius: 4px; cursor: pointer;">Close</button>
    `;
    document.body.appendChild(infoDiv);
  }
})();
