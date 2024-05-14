import Box, { BoxProps } from '@mui/material/Box';

import { NAV, HEADER } from '../config-layout';

// ----------------------------------------------------------------------

const SPACING = 8;

export default function Main({ children, sx, ...other }: BoxProps) {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        minHeight: 1,
        display: 'flex',
        flexDirection: 'column',
        ...{
          px: 2,
          py: `${HEADER.H_DESKTOP + SPACING}px`,
          width: `calc(100% - ${NAV.W_VERTICAL}px)`,
        },
        ...sx,
      }}
      {...other}
    >
      {children}
    </Box>
  );
}
