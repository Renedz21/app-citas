import React from 'react';
import { render, RenderOptions } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Custom render function that includes providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <SafeAreaProvider
      initialMetrics={{
        frame: { x: 0, y: 0, width: 375, height: 812 },
        insets: { top: 44, left: 0, right: 0, bottom: 34 }
      }}
    >
      {children}
    </SafeAreaProvider>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react-native';
export { customRender as render };

// Mock data generators
export const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com'
};

export const mockLoginData = {
  email: 'test@example.com',
  password: 'password123'
};

export const mockSignupData = {
  name: 'John Doe',
  email: 'test@example.com',
  password: 'password123'
};

// Test helpers
export const mockPressEvent = {
  nativeEvent: {
    pageX: 20,
    pageY: 30
  }
};

export const createMockComponent = (displayName: string) => {
  const MockComponent = (props: any) => {
    const React = require('react');
    const { Text } = require('react-native');
    return <Text {...props}>{displayName}</Text>;
  };
  MockComponent.displayName = displayName;
  return MockComponent;
};

// Common assertions
export const expectToBeAccessible = (element: any) => {
  expect(element).toBeTruthy();
  expect(element.props.accessible).not.toBe(false);
};

export const expectToHaveClassName = (element: any, className: string) => {
  expect(element.props.className).toContain(className);
};

// Form testing helpers
export const fillFormField = (
  getByTestId: any,
  testId: string,
  value: string
) => {
  const { fireEvent } = require('@testing-library/react-native');
  const field = getByTestId(testId);
  fireEvent.changeText(field, value);
  return field;
};

export const submitForm = (getByText: any, buttonText: string = 'Submit') => {
  const { fireEvent } = require('@testing-library/react-native');
  const submitButton = getByText(buttonText);
  fireEvent.press(submitButton);
  return submitButton;
};
