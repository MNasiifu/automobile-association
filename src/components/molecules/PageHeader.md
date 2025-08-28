# PageHeader Component Documentation

## Overview

The `PageHeader` component is a stunning, modern React component designed to create beautiful page headers with advanced animations and responsive design. It provides a consistent and visually appealing header section for all major pages in the AA Uganda application.

## Features

### 🎨 Visual Design
- **Dynamic Gradient Background**: Animated gradient background that shifts colors
- **Glass Morphism Effect**: Beautiful backdrop filter with transparency
- **Floating Animations**: Subtle floating background elements
- **Gradient Text**: Animated gradient text effects for titles
- **Pulse Glow Animation**: Subtle glowing effects on the main content container

### 📱 Responsive Design
- **Mobile Optimized**: Responsive breakpoints for mobile, tablet, and desktop
- **Dynamic Text Sizing**: Font sizes adjust based on screen size
- **Adaptive Layouts**: Background animations disabled on mobile for performance
- **Touch-Friendly**: Optimized for touch interfaces

### ✨ Animations
- **Fade In**: Smooth fade-in animations for all content
- **Slide Animations**: Content slides in from different directions
- **Zoom Effects**: Icon zoom animations on load
- **Staggered Loading**: Different elements load with staggered timing
- **Hover Effects**: Interactive hover animations

### 🧭 Navigation
- **Smart Breadcrumbs**: Automatic breadcrumb generation with customization
- **Icon Support**: Icons in breadcrumbs and page headers
- **Link Integration**: Seamless navigation with React Router

## Props

```typescript
interface PageHeaderProps {
  title: string;                    // Main page title (required)
  subtitle?: string;                // Optional subtitle text
  backgroundImage?: string;         // Custom background image URL
  icon?: React.ReactNode;           // Icon to display above title
  breadcrumbs?: BreadcrumbItem[];   // Custom breadcrumb items
}

interface BreadcrumbItem {
  label: string;                    // Breadcrumb text
  href?: string;                    // Optional link URL
  icon?: React.ReactNode;           // Optional icon
}
```

## Usage Examples

### Basic Usage
```tsx
import { PageHeader } from '../components/molecules';

<PageHeader
  title="About Us"
  subtitle="Learn more about our company and mission"
/>
```

### With Icon
```tsx
import { Info } from '@mui/icons-material';

<PageHeader
  title="About Us"
  subtitle="Learn more about our company and mission"
  icon={<Info />}
/>
```

### With Custom Breadcrumbs
```tsx
<PageHeader
  title="International Driving Permit"
  subtitle="Drive legally in over 150 countries worldwide"
  icon={<DriveEtaIcon />}
  breadcrumbs={[
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'IDP' }
  ]}
/>
```

### With Background Image
```tsx
<PageHeader
  title="Our Services"
  subtitle="Comprehensive automotive solutions"
  backgroundImage="/images/services-hero.jpg"
/>
```

## Implementation Details

### Current Integration
The PageHeader component has been integrated into the following pages:

1. **About Page** (`/about`)
   - Title: "About AA Uganda"
   - Icon: Info icon
   - Subtitle: Company establishment and mission

2. **Contact Page** (`/contact`)
   - Title: "Contact Us"
   - Icon: ContactMail icon
   - Subtitle: Contact information and inquiry details

3. **IDP Page** (`/idp`)
   - Title: "International Driving Permit (IDP)"
   - Icon: DriveEta icon
   - Subtitle: International driving permit information

4. **Services Page** (`/services`)
   - Title: "Our Services"
   - Icon: Build icon
   - Subtitle: Automotive services overview

### Performance Optimizations
- **Conditional Animations**: Background animations disabled on mobile devices
- **Optimized Images**: Efficient background image handling
- **Staggered Loading**: Prevents animation overload
- **GPU Acceleration**: Uses CSS transforms for smooth animations

### Accessibility
- **ARIA Labels**: Proper ARIA labels for screen readers
- **Semantic HTML**: Uses semantic HTML structure
- **Keyboard Navigation**: Full keyboard navigation support
- **Color Contrast**: High contrast text for readability

## Styling & Theming

The component integrates seamlessly with the Material-UI theme system and uses the AA Uganda brand colors:

- **Primary Color**: `#024f31` (Dark Green)
- **Secondary Color**: `#f1c50e` (Golden Yellow)
- **Text Colors**: High contrast white text with shadows
- **Glass Effect**: Backdrop blur with transparency

## Animation Timeline

1. **Initial Load** (0-100ms): Component mounts
2. **Breadcrumbs** (1200ms): Slide down animation
3. **Icon** (1400ms): Zoom in animation
4. **Title** (1000ms): Slide up animation
5. **Subtitle** (1600ms): Fade in animation
6. **Background**: Continuous gradient animation

## Browser Support

- **Modern Browsers**: Full support for Chrome, Firefox, Safari, Edge
- **Backdrop Filter**: Graceful degradation for older browsers
- **CSS Grid**: Full responsive grid support
- **Flexbox**: Modern layout techniques

## Best Practices

1. **Keep Titles Concise**: Short, descriptive titles work best
2. **Meaningful Subtitles**: Provide context and value
3. **Appropriate Icons**: Use relevant, recognizable icons
4. **Consistent Breadcrumbs**: Maintain navigation hierarchy
5. **Performance**: Avoid heavy background images on mobile

## Future Enhancements

- **Video Backgrounds**: Support for background video
- **Custom Animations**: Configurable animation presets
- **Theme Variants**: Multiple color scheme options
- **Parallax Effects**: Advanced scroll-based animations
- **Interactive Elements**: Clickable background elements

## Dependencies

- React 19+
- Material-UI 5+
- @mui/icons-material
- @emotion/styled (for animations)

This component exemplifies modern React development with TypeScript, advanced CSS animations, and responsive design principles, providing a world-class user experience for the AA Uganda website.
