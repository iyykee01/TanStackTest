import { Button, ButtonText } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

type ButtonComponentProps = {
  className?: string;
  onPress: () => void;
  variant?: "link" | "outline";
  isLoading?: boolean;
  title: string;
};

export const ButtonComponent = ({
  className,
  onPress,
  variant,
  isLoading,
  title,
}: ButtonComponentProps) => {
  return (
    <Button
      variant={variant}
      className={`w-full ${className}`}
      onPress={onPress}
    >
      {isLoading ? <Spinner /> : <ButtonText>{title}</ButtonText>}
    </Button>
  );
};
