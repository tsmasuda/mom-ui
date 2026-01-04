import { SaveButton, Toolbar, ToolbarProps } from "react-admin";

import { JSX } from "react/jsx-runtime";

export const EditToolbar = (props: JSX.IntrinsicAttributes & ToolbarProps) => (
  <Toolbar {...props}>
    <SaveButton />
  </Toolbar>
);
