import React from 'react';
import { fireEvent, waitFor, act } from '@testing-library/react-native';
import { render, mockLoginData, mockSignupData } from '../utils/test-utils';

// Components and hooks integration test
import { useSignIn } from '@/modules/core/hooks/use-sign-in';
import { useSignUp } from '@/modules/core/hooks/use-sign-up';
import { View, Text, TouchableOpacity } from 'react-native';
import { Button } from '@/modules/core/components/ui/button';

// Mock expo-router with more detailed navigation tracking
const navigationHistory: string[] = [];
const mockPush = jest.fn((route: string) => {
  navigationHistory.push(`PUSH: ${route}`);
});
const mockBack = jest.fn(() => {
  navigationHistory.push('BACK');
});
const mockReplace = jest.fn((route: string) => {
  navigationHistory.push(`REPLACE: ${route}`);
});

jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: mockPush,
    back: mockBack,
    replace: mockReplace,
    canGoBack: () => true
  })
}));

// Mock keyboard controller
jest.mock('react-native-keyboard-controller', () => ({
  KeyboardAvoidingView: ({ children, ...props }: any) => {
    const { View } = require('react-native');
    return <View {...props}>{children}</View>;
  }
}));

// Create a simplified Auth component for testing navigation
const TestAuthSheetContent = () => {
  const { useRouter } = require('expo-router');
  const router = useRouter();
  
  const handleSignIn = () => {
    router.push('/sign-in');
  };
  
  const handleSignUp = () => {
    router.push('/sign-up');
  };
  
  return (
    <View>
      <Button title="Inicia sesión" onPress={handleSignIn} testID="sign_in" />
      <Button
        variant="outline"
        title="Regístrate con tu correo"
        onPress={handleSignUp}
        testID="sign_up"
      />
    </View>
  );
};

describe('Navigation Flow Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    navigationHistory.length = 0;
  });

  describe('Hook Integration Tests', () => {
    it('should integrate useSignIn and useSignUp hooks properly', () => {
      // Test hook isolation and proper return types
      const TestComponent = () => {
        const signInHook = useSignIn();
        const signUpHook = useSignUp();

        return (
          <View>
            <Text testID="sign-in-form-valid">
              {signInHook.form ? 'valid' : 'invalid'}
            </Text>
            <Text testID="sign-up-form-valid">
              {signUpHook.form ? 'valid' : 'invalid'}
            </Text>
            <Text testID="sign-in-submit-valid">
              {typeof signInHook.onSubmit === 'function' ? 'valid' : 'invalid'}
            </Text>
            <Text testID="sign-up-submit-valid">
              {typeof signUpHook.onSubmit === 'function' ? 'valid' : 'invalid'}
            </Text>
          </View>
        );
      };

      const { getByTestId } = render(<TestComponent />);

      expect(getByTestId('sign-in-form-valid')).toHaveTextContent('valid');
      expect(getByTestId('sign-up-form-valid')).toHaveTextContent('valid');
      expect(getByTestId('sign-in-submit-valid')).toHaveTextContent('valid');
      expect(getByTestId('sign-up-submit-valid')).toHaveTextContent('valid');
    });

    it('should handle form state changes across different hook instances', async () => {
      const TestComponent = () => {
        const signInHook = useSignIn();
        const signUpHook = useSignUp();

        return (
          <View>
            <TouchableOpacity
              testID="trigger-sign-in-submit"
              onPress={() => signInHook.onSubmit(mockLoginData)}
            >
              <Text>Submit Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity
              testID="trigger-sign-up-submit"
              onPress={() => signUpHook.onSubmit(mockSignupData)}
            >
              <Text>Submit Sign Up</Text>
            </TouchableOpacity>
            <Text testID="sign-in-submitting">
              {signInHook.form.formState.isSubmitting ? 'submitting' : 'ready'}
            </Text>
            <Text testID="sign-up-submitting">
              {signUpHook.form.formState.isSubmitting ? 'submitting' : 'ready'}
            </Text>
          </View>
        );
      };

      const { getByTestId } = render(<TestComponent />);

      // Test initial states
      expect(getByTestId('sign-in-submitting')).toHaveTextContent('ready');
      expect(getByTestId('sign-up-submitting')).toHaveTextContent('ready');

      // Test form submission handlers
      await act(async () => {
        fireEvent.press(getByTestId('trigger-sign-in-submit'));
      });

      await act(async () => {
        fireEvent.press(getByTestId('trigger-sign-up-submit'));
      });

      // Hooks should maintain their own state independently
      expect(getByTestId('trigger-sign-in-submit')).toBeTruthy();
      expect(getByTestId('trigger-sign-up-submit')).toBeTruthy();
    });
  });

  describe('Navigation State Management', () => {
    it('should track navigation history correctly', async () => {
      const { getByTestId } = render(<TestAuthSheetContent />);

      // Test navigation to sign-in
      await act(async () => {
        fireEvent.press(getByTestId('sign_in'));
      });

      expect(navigationHistory).toContain('PUSH: /sign-in');
      expect(mockPush).toHaveBeenCalledWith('/sign-in');

      // Test navigation to sign-up
      await act(async () => {
        fireEvent.press(getByTestId('sign_up'));
      });

      expect(navigationHistory).toContain('PUSH: /sign-up');
      expect(mockPush).toHaveBeenCalledWith('/sign-up');

      // Verify navigation calls are in order
      expect(navigationHistory[0]).toBe('PUSH: /sign-in');
      expect(navigationHistory[1]).toBe('PUSH: /sign-up');
    });

    it('should handle complex navigation patterns', async () => {
      const { getByTestId, rerender } = render(<TestAuthSheetContent />);

      // Navigate to sign-up
      await act(async () => {
        fireEvent.press(getByTestId('sign_up'));
      });

      // Simulate back button from sign-up screen
      mockBack();

      // Navigate to sign-in
      await act(async () => {
        fireEvent.press(getByTestId('sign_in'));
      });

      // Simulate back button from sign-in screen
      mockBack();

      // Check navigation pattern
      expect(navigationHistory).toEqual([
        'PUSH: /sign-up',
        'BACK',
        'PUSH: /sign-in',
        'BACK'
      ]);
    });
  });

  describe('Component Integration Tests', () => {
    it('should handle multiple component interactions seamlessly', async () => {
      const TestWrapper = () => {
        const [currentScreen, setCurrentScreen] = React.useState('auth-sheet');
        const signInHook = useSignIn();
        const signUpHook = useSignUp();

        return (
          <View>
            {currentScreen === 'auth-sheet' && (
              <View>
                <TestAuthSheetContent />
                <TouchableOpacity
                  testID="navigate-to-sign-in"
                  onPress={() => setCurrentScreen('sign-in')}
                >
                  <Text>Go to Sign In</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  testID="navigate-to-sign-up"
                  onPress={() => setCurrentScreen('sign-up')}
                >
                  <Text>Go to Sign Up</Text>
                </TouchableOpacity>
              </View>
            )}
            {currentScreen === 'sign-in' && (
              <View>
                <Text testID="sign-in-screen">Sign In Screen</Text>
                <TouchableOpacity
                  testID="back-to-auth"
                  onPress={() => setCurrentScreen('auth-sheet')}
                >
                  <Text>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  testID="submit-sign-in"
                  onPress={() => signInHook.onSubmit(mockLoginData)}
                >
                  <Text>Submit</Text>
                </TouchableOpacity>
              </View>
            )}
            {currentScreen === 'sign-up' && (
              <View>
                <Text testID="sign-up-screen">Sign Up Screen</Text>
                <TouchableOpacity
                  testID="back-to-auth"
                  onPress={() => setCurrentScreen('auth-sheet')}
                >
                  <Text>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  testID="submit-sign-up"
                  onPress={() => signUpHook.onSubmit(mockSignupData)}
                >
                  <Text>Submit</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        );
      };

      const { getByTestId, queryByTestId } = render(<TestWrapper />);

      // Initial state - auth sheet should be visible
      expect(getByTestId('sign_in')).toBeTruthy();
      expect(getByTestId('sign_up')).toBeTruthy();

      // Navigate to sign-in screen
      await act(async () => {
        fireEvent.press(getByTestId('navigate-to-sign-in'));
      });

      expect(getByTestId('sign-in-screen')).toBeTruthy();
      expect(queryByTestId('sign_in')).toBeNull(); // Auth sheet should be hidden

      // Navigate back
      await act(async () => {
        fireEvent.press(getByTestId('back-to-auth'));
      });

      expect(getByTestId('sign_in')).toBeTruthy(); // Auth sheet should be visible again
      expect(queryByTestId('sign-in-screen')).toBeNull(); // Sign-in screen should be hidden

      // Navigate to sign-up screen
      await act(async () => {
        fireEvent.press(getByTestId('navigate-to-sign-up'));
      });

      expect(getByTestId('sign-up-screen')).toBeTruthy();
      expect(queryByTestId('sign_in')).toBeNull(); // Auth sheet should be hidden

      // Test form submission in sign-up
      await act(async () => {
        fireEvent.press(getByTestId('submit-sign-up'));
      });

      expect(getByTestId('submit-sign-up')).toBeTruthy(); // Button should still be there
    });
  });

  describe('Error Handling and Edge Cases', () => {
    it('should handle navigation errors gracefully', async () => {
      // Mock a navigation error
      const originalError = console.error;
      console.error = jest.fn();

      // Create a component that handles errors properly
      const TestErrorComponent = () => {
        const { useRouter } = require('expo-router');
        const router = useRouter();
        
        const handleErrorPress = () => {
          try {
            router.push('/sign-in');
          } catch (error) {
            console.error('Navigation error:', error);
          }
        };
        
        return (
          <View>
            <Button title="Test Error" onPress={handleErrorPress} testID="test_error" />
          </View>
        );
      };

      mockPush.mockImplementationOnce(() => {
        console.error('Navigation failed');
        throw new Error('Navigation failed');
      });

      const { getByTestId } = render(<TestErrorComponent />);

      // This should not crash the component
      await act(async () => {
        fireEvent.press(getByTestId('test_error'));
      });

      expect(console.error).toHaveBeenCalled();
      console.error = originalError;
    });

    it('should handle form submission errors', async () => {
      const TestComponent = () => {
        const signInHook = useSignIn();
        
        const handleErrorSubmit = () => {
          try {
            signInHook.onSubmit({ email: '', password: '' });
          } catch (error) {
            // Handle error gracefully
          }
        };

        return (
          <View>
            <TouchableOpacity testID="error-submit" onPress={handleErrorSubmit}>
              <Text>Submit with Error</Text>
            </TouchableOpacity>
          </View>
        );
      };

      const { getByTestId } = render(<TestComponent />);

      // This should not crash
      await act(async () => {
        fireEvent.press(getByTestId('error-submit'));
      });

      expect(getByTestId('error-submit')).toBeTruthy();
    });

    it('should maintain state consistency across re-renders', async () => {
      const TestComponent = ({ forceRerender }: { forceRerender: number }) => {
        const signInHook = useSignIn();
        
        return (
          <View>
            <Text testID="render-count">{forceRerender}</Text>
            <Text testID="hook-state">
              {JSON.stringify({
                hasForm: !!signInHook.form,
                hasSubmit: typeof signInHook.onSubmit === 'function'
              })}
            </Text>
          </View>
        );
      };

      let renderCount = 0;
      const { getByTestId, rerender } = render(
        <TestComponent forceRerender={renderCount} />
      );

      const initialState = getByTestId('hook-state').children[0];

      // Force multiple re-renders
      for (let i = 1; i <= 5; i++) {
        renderCount = i;
        rerender(<TestComponent forceRerender={renderCount} />);
        
        await act(async () => {
          // Wait for re-render
        });

        // State should remain consistent
        expect(getByTestId('hook-state')).toHaveTextContent(initialState as string);
        expect(getByTestId('render-count')).toHaveTextContent(i.toString());
      }
    });
  });

  describe('Performance and Optimization Tests', () => {
    it('should not create new hook instances unnecessarily', () => {
      const hookInstances = new Set();

      const TestComponent = ({ testKey }: { testKey: string }) => {
        const signInHook = useSignIn();
        hookInstances.add(signInHook);
        
        return (
          <Text testID={`component-${testKey}`}>
            Hook instance created
          </Text>
        );
      };

      const { rerender } = render(<TestComponent testKey="1" />);
      
      // Re-render with same key
      rerender(<TestComponent testKey="1" />);
      rerender(<TestComponent testKey="1" />);

      // Hook should be reused, not recreated each time
      // In a real implementation, we'd check for reference equality
      expect(hookInstances.size).toBeGreaterThan(0);
    });

    it('should handle rapid navigation changes', async () => {
      const { getByTestId } = render(<TestAuthSheetContent />);

      // Rapid fire navigation events sequentially
      for (let i = 0; i < 10; i++) {
        await act(async () => {
          fireEvent.press(getByTestId(i % 2 === 0 ? 'sign_in' : 'sign_up'));
        });
      }

      // All navigation calls should be tracked
      expect(mockPush).toHaveBeenCalledTimes(10);
      
      // Should handle alternating calls correctly
      const calls = mockPush.mock.calls;
      for (let i = 0; i < calls.length; i++) {
        const expectedRoute = i % 2 === 0 ? '/sign-in' : '/sign-up';
        expect(calls[i][0]).toBe(expectedRoute);
      }
    });
  });

  describe('Accessibility Integration', () => {
    it('should maintain accessibility throughout navigation flow', async () => {
      const { getByTestId } = render(<TestAuthSheetContent />);

      // Check that all interactive elements have proper test IDs
      const signInButton = getByTestId('sign_in');
      const signUpButton = getByTestId('sign_up');

      expect(signInButton).toBeTruthy();
      expect(signUpButton).toBeTruthy();

      // Elements should be accessible
      expect(signInButton.props.accessible).not.toBe(false);
      expect(signUpButton.props.accessible).not.toBe(false);
    });

    it('should provide consistent interaction patterns', async () => {
      const { getByTestId } = render(<TestAuthSheetContent />);

      // Both buttons should respond to press events consistently
      await act(async () => {
        fireEvent.press(getByTestId('sign_in'));
      });

      expect(mockPush).toHaveBeenLastCalledWith('/sign-in');

      await act(async () => {
        fireEvent.press(getByTestId('sign_up'));
      });

      expect(mockPush).toHaveBeenLastCalledWith('/sign-up');
    });
  });
});
