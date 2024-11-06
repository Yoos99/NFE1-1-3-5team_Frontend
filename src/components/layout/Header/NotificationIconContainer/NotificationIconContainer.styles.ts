import styled from "styled-components";

interface NotificationIconContainerProps {
  children: React.ReactNode;
  $notificationCount: number;
}

export const IconContainer = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background-color: var(--primary-color-org);
  color: var(--color-white);
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border: none;

  &:hover {
    background-color: var(--color-chat-orange);
    /* color: var(--font-color-dark); */
  }
`;

export const Badge = styled.span<NotificationIconContainerProps>`
  position: absolute;
  top: -3px;
  right: -3px;
  display: ${({ $notificationCount }) =>
    $notificationCount > 0 ? "flex" : "none"};
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: red;
  color: white;
  font-size: 12px;
  font-weight: bold;
`;
