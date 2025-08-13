import { renderHook, act } from '@testing-library/react-native';
import { useSignIn } from '@/modules/core/hooks/use-sign-in';

// Mock react-hook-form
const mockFormInstance = {
  register: jest.fn(),
  handleSubmit: jest.fn((callback) => callback),
  formState: { errors: {}, isSubmitting: false },
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

describe('useSignIn', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with correct default values', () => {
    const { result } = renderHook(() => useSignIn());

    expect(result.current.form).toBeDefined();
    expect(result.current.onSubmit).toBeDefined();
    expect(typeof result.current.onSubmit).toBe('function');
  });

  it('should handle form submission', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    const { result } = renderHook(() => useSignIn());

    const testData = {
      email: 'test@example.com',
      password: 'password123'
    };

    act(() => {
      result.current.onSubmit(testData);
    });

    expect(consoleSpy).toHaveBeenCalledWith(testData);
    consoleSpy.mockRestore();
  });

  it('should provide form methods', () => {
    const { result } = renderHook(() => useSignIn());

    expect(result.current.form).toHaveProperty('register');
    expect(result.current.form).toHaveProperty('handleSubmit');
    expect(result.current.form).toHaveProperty('formState');
    expect(result.current.form).toHaveProperty('setValue');
    expect(result.current.form).toHaveProperty('getValues');
  });

  it('should handle empty form submission', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    const { result } = renderHook(() => useSignIn());

    const emptyData = {
      email: '',
      password: ''
    };

    act(() => {
      result.current.onSubmit(emptyData);
    });

    expect(consoleSpy).toHaveBeenCalledWith(emptyData);
    consoleSpy.mockRestore();
  });

  it('should maintain form state consistency', () => {
    const { result, rerender } = renderHook(() => useSignIn());

    const initialForm = result.current.form;
    // onSubmit is a new function on each render, so we check it's a function
    expect(typeof result.current.onSubmit).toBe('function');

    rerender({});

    expect(result.current.form).toBe(initialForm);
    expect(typeof result.current.onSubmit).toBe('function');
  });
});
