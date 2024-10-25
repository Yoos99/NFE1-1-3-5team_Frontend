import styled, { css } from "styled-components";

interface StyledButtonProps {
  buttonType: "fill" | "outline";
  buttonSize: "small" | "medium" | "large";
}

export const StyledButton = styled.button<StyledButtonProps>`
  cursor: pointer;
  border-radius: 30px;
  padding: 12px 0;
  font-weight: var(--font-weight-semi-bold);

  ${({ buttonType }) =>
    buttonType === "fill"
      ? css`
          background-color: var(--primary-color-org);
          color: var(--color-white);
          border: none;
        `
      : css`
          background-color: var(--color-white);
          color: var(--primary-color-org);
          border: 1px solid var(--primary-color-org);
        `}

  ${({ buttonSize }) =>
    buttonSize === "small"
      ? css`
          width: 100px;
          font-size: var(--font-size-body-small);
        `
      : buttonSize === "medium"
      ? css`
          width: 150px;
          font-size: var(--font-size-body-medium);
        `
      : css`
          width: 300px;
          font-size: var(--font-size-body-medium);
        `}
`;

export const IconWrapper = styled.span`
  margin-right: 8px;
  vertical-align: middle;
`;
