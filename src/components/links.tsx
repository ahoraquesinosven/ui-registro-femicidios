import Button, { type ButtonProps } from "@mui/material/Button";
import IconButton, { type IconButtonProps } from "@mui/material/IconButton";
import { createLink } from "@tanstack/react-router";
import { forwardRef } from "react";

// createLink preserves TanStack Router's typed to/params/search (and typed
// activeProps/preload), which MUI's polymorphic `component` prop erases. Use these
// for internal route navigation; external URLs stay plain `href` anchors.

export const ButtonLink = createLink(
  forwardRef<HTMLAnchorElement, ButtonProps<"a">>((props, ref) => (
    <Button ref={ref} component="a" {...props} />
  )),
);

export const IconButtonLink = createLink(
  forwardRef<HTMLAnchorElement, IconButtonProps<"a">>((props, ref) => (
    <IconButton ref={ref} component="a" {...props} />
  )),
);
