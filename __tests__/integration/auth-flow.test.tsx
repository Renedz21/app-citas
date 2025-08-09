import React from "react";
import { render, fireEvent, waitFor } from "../utils/test-utils";
import { Text, View } from "react-native";
import { useAuth } from "@/modules/core/hooks/use-sign-in";
import { Button } from "@/modules/core/components/ui/button";
import { Input } from "@/modules/core/components/ui/input";
import { SocialButtons } from "@/modules/core/components/shared/social-buttons";

// Mock the SVG components
jest.mock("@/assets/images/google-logo.svg", () => {
  const { Text } = require("react-native");
  return function GoogleIcon(props: any) {
    return <Text testID="google-icon">GoogleIcon</Text>;
  };
});
jest.mock("@/assets/images/apple.svg", () => {
  const { Text } = require("react-native");
  return function AppleIcon(props: any) {
    return <Text testID="apple-icon">AppleIcon</Text>;
  };
});

// Mock Form Component for testing
const MockLoginForm = () => {
  const { form, onSubmit } = useAuth("login");

  return (
    <View>
      <Input
        testID="email-input"
        placeholder="Email"
        value={form.watch("email")}
        onChangeText={(text) => form.setValue("email", text)}
      />
      {form.formState.errors.email && (
        <Text testID="email-error">{String(form.formState.errors.email?.message ?? "")}</Text>
      )}

      <Input
        testID="password-input"
        placeholder="Password"
        value={form.watch("password")}
        onChangeText={(text) => form.setValue("password", text)}
        secureTextEntry
      />
      {form.formState.errors.password && (
        <Text testID="password-error">
          {String(form.formState.errors.password?.message ?? "")}
        </Text>
      )}

      <Button
        testID="login-button"
        title="Login"
        onPress={form.handleSubmit(onSubmit)}
      />

      <SocialButtons />
    </View>
  );
};

const MockSignupForm = () => {
  const { form, onSubmit } = useAuth("signup");

  return (
    <View>
      <Input
        testID="name-input"
        placeholder="Name"
        value={form.watch("name") || ""}
        onChangeText={(text) => form.setValue("name", text)}
      />
      {form.formState.errors.name && (
        <Text testID="name-error">{String(form.formState.errors.name?.message ?? "")}</Text>
      )}

      <Input
        testID="email-input"
        placeholder="Email"
        value={form.watch("email")}
        onChangeText={(text) => form.setValue("email", text)}
      />
      {form.formState.errors.email && (
        <Text testID="email-error">{String(form.formState.errors.email?.message ?? "")}</Text>
      )}

      <Input
        testID="password-input"
        placeholder="Password"
        value={form.watch("password")}
        onChangeText={(text) => form.setValue("password", text)}
        secureTextEntry
      />
      {form.formState.errors.password && (
        <Text testID="password-error">
          {String(form.formState.errors.password?.message ?? "")}
        </Text>
      )}

      <Button
        testID="signup-button"
        title="Sign Up"
        onPress={form.handleSubmit(onSubmit)}
      />

      <SocialButtons />
    </View>
  );
};

describe("Authentication Flow Integration Tests", () => {
  const mockConsoleLog = jest.spyOn(console, "log").mockImplementation();

  afterEach(() => {
    mockConsoleLog.mockClear();
  });

  afterAll(() => {
    mockConsoleLog.mockRestore();
  });

  describe("Login Flow", () => {
    it("should complete successful login flow", async () => {
      const { getByTestId } = render(<MockLoginForm />);

      // Fill form with valid data
      fireEvent.changeText(getByTestId("email-input"), "test@example.com");
      fireEvent.changeText(getByTestId("password-input"), "password123");

      // Submit form
      fireEvent.press(getByTestId("login-button"));

      await waitFor(() => {
        expect(mockConsoleLog).toHaveBeenCalledWith({
          email: "test@example.com",
          password: "password123",
        });
      });
    });

    it("should show validation errors for invalid login data", async () => {
      const { getByTestId, queryByTestId } = render(<MockLoginForm />);

      // Fill form with invalid data
      fireEvent.changeText(getByTestId("email-input"), "invalid-email");
      fireEvent.changeText(getByTestId("password-input"), "123");

      // Try to submit to trigger validation
      fireEvent.press(getByTestId("login-button"));

      await waitFor(() => {
        expect(queryByTestId("email-error")).toBeTruthy();
        expect(queryByTestId("password-error")).toBeTruthy();
      });
    });

    it("should render social login buttons", () => {
      const { getByText } = render(<MockLoginForm />);

      expect(getByText("Continuar con Apple")).toBeTruthy();
      expect(getByText("Continuar con Google")).toBeTruthy();
    });

    it("should handle social button presses", () => {
      const { getByText } = render(<MockLoginForm />);

      const appleButton = getByText("Continuar con Apple");
      const googleButton = getByText("Continuar con Google");

      expect(() => fireEvent.press(appleButton)).not.toThrow();
      expect(() => fireEvent.press(googleButton)).not.toThrow();
    });
  });

  describe("Signup Flow", () => {
    it("should complete successful signup flow", async () => {
      const { getByTestId } = render(<MockSignupForm />);

      // Fill form with valid data
      fireEvent.changeText(getByTestId("name-input"), "John Doe");
      fireEvent.changeText(getByTestId("email-input"), "test@example.com");
      fireEvent.changeText(getByTestId("password-input"), "password123");

      // Submit form
      fireEvent.press(getByTestId("signup-button"));

      await waitFor(() => {
        expect(mockConsoleLog).toHaveBeenCalledWith({
          name: "John Doe",
          email: "test@example.com",
          password: "password123",
        });
      });
    });

    it("should show validation errors for invalid signup data", async () => {
      const { getByTestId, queryByTestId } = render(<MockSignupForm />);

      // Fill form with invalid data
      fireEvent.changeText(getByTestId("name-input"), "");
      fireEvent.changeText(getByTestId("email-input"), "invalid-email");
      fireEvent.changeText(getByTestId("password-input"), "123");

      // Try to submit to trigger validation
      fireEvent.press(getByTestId("signup-button"));

      await waitFor(() => {
        expect(queryByTestId("name-error")).toBeTruthy();
        expect(queryByTestId("email-error")).toBeTruthy();
        expect(queryByTestId("password-error")).toBeTruthy();
      });
    });

    it("should prevent signup with empty name", async () => {
      const { getByTestId, queryByTestId } = render(<MockSignupForm />);

      // Fill form with empty name but valid email and password
      fireEvent.changeText(getByTestId("name-input"), "");
      fireEvent.changeText(getByTestId("email-input"), "test@example.com");
      fireEvent.changeText(getByTestId("password-input"), "password123");

      // Try to submit to trigger validation
      fireEvent.press(getByTestId("signup-button"));

      await waitFor(() => {
        expect(queryByTestId("name-error")).toBeTruthy();
      });
    });

    it("should render social signup buttons", () => {
      const { getByText } = render(<MockSignupForm />);

      expect(getByText("Continuar con Apple")).toBeTruthy();
      expect(getByText("Continuar con Google")).toBeTruthy();
    });
  });

  describe("Component Integration", () => {
    it("should properly integrate Button and Input components", () => {
      const { getByTestId } = render(<MockLoginForm />);

      const emailInput = getByTestId("email-input");
      const passwordInput = getByTestId("password-input");
      const loginButton = getByTestId("login-button");

      expect(emailInput).toBeTruthy();
      expect(passwordInput).toBeTruthy();
      expect(loginButton).toBeTruthy();

      // Check that components have expected styling
      expect(emailInput.props.className).toContain("rounded-2xl");
      expect(passwordInput.props.secureTextEntry).toBe(true);
      expect(loginButton.props.className).toContain("bg-background");
    });

    it("should handle form state changes across components", async () => {
      const { getByTestId } = render(<MockLoginForm />);

      const emailInput = getByTestId("email-input");

      // Change input value
      fireEvent.changeText(emailInput, "test@example.com");

      // Verify the value is reflected
      await waitFor(() => {
        expect(emailInput.props.value).toBe("test@example.com");
      });
    });

    it("should maintain component accessibility", () => {
      const { getByTestId, getByText } = render(<MockLoginForm />);

      const emailInput = getByTestId("email-input");
      const loginButton = getByText("Login");
      const appleButton = getByText("Continuar con Apple");

      expect(emailInput).toBeTruthy();
      expect(loginButton).toBeTruthy();
      expect(appleButton).toBeTruthy();
    });
  });
});
