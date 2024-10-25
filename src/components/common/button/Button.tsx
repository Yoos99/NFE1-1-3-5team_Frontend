import { StyledButton, IconWrapper } from "./Button.styles";

interface ButtonProps {
  buttonType?: "fill" | "outline";
  buttonSize?: "small" | "medium" | "large";
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

const Button = ({
  buttonType = "fill",
  buttonSize = "medium",
  label,
  icon,
  onClick,
}: ButtonProps) => {
  return (
    <StyledButton
      buttonType={buttonType}
      buttonSize={buttonSize}
      onClick={onClick}
    >
      {icon && <IconWrapper>{icon}</IconWrapper>}
      {label}
    </StyledButton>
  );
};

export default Button;
