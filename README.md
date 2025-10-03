# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# AA Uganda Website

A modern, responsive public website for the Automobile Association of Uganda (AA Uganda) built with ReactJS, TypeScript, Material UI, and Vite.

## 🚀 Features

- **Modern Tech Stack**: React 18, TypeScript, Material UI v5, Vite
- **Responsive Design**: Mobile-first approach with seamless adaptation across all devices
- **Atomic Design**: Component architecture following atomic design principles
- **SEO Optimized**: Comprehensive meta tags, structured data, and performance optimizations
- **Performance Focused**: Lazy loading, code splitting, and optimized assets
- **Accessibility**: WCAG compliant components and semantic HTML structure
- **Google Maps Integration**: Interactive map showing company location

## 📋 Pages

1. **Home** - Hero section with company overview and featured services
2. **About** - Company history, mission, vision, and values
3. **Services** - Comprehensive listing of all automotive services
4. **Membership** - Membership plans with pricing and benefits
5. **Contact** - Contact information with embedded Google Maps

## 🏗️ Project Structure

```
src/
├── components/
│   ├── atoms/           # Basic UI components (Button, Heading, Card)
│   ├── molecules/       # Composite components (ServiceCard, Navigation)
│   └── organisms/       # Complex components (Hero, Footer, ServicesOverview)
├── pages/              # Page components
├── data/               # Static data and content
├── theme/              # Material UI theme configuration
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
└── types/              # TypeScript type definitions
```

## 🎨 Design System

### Color Palette

- **Primary**: #024f31 (Dark green)
- **Secondary**: #f1c50e (Golden yellow)
- **Background**: #FFFFFF (White)
- **Surface**: #F8F9FA (Light gray)

### Typography

- **Font Family**: Inter (Google Fonts)
- **Headings**: 700/600 weight with responsive scaling
- **Body Text**: 400 weight with optimal line heights

## 🛠️ Getting Started

### Prerequisites

- Node.js 16+ (compatible with current version 20.11.0)
- npm or yarn package manager

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Open in browser**
   ```
   http://localhost:5173
   ```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 📱 Key Features

- **24/7 Rescue Services** - Emergency roadside assistance
- **Professional Driving School** - FIA-approved instruction
- **Vehicle Inspection** - Comprehensive safety checks
- **Insurance Services** - Motor insurance solutions
- **Automotive Advisory** - Expert consultation
- **Membership Benefits** - Exclusive member perks

## 💼 Company Information

- **Founded**: 1955
- **Location**: Plot 4 Old Port Bell Rd, Kampala, Uganda
- **Phone**: +256 786 623 001
- **Email**: info@aaug.co.ug
- **Services**: 30+ rescue vehicles nationwide

---

**Built with ❤️ for AA Uganda**

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
