import React from 'react';
import { render } from '@//__tests__/utils/test-utils';
import { Badge } from '@/modules/core/components/ui/badge';

describe('Badge Component', () => {
  it('should render with default variant', () => {
    const { getByText } = render(<Badge>Default Badge</Badge>);
    
    const badge = getByText('Default Badge');
    expect(badge).toBeTruthy();
  });

  it('should render with pending variant', () => {
    const { getByText } = render(<Badge variant="pending">Pending</Badge>);
    
    const badge = getByText('Pending');
    expect(badge).toBeTruthy();
    expect(badge.props.className).toContain('text-amber-700');
  });

  it('should render with cancelled variant', () => {
    const { getByText } = render(<Badge variant="cancelled">Cancelled</Badge>);
    
    const badge = getByText('Cancelled');
    expect(badge).toBeTruthy();
    expect(badge.props.className).toContain('text-destructive');
  });

  it('should render with completed variant', () => {
    const { getByText } = render(<Badge variant="completed">Completed</Badge>);
    
    const badge = getByText('Completed');
    expect(badge).toBeTruthy();
    expect(badge.props.className).toContain('text-green-700');
  });

  it('should accept custom className', () => {
    const { root } = render(
      <Badge className="custom-class">Custom</Badge>
    );
    
    // Find the View container with the custom class
    const views = root.findAllByType('View' as any);
    const badgeContainer = views.find(v => v.props.className?.includes('custom-class'));
    expect(badgeContainer).toBeTruthy();
  });

  it('should render children correctly', () => {
    const { getByText } = render(
      <Badge>
        <>Complex</>
        <> Content</>
      </Badge>
    );
    
    expect(getByText('Complex Content')).toBeTruthy();
  });

  it('should handle string children', () => {
    const { getByText } = render(<Badge>Simple Text</Badge>);
    
    expect(getByText('Simple Text')).toBeTruthy();
  });

  it('should handle number children', () => {
    const { getByText } = render(<Badge>{42}</Badge>);
    
    expect(getByText('42')).toBeTruthy();
  });

  it('should apply correct styles for each variant', () => {
    const variants = [
      { variant: 'default' as const, textClass: 'text-slate-800' },
      { variant: 'pending' as const, textClass: 'text-amber-700' },
      { variant: 'cancelled' as const, textClass: 'text-destructive' },
      { variant: 'completed' as const, textClass: 'text-green-700' }
    ];

    variants.forEach(({ variant, textClass }) => {
      const { getByText } = render(
        <Badge variant={variant}>{variant}</Badge>
      );
      
      const badge = getByText(variant);
      expect(badge.props.className).toContain(textClass);
    });
  });

  it('should handle undefined variant gracefully', () => {
    const { getByText } = render(<Badge variant={undefined}>Test</Badge>);
    
    const badge = getByText('Test');
    expect(badge.props.className).toContain('text-slate-800');
  });

  it('should forward additional props to View', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <Badge testID="test-badge" onTouchEnd={onPressMock}>
        Test Badge
      </Badge>
    );
    
    const badge = getByTestId('test-badge');
    expect(badge).toBeTruthy();
  });

  it('should have proper accessibility', () => {
    const { root } = render(
      <Badge accessibilityRole="text" accessibilityLabel="Status badge">
        Status
      </Badge>
    );
    
    // Find the View with accessibility props
    const views = root.findAllByType('View' as any);
    const badgeContainer = views.find(
      v => v.props.accessibilityRole === 'text' && 
           v.props.accessibilityLabel === 'Status badge'
    );
    expect(badgeContainer).toBeTruthy();
  });

  it('should handle long text content', () => {
    const longText = 'This is a very long badge text that should be handled properly';
    const { getByText } = render(<Badge>{longText}</Badge>);
    
    expect(getByText(longText)).toBeTruthy();
  });

  it('should handle empty children', () => {
    const { root } = render(<Badge>{''}</Badge>);
    
    expect(root).toBeTruthy();
  });

  it('should maintain consistent styling structure', () => {
    const { getByText } = render(<Badge variant="pending">Test</Badge>);
    
    const textElement = getByText('Test');
    expect(textElement.props.className).toContain('text-xs');
    expect(textElement.props.className).toContain('font-medium');
  });
});
