import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";
import ShareIcon from "./../icon/ShareIcon/ShareIcon";
import ContactIcon from "./../icon/ContactIcon/ContactIcon";

const meta = {
  title: "Common/button/Button",
  component: Button,
  argTypes: {
    buttonType: {
      control: "select",
      options: ["fill", "outline"],
    },
    buttonSize: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    label: {
      control: "text",
    },
    icon: {
      control: false,
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    buttonType: "fill",
    buttonSize: "medium",
    label: "기본 버튼",
  },
};

export const Outline: Story = {
  args: {
    buttonType: "outline",
    buttonSize: "medium",
    label: "테두리 버튼",
  },
};

export const Small: Story = {
  args: {
    buttonType: "fill",
    buttonSize: "small",
    label: "작은 버튼",
  },
};

export const Medium: Story = {
  args: {
    buttonType: "fill",
    buttonSize: "medium",
    label: "중간 버튼",
  },
};

export const Large: Story = {
  args: {
    buttonType: "fill",
    buttonSize: "large",
    label: "큰 버튼",
  },
};

export const WithContactIcon: Story = {
  args: {
    buttonType: "fill",
    buttonSize: "medium",
    label: "문의하기",
    icon: <ContactIcon />,
  },
};

export const WithShareIcon: Story = {
  args: {
    buttonType: "outline",
    buttonSize: "medium",
    label: "공유하기",
    icon: <ShareIcon />,
  },
};
