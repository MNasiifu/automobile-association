import * as faceapi from 'face-api.js';

// Initialize face-api.js models
let modelsLoaded = false;

export interface PhotoValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  score: number; // 0-100
  details: {
    hasDetectedFace: boolean;
    faceCount: number;
    facePosition: {
      centered: boolean;
      tooHigh: boolean;
      tooLow: boolean;
      tooLeft: boolean;
      tooRight: boolean;
    };
    faceSize: {
      tooSmall: boolean;
      tooLarge: boolean;
      appropriate: boolean;
    };
    eyesDetected: boolean;
    eyesOpen: boolean;
    facingCamera: boolean;
    headTilt: number; // degrees
    expression: {
      neutral: boolean;
      smiling: boolean;
      eyesClosed: boolean;
    };
    backgroundAnalysis: {
      isWhite: boolean;
      hasComplexBackground: boolean;
      backgroundColor: string;
    };
    imageQuality: {
      resolution: { width: number; height: number };
      isHighQuality: boolean;
      isColor: boolean;
      hasFilters: boolean;
      sharpness: number;
    };
    landmarks: {
      chinVisible: boolean;
      shouldersVisible: boolean;
      earsVisible: boolean;
      eyebrowsVisible: boolean;
      foreheadVisible: boolean;
    };
  };
}

export const loadFaceApiModels = async (): Promise<void> => {
  if (modelsLoaded) return;
  
  try {
    const MODEL_URL = '/models'; // Face-api models in public/models
    
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
    await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
    await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
    
    modelsLoaded = true;
  } catch (error) {
    console.error('Failed to load face-api models:', error);
    throw new Error('Failed to initialize face detection models');
  }
};

export interface PhotoValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  score: number; // 0-100
  details: {
    hasDetectedFace: boolean;
    faceCount: number;
    facePosition: {
      centered: boolean;
      tooHigh: boolean;
      tooLow: boolean;
      tooLeft: boolean;
      tooRight: boolean;
    };
    faceSize: {
      tooSmall: boolean;
      tooLarge: boolean;
      appropriate: boolean;
    };
    eyesDetected: boolean;
    eyesOpen: boolean;
    facingCamera: boolean;
    headTilt: number; // degrees
    expression: {
      neutral: boolean;
      smiling: boolean;
      eyesClosed: boolean;
    };
    backgroundAnalysis: {
      isWhite: boolean;
      hasComplexBackground: boolean;
      backgroundColor: string;
    };
    imageQuality: {
      resolution: { width: number; height: number };
      isHighQuality: boolean;
      isColor: boolean;
      hasFilters: boolean;
      sharpness: number;
    };
    landmarks: {
      chinVisible: boolean;
      shouldersVisible: boolean;
      earsVisible: boolean;
      eyebrowsVisible: boolean;
      foreheadVisible: boolean;
    };
  };
}

const analyzeImageQuality = (canvas: HTMLCanvasElement): {
  isHighQuality: boolean;
  isColor: boolean;
  hasFilters: boolean;
  sharpness: number;
} => {
  const ctx = canvas.getContext('2d')!;
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  
  // Check if image is color (not grayscale)
  let isColor = false;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (Math.abs(r - g) > 10 || Math.abs(g - b) > 10 || Math.abs(r - b) > 10) {
      isColor = true;
      break;
    }
  }
  
  // Calculate sharpness using Laplacian variance
  const grayData = [];
  for (let i = 0; i < data.length; i += 4) {
    const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    grayData.push(gray);
  }
  
  let laplacianVariance = 0;
  const width = canvas.width;
  const height = canvas.height;
  
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = y * width + x;
      const laplacian = -4 * grayData[idx] +
        grayData[idx - 1] + grayData[idx + 1] +
        grayData[idx - width] + grayData[idx + width];
      laplacianVariance += laplacian * laplacian;
    }
  }
  laplacianVariance /= (width - 2) * (height - 2);
  
  return {
    isHighQuality: canvas.width >= 600 && canvas.height >= 600 && laplacianVariance > 100,
    isColor,
    hasFilters: false, // Simplified - would need more complex analysis
    sharpness: laplacianVariance
  };
};

const analyzeBackgroundColor = (canvas: HTMLCanvasElement, faceBox?: faceapi.Box): {
  isWhite: boolean;
  hasComplexBackground: boolean;
  backgroundColor: string;
} => {
  const ctx = canvas.getContext('2d')!;
  const width = canvas.width;
  const height = canvas.height;
  
  // Sample background pixels (avoid face area)
  const samplePoints: { x: number; y: number }[] = [];
  
  // Add corner samples
  samplePoints.push(
    { x: 10, y: 10 },
    { x: width - 10, y: 10 },
    { x: 10, y: height - 10 },
    { x: width - 10, y: height - 10 }
  );
  
  // Add edge samples
  for (let i = 0; i < 20; i++) {
    samplePoints.push(
      { x: Math.random() * width, y: 10 }, // top edge
      { x: Math.random() * width, y: height - 10 }, // bottom edge
      { x: 10, y: Math.random() * height }, // left edge
      { x: width - 10, y: Math.random() * height } // right edge
    );
  }
  
  const colors: { r: number; g: number; b: number }[] = [];
  
  samplePoints.forEach(point => {
    // Skip if point is inside face area
    if (faceBox) {
      const { x, y, width: faceWidth, height: faceHeight } = faceBox;
      if (point.x >= x && point.x <= x + faceWidth &&
          point.y >= y && point.y <= y + faceHeight) {
        return;
      }
    }
    
    const pixel = ctx.getImageData(point.x, point.y, 1, 1).data;
    colors.push({ r: pixel[0], g: pixel[1], b: pixel[2] });
  });
  
  if (colors.length === 0) {
    return {
      isWhite: false,
      hasComplexBackground: true,
      backgroundColor: 'unknown'
    };
  }
  
  // Calculate average color
  const avgColor = colors.reduce(
    (acc, color) => ({
      r: acc.r + color.r,
      g: acc.g + color.g,
      b: acc.b + color.b
    }),
    { r: 0, g: 0, b: 0 }
  );
  
  avgColor.r /= colors.length;
  avgColor.g /= colors.length;
  avgColor.b /= colors.length;
  
  // Check if background is white (within tolerance)
  const isWhite = avgColor.r > 220 && avgColor.g > 220 && avgColor.b > 220;
  
  // Check color variance to determine complexity
  const variance = colors.reduce((acc, color) => {
    const rDiff = color.r - avgColor.r;
    const gDiff = color.g - avgColor.g;
    const bDiff = color.b - avgColor.b;
    return acc + (rDiff * rDiff + gDiff * gDiff + bDiff * bDiff);
  }, 0) / colors.length;
  
  const hasComplexBackground = variance > 500;
  
  return {
    isWhite,
    hasComplexBackground,
    backgroundColor: `rgb(${Math.round(avgColor.r)}, ${Math.round(avgColor.g)}, ${Math.round(avgColor.b)})`
  };
};

const analyzeFaceLandmarks = (landmarks: faceapi.FaceLandmarks68) => {
  const points = landmarks.positions;
  
  // Define landmark indices for different features
  const jawline = points.slice(0, 17); // Points 0-16
  const leftEyebrow = points.slice(17, 22); // Points 17-21
  const rightEyebrow = points.slice(22, 27); // Points 22-26
  const leftEye = points.slice(36, 42); // Points 36-41
  const rightEye = points.slice(42, 48); // Points 42-47
  const mouth = points.slice(48, 68); // Points 48-67
  
  // Calculate face boundaries
  const allX = points.map(p => p.x);
  const allY = points.map(p => p.y);
  const minX = Math.min(...allX);
  const maxX = Math.max(...allX);
  const minY = Math.min(...allY);
  const maxY = Math.max(...allY);
  
  const faceWidth = maxX - minX;
  const faceHeight = maxY - minY;
  
  return {
    chinVisible: jawline.length > 0 && jawline[8].y > (minY + faceHeight * 0.8),
    shouldersVisible: false, // Would need body detection for accurate assessment
    earsVisible: (maxX - points[16].x < faceWidth * 0.1) || (points[0].x - minX < faceWidth * 0.1),
    eyebrowsVisible: leftEyebrow.length > 0 && rightEyebrow.length > 0,
    foreheadVisible: minY < points[19].y - 30, // Rough estimate
    eyesOpen: leftEye.length > 0 && rightEye.length > 0,
    mouthClosed: mouth.length > 0 && Math.abs(mouth[13].y - mouth[19].y) < 10
  };
};

export const validatePassportPhoto = async (file: File): Promise<PhotoValidationResult> => {
  const result: PhotoValidationResult = {
    isValid: false,
    errors: [],
    warnings: [],
    score: 0,
    details: {
      hasDetectedFace: false,
      faceCount: 0,
      facePosition: {
        centered: false,
        tooHigh: false,
        tooLow: false,
        tooLeft: false,
        tooRight: false
      },
      faceSize: {
        tooSmall: false,
        tooLarge: false,
        appropriate: false
      },
      eyesDetected: false,
      eyesOpen: false,
      facingCamera: false,
      headTilt: 0,
      expression: {
        neutral: false,
        smiling: false,
        eyesClosed: false
      },
      backgroundAnalysis: {
        isWhite: false,
        hasComplexBackground: false,
        backgroundColor: ''
      },
      imageQuality: {
        resolution: { width: 0, height: 0 },
        isHighQuality: false,
        isColor: false,
        hasFilters: false,
        sharpness: 0
      },
      landmarks: {
        chinVisible: false,
        shouldersVisible: false,
        earsVisible: false,
        eyebrowsVisible: false,
        foreheadVisible: false
      }
    }
  };
  
  try {
    // Ensure models are loaded
    await loadFaceApiModels();
    
    // Create image element
    const img = document.createElement('img');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
    
    // Set canvas dimensions
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    
    // Update image quality details
    result.details.imageQuality = {
      resolution: { width: img.width, height: img.height },
      ...analyzeImageQuality(canvas)
    };
    
    // Basic image quality checks
    if (img.width < 600 || img.height < 600) {
      result.errors.push('Image resolution too low. Minimum 600x600 pixels required.');
    }
    
    if (!result.details.imageQuality.isColor) {
      result.errors.push('Color photo required. Black and white photos are not accepted.');
    }
    
    // Detect faces
    const detections = await faceapi
      .detectAllFaces(canvas, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions();
    
    result.details.faceCount = detections.length;
    result.details.hasDetectedFace = detections.length > 0;
    
    if (detections.length === 0) {
      result.errors.push('No face detected in the image. Please ensure your face is clearly visible.');
      return result;
    }
    
    if (detections.length > 1) {
      result.errors.push('Multiple faces detected. Only one person should be in the photo.');
      return result;
    }
    
    const detection = detections[0];
    const { detection: faceDetection, landmarks, expressions } = detection;
    const box = faceDetection.box;
    
    // Analyze face position
    const centerX = img.width / 2;
    const centerY = img.height / 2;
    const faceCenterX = box.x + box.width / 2;
    const faceCenterY = box.y + box.height / 2;
    
    const horizontalDeviation = Math.abs(faceCenterX - centerX) / img.width;
    const verticalDeviation = Math.abs(faceCenterY - centerY) / img.height;
    
    result.details.facePosition.centered = horizontalDeviation < 0.1 && verticalDeviation < 0.1;
    result.details.facePosition.tooLeft = (faceCenterX - centerX) < -img.width * 0.1;
    result.details.facePosition.tooRight = (faceCenterX - centerX) > img.width * 0.1;
    result.details.facePosition.tooHigh = (faceCenterY - centerY) < -img.height * 0.1;
    result.details.facePosition.tooLow = (faceCenterY - centerY) > img.height * 0.1;
    
    if (!result.details.facePosition.centered) {
      if (result.details.facePosition.tooLeft || result.details.facePosition.tooRight) {
        result.errors.push('Face is not horizontally centered. Please center your face in the frame.');
      }
      if (result.details.facePosition.tooHigh || result.details.facePosition.tooLow) {
        result.errors.push('Face is not vertically centered. Please position your face in the center of the frame.');
      }
    }
    
    // Analyze face size
    const faceAreaRatio = (box.width * box.height) / (img.width * img.height);
    result.details.faceSize.tooSmall = faceAreaRatio < 0.15;
    result.details.faceSize.tooLarge = faceAreaRatio > 0.5;
    result.details.faceSize.appropriate = !result.details.faceSize.tooSmall && !result.details.faceSize.tooLarge;
    
    if (result.details.faceSize.tooSmall) {
      result.errors.push('Face is too small in the image. Please move closer to the camera.');
    }
    if (result.details.faceSize.tooLarge) {
      result.errors.push('Face is too large in the image. Please move further from the camera.');
    }
    
    // Analyze facial expressions
    const neutralThreshold = 0.7;
    const smilingThreshold = 0.3;
    
    result.details.expression.neutral = expressions.neutral > neutralThreshold;
    result.details.expression.smiling = expressions.happy > smilingThreshold;
    result.details.expression.eyesClosed = expressions.surprised < 0.1; // Simplified
    
    if (!result.details.expression.neutral) {
      if (result.details.expression.smiling) {
        result.warnings.push('Please maintain a neutral expression. Avoid smiling with teeth showing.');
      }
    }
    
    // Analyze head pose (simplified)
    const leftEye = landmarks.getLeftEye();
    const rightEye = landmarks.getRightEye();
    
    if (leftEye.length > 0 && rightEye.length > 0) {
      result.details.eyesDetected = true;
      result.details.eyesOpen = true; // Simplified - would need more analysis
      
      // Calculate head tilt
      const leftEyeCenter = leftEye.reduce((acc, point) => ({
        x: acc.x + point.x,
        y: acc.y + point.y
      }), { x: 0, y: 0 });
      leftEyeCenter.x /= leftEye.length;
      leftEyeCenter.y /= leftEye.length;
      
      const rightEyeCenter = rightEye.reduce((acc, point) => ({
        x: acc.x + point.x,
        y: acc.y + point.y
      }), { x: 0, y: 0 });
      rightEyeCenter.x /= rightEye.length;
      rightEyeCenter.y /= rightEye.length;
      
      const eyeLineTilt = Math.atan2(
        rightEyeCenter.y - leftEyeCenter.y,
        rightEyeCenter.x - leftEyeCenter.x
      ) * (180 / Math.PI);
      
      result.details.headTilt = Math.abs(eyeLineTilt);
      result.details.facingCamera = result.details.headTilt < 15;
      
      if (!result.details.facingCamera) {
        result.errors.push('Head appears tilted or turned. Please look directly at the camera with your head straight.');
      }
    } else {
      result.errors.push('Eyes not clearly detected. Please ensure your eyes are clearly visible and open.');
    }
    
    // Analyze facial landmarks
    result.details.landmarks = analyzeFaceLandmarks(landmarks);
    
    if (!result.details.landmarks.chinVisible) {
      result.warnings.push('Chin should be clearly visible in the photo.');
    }
    
    if (!result.details.landmarks.eyebrowsVisible) {
      result.warnings.push('Eyebrows should be clearly visible. Hair should not cover the eyebrows.');
    }
    
    if (!result.details.landmarks.foreheadVisible) {
      result.warnings.push('Forehead should be visible from chin to hairline.');
    }
    
    // Analyze background
    result.details.backgroundAnalysis = analyzeBackgroundColor(canvas, box);
    
    if (!result.details.backgroundAnalysis.isWhite) {
      result.errors.push('Background should be white or light colored. Avoid complex or dark backgrounds.');
    }
    
    if (result.details.backgroundAnalysis.hasComplexBackground) {
      result.warnings.push('Background appears complex. Use a plain white background for best results.');
    }
    
    // Calculate overall score
    let score = 0;
    
    // Face detection and positioning (40 points)
    if (result.details.hasDetectedFace && result.details.faceCount === 1) score += 20;
    if (result.details.facePosition.centered) score += 10;
    if (result.details.faceSize.appropriate) score += 10;
    
    // Facial features (30 points)
    if (result.details.eyesDetected && result.details.eyesOpen) score += 10;
    if (result.details.facingCamera) score += 10;
    if (result.details.expression.neutral) score += 10;
    
    // Image quality (20 points)
    if (result.details.imageQuality.isHighQuality) score += 10;
    if (result.details.imageQuality.isColor) score += 10;
    
    // Background (10 points)
    if (result.details.backgroundAnalysis.isWhite) score += 10;
    
    result.score = score;
    result.isValid = result.errors.length === 0 && score >= 70;
    
    // Clean up
    URL.revokeObjectURL(img.src);
    
    return result;
    
  } catch (error) {
    console.error('Photo validation error:', error);
    result.errors.push('Failed to analyze photo. Please try uploading a different image.');
    return result;
  }
};

// Passport photo requirements checklist
export const passportPhotoRequirements = [
  {
    category: 'Face and Expression',
    requirements: [
      'Face fully visible and centered',
      'Looking directly at the camera',
      'Head not tilted or turned',
      'Neutral expression, mouth closed',
      'No smiling with teeth showing',
      'Eyes open and clearly visible',
      'No red-eye effect'
    ]
  },
  {
    category: 'Physical Features',
    requirements: [
      'Face clearly shows applicant',
      'Ears clearly visible (unless covered by religious attire)',
      'Shoulders and chin visible',
      'Eyes well positioned',
      'Hair should not cover eyes or eyebrows'
    ]
  },
  {
    category: 'Background and Lighting',
    requirements: [
      'White or light-colored background',
      'No shadows on face or background',
      'Good lighting, no glare',
      'Photo clearly visible with high quality'
    ]
  },
  {
    category: 'Technical Requirements',
    requirements: [
      'Color photo only (black & white not accepted)',
      'No editing/filters applied',
      'No Photoshop retouching or digital alterations',
      'High resolution (minimum 600x600 pixels)',
      'Recent photograph'
    ]
  },
  {
    category: 'Religious Considerations',
    requirements: [
      'Religious attire permitted (hijab, turban, etc.)',
      'Face must be fully visible (chin to forehead)',
      'No face covering that obscures facial features'
    ]
  }
];
