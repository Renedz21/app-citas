import { renderHook, act } from '@testing-library/react-native';
import { useAuth } from '@/modules/core/hooks/use-sign-in';

// Mock console.log to test onSubmit function
const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();

describe('useAuth hook', () => {
  afterEach(() => {
    mockConsoleLog.mockClear();
  });

  afterAll(() => {
    mockConsoleLog.mockRestore();
  });

  describe('login type', () => {
    it('should initialize with correct default values for login', () => {
      const { result } = renderHook(() => useAuth('login'));

      expect(result.current.form.getValues()).toEqual({
        email: '',
        password: ''
      });
    });

    it('should validate login form correctly', async () => {
      const { result } = renderHook(() => useAuth('login'));

      // Test that validation works by calling trigger and checking the return value
      let isValid: boolean;

      await act(async () => {
        result.current.form.setValue('email', 'invalid-email');
        result.current.form.setValue('password', 'password123');
        isValid = await result.current.form.trigger();
      });

      // Should be invalid due to email format
      expect(isValid!).toBe(false);

      // Test with valid email but short password
      await act(async () => {
        result.current.form.setValue('email', 'test@example.com');
        result.current.form.setValue('password', '123');
        isValid = await result.current.form.trigger();
      });

      // Should be invalid due to password length
      expect(isValid!).toBe(false);

      // Test with valid data
      await act(async () => {
        result.current.form.setValue('email', 'test@example.com');
        result.current.form.setValue('password', 'password123');
        isValid = await result.current.form.trigger();
      });

      // Should be valid
      expect(isValid!).toBe(true);
    });

    it('should call onSubmit with form data for login', () => {
      const { result } = renderHook(() => useAuth('login'));

      const testData = {
        email: 'test@example.com',
        password: 'password123'
      };

      act(() => {
        result.current.onSubmit(testData);
      });

      expect(mockConsoleLog).toHaveBeenCalledWith(testData);
    });
  });

  describe('signup type', () => {
    it('should initialize with correct default values for signup', () => {
      const { result } = renderHook(() => useAuth('signup'));

      expect(result.current.form.getValues()).toEqual({
        name: '',
        email: '',
        password: ''
      });
    });

    it('should validate signup form correctly', async () => {
      const { result } = renderHook(() => useAuth('signup'));

      let isValid: boolean;

      // Test empty name - should be invalid
      await act(async () => {
        result.current.form.setValue('name', '');
        result.current.form.setValue('email', 'test@example.com');
        result.current.form.setValue('password', 'password123');

        isValid = await result.current.form.trigger();
      });

      expect(isValid!).toBe(false);

      // Test with valid data - should be valid
      await act(async () => {
        result.current.form.setValue('name', 'John Doe');
        result.current.form.setValue('email', 'test@example.com');
        result.current.form.setValue('password', 'password123');

        isValid = await result.current.form.trigger();
      });

      expect(isValid!).toBe(true);
    });

    it('should call onSubmit with form data for signup', () => {
      const { result } = renderHook(() => useAuth('signup'));

      const testData = {
        name: 'John Doe',
        email: 'test@example.com',
        password: 'password123'
      };

      act(() => {
        result.current.onSubmit(testData);
      });

      expect(mockConsoleLog).toHaveBeenCalledWith(testData);
    });

    it('should accept valid signup data', async () => {
      const { result } = renderHook(() => useAuth('signup'));

      let isValid: boolean;

      await act(async () => {
        result.current.form.setValue('name', 'John Doe');
        result.current.form.setValue('email', 'test@example.com');
        result.current.form.setValue('password', 'password123');

        isValid = await result.current.form.trigger();
      });

      expect(isValid!).toBe(true);
    });
  });

  describe('form state management', () => {
    it('should return form object with correct methods', () => {
      const { result } = renderHook(() => useAuth('login'));

      expect(result.current.form).toBeDefined();
      expect(typeof result.current.form.handleSubmit).toBe('function');
      expect(typeof result.current.form.setValue).toBe('function');
      expect(typeof result.current.form.getValues).toBe('function');
      expect(typeof result.current.form.trigger).toBe('function');
    });

    it('should return onSubmit function', () => {
      const { result } = renderHook(() => useAuth('login'));

      expect(typeof result.current.onSubmit).toBe('function');
    });
  });
});
