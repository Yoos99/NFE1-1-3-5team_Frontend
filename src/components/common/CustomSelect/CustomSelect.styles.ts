import styled, { css } from "styled-components";

export const SelectWrapper = styled.div`
  margin-bottom: 30px;
  font-family: "DM Sans", sans-serif;
`;

export const Label = styled.p`
  font-size: var(--font-size-head-small);
  margin-bottom: 8px;
  font-weight: var(--font-weight-semi-bold);
  font-family: inherit;
`;

// default: 글 작성 Select, rounded: 카테고리 Select
export const StyledSelect = styled.div<{ $variant: "default" | "rounded" }>`
  .react--select__control {
    height: 60px;
    color: var(--primary-color-org);
    border-radius: 10px;
    box-sizing: border-box;
    padding: 0 3px;
    font-size: var(--font-size-head-small);
    font-weight: var(--font-weight-semi-bold);
    font-family: "DM Sans", sans-serif;
    align-items: center;
    display: flex;
    width: 100%;

    ${({ $variant }) =>
      $variant === "rounded" &&
      css`
        width: 240px;
        height: 50px;
        border-radius: 30px;
      `}
  }

  .react--select__menu {
    width: ${({ $variant }) => ($variant === "rounded" ? "240px" : "100%")};
  }

  .react--select__indicator-separator {
    display: none;
  }
`;
