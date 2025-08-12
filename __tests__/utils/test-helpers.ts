/**
 * Test Helpers and Utilities
 * Common functions and constants used across multiple test files
 */

// Common test data constants
export const TEST_CREDENTIALS = {
  VALID_EMAIL: 'test@example.com',
  INVALID_EMAIL: 'invalid-email',
  VALID_PASSWORD: 'password123',
  SHORT_PASSWORD: '123',
  VALID_NAME: 'John Doe',
  EMPTY_NAME: '',
  EMPTY_STRING: ''
} as const;

export const TEST_UI_CONTENT = {
  BUTTON_TITLE: 'Test Button',
  CHILD_TEXT: 'Child Content',
  PRESS_BUTTON: 'Press Me',
  LOADING_TEXT: 'Loading...',
  SUCCESS_MESSAGE: 'Success!'
} as const;

// Helper function to create mock functions with better typing
export const createMockFn = <T extends (...args: any[]) => any>(): jest.MockedFunction<T> => {
  return jest.fn() as jest.MockedFunction<T>;
};

// Helper to wait for async operations in tests
export const waitForAsyncOperation = async (operation: () => Promise<void>, timeout = 1000) => {
  return new Promise<void>((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`Operation timed out after ${timeout}ms`));
    }, timeout);

    operation()
      .then(() => {
        clearTimeout(timer);
        resolve();
      })
      .catch((error) => {
        clearTimeout(timer);
        reject(error);
      });
  });
};

// Mock data generators
export const createMockUser = (overrides: Partial<{ id: string; name: string; email: string }> = {}) => ({
  id: '1',
  name: TEST_CREDENTIALS.VALID_NAME,
  email: TEST_CREDENTIALS.VALID_EMAIL,
  ...overrides
});

export const createMockQueryClient = () => {
  const { QueryClient } = require('@tanstack/react-query');
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false }
    }
  });
};

// Common assertions
export const expectToBeFunction = (value: unknown, functionName?: string) => {
  expect(typeof value).toBe('function');
  if (functionName) {
    expect(value).toBeDefined();
  }
};

export const expectValidFormMethods = (form: any) => {
  expectToBeFunction(form.handleSubmit, 'handleSubmit');
  expectToBeFunction(form.setValue, 'setValue');
  expectToBeFunction(form.getValues, 'getValues');
  expectToBeFunction(form.trigger, 'trigger');
  expect(form).toBeDefined();
};

// Test setup helpers
export const setupMockConsole = () => {
  const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();
  const mockConsoleError = jest.spyOn(console, 'error').mockImplementation();
  const mockConsoleWarn = jest.spyOn(console, 'warn').mockImplementation();

  const cleanup = () => {
    mockConsoleLog.mockRestore();
    mockConsoleError.mockRestore();
    mockConsoleWarn.mockRestore();
  };

  const clear = () => {
    mockConsoleLog.mockClear();
    mockConsoleError.mockClear();
    mockConsoleWarn.mockClear();
  };

  return {
    mockConsoleLog,
    mockConsoleError,
    mockConsoleWarn,
    cleanup,
    clear
  };
};
