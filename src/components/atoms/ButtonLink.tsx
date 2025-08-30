import { Button, type ButtonProps } from '@mui/material';
import { Link as RouterLink, type LinkProps } from 'react-router-dom';
import { forwardRef, type ElementType } from 'react';

export interface ButtonLinkProps extends Omit<ButtonProps<typeof RouterLink>, 'href' | 'to'> {
  to: LinkProps['to'];
}

const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ to, ...props }, ref) => (
    <Button<ElementType>
      {...props}
      component={RouterLink}
      to={to}
      ref={ref}
    />
  )
);

ButtonLink.displayName = 'ButtonLink';

export default ButtonLink;