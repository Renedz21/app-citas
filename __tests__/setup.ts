// @testing-library/react-native/extend-expect is deprecated
// Modern versions include matchers by default

// Set up environment variables for Supabase
process.env.EXPO_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key';

// Mock AsyncStorage

// Mock react-native modules (commented out as it's handled by jest-expo)
// jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Mock expo modules that might be used
jest.mock('expo-font');
jest.mock('expo-asset');

// Mock react-native-keyboard-controller
jest.mock('react-native-keyboard-controller', () => {
  const React = require('react');
  const { View } = require('react-native');
  
  return {
    KeyboardAvoidingView: View,
    KeyboardProvider: ({ children }: any) => children,
  };
});

// Mock SVG components globally
jest.mock('react-native-svg', () => {
  const React = require('react');
  const { View } = require('react-native');

  return {
    Svg: View,
    Circle: View,
    Ellipse: View,
    G: View,
    Text: View,
    TSpan: View,
    TextPath: View,
    Path: View,
    Polygon: View,
    Polyline: View,
    Line: View,
    Rect: View,
    Use: View,
    Image: View,
    Symbol: View,
    Defs: View,
    LinearGradient: View,
    RadialGradient: View,
    Stop: View,
    ClipPath: View,
    Pattern: View,
    Mask: View
  };
});

// Mock specific SVG icons that are causing issues
jest.mock('@/assets/icons/chevron-left.svg', () => 'ChevronLeftIcon');
jest.mock('@/assets/icons/clock.svg', () => 'ClockIcon');
jest.mock('@/assets/icons/phone.svg', () => 'PhoneIcon');

// Mock gesture handler
jest.mock('react-native-gesture-handler', () => {
  const View = require('react-native/Libraries/Components/View/View');
  return {
    Swipeable: View,
    DrawerLayout: View,
    State: {},
    ScrollView: View,
    Slider: View,
    Switch: View,
    TextInput: View,
    ToolbarAndroid: View,
    ViewPagerAndroid: View,
    DrawerLayoutAndroid: View,
    WebView: View,
    NativeViewGestureHandler: View,
    TapGestureHandler: View,
    FlingGestureHandler: View,
    ForceTouchGestureHandler: View,
    LongPressGestureHandler: View,
    PanGestureHandler: View,
    PinchGestureHandler: View,
    RotationGestureHandler: View,
    RawButton: View,
    BaseButton: View,
    RectButton: View,
    BorderlessButton: View,
    FlatList: View,
    gestureHandlerRootHOC: jest.fn((component) => component),
    Directions: {}
  };
});

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Mock NativeWind
jest.mock('nativewind', () => ({
  withExpoAdapter: jest.fn((config) => config)
}));

// Mock React Hook Form (if needed for more complex tests)
jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  Controller: ({ render, name, control, defaultValue, ...props }: any) => {
    const React = require('react');
    const [value, setValue] = React.useState(defaultValue || '');
    return render({
      field: {
        onChange: setValue,
        onBlur: () => {},
        value,
        name
      },
      fieldState: {
        invalid: false,
        isTouched: false,
        isDirty: false,
        error: undefined
      },
      formState: {}
    });
  }
}));

// Silence the warning about act() wrapping
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render is no longer supported')
    ) {
      return;
    }
    return originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
