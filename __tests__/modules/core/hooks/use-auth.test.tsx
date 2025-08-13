import { renderHook, act } from '@testing-library/react-native';
import { useAuth } from '@/modules/core/hooks/use-sign-in';

// Test constants for better maintainability
const TEST_DATA = {
  VALID_EMAIL: 'test@example.com',
  INVALID_EMAIL: 'invalid-email',
  VALID_PASSWORD: 'password123',
  SHORT_PASSWORD: '123',
  VALID_NAME: 'John Doe',
  EMPTY_NAME: ''
} as const;

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
        result.current.form.setValue('email', TEST_DATA.INVALID_EMAIL);
        result.current.form.setValue('password', TEST_DATA.VALID_PASSWORD);
        isValid = await result.current.form.trigger();
      });

      // Should be invalid due to email format
      expect(isValid!).toBe(false);

      // Test with valid email but short password
      await act(async () => {
        result.current.form.setValue('email', TEST_DATA.VALID_EMAIL);
        result.current.form.setValue('password', TEST_DATA.SHORT_PASSWORD);
        isValid = await result.current.form.trigger();
      });

      // Should be invalid due to password length
      expect(isValid!).toBe(false);

      // Test with valid data
      await act(async () => {
        result.current.form.setValue('email', TEST_DATA.VALID_EMAIL);
        result.current.form.setValue('password', TEST_DATA.VALID_PASSWORD);
        isValid = await result.current.form.trigger();
      });

      // Should be valid
      expect(isValid!).toBe(true);
    });

    it('should call onSubmit with form data for login', () => {
      const { result } = renderHook(() => useAuth('login'));

      const testData = {
        email: TEST_DATA.VALID_EMAIL,
        password: TEST_DATA.VALID_PASSWORD
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
        result.current.form.setValue('name', TEST_DATA.EMPTY_NAME);
        result.current.form.setValue('email', TEST_DATA.VALID_EMAIL);
        result.current.form.setValue('password', TEST_DATA.VALID_PASSWORD);

        isValid = await result.current.form.trigger();
      });

      expect(isValid!).toBe(false);

      // Test with valid data - should be valid
      await act(async () => {
        result.current.form.setValue('name', TEST_DATA.VALID_NAME);
        result.current.form.setValue('email', TEST_DATA.VALID_EMAIL);
        result.current.form.setValue('password', TEST_DATA.VALID_PASSWORD);

        isValid = await result.current.form.trigger();
      });

      expect(isValid!).toBe(true);
    });

    it('should call onSubmit with form data for signup', () => {
      const { result } = renderHook(() => useAuth('signup'));

      const testData = {
        name: TEST_DATA.VALID_NAME,
        email: TEST_DATA.VALID_EMAIL,
        password: TEST_DATA.VALID_PASSWORD
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
        result.current.form.setValue('name', TEST_DATA.VALID_NAME);
        result.current.form.setValue('email', TEST_DATA.VALID_EMAIL);
        result.current.form.setValue('password', TEST_DATA.VALID_PASSWORD);

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
