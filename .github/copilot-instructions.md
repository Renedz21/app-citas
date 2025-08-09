# Copilot Instructions for app-citas

## Repository Overview

This is a **React Native appointment booking app** built with Expo, written in TypeScript. The app uses modern React Native patterns with Expo Router for navigation, NativeWind (Tailwind CSS) for styling, and comprehensive form validation with React Hook Form + Zod.

**Project Scale**: ~50 source files, ~1,200 dependencies, modern mobile-first architecture  
**Languages**: TypeScript, React Native, JSX  
**Key Frameworks**: Expo SDK 53, React Native 0.79.5, React 19.0.0  
**Target Platforms**: iOS, Android, Web

## Build & Development Commands

### Required Tools & Versions
- **Node.js**: 18+ (tested with 20.x)
- **Package Manager**: pnpm (required - do not use npm/yarn)
- **Expo CLI**: Installed automatically via dependencies

### Essential Commands (In Order)

**1. Dependencies Installation** (ALWAYS RUN FIRST)
```bash
pnpm install
```
⏱️ **Time**: ~2.5 minutes | **Critical**: Must complete before any other commands

**2. Development Validation**
```bash
pnpm run lint          # ESLint with auto-fix (~5 seconds)
pnpm run format        # Prettier formatting (~10 seconds)  
pnpm run test:ci       # Jest test suite - 78 tests (~6.5 seconds)
```

**3. Native Development** (if modifying native code)
```bash
pnpm run prebuild      # Expo prebuild (~30 seconds)
```
⚠️ **Requirement**: Git working directory must be clean

**4. Development Server**
```bash
pnpm start             # Expo development server
pnpm run web           # Web development  
pnpm run android       # Android development
pnpm run ios           # iOS development (macOS only)
```

### Validation Commands
```bash
pnpm run test:coverage    # Test coverage report
pnpm run doctor          # Expo environment check (may fail offline)
```

### Known Issues & Workarounds
- **pnpm run doctor**: Requires internet connectivity, may fail in restricted environments - this is expected
- **prebuild**: Requires clean git state - commit changes first
- **Network timeouts**: Some Expo commands need external API access
- **iOS development**: Only available on macOS systems

## Project Architecture

### Directory Structure
```
app-citas/
├── app/                    # Expo Router pages (main navigation structure)
│   ├── (auth)/            # Authentication flow pages
│   │   ├── sign-in.tsx    # Login page
│   │   ├── sign-up.tsx    # Registration page
│   │   └── _layout.tsx    # Auth stack layout
│   ├── (tabs)/            # Main app tabs
│   │   ├── index.tsx      # Home/dashboard
│   │   └── _layout.tsx    # Tab navigation layout
│   └── _layout.tsx        # Root app layout with providers
├── modules/core/           # Business logic and shared components
│   ├── components/        # React components
│   │   ├── ui/           # Reusable UI components (Button, Input, etc.)
│   │   └── shared/       # Business-specific shared components
│   ├── hooks/            # Custom React hooks
│   └── schemas/          # Zod validation schemas
├── lib/                   # Utility functions
│   └── utils.ts          # Common utilities (cn function for class merging)
├── constants/            # App constants (colors, etc.)
├── __tests__/           # Comprehensive test suite
└── assets/              # Static assets (images, fonts)
```

### Configuration Files
- **package.json**: Scripts, dependencies, Jest config
- **app.json**: Expo configuration
- **babel.config.js**: Babel preset with NativeWind support
- **metro.config.js**: Metro bundler with SVG transformer
- **eslint.config.js**: ESLint flat config with Expo preset
- **prettier.config.js**: Prettier formatting rules
- **tailwind.config.js**: Tailwind CSS configuration
- **tsconfig.json**: TypeScript configuration

### Key Dependencies
- **Navigation**: `expo-router` (file-based routing)
- **Styling**: `nativewind` (Tailwind for React Native)
- **Forms**: `react-hook-form` + `@hookform/resolvers` + `zod`
- **UI**: Custom components with `class-variance-authority`
- **Animations**: `react-native-reanimated`, `react-native-gesture-handler`
- **Testing**: `jest`, `@testing-library/react-native`, `jest-expo`

## Development Workflow

### Making Code Changes
1. **Always** run `pnpm install` first in a new environment
2. **Always** run tests before and after changes: `pnpm run test:ci`
3. **Always** lint and format: `pnpm run lint && pnpm run format`
4. For native changes: run `pnpm run prebuild` with clean git state

### Adding New Features
- **Components**: Add to `/modules/core/components/ui/` (reusable) or `/modules/core/components/shared/` (business-specific)
- **Pages**: Add to `/app/` following Expo Router conventions
- **Business Logic**: Add hooks to `/modules/core/hooks/`, schemas to `/modules/core/schemas/`
- **Utilities**: Add to `/lib/utils.ts` or create new utility files
- **Tests**: Add corresponding tests in `/__tests__/` mirroring the source structure

### Code Patterns
- **Styling**: Use NativeWind classes, combine with `cn()` utility from `/lib/utils.ts`
- **Forms**: Use React Hook Form with Zod schemas for validation
- **Navigation**: Use Expo Router with file-based routing patterns
- **State**: Prefer custom hooks over global state management

### Testing Strategy
- **Unit Tests**: All utilities, hooks, and components have tests
- **Integration Tests**: Authentication flow and user journeys
- **Coverage**: Maintains 85%+ coverage across core functionality
- **Test Location**: Tests mirror source structure in `__tests__/`

## Common Tasks

### Component Development
```bash
# 1. Create component in modules/core/components/ui/my-component.tsx
# 2. Create test in __tests__/modules/core/components/ui/my-component.test.tsx
# 3. Run tests: pnpm run test:ci
# 4. Lint and format: pnpm run lint && pnpm run format
```

### Page/Route Development  
```bash
# 1. Create page in app/my-page.tsx (follows Expo Router conventions)
# 2. Test navigation and functionality
# 3. Add integration tests if needed
# 4. Validate with: pnpm run test:ci && pnpm run lint
```

### Form Development
```bash
# 1. Create Zod schema in modules/core/schemas/
# 2. Create form hook in modules/core/hooks/
# 3. Create form component using React Hook Form
# 4. Add comprehensive validation tests
```

## Important Notes

- **Trust these instructions**: Only search for additional information if these instructions are incomplete or incorrect
- **Use pnpm exclusively**: Do not use npm or yarn - the project is configured for pnpm
- **Test thoroughly**: The test suite is comprehensive and fast - use it frequently  
- **Follow existing patterns**: The codebase has consistent patterns for components, hooks, and navigation
- **Mobile-first**: This is a React Native app - consider mobile UX and platform differences
- **Type safety**: Leverage TypeScript and Zod schemas for runtime validation

## File Structure Reference

**Root Files**: package.json, app.json, babel.config.js, metro.config.js, eslint.config.js, prettier.config.js, tailwind.config.js, tsconfig.json, global.css, pnpm-lock.yaml, pnpm-workspace.yaml

**Key Source Files**:
- `app/_layout.tsx`: Root layout with providers and protected routes
- `lib/utils.ts`: Class merging utility function using clsx + tailwind-merge  
- `modules/core/schemas/auth.schema.ts`: Authentication validation schemas
- `modules/core/components/ui/button.tsx`: Reusable button component with variants
- `__tests__/setup.ts`: Jest test environment configuration

This project follows modern React Native best practices with excellent developer experience tooling.