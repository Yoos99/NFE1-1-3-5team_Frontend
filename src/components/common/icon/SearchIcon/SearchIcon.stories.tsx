import type { Meta, StoryObj } from "@storybook/react";
import SearchIcon from "./SearchIcon";

const meta = {
  title: "Common/Icon/SearchIcon",
  component: SearchIcon,
} satisfies Meta<typeof SearchIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
