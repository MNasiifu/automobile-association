import React, { useState } from 'react';
import {
  Box,
  Typography,
  Alert,
  AlertTitle,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import {
  CheckCircle,
  Warning,
  Error,
  ExpandMore,
  Visibility,
  VisibilityOff,
  Info,
  Psychology,
  CameraAlt,
  Palette,
  HighQuality,
} from '@mui/icons-material';
import type { PhotoValidationResult, PhotoRequirement } from '../../types/photoValidation';
import { passportPhotoRequirements } from '../../utils/passportPhotoValidator';

interface PhotoValidationDisplayProps {
  validationResult: PhotoValidationResult;
  onRetake?: () => void;
  showDetails?: boolean;
}

const PhotoValidationDisplay: React.FC<PhotoValidationDisplayProps> = ({
  validationResult,
  onRetake,
  showDetails = true
}) => {
  const [showRequirements, setShowRequirements] = useState(false);
  const [expandedAccordion, setExpandedAccordion] = useState<string | false>(false);

  const handleAccordionChange = (panel: string) => (
    _event: React.SyntheticEvent,
    isExpanded: boolean
  ) => {
    setExpandedAccordion(isExpanded ? panel : false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'warning';
    return 'error';
  };

  const getScoreText = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Poor';
  };

  const renderValidationIcon = (isValid: boolean) => {
    if (isValid) {
      return <CheckCircle color="success" />;
    }
    return <Error color="error" />;
  };

  return (
    <Box sx={{ mt: 2 }}>
      {/* Main Validation Result */}
      <Alert 
        severity={validationResult.isValid ? 'success' : 'error'}
        sx={{ mb: 2 }}
      >
        <AlertTitle>
          {validationResult.isValid ? 'Photo Validation Passed' : 'Photo Validation Failed'}
        </AlertTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
          <Typography variant="body2">
            Validation Score: {validationResult.score}/100 ({getScoreText(validationResult.score)})
          </Typography>
          <LinearProgress
            variant="determinate"
            value={validationResult.score}
            color={getScoreColor(validationResult.score)}
            sx={{ flex: 1, height: 8, borderRadius: 4 }}
          />
        </Box>
      </Alert>

      {/* Errors */}
      {validationResult.errors.length > 0 && (
        <Alert severity="error" sx={{ mb: 2 }}>
          <AlertTitle>Issues Found ({validationResult.errors.length})</AlertTitle>
          <List dense>
            {validationResult.errors.map((error, index) => (
              <ListItem key={index} sx={{ py: 0.5 }}>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <Error fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={error} />
              </ListItem>
            ))}
          </List>
          {onRetake && (
            <Box sx={{ mt: 2 }}>
              <Button
                variant="outlined"
                color="error"
                onClick={onRetake}
                startIcon={<CameraAlt />}
              >
                Retake Photo
              </Button>
            </Box>
          )}
        </Alert>
      )}

      {/* Warnings */}
      {validationResult.warnings.length > 0 && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          <AlertTitle>Recommendations ({validationResult.warnings.length})</AlertTitle>
          <List dense>
            {validationResult.warnings.map((warning, index) => (
              <ListItem key={index} sx={{ py: 0.5 }}>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <Warning fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={warning} />
              </ListItem>
            ))}
          </List>
        </Alert>
      )}

      {/* Detailed Analysis */}
      {showDetails && (
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ flex: 1 }}>
              Detailed Analysis
            </Typography>
            <IconButton
              onClick={() => setExpandedAccordion(expandedAccordion ? false : 'face')}
              size="small"
            >
              {expandedAccordion ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </Box>

          {/* Face Detection */}
          <Accordion 
            expanded={expandedAccordion === 'face'}
            onChange={handleAccordionChange('face')}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Psychology />
                <Typography>Face Detection & Positioning</Typography>
                {renderValidationIcon(
                  validationResult.details.hasDetectedFace && 
                  validationResult.details.faceCount === 1 &&
                  validationResult.details.facePosition.centered
                )}
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    {renderValidationIcon(validationResult.details.hasDetectedFace)}
                  </ListItemIcon>
                  <ListItemText 
                    primary="Face Detected"
                    secondary={`${validationResult.details.faceCount} face(s) detected`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    {renderValidationIcon(validationResult.details.facePosition.centered)}
                  </ListItemIcon>
                  <ListItemText 
                    primary="Face Centered"
                    secondary={
                      validationResult.details.facePosition.centered 
                        ? "Face is properly centered"
                        : "Face positioning needs adjustment"
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    {renderValidationIcon(validationResult.details.faceSize.appropriate)}
                  </ListItemIcon>
                  <ListItemText 
                    primary="Face Size"
                    secondary={
                      validationResult.details.faceSize.appropriate 
                        ? "Face size is appropriate"
                        : validationResult.details.faceSize.tooSmall 
                          ? "Face is too small"
                          : "Face is too large"
                    }
                  />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>

          {/* Facial Features */}
          <Accordion 
            expanded={expandedAccordion === 'features'}
            onChange={handleAccordionChange('features')}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Visibility />
                <Typography>Facial Features & Expression</Typography>
                {renderValidationIcon(
                  validationResult.details.eyesDetected && 
                  validationResult.details.facingCamera &&
                  validationResult.details.expression.neutral
                )}
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    {renderValidationIcon(validationResult.details.eyesDetected)}
                  </ListItemIcon>
                  <ListItemText 
                    primary="Eyes Detected"
                    secondary={validationResult.details.eyesOpen ? "Eyes are open and visible" : "Eyes not clearly detected"}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    {renderValidationIcon(validationResult.details.facingCamera)}
                  </ListItemIcon>
                  <ListItemText 
                    primary="Facing Camera"
                    secondary={`Head tilt: ${validationResult.details.headTilt.toFixed(1)}°`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    {renderValidationIcon(validationResult.details.expression.neutral)}
                  </ListItemIcon>
                  <ListItemText 
                    primary="Neutral Expression"
                    secondary={
                      validationResult.details.expression.neutral 
                        ? "Expression is neutral"
                        : "Please maintain a neutral expression"
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    {renderValidationIcon(validationResult.details.landmarks.chinVisible)}
                  </ListItemIcon>
                  <ListItemText primary="Chin Visible" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    {renderValidationIcon(validationResult.details.landmarks.eyebrowsVisible)}
                  </ListItemIcon>
                  <ListItemText primary="Eyebrows Visible" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    {renderValidationIcon(validationResult.details.landmarks.foreheadVisible)}
                  </ListItemIcon>
                  <ListItemText primary="Forehead Visible" />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>

          {/* Background Analysis */}
          <Accordion 
            expanded={expandedAccordion === 'background'}
            onChange={handleAccordionChange('background')}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Palette />
                <Typography>Background Analysis</Typography>
                {renderValidationIcon(
                  validationResult.details.backgroundAnalysis.isWhite &&
                  !validationResult.details.backgroundAnalysis.hasComplexBackground
                )}
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    {renderValidationIcon(validationResult.details.backgroundAnalysis.isWhite)}
                  </ListItemIcon>
                  <ListItemText 
                    primary="White Background"
                    secondary={`Detected color: ${validationResult.details.backgroundAnalysis.backgroundColor}`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    {renderValidationIcon(!validationResult.details.backgroundAnalysis.hasComplexBackground)}
                  </ListItemIcon>
                  <ListItemText 
                    primary="Simple Background"
                    secondary={
                      validationResult.details.backgroundAnalysis.hasComplexBackground
                        ? "Background appears complex"
                        : "Background is simple"
                    }
                  />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>

          {/* Image Quality */}
          <Accordion 
            expanded={expandedAccordion === 'quality'}
            onChange={handleAccordionChange('quality')}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <HighQuality />
                <Typography>Image Quality</Typography>
                {renderValidationIcon(
                  validationResult.details.imageQuality.isHighQuality &&
                  validationResult.details.imageQuality.isColor
                )}
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    {renderValidationIcon(validationResult.details.imageQuality.isHighQuality)}
                  </ListItemIcon>
                  <ListItemText 
                    primary="High Quality"
                    secondary={`Resolution: ${validationResult.details.imageQuality.resolution.width}×${validationResult.details.imageQuality.resolution.height}`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    {renderValidationIcon(validationResult.details.imageQuality.isColor)}
                  </ListItemIcon>
                  <ListItemText 
                    primary="Color Photo"
                    secondary={validationResult.details.imageQuality.isColor ? "Photo is in color" : "Photo appears to be grayscale"}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    {renderValidationIcon(!validationResult.details.imageQuality.hasFilters)}
                  </ListItemIcon>
                  <ListItemText 
                    primary="No Filters"
                    secondary={`Sharpness score: ${validationResult.details.imageQuality.sharpness.toFixed(1)}`}
                  />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
        </Box>
      )}

      {/* Requirements Toggle */}
      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <Button
          variant="outlined"
          onClick={() => setShowRequirements(!showRequirements)}
          startIcon={<Info />}
          endIcon={showRequirements ? <ExpandMore sx={{ transform: 'rotate(180deg)' }} /> : <ExpandMore />}
        >
          {showRequirements ? 'Hide' : 'Show'} Photo Requirements
        </Button>
      </Box>

      {/* Requirements Checklist */}
      <Collapse in={showRequirements}>
        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Passport Photo Requirements
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Please ensure your photo meets all the following requirements:
            </Typography>
            
            {passportPhotoRequirements.map((category: PhotoRequirement, categoryIndex: number) => (
              <Box key={categoryIndex} sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  {category.category}
                </Typography>
                <List dense>
                  {category.requirements.map((requirement: string, reqIndex: number) => (
                    <ListItem key={reqIndex} sx={{ py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CheckCircle fontSize="small" color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={requirement} />
                    </ListItem>
                  ))}
                </List>
                {categoryIndex < passportPhotoRequirements.length - 1 && <Divider sx={{ mt: 1 }} />}
              </Box>
            ))}
          </CardContent>
        </Card>
      </Collapse>
    </Box>
  );
};

export default PhotoValidationDisplay;
