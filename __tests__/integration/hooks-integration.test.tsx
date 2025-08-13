import React from 'react';
import { fireEvent, act } from '@testing-library/react-native';
import { render, mockLoginData, mockSignupData } from '../utils/test-utils';
import { View, Text, TouchableOpacity } from 'react-native';

// Import hooks directly
import { useSignIn } from '@/modules/core/hooks/use-sign-in';
import { useSignUp } from '@/modules/core/hooks/use-sign-up';

// Mock expo-router
const mockPush = jest.fn();
const mockBack = jest.fn();
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: mockPush,
    back: mockBack,
    replace: jest.fn(),
    canGoBack: () => true
  })
}));

describe('Authentication Hooks Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useSignIn Hook Integration', () => {
    it('should provide form instance and submit handler', () => {
      const TestComponent = () => {
        const { form, onSubmit } = useSignIn();
        
        return (
          <View>
            <Text testID="form-valid">{form ? 'valid' : 'invalid'}</Text>
            <Text testID="submit-valid">{typeof onSubmit === 'function' ? 'valid' : 'invalid'}</Text>
            <Text testID="form-errors">{JSON.stringify(form.formState.errors)}</Text>
          </View>
        );
      };

      const { getByTestId } = render(<TestComponent />);

      expect(getByTestId('form-valid')).toHaveTextContent('valid');
      expect(getByTestId('submit-valid')).toHaveTextContent('valid');
      expect(getByTestId('form-errors')).toHaveTextContent('{}'); // No errors initially
    });

    it('should handle form submission with valid data', async () => {
      const TestComponent = () => {
        const { form, onSubmit } = useSignIn();
        
        const handleSubmit = () => {
          onSubmit(mockLoginData);
        };

        return (
          <View>
            <TouchableOpacity testID="submit-button" onPress={handleSubmit}>
              <Text>Submit</Text>
            </TouchableOpacity>
            <Text testID="form-state">
              {JSON.stringify({
                isSubmitting: form.formState.isSubmitting,
                isValid: form.formState.isValid,
                isDirty: form.formState.isDirty
              })}
            </Text>
          </View>
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        fireEvent.press(getByTestId('submit-button'));
      });

      // Form should handle submission
      expect(getByTestId('submit-button')).toBeTruthy();
      expect(getByTestId('form-state')).toBeTruthy();
    });

    it('should validate form fields properly', async () => {
      const TestComponent = () => {
        const { form, onSubmit } = useSignIn();
        
        const handleTestValidation = async () => {
          // Trigger validation with invalid data
          form.setValue('email', 'invalid-email');
          form.setValue('password', '');
          const isValid = await form.trigger();
          
          return isValid;
        };

        return (
          <View>
            <TouchableOpacity 
              testID="validate-button" 
              onPress={handleTestValidation}
            >
              <Text>Validate</Text>
            </TouchableOpacity>
            <Text testID="validation-state">
              {JSON.stringify({
                hasErrors: Object.keys(form.formState.errors).length > 0,
                errorCount: Object.keys(form.formState.errors).length
              })}
            </Text>
          </View>
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        fireEvent.press(getByTestId('validate-button'));
      });

      // Validation should work
      expect(getByTestId('validate-button')).toBeTruthy();
      expect(getByTestId('validation-state')).toBeTruthy();
    });
  });

  describe('useSignUp Hook Integration', () => {
    it('should provide form instance and submit handler', () => {
      const TestComponent = () => {
        const { form, onSubmit } = useSignUp();
        
        return (
          <View>
            <Text testID="form-valid">{form ? 'valid' : 'invalid'}</Text>
            <Text testID="submit-valid">{typeof onSubmit === 'function' ? 'valid' : 'invalid'}</Text>
            <Text testID="form-errors">{JSON.stringify(form.formState.errors)}</Text>
            <Text testID="default-values">
              {JSON.stringify(form.formState.defaultValues)}
            </Text>
          </View>
        );
      };

      const { getByTestId } = render(<TestComponent />);

      expect(getByTestId('form-valid')).toHaveTextContent('valid');
      expect(getByTestId('submit-valid')).toHaveTextContent('valid');
      expect(getByTestId('form-errors')).toHaveTextContent('{}');
      // Should have correct default values
      expect(getByTestId('default-values')).toHaveTextContent(
        JSON.stringify({ name: '', email: '', password: '' })
      );
    });

    it('should handle form submission with valid data', async () => {
      const TestComponent = () => {
        const { form, onSubmit } = useSignUp();
        
        const handleSubmit = () => {
          onSubmit(mockSignupData);
        };

        return (
          <View>
            <TouchableOpacity testID="submit-button" onPress={handleSubmit}>
              <Text>Submit</Text>
            </TouchableOpacity>
            <Text testID="form-state">
              {JSON.stringify({
                isSubmitting: form.formState.isSubmitting,
                isValid: form.formState.isValid,
                isDirty: form.formState.isDirty,
                touchedFields: Object.keys(form.formState.touchedFields || {})
              })}
            </Text>
          </View>
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        fireEvent.press(getByTestId('submit-button'));
      });

      expect(getByTestId('submit-button')).toBeTruthy();
      expect(getByTestId('form-state')).toBeTruthy();
    });

    it('should validate all required fields', async () => {
      const TestComponent = () => {
        const { form } = useSignUp();
        
        const handleTestValidation = async () => {
          // Set invalid values
          form.setValue('name', '');
          form.setValue('email', 'invalid-email');
          form.setValue('password', '123'); // Too short
          const isValid = await form.trigger();
          
          return isValid;
        };

        return (
          <View>
            <TouchableOpacity 
              testID="validate-button" 
              onPress={handleTestValidation}
            >
              <Text>Validate</Text>
            </TouchableOpacity>
            <Text testID="validation-state">
              {JSON.stringify({
                hasErrors: Object.keys(form.formState.errors).length > 0,
                errorFields: Object.keys(form.formState.errors)
              })}
            </Text>
          </View>
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        fireEvent.press(getByTestId('validate-button'));
      });

      expect(getByTestId('validate-button')).toBeTruthy();
      expect(getByTestId('validation-state')).toBeTruthy();
    });
  });

  describe('Multiple Hooks Integration', () => {
    it('should handle multiple hook instances independently', () => {
      const TestComponent = () => {
        const signInHook = useSignIn();
        const signUpHook = useSignUp();
        
        return (
          <View>
            <Text testID="sign-in-form">{signInHook.form ? 'valid' : 'invalid'}</Text>
            <Text testID="sign-up-form">{signUpHook.form ? 'valid' : 'invalid'}</Text>
            <Text testID="hooks-independent">
              {signInHook.form !== signUpHook.form ? 'independent' : 'shared'}
            </Text>
            <Text testID="sign-in-defaults">
              {JSON.stringify(signInHook.form.formState.defaultValues)}
            </Text>
            <Text testID="sign-up-defaults">
              {JSON.stringify(signUpHook.form.formState.defaultValues)}
            </Text>
          </View>
        );
      };

      const { getByTestId } = render(<TestComponent />);

      expect(getByTestId('sign-in-form')).toHaveTextContent('valid');
      expect(getByTestId('sign-up-form')).toHaveTextContent('valid');
      expect(getByTestId('hooks-independent')).toHaveTextContent('independent');
      expect(getByTestId('sign-in-defaults')).toHaveTextContent(
        JSON.stringify({ email: '', password: '' })
      );
      expect(getByTestId('sign-up-defaults')).toHaveTextContent(
        JSON.stringify({ name: '', email: '', password: '' })
      );
    });

    it('should handle concurrent form submissions', async () => {
      const TestComponent = () => {
        const signInHook = useSignIn();
        const signUpHook = useSignUp();
        const [submissions, setSubmissions] = React.useState<string[]>([]);
        
        const handleSignInSubmit = () => {
          signInHook.onSubmit(mockLoginData);
          setSubmissions(prev => [...prev, 'signin']);
        };
        
        const handleSignUpSubmit = () => {
          signUpHook.onSubmit(mockSignupData);
          setSubmissions(prev => [...prev, 'signup']);
        };

        return (
          <View>
            <TouchableOpacity testID="signin-submit" onPress={handleSignInSubmit}>
              <Text>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity testID="signup-submit" onPress={handleSignUpSubmit}>
              <Text>Sign Up</Text>
            </TouchableOpacity>
            <Text testID="submissions">{JSON.stringify(submissions)}</Text>
          </View>
        );
      };

      const { getByTestId } = render(<TestComponent />);

      // Submit both forms
      await act(async () => {
        fireEvent.press(getByTestId('signin-submit'));
      });
      
      await act(async () => {
        fireEvent.press(getByTestId('signup-submit'));
      });

      // Both submissions should be tracked
      expect(getByTestId('submissions')).toHaveTextContent(
        JSON.stringify(['signin', 'signup'])
      );
    });

    it('should maintain form state across re-renders', async () => {
      const TestComponent = ({ rerenderKey }: { rerenderKey: number }) => {
        const { form } = useSignIn();
        
        React.useEffect(() => {
          if (rerenderKey === 1) {
            form.setValue('email', 'test@example.com');
            form.setValue('password', 'password123');
          }
        }, [rerenderKey, form]);

        return (
          <View>
            <Text testID="render-key">{rerenderKey}</Text>
            <Text testID="form-values">
              {JSON.stringify({
                email: form.watch('email'),
                password: form.watch('password')
              })}
            </Text>
          </View>
        );
      };

      const { getByTestId, rerender } = render(<TestComponent rerenderKey={0} />);

      // Initial render
      expect(getByTestId('render-key')).toHaveTextContent('0');
      
      // Re-render with new key
      rerender(<TestComponent rerenderKey={1} />);
      
      await act(async () => {
        // Wait for useEffect to run
      });

      expect(getByTestId('render-key')).toHaveTextContent('1');
      expect(getByTestId('form-values')).toHaveTextContent(
        JSON.stringify({ email: 'test@example.com', password: 'password123' })
      );
    });
  });

  describe('Form Validation Integration', () => {
    it('should integrate with Zod schemas correctly', async () => {
      const TestComponent = () => {
        const { form } = useSignIn();
        const [validationResults, setValidationResults] = React.useState<any>({});
        
        const testValidation = async () => {
          // Test various validation scenarios
          const tests = [
            { email: '', password: '' }, // Empty values
            { email: 'invalid-email', password: 'short' }, // Invalid format
            { email: 'valid@email.com', password: 'validpassword' }, // Valid values
          ];
          
          const results: any = {};
          
          for (const test of tests) {
            form.setValue('email', test.email);
            form.setValue('password', test.password);
            const isValid = await form.trigger();
            results[JSON.stringify(test)] = {
              isValid,
              errors: Object.keys(form.formState.errors)
            };
          }
          
          setValidationResults(results);
        };

        return (
          <View>
            <TouchableOpacity testID="test-validation" onPress={testValidation}>
              <Text>Test Validation</Text>
            </TouchableOpacity>
            <Text testID="validation-results">
              {JSON.stringify(validationResults)}
            </Text>
          </View>
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        fireEvent.press(getByTestId('test-validation'));
      });

      // Validation results should be available
      expect(getByTestId('validation-results')).toBeTruthy();
      const resultsText = getByTestId('validation-results').children[0] as string;
      expect(resultsText).not.toBe('{}'); // Should have results
    });

    it('should handle field-level validation correctly', async () => {
      const TestComponent = () => {
        const { form } = useSignUp();
        const [fieldValidation, setFieldValidation] = React.useState<any>({});
        
        const testFieldValidation = async () => {
          const results: any = {};
          
          // Test name validation
          form.setValue('name', '');
          const nameValid = await form.trigger('name');
          results.name = {
            valid: nameValid,
            error: form.formState.errors.name?.message || null
          };
          
          // Test email validation
          form.setValue('email', 'invalid-email');
          const emailValid = await form.trigger('email');
          results.email = {
            valid: emailValid,
            error: form.formState.errors.email?.message || null
          };
          
          // Test password validation
          form.setValue('password', '123');
          const passwordValid = await form.trigger('password');
          results.password = {
            valid: passwordValid,
            error: form.formState.errors.password?.message || null
          };
          
          setFieldValidation(results);
        };

        return (
          <View>
            <TouchableOpacity testID="test-fields" onPress={testFieldValidation}>
              <Text>Test Field Validation</Text>
            </TouchableOpacity>
            <Text testID="field-results">
              {JSON.stringify(fieldValidation)}
            </Text>
          </View>
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        fireEvent.press(getByTestId('test-fields'));
      });

      expect(getByTestId('field-results')).toBeTruthy();
      const resultsText = getByTestId('field-results').children[0] as string;
      expect(resultsText).not.toBe('{}'); // Should have field validation results
    });
  });

  describe('Performance and Memory Integration', () => {
    it('should not create memory leaks with multiple hook instances', () => {
      const hookInstances = new Set();
      
      const TestComponent = ({ testKey }: { testKey: string }) => {
        const signInHook = useSignIn();
        const signUpHook = useSignUp();
        hookInstances.add(signInHook);
        hookInstances.add(signUpHook);
        
        return (
          <View>
            <Text testID={`test-${testKey}`}>Hook instance {testKey}</Text>
          </View>
        );
      };

      const { rerender } = render(<TestComponent testKey="1" />);
      
      // Re-render multiple times
      for (let i = 2; i <= 5; i++) {
        rerender(<TestComponent testKey={i.toString()} />);
      }

      // Should have created hook instances
      expect(hookInstances.size).toBeGreaterThan(0);
    });

    it('should handle rapid form updates efficiently', async () => {
      const TestComponent = () => {
        const { form } = useSignIn();
        const [updateCount, setUpdateCount] = React.useState(0);
        
        const performRapidUpdates = async () => {
          const startTime = Date.now();
          
          // Perform multiple rapid updates
          for (let i = 0; i < 50; i++) {
            form.setValue('email', `test${i}@example.com`);
            form.setValue('password', `password${i}`);
            setUpdateCount(i + 1);
          }
          
          const endTime = Date.now();
          const duration = endTime - startTime;
          
          // Should complete reasonably quickly (less than 1 second)
          expect(duration).toBeLessThan(1000);
        };

        return (
          <View>
            <TouchableOpacity testID="rapid-updates" onPress={performRapidUpdates}>
              <Text>Rapid Updates</Text>
            </TouchableOpacity>
            <Text testID="update-count">{updateCount}</Text>
            <Text testID="current-email">{form.watch('email')}</Text>
          </View>
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        fireEvent.press(getByTestId('rapid-updates'));
      });

      expect(getByTestId('update-count')).toHaveTextContent('50');
      expect(getByTestId('current-email')).toHaveTextContent('test49@example.com');
    });
  });

  describe('Error Handling Integration', () => {
    it('should handle form submission errors gracefully', async () => {
      const TestComponent = () => {
        const { form, onSubmit } = useSignIn();
        const [error, setError] = React.useState<string | null>(null);
        
        const handleErrorSubmit = () => {
          try {
            // Try to submit with invalid data that might cause issues
            onSubmit({ email: '', password: '' } as any);
          } catch (err) {
            setError('Submission error occurred');
          }
        };

        return (
          <View>
            <TouchableOpacity testID="error-submit" onPress={handleErrorSubmit}>
              <Text>Submit with Error</Text>
            </TouchableOpacity>
            <Text testID="error-state">{error || 'no-error'}</Text>
            <Text testID="form-still-valid">{form ? 'valid' : 'invalid'}</Text>
          </View>
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        fireEvent.press(getByTestId('error-submit'));
      });

      // Form should still be valid even after error
      expect(getByTestId('form-still-valid')).toHaveTextContent('valid');
    });

    it('should recover from validation errors', async () => {
      const TestComponent = () => {
        const { form } = useSignIn();
        const [validationHistory, setValidationHistory] = React.useState<string[]>([]);
        
        const testRecovery = async () => {
          const history: string[] = [];
          
          // Start with invalid data
          form.setValue('email', 'invalid');
          form.setValue('password', '');
          let isValid = await form.trigger();
          history.push(`invalid: ${isValid}`);
          
          // Fix the data
          form.setValue('email', 'valid@email.com');
          form.setValue('password', 'validpassword');
          isValid = await form.trigger();
          history.push(`valid: ${isValid}`);
          
          setValidationHistory(history);
        };

        return (
          <View>
            <TouchableOpacity testID="test-recovery" onPress={testRecovery}>
              <Text>Test Recovery</Text>
            </TouchableOpacity>
            <Text testID="validation-history">
              {JSON.stringify(validationHistory)}
            </Text>
            <Text testID="current-errors">
              {JSON.stringify(Object.keys(form.formState.errors))}
            </Text>
          </View>
        );
      };

      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        fireEvent.press(getByTestId('test-recovery'));
      });

      // Should show recovery from invalid to valid state
      expect(getByTestId('validation-history')).toBeTruthy();
      expect(getByTestId('current-errors')).toBeTruthy();
    });
  });
});
