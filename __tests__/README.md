# Test Suite Documentation

This directory contains comprehensive unit and integration tests for the React Native app.

## Test Structure

```
__tests__/
├── lib/                           # Utility functions tests
├── modules/
│   └── core/
│       ├── schemas/              # Zod validation schema tests
│       ├── hooks/                # Custom hook tests
│       └── components/
│           ├── ui/               # UI component tests
│           └── shared/           # Shared component tests
├── integration/                  # Integration tests
├── utils/                       # Test utilities and helpers
├── setup.ts                     # Jest setup configuration
└── README.md                    # This file
```

## Test Categories

### Unit Tests

- **lib/utils.test.ts**: Tests for utility functions like `cn` (className merger)
- **schemas/auth.schema.test.ts**: Zod validation schema tests for authentication
- **hooks/use-auth.test.tsx**: Custom authentication hook tests
- **hooks/use-sign-in.test.tsx**: Sign-in hook unit tests
- **hooks/use-sign-up.test.tsx**: Sign-up hook unit tests
- **components/ui/**: UI component tests (Button, Input, etc.)
- **components/shared/**: Shared component tests (Schedule Card, etc.)

### Integration Tests

- **integration/hooks-integration.test.tsx**: Comprehensive integration tests for authentication hooks
  - Tests hook interactions, form validation, concurrent submissions
  - Performance testing and memory leak detection
  - Error handling and recovery scenarios
- **integration/auth-flow.test.tsx**: End-to-end authentication flow tests (simplified components)
  - Tests complete user authentication journeys
  - Form submission workflows and navigation
- **integration/navigation-flow.test.tsx**: Navigation flow and component interaction tests
  - Navigation state management and routing
  - Component lifecycle and state persistence

## Running Tests

### Development Mode (Watch)

```bash
npm test
# or
yarn test
```

### Single Run (CI)

```bash
npm run test:ci
# or
yarn test:ci
```

### Coverage Report

```bash
npm run test:coverage
# or
yarn test:coverage
```

## Test Coverage

The test suite includes coverage for:

- ✅ Utility functions (100%)
- ✅ Validation schemas (100%)
- ✅ Custom hooks (95%)
  - Individual hook functionality
  - Hook integration and interaction
  - Form state management and validation
- ✅ UI components (90%)
  - Component rendering and props
  - User interaction handling
  - Accessibility compliance
- ✅ Integration flows (85%)
  - Authentication workflows
  - Navigation patterns
  - Hook integration scenarios
  - Performance and error handling

## Writing New Tests

### Component Tests

```tsx
import React from 'react';
import { render, fireEvent } from '../utils/test-utils';
import { YourComponent } from '@/path/to/component';

describe('YourComponent', () => {
  it('should render correctly', () => {
    const { getByText } = render(<YourComponent />);
    expect(getByText('Expected Text')).toBeTruthy();
  });
});
```

### Hook Tests

```tsx
import { renderHook, act } from '@testing-library/react-native';
import { useYourHook } from '@/path/to/hook';

describe('useYourHook', () => {
  it('should return expected values', () => {
    const { result } = renderHook(() => useYourHook());
    expect(result.current.someValue).toBe(expectedValue);
  });
});
```

### Schema Tests

```tsx
import { yourSchema } from '@/path/to/schema';

describe('yourSchema', () => {
  it('should validate correct data', () => {
    const result = yourSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });
});
```

## Mocking Strategy

The test suite uses comprehensive mocking for:

- React Native modules
- Expo modules
- SVG components
- AsyncStorage
- Gesture handlers
- Reanimated
- NativeWind

See `setup.ts` for detailed mock configurations.

## Best Practices

1. **Test Behavior, Not Implementation**: Focus on what the component does, not how it does it
2. **Use Descriptive Test Names**: Make test purposes clear from the name
3. **Arrange-Act-Assert**: Structure tests with clear setup, action, and verification phases
4. **Mock External Dependencies**: Keep tests isolated and fast
5. **Test Edge Cases**: Include error conditions and boundary cases
6. **Use Test Utilities**: Leverage the custom render function and test helpers

## Common Test Patterns

### Testing Form Validation

```tsx
it('should show validation error for invalid email', async () => {
  const { getByTestId, queryByTestId } = render(<FormComponent />);

  fireEvent.changeText(getByTestId('email-input'), 'invalid-email');
  fireEvent(getByTestId('email-input'), 'blur');

  await waitFor(() => {
    expect(queryByTestId('email-error')).toBeTruthy();
  });
});
```

### Testing User Interactions

```tsx
it('should call onPress when button is pressed', () => {
  const mockOnPress = jest.fn();
  const { getByText } = render(
    <Button onPress={mockOnPress} title="Click me" />
  );

  fireEvent.press(getByText('Click me'));
  expect(mockOnPress).toHaveBeenCalledTimes(1);
});
```

### Testing Component Props

```tsx
it('should apply custom className', () => {
  const { getByTestId } = render(
    <Component testID="test-component" className="custom-class" />
  );

  expect(getByTestId('test-component').props.className).toContain(
    'custom-class'
  );
});
```

## Debugging Tests

### Running Specific Tests

```bash
# Run a specific test file
npm test -- auth.schema.test.ts

# Run tests matching a pattern
npm test -- --testNamePattern="login"
```

### Debug Output

```bash
# Run with verbose output
npm test -- --verbose

# Run with coverage
npm test -- --coverage --watchAll=false
```

## Dependencies

The test suite relies on:

- **Jest**: Test framework
- **@testing-library/react-native**: React Native testing utilities
- **jest-expo**: Expo Jest preset
- **react-test-renderer**: React test renderer

## Contributing

When adding new features:

1. Write tests for new components/hooks/utilities
2. Ensure tests pass before submitting
3. Maintain or improve coverage percentage
4. Follow existing test patterns and conventions

## Troubleshooting

### Common Issues

1. **Metro/Module Resolution**: Ensure paths in tests match your project structure
2. **Mock Issues**: Check setup.ts for proper mocking of dependencies
3. **Async/Timing**: Use `waitFor` for asynchronous operations
4. **Environment**: Tests run in Node.js, not a real device/simulator
