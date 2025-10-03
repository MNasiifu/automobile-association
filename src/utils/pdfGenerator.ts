import html2pdf from 'html2pdf.js';
import { ImageUtils } from './imageUtils';

export interface IDPVerificationData {
  id: string;
  onames: string;
  surname: string;
  passport: string;
  classes: string;
  issuedate: string;
  expirydate: string;
  pp_photo?: string | null;
  idp_available: boolean;
}

export interface ExpiryInfo {
  status: string;
  daysRemaining: number;
  message: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon?: any; // Optional React element for the icon
}

// HTML template generator for PDF conversion
const createVerificationCertificateHTML = async (
  data: IDPVerificationData,
  expiryInfo: ExpiryInfo,
  verificationTime: string
): Promise<string> => {
  // Load AAU logo as base64 with better error handling
  let aauLogoDataUrl: string;
  try {
    aauLogoDataUrl = await ImageUtils.loadAAULogo();
  } catch (error) {
    console.warn('Failed to load AAU logo, using fallback:', error);
    aauLogoDataUrl = await ImageUtils.createFallbackLogo();
  }
  
  // Process passport photo if available
  let passportPhotoDataUrl: string | null = null;
  if (data.pp_photo) {
    try {
      passportPhotoDataUrl = await ImageUtils.processImageForPDF(data.pp_photo);
      console.log('::debug Passport photo processed, length:', passportPhotoDataUrl.length);
    } catch (error) {
      console.warn('Failed to process passport photo:', error);
      passportPhotoDataUrl = null;
    }
  }
  const statusClass = data.idp_available ? 
    (expiryInfo.status === 'expired' ? 'expired' : 
     expiryInfo.status === 'expires-soon' ? 'warning' : 'valid') : 
    'not-found';

  const statusText = data.idp_available ? 
    (expiryInfo.status === 'expired' ? '⚠️ EXPIRED IDP' : 
     expiryInfo.status === 'expires-soon' ? '⏰ EXPIRES SOON' : '✅ VERIFIED & VALID') : 
    '❌ NOT FOUND';

  const issueDate = data.idp_available ? new Date(data.issuedate).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }) : '';

  const expiryDate = data.idp_available ? new Date(data.expirydate).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long', 
    year: 'numeric'
  }) : '';

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>IDP Verification Certificate</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: Arial, sans-serif;
          line-height: 1.4;
          color: #333;
          background: white;
        }
        
        .certificate {
          width: 210mm;
          min-height: 297mm;
          padding: 20mm;
          margin: 0;
          background: white;
          position: relative;
          display: block;
          page-break-inside: avoid;
        }
        
        .header {
          background: linear-gradient(135deg, #024F33 0%, #2E7D57 100%);
          color: white;
          padding: 5mm 0;
          margin: -20mm -20mm 6mm -20mm;
          position: relative;
          display: block;
          overflow: hidden;
        }
        
        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }
        
        .logo-section {
          display: flex;
          align-items: center;
          padding-left: 20mm;
        }
        
        .logo {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: 3px solid white;
          margin-right: 15mm;
          object-fit: cover;
          background: white;
        }
        
        .header-text {
          flex: 1;
          padding-right: 20mm;
        }
        
        .header h1 {
          font-size: 28px;
          font-weight: bold;
          margin-bottom: 5px;
        }
        
        .header .subtitle {
          font-size: 14px;
          opacity: 0.9;
        }
        
        .status-banner {
          padding: 15px;
          text-align: center;
          color: white;
          font-size: 20px;
          font-weight: bold;
          margin: 20px 0;
          border-radius: 8px;
        }
        
        .status-banner.valid { background: #4CAF50; }
        .status-banner.warning { background: #FF9800; }
        .status-banner.expired { background: #D32F2F; }
        .status-banner.not-found { background: #757575; }
        
        .content-section {
          margin: 20px 0;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          overflow: hidden;
        }
        
        .section-header {
          background: #f5f5f5;
          padding: 10px 15px;
          font-weight: bold;
          color: #024F33;
          border-bottom: 1px solid #e0e0e0;
        }
        
        .section-content {
          padding: 20px;
        }
        
        .person-info {
          display: flex;
          gap: 20px;
          align-items: flex-start;
        }
        
        .photo-container {
          width: 120px;
          height: 150px;
          border: 2px solid #ddd;
          border-radius: 8px;
          overflow: hidden;
          background: #f9f9f9;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #666;
          flex-shrink: 0;
        }
        
        .passport-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .person-details {
          flex: 1;
        }
        
        .detail-row {
          margin: 10px 0;
          display: flex;
          flex-wrap: wrap;
        }
        
        .detail-label {
          font-weight: bold;
          min-width: 120px;
          color: #555;
        }
        
        .detail-value {
          color: #333;
          font-weight: 500;
        }
        
        .name {
          font-size: 24px;
          font-weight: bold;
          color: #024F33;
          margin-bottom: 15px;
        }
        
        .status-message {
          background: #f8f9fa;
          border: 1px solid #dee2e6;
          border-radius: 8px;
          padding: 15px;
          margin: 15px 0;
        }
        
        .status-message.valid {
          background: #d4edda;
          border-color: #c3e6cb;
          color: #155724;
        }
        
        .status-message.warning {
          background: #fff3cd;
          border-color: #ffeeba;
          color: #856404;
        }
        
        .status-message.expired {
          background: #f8d7da;
          border-color: #f5c6cb;
          color: #721c24;
        }
        
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 2px solid #024F33;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          font-size: 12px;
        }
        
        .footer-info {
          flex: 1;
        }
        
        .footer-info h4 {
          color: #024F33;
          margin-bottom: 5px;
        }
        
        .digital-signature {
          background: #024F33;
          color: white;
          padding: 15px 20px;
          border-radius: 8px;
          text-align: center;
          min-width: 200px;
        }
        
        .digital-signature .title {
          font-weight: bold;
          font-size: 11px;
        }
        
        .digital-signature .subtitle {
          font-size: 9px;
          opacity: 0.8;
        }
        
        @media print {
          .certificate {
            margin: 0;
            padding: 15mm;
          }
        }
      </style>
    </head>
    <body>
      <div class="certificate">
        <!-- Header with Logo -->
        <div class="header">
          <div class="header-content">
            <div class="logo-section">
              <img src="${aauLogoDataUrl}" alt="AAU Logo" class="logo" />
            </div>
            <div class="header-text">
              <h1>IDP VERIFICATION CERTIFICATE</h1>
              <div class="subtitle">Official Verification Report</div>
              <div class="subtitle">Automobile Association of Uganda</div>
            </div>
          </div>
        </div>

        <!-- Status Banner -->
        <div class="status-banner ${statusClass}">
          ${statusText}
        </div>

        ${data.idp_available ? `
        <!-- Permit Holder Information -->
        <div class="content-section">
          <div class="section-header">PERMIT HOLDER INFORMATION</div>
          <div class="section-content">
            <div class="person-info">
              <div class="photo-container">
                ${passportPhotoDataUrl ? 
                  `<img src="${passportPhotoDataUrl}" alt="Passport Photo" class="passport-photo" />` :
                  '<div>Photo</div>'
                }
              </div>
              <div class="person-details">
                <div class="name">${data.onames.toUpperCase()} ${data.surname.toUpperCase()}</div>
                <div class="detail-row">
                  <span class="detail-label">IDP Number:</span>
                  <span class="detail-value">${data.id}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Passport:</span>
                  <span class="detail-value">${data.passport}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Authorized Classes:</span>
                  <span class="detail-value">${data.classes}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Permit Validity Details -->
        <div class="content-section">
          <div class="section-header">PERMIT VALIDITY DETAILS</div>
          <div class="section-content">
            <div class="detail-row">
              <span class="detail-label">Issue Date:</span>
              <span class="detail-value">${issueDate}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Expiry Date:</span>
              <span class="detail-value">${expiryDate}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Status:</span>
              <span class="detail-value" style="color: ${expiryInfo.color}">
                ${expiryInfo.status.toUpperCase().replace('-', ' ')}
              </span>
            </div>
            
            <div class="status-message ${statusClass}">
              ${expiryInfo.message}
            </div>
          </div>
        </div>

        <!-- International Recognition -->
        <div class="content-section">
          <div class="section-header">INTERNATIONAL RECOGNITION</div>
          <div class="section-content">
            <p>This International Driving Permit is recognized in 150+ countries under the 1968 Vienna Convention on Road Traffic. Valid for international driving when accompanied by your national driving license.</p>
          </div>
        </div>
        ` : `
        <!-- Not Found Section -->
        <div class="content-section">
          <div class="section-header">VERIFICATION RESULT</div>
          <div class="section-content">
            <p><strong>IDP Number ${data.id} was not found</strong> in the AA Uganda database.</p>
            <p>Please verify the number and try again, or contact AA Uganda for assistance.</p>
          </div>
        </div>
        `}

        <!-- Footer -->
        <div class="footer">
          <div class="footer-info">
            <h4>Automobile Association of Uganda</h4>
            <p>Plot 4 Old Portbell Road Suite 8, Kampala, Uganda</p>
            <p>Phone: +256 786 623 001 | Email: info@aau.co.ug</p>
            <p style="margin-top: 10px; font-size: 10px; color: #666;">
              Verification Time: ${verificationTime}<br>
              This is an automatically generated verification certificate.
            </p>
          </div>
          <div class="digital-signature">
            <div class="title">DIGITALLY VERIFIED</div>
            <div class="subtitle">AA UGANDA OFFICIAL</div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

// New HTML-to-PDF approach using html2pdf.js
export const generateIDPVerificationPDF = async (
  data: IDPVerificationData,
  expiryInfo: ExpiryInfo,
  verificationTime: string = new Date().toLocaleString('en-GB')
): Promise<void> => {
  try {
    // Generate the HTML content with loaded images
    const htmlContent = await createVerificationCertificateHTML(data, expiryInfo, verificationTime);
    
    // Create a temporary container for the HTML - make it visible but off-screen
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'fixed';
    tempDiv.style.top = '0';
    tempDiv.style.left = '0';
    tempDiv.style.width = '210mm';
    tempDiv.style.height = 'auto';
    tempDiv.style.zIndex = '-1000';
    tempDiv.style.opacity = '0';
    tempDiv.style.pointerEvents = 'none';
    tempDiv.innerHTML = htmlContent;
    
    document.body.appendChild(tempDiv);
    
    // Wait a bit for the DOM to settle
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Wait for images to load properly
    const images = tempDiv.querySelectorAll('img');
    console.log('::debug Found images:', images.length);
    
    const imageLoadPromises = Array.from(images).map((img, index) => {
      return new Promise<void>((resolve) => {
        if (img.complete && img.naturalWidth > 0) {
          console.log(`::debug Image ${index} already loaded`);
          resolve();
        } else {
          const onLoad = () => {
            console.log(`::debug Image ${index} loaded successfully`);
            img.removeEventListener('load', onLoad);
            img.removeEventListener('error', onError);
            resolve();
          };
          
          const onError = () => {
            console.warn(`::debug Image ${index} failed to load`);
            img.removeEventListener('load', onLoad);
            img.removeEventListener('error', onError);
            resolve();
          };
          
          img.addEventListener('load', onLoad);
          img.addEventListener('error', onError);
          
          // Force reload if src is already set
          if (img.src) {
            const currentSrc = img.src;
            img.src = '';
            img.src = currentSrc;
          }
          
          // Timeout after 8 seconds
          setTimeout(() => {
            console.warn(`::debug Image ${index} load timeout`);
            img.removeEventListener('load', onLoad);
            img.removeEventListener('error', onError);
            resolve();
          }, 8000);
        }
      });
    });
    
    // Wait for all images to load
    await Promise.all(imageLoadPromises);
    console.log('::debug All images processed');
    
    // Additional wait to ensure everything is rendered
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Get the certificate element (first child)
    const certificateElement = tempDiv.querySelector('.certificate') as HTMLElement;
    if (!certificateElement) {
      throw new Error('Certificate element not found in generated HTML');
    }
    
    console.log('::debug Certificate element found:', certificateElement.offsetHeight);
    
    // Configure html2pdf options with better settings for content rendering
    const opt = {
      margin: [5, 5, 5, 5], // Small margins instead of 0
      filename: `IDP_Verification_${data.id}_${new Date().toISOString().split('T')[0]}.pdf`,
      image: { 
        type: 'jpeg', 
        quality: 0.95 // Higher quality
      },
      html2canvas: { 
        scale: 1.5, // Reduced scale for better compatibility
        useCORS: true,
        allowTaint: true,
        letterRendering: true,
        logging: process.env.NODE_ENV !== 'production', // Enable logging only in non-production environments, // Enable logging for debugging
        backgroundColor: '#ffffff',
        width: certificateElement.scrollWidth || 794, // A4 width in pixels at 96 DPI
        height: certificateElement.scrollHeight || 1123, // Let it auto-calculate height
        scrollX: 0,
        scrollY: 0,
        windowWidth: 794,
        windowHeight: 1123
      },
      jsPDF: { 
        unit: 'mm', 
        format: 'a4', 
        orientation: 'portrait',
        compress: process.env.NODE_ENV === 'production' // Enable compression in production
      },
      pagebreak: { mode: 'avoid-all' }
    };
    
    // Generate the PDF using the certificate element
    const pdfInstance = html2pdf().set(opt).from(certificateElement);
    
    // Use outputPdf to check if content is generated before saving
    const pdfArrayBuffer = await pdfInstance.outputPdf('arraybuffer');
    
    if (pdfArrayBuffer.byteLength < 1000) {
      console.error('::debug Generated PDF is too small, likely empty');
      throw new Error('Generated PDF appears to be empty');
    }
    
    console.log('::debug PDF size:', pdfArrayBuffer.byteLength, 'bytes');
    
    // Now save the PDF
    await pdfInstance.save();
    
    // Clean up
    document.body.removeChild(tempDiv);
    
    console.log('PDF generated successfully using html2pdf');
    
  } catch (error) {
    console.error('Error generating PDF with html2pdf:', error);
    // Clean up on error
    const tempDivs = document.querySelectorAll('div[style*="z-index: -1000"]');
    tempDivs.forEach(div => div.remove());
    throw new Error(`Failed to generate PDF verification certificate: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// Alternative method for generating PDF from existing HTML element
export const generateIDPVerificationPDFFromElement = async (
  elementId: string,
  filename: string = 'IDP_Verification.pdf'
): Promise<void> => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Element not found');
    }

    // Configure html2pdf options
    const opt = {
      margin: [10, 10, 10, 10],
      filename: filename,
      image: { type: 'jpeg', quality: 0.9 },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        allowTaint: true,
        letterRendering: true,
        logging: false,
        backgroundColor: '#ffffff'
      },
      jsPDF: { 
        unit: 'mm', 
        format: 'a4', 
        orientation: 'portrait',
        compress: true
      }
    };

    // Generate and download the PDF using html2pdf
    await html2pdf().set(opt).from(element).save();
    
  } catch (error) {
    console.error('Error generating PDF from element:', error);
    throw new Error('Failed to generate PDF from page content');
  }
};

// Debug function to preview the HTML before PDF generation
export const previewIDPVerificationHTML = async (
  data: IDPVerificationData,
  expiryInfo: ExpiryInfo,
  verificationTime: string = new Date().toLocaleString('en-GB')
): Promise<void> => {
  try {
    const htmlContent = await createVerificationCertificateHTML(data, expiryInfo, verificationTime);
    
    // Open the HTML in a new window for debugging
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(htmlContent);
      newWindow.document.close();
    } else {
      console.log('HTML Content for debugging:', htmlContent);
    }
  } catch (error) {
    console.error('Error generating HTML preview:', error);
  }
};

export default {
  generateIDPVerificationPDF,
  generateIDPVerificationPDFFromElement,
  previewIDPVerificationHTML,
};
