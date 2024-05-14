import { Theme } from '@mui/material/styles';
import { BadgeProps, badgeClasses } from '@mui/material/Badge';

// ----------------------------------------------------------------------

// NEW VARIANT
declare module '@mui/material/Badge' {
  interface BadgePropsVariantOverrides {
    alway: true;
    busy: true;
    online: true;
    offline: true;
    invisible: true;
  }
}

export function badge(theme: Theme) {
  return {
    MuiBadge: {
      styleOverrides: {
        dot: {
          borderRadius: '50%',
        },
        root: ({ ownerState }: { ownerState: BadgeProps }) => {
          const alway = ownerState.variant === 'alway';

          const baseStyles = {
            [`&.${badgeClasses.invisible}`]: {
              transform: 'unset',
            },
            width: 10,
            zIndex: 9,
            padding: 0,
            height: 10,
            minWidth: 'auto',
            '&:before, &:after': {
              content: "''",
              borderRadius: 1,
              backgroundColor: theme.palette.common.white,
            },
          };

          return {
            ...(alway && {
              [`& .${badgeClasses.badge}`]: {
                ...baseStyles,
                backgroundColor: theme.palette.warning.main,
                '&:before': {
                  width: 2,
                  height: 4,
                  transform: 'translateX(1px) translateY(-1px)',
                },
                '&:after': {
                  width: 2,
                  height: 4,
                  transform: 'translateY(1px) rotate(125deg)',
                },
              },
            }),
          };
        },
      },
    },
  };
}
