# Global Loading System

This project now includes a **Global Loading System** that eliminates the need to duplicate `LinearProgressLoader` components across different pages. The loading indicator appears automatically at the top of the application whenever any loading operation is active.

## Architecture

### Components

1. **GlobalLoadingContext** (`src/contexts/GlobalLoadingContext.tsx`)
   - Provides global loading state management
   - Renders a single `LinearProgressLoader` at the top of the app
   - Supports multiple concurrent loading operations
   - Automatic progress calculation and cleanup

2. **useGlobalLoading Hook**
   - Hook to access the global loading context
   - Must be used within `GlobalLoadingProvider`
   - Provides all loading management methods

3. **GlobalLoadingProvider**
   - Context provider that wraps the entire app
   - Configured in `App.tsx` with default settings
   - Handles the global loading indicator rendering

## Usage

### Basic Loading Operations

```typescript
import { useGlobalLoading } from '../contexts';

const MyComponent: React.FC = () => {
  const globalLoading = useGlobalLoading();

  const handleSubmit = async () => {
    // Start loading
    globalLoading.startLoading('formSubmit');
    
    try {
      await submitForm();
    } finally {
      // Stop loading
      globalLoading.stopLoading('formSubmit');
    }
  };

  return (
    <Button 
      onClick={handleSubmit}
      disabled={globalLoading.isLoading('formSubmit')}
    >
      {globalLoading.isLoading('formSubmit') ? 'Submitting...' : 'Submit'}
    </Button>
  );
};
```

### Progress Tracking

```typescript
const uploadFile = async (file: File) => {
  // Set progress with custom configuration
  globalLoading.setProgress('upload', 0, {
    color: 'success',
    height: 6
  });

  // Simulate upload progress
  for (let progress = 0; progress <= 100; progress += 10) {
    globalLoading.setProgress('upload', progress);
    await new Promise(resolve => setTimeout(resolve, 200));
  }
};
```

### Automatic Loading Management

```typescript
// Using withLoading helper
const fetchData = async () => {
  const result = await globalLoading.withLoading('apiCall', async () => {
    return await api.fetchData();
  }, { color: 'secondary' });
  
  return result;
};

// Using withProgress helper
const uploadWithProgress = async (file: File) => {
  const result = await globalLoading.withProgress('upload', async (setProgress) => {
    return await uploadFile(file, {
      onProgress: (progress) => setProgress(progress)
    });
  }, { color: 'success', height: 8 });
  
  return result;
};
```

### Configuration Options

The global loading can be configured per operation:

```typescript
interface LoadingConfiguration {
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  height?: number;
  zIndex?: number;
}

// Example with custom configuration
globalLoading.startLoading('operation', {
  color: 'warning',
  height: 8,
  zIndex: 1400
});
```

## Migration from Local Loading

### Before (with local LinearProgressLoader)

```typescript
// Old way - duplicated in every component
const MyComponent: React.FC = () => {
  const [loading, setLoading] = useState(false);
  
  return (
    <Box>
      <LinearProgressLoader 
        loading={loading}
        color="primary"
        height={4}
        fixed={true}
      />
      {/* Component content */}
    </Box>
  );
};
```

### After (with Global Loading System)

```typescript
// New way - no duplicated LinearProgressLoader needed
const MyComponent: React.FC = () => {
  const globalLoading = useGlobalLoading();
  
  return (
    <Box>
      {/* Component content - loading indicator appears automatically */}
    </Box>
  );
};
```

## Benefits

1. **No Duplication**: Single loading indicator for the entire app
2. **Consistent UX**: All loading states appear in the same location
3. **Multiple Operations**: Support for concurrent loading operations
4. **Progress Tracking**: Built-in support for determinate progress
5. **Automatic Cleanup**: Loading states are automatically cleaned up
6. **Type Safety**: Full TypeScript support with proper types
7. **Easy Migration**: Simple to migrate existing components

## Demo

Visit `/demo/global-loading` to see the global loading system in action with various examples.

## API Reference

### GlobalLoadingProvider Props

```typescript
interface GlobalLoadingProviderProps {
  children: ReactNode;
  defaultConfig?: LoadingConfiguration;
}
```

### useGlobalLoading Methods

- `startLoading(key: string, config?: LoadingConfiguration)` - Start loading for an operation
- `stopLoading(key: string)` - Stop loading for an operation
- `setProgress(key: string, progress: number, config?: LoadingConfiguration)` - Set progress (0-100)
- `getProgress(key: string)` - Get current progress for an operation
- `isLoading(key: string)` - Check if a specific operation is loading
- `isAnyLoading` - Boolean indicating if any operation is loading
- `withLoading<T>(key, operation, config?)` - Execute operation with automatic loading management
- `withProgress<T>(key, operation, config?)` - Execute operation with progress tracking
- `resetAll()` - Reset all loading states

## Best Practices

1. **Use Descriptive Keys**: Use meaningful operation keys (`'formSubmit'`, `'fileUpload'`, etc.)
2. **Handle Errors**: Always stop loading in finally blocks or use helper methods
3. **Configure Appropriately**: Use different colors/heights for different operation types
4. **Avoid Conflicts**: Use unique keys for different operations
5. **Clean State**: Use `resetAll()` when navigating away or on unmount if needed
