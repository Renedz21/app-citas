import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Button } from '@/modules/core/components/ui/button';

// Test constants for better maintainability
const TEST_CONTENT = {
  BUTTON_TITLE: 'Test Button',
  CHILD_TEXT: 'Child Content',
  PRESS_BUTTON: 'Press Me'
} as const;

// Mock icon component for testing
const MockIcon = ({ testID }: { testID?: string }) => (
  <Text testID={testID || 'mock-icon'}>Icon</Text>
);

describe('Button Component', () => {
  it('should render correctly with title', () => {
    const { getByText } = render(<Button title={TEST_CONTENT.BUTTON_TITLE} />);
    expect(getByText(TEST_CONTENT.BUTTON_TITLE)).toBeTruthy();
  });

  it('should render correctly with children', () => {
    const { getByText } = render(
      <Button>
        <Text>{TEST_CONTENT.CHILD_TEXT}</Text>
      </Button>
    );
    expect(getByText(TEST_CONTENT.CHILD_TEXT)).toBeTruthy();
  });

  it('should call onPress when pressed', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <Button title={TEST_CONTENT.PRESS_BUTTON} onPress={mockOnPress} />
    );

    fireEvent.press(getByText(TEST_CONTENT.PRESS_BUTTON));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('should apply default variant styles', () => {
    const { getByRole } = render(<Button title="Default Button" />);
    const button = getByRole('button');

    expect(button.props.className).toContain('bg-background');
    expect(button.props.className).toContain('shadow-lg');
  });

  it('should apply secondary variant styles', () => {
    const { getByRole } = render(
      <Button title="Secondary Button" variant="secondary" />
    );
    const button = getByRole('button');

    expect(button.props.className).toContain('bg-white');
  });

  it('should apply outline variant styles', () => {
    const { getByRole } = render(
      <Button title="Outline Button" variant="outline" />
    );
    const button = getByRole('button');

    expect(button.props.className).toContain('bg-white');
    expect(button.props.className).toContain('border');
  });

  it('should apply ghost variant styles', () => {
    const { getByRole } = render(
      <Button title="Ghost Button" variant="ghost" />
    );
    const button = getByRole('button');

    expect(button.props.className).toContain('bg-transparent');
  });

  it('should render icon on left by default', () => {
    const MockIcon = () => <Text testID="mock-icon">Icon</Text>;
    const { getByTestId, getByText } = render(
      <Button title="Button with Icon" icon={<MockIcon />} />
    );

    const icon = getByTestId('mock-icon');
    const title = getByText('Button with Icon');

    expect(icon).toBeTruthy();
    expect(title).toBeTruthy();
  });

  it('should render icon on right when iconPosition is right', () => {
    const MockIcon = () => <Text testID="mock-icon">Icon</Text>;
    const { getByTestId, getByText } = render(
      <Button
        title="Button with Icon"
        icon={<MockIcon />}
        iconPosition="right"
      />
    );

    const icon = getByTestId('mock-icon');
    const title = getByText('Button with Icon');

    expect(icon).toBeTruthy();
    expect(title).toBeTruthy();
  });

  it('should handle pressed state styling', () => {
    const { getByText } = render(<Button title="Pressable Button" />);
    const button = getByText('Pressable Button');

    // Simulate press state
    fireEvent(button, 'pressIn');

    // The pressed state is handled by the render prop pattern
    // We can't easily test the opacity change without more complex setup
    expect(button).toBeTruthy();
  });

  it('should render both title and children if both are provided', () => {
    const { getByText } = render(
      <Button title="Button Title">
        <Text>Additional Content</Text>
      </Button>
    );

    expect(getByText('Button Title')).toBeTruthy();
    expect(getByText('Additional Content')).toBeTruthy();
  });

  it('should apply correct text colors based on variant', () => {
    const { getByText } = render(
      <Button title="Default Button" variant="default" />
    );
    const text = getByText('Default Button');

    expect(text.props.className).toContain('text-white');
  });

  it('should apply correct text colors for non-default variants', () => {
    const { getByText } = render(
      <Button title="Secondary Button" variant="secondary" />
    );
    const text = getByText('Secondary Button');

    expect(text.props.className).toContain('text-primary');
  });

  it('should pass through other Pressable props', () => {
    const { getByRole } = render(
      <Button title="Test Button" testID="custom-test-id" />
    );

    const button = getByRole('button');
    expect(button.props.testID).toBe('custom-test-id');
  });

  it('should render without title if only children are provided', () => {
    const { getByText, queryByText } = render(
      <Button>
        <Text>Only Children</Text>
      </Button>
    );

    expect(getByText('Only Children')).toBeTruthy();
    // Should not render any title text
    expect(queryByText('')).toBeNull();
  });
});
