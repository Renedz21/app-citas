import { Text, Pressable, type PressableProps } from "react-native";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "flex-row items-center justify-center rounded-full py-4 gap-4",
  {
    variants: {
      variant: {
        default: "bg-background shadow-lg shadow-background/50 elevation-lg",
        secondary: "bg-white",
        outline: "bg-white border border-border",
        ghost: "bg-transparent ",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface ButtonProps
  extends PressableProps,
    VariantProps<typeof buttonVariants> {
  icon?: any;
  iconPosition?: "left" | "right";
  title?: string;
}

export const Button = ({
  children,
  variant = "default",
  icon,
  title,
  iconPosition = "left",
  ...props
}: ButtonProps) => {
  return (
    <Pressable className={cn(buttonVariants({ variant }))} {...props}>
      {({ pressed }) => (
        <>
          {iconPosition === "left" && icon}
          {title && (
            <Text
              className={cn(
                "text-xl font-semibold text-white",
                variant === "default" ? "text-white" : "text-primary",
                pressed && "opacity-50",
              )}
            >
              {title}
            </Text>
          )}
          {iconPosition === "right" && icon}
          {children && children}
        </>
      )}
    </Pressable>
  );
};
