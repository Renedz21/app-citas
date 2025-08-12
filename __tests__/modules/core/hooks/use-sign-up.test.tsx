import { renderHook, act } from '@testing-library/react-native';
import { useSignUp } from '@/modules/core/hooks/use-sign-up';

// Mock react-hook-form
const mockFormInstance = {
  register: jest.fn(),
  handleSubmit: jest.fn((callback) => callback),
  formState: { errors: {}, isSubmitting: false, isValid: true },
  setValue: jest.fn(),
  getValues: jest.fn(),
  watch: jest.fn(),
  reset: jest.fn(),
  clearErrors: jest.fn(),
  setError: jest.fn(),
  trigger: jest.fn(),
  control: {}
};

jest.mock('react-hook-form', () => ({
  useForm: jest.fn(() => mockFormInstance)
}));

// Mock zodResolver
jest.mock('@hookform/resolvers/zod', () => ({
  zodResolver: jest.fn(() => jest.fn())
}));

describe('useSignUp', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with correct default values', () => {
    const { result } = renderHook(() => useSignUp());

    expect(result.current.form).toBeDefined();
    expect(result.current.onSubmit).toBeDefined();
    expect(typeof result.current.onSubmit).toBe('function');
  });

  it('should handle form submission with complete data', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    const { result } = renderHook(() => useSignUp());

    const testData = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'securePassword123'
    };

    act(() => {
      result.current.onSubmit(testData);
    });

    expect(consoleSpy).toHaveBeenCalledWith(testData);
    consoleSpy.mockRestore();
  });

  it('should provide all necessary form methods', () => {
    const { result } = renderHook(() => useSignUp());

    expect(result.current.form).toHaveProperty('register');
    expect(result.current.form).toHaveProperty('handleSubmit');
    expect(result.current.form).toHaveProperty('formState');
    expect(result.current.form).toHaveProperty('setValue');
    expect(result.current.form).toHaveProperty('getValues');
    expect(result.current.form).toHaveProperty('reset');
  });

  it('should handle submission with minimal data', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    const { result } = renderHook(() => useSignUp());

    const minimalData = {
      name: '',
      email: '',
      password: ''
    };

    act(() => {
      result.current.onSubmit(minimalData);
    });

    expect(consoleSpy).toHaveBeenCalledWith(minimalData);
    consoleSpy.mockRestore();
  });

  it('should maintain hook stability across re-renders', () => {
    const { result, rerender } = renderHook(() => useSignUp());

    const firstForm = result.current.form;
    // onSubmit is a new function on each render, so we check it's a function
    expect(typeof result.current.onSubmit).toBe('function');

    rerender({});

    expect(result.current.form).toBe(firstForm);
    expect(typeof result.current.onSubmit).toBe('function');
  });

  it('should handle special characters in user data', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    const { result } = renderHook(() => useSignUp());

    const specialData = {
      name: 'María José',
      email: 'user+test@example.com',
      password: 'P@ssw0rd!#$'
    };

    act(() => {
      result.current.onSubmit(specialData);
    });

    expect(consoleSpy).toHaveBeenCalledWith(specialData);
    consoleSpy.mockRestore();
  });
});
