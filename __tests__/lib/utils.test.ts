import { cn } from '@/lib/utils';

describe('Utils', () => {
  describe('cn function', () => {
    it('should merge class names correctly', () => {
      const result = cn('text-red-500', 'bg-blue-500');
      expect(result).toContain('text-red-500');
      expect(result).toContain('bg-blue-500');
    });

    it('should handle conflicting Tailwind classes', () => {
      const result = cn('text-red-500', 'text-blue-500');
      // Should keep the last conflicting class
      expect(result).toBe('text-blue-500');
    });

    it('should handle conditional classes', () => {
      const isActive = true;
      const result = cn(
        'base-class',
        isActive && 'active-class',
        !isActive && 'inactive-class'
      );
      expect(result).toContain('base-class');
      expect(result).toContain('active-class');
      expect(result).not.toContain('inactive-class');
    });

    it('should handle arrays of classes', () => {
      const result = cn(['class1', 'class2'], 'class3');
      expect(result).toContain('class1');
      expect(result).toContain('class2');
      expect(result).toContain('class3');
    });

    it('should handle empty input', () => {
      const result = cn();
      expect(result).toBe('');
    });

    it('should filter out falsy values', () => {
      const result = cn(
        'valid-class',
        null,
        undefined,
        false,
        '',
        'another-class'
      );
      expect(result).toBe('valid-class another-class');
    });
  });
});
