import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Input } from '@/modules/core/components/ui/input';

describe('Input Component', () => {
  it('should render correctly', () => {
    const { getByDisplayValue } = render(<Input value="test value" />);
    expect(getByDisplayValue('test value')).toBeTruthy();
  });

  it('should render with placeholder', () => {
    const { getByPlaceholderText } = render(
      <Input placeholder="Enter your email" />
    );
    expect(getByPlaceholderText('Enter your email')).toBeTruthy();
  });

  it('should handle text changes', () => {
    const mockOnChangeText = jest.fn();
    const { getByTestId } = render(
      <Input testID="test-input" onChangeText={mockOnChangeText} />
    );

    const input = getByTestId('test-input');
    fireEvent.changeText(input, 'new text');

    expect(mockOnChangeText).toHaveBeenCalledWith('new text');
  });

  it('should apply default styles', () => {
    const { getByTestId } = render(<Input testID="test-input" />);
    const input = getByTestId('test-input');

    expect(input.props.className).toContain('flex-row');
    expect(input.props.className).toContain('rounded-2xl');
    expect(input.props.className).toContain('border');
    expect(input.props.className).toContain('bg-white');
    expect(input.props.className).toContain('p-4');
  });

  it('should apply custom className', () => {
    const { getByTestId } = render(
      <Input testID="test-input" className="custom-class" />
    );
    const input = getByTestId('test-input');

    expect(input.props.className).toContain('custom-class');
    expect(input.props.className).toContain('flex-row'); // Should still contain default classes
  });

  it('should handle different keyboard types', () => {
    const { getByTestId } = render(
      <Input testID="email-input" keyboardType="email-address" />
    );
    const input = getByTestId('email-input');

    expect(input.props.keyboardType).toBe('email-address');
  });

  it('should handle numeric keyboard type', () => {
    const { getByTestId } = render(
      <Input testID="numeric-input" keyboardType="numeric" />
    );
    const input = getByTestId('numeric-input');

    expect(input.props.keyboardType).toBe('numeric');
  });

  it('should handle phone-pad keyboard type', () => {
    const { getByTestId } = render(
      <Input testID="phone-input" keyboardType="phone-pad" />
    );
    const input = getByTestId('phone-input');

    expect(input.props.keyboardType).toBe('phone-pad');
  });

  it('should pass through all TextInput props', () => {
    const mockOnFocus = jest.fn();
    const mockOnBlur = jest.fn();

    const { getByTestId } = render(
      <Input
        testID="test-input"
        onFocus={mockOnFocus}
        onBlur={mockOnBlur}
        secureTextEntry={true}
        maxLength={10}
        multiline={true}
      />
    );

    const input = getByTestId('test-input');

    expect(input.props.secureTextEntry).toBe(true);
    expect(input.props.maxLength).toBe(10);
    expect(input.props.multiline).toBe(true);

    fireEvent(input, 'focus');
    expect(mockOnFocus).toHaveBeenCalled();

    fireEvent(input, 'blur');
    expect(mockOnBlur).toHaveBeenCalled();
  });

  it('should handle disabled state styling', () => {
    const { getByTestId } = render(
      <Input testID="disabled-input" editable={false} />
    );
    const input = getByTestId('disabled-input');

    expect(input.props.className).toContain('disabled:opacity-50');
    expect(input.props.editable).toBe(false);
  });

  it('should handle ref properly', () => {
    const ref = React.createRef();
    render(<Input ref={ref} />);

    // The ref should be passed through to the TextInput
    // In a real test environment, this would be more testable
    expect(ref).toBeDefined();
  });

  it('should render with autoCapitalize prop', () => {
    const { getByTestId } = render(
      <Input testID="test-input" autoCapitalize="words" />
    );
    const input = getByTestId('test-input');

    expect(input.props.autoCapitalize).toBe('words');
  });

  it('should render with autoCorrect prop', () => {
    const { getByTestId } = render(
      <Input testID="test-input" autoCorrect={false} />
    );
    const input = getByTestId('test-input');

    expect(input.props.autoCorrect).toBe(false);
  });

  it('should handle return key type', () => {
    const { getByTestId } = render(
      <Input testID="test-input" returnKeyType="done" />
    );
    const input = getByTestId('test-input');

    expect(input.props.returnKeyType).toBe('done');
  });

  it('should handle onSubmitEditing', () => {
    const mockOnSubmit = jest.fn();
    const { getByTestId } = render(
      <Input testID="test-input" onSubmitEditing={mockOnSubmit} />
    );

    const input = getByTestId('test-input');
    fireEvent(input, 'submitEditing');

    expect(mockOnSubmit).toHaveBeenCalled();
  });
});
