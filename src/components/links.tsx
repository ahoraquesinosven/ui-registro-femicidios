import { createLink } from '@tanstack/react-router';
import Button, { ButtonProps } from '@mui/material/Button';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { forwardRef } from 'react';

// createLink preserves TanStack Router's typed to/params/search (and typed
// activeProps/preload), which MUI's polymorphic `component` prop erases. Use these
// for internal route navigation; external URLs stay plain `href` anchors.

const MuiButtonLink = forwardRef<HTMLAnchorElement, ButtonProps<'a'>>(
  (props, ref) => <Button ref={ref} component="a" {...props} />,
);
export const ButtonLink = createLink(MuiButtonLink);

const MuiIconButtonLink = forwardRef<HTMLAnchorElement, IconButtonProps<'a'>>(
  (props, ref) => <IconButton ref={ref} component="a" {...props} />,
);
export const IconButtonLink = createLink(MuiIconButtonLink);
