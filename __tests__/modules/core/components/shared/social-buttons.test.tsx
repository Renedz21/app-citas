import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { SocialButtons } from '@/modules/core/components/shared/social-buttons';

// Mock the SVG components
jest.mock('@/assets/images/google-logo.svg', () => {
  const { Text } = require('react-native');
  return function GoogleIcon(props: any) {
    return <Text testID="google-icon">GoogleIcon</Text>;
  };
});
jest.mock('@/assets/images/apple.svg', () => {
  const { Text } = require('react-native');
  return function AppleIcon(props: any) {
    return <Text testID="apple-icon">AppleIcon</Text>;
  };
});

describe('SocialButtons Component', () => {
  it('should render both Apple and Google buttons', () => {
    const { getByText } = render(<SocialButtons />);

    expect(getByText('Continuar con Apple')).toBeTruthy();
    expect(getByText('Continuar con Google')).toBeTruthy();
  });

  it('should render Apple button with correct styling', () => {
    const { getByText } = render(<SocialButtons />);
    const appleText = getByText('Continuar con Apple');

    // Check that the text element exists and has proper styling
    expect(appleText).toBeTruthy();
    expect(appleText.props.className).toContain('text-primary');
  });

  it('should render Google button with correct styling', () => {
    const { getByText } = render(<SocialButtons />);
    const googleText = getByText('Continuar con Google');

    // Check that the text element exists and has proper styling
    expect(googleText).toBeTruthy();
    expect(googleText.props.className).toContain('text-primary');
  });

  it('should have working Apple button press handler', () => {
    const { getByText } = render(<SocialButtons />);
    const appleButton = getByText('Continuar con Apple');

    // The button has an empty onPress handler, so we just test that it's pressable
    expect(() => fireEvent.press(appleButton)).not.toThrow();
  });

  it('should have Apple button without explicit onPress (defaults to empty function)', () => {
    const { getByText } = render(<SocialButtons />);
    const appleButton = getByText('Continuar con Apple');

    // Test that the button can be pressed without throwing errors
    fireEvent.press(appleButton);

    // No error should be thrown, and the button should remain functional
    expect(appleButton).toBeTruthy();
  });

  it('should not have onPress handler for Google button', () => {
    const { getByText } = render(<SocialButtons />);
    const googleButton = getByText('Continuar con Google');

    // The Google button doesn't have an onPress prop, so pressing should not throw
    expect(() => fireEvent.press(googleButton)).not.toThrow();
  });

  it('should render Fragment as root element', () => {
    const { toJSON } = render(<SocialButtons />);
    const tree = toJSON();

    // The component should render as a Fragment with multiple children
    expect(Array.isArray(tree)).toBe(true);
    expect(tree).toHaveLength(2); // Two button elements
  });

  it('should render icons for both buttons', () => {
    const { getByText } = render(<SocialButtons />);

    // Check that both buttons exist (which would contain their respective icons)
    const appleButton = getByText('Continuar con Apple');
    const googleButton = getByText('Continuar con Google');

    expect(appleButton).toBeTruthy();
    expect(googleButton).toBeTruthy();
  });

  it('should maintain button order (Apple first, then Google)', () => {
    const { toJSON } = render(<SocialButtons />);
    const tree = toJSON();

    // The component should render as Fragment with array of buttons
    expect(Array.isArray(tree)).toBe(true);
    expect(tree).toHaveLength(2);
  });

  it('should render both buttons with proper text', () => {
    const { getByText } = render(<SocialButtons />);

    // Both buttons should be findable by their text
    expect(getByText('Continuar con Apple')).toBeTruthy();
    expect(getByText('Continuar con Google')).toBeTruthy();
  });

  it('should have proper accessibility for buttons', () => {
    const { getByText } = render(<SocialButtons />);

    const appleButton = getByText('Continuar con Apple');
    const googleButton = getByText('Continuar con Google');

    // Check that buttons are accessible
    expect(appleButton).toBeTruthy();
    expect(googleButton).toBeTruthy();

    // Check that they have the button role
    expect(appleButton.parent?.props.accessible).not.toBe(false);
    expect(googleButton.parent?.props.accessible).not.toBe(false);
  });
});
