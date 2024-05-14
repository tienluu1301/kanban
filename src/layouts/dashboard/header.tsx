import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';

import { useOffSetTop } from 'src/hooks/use-off-set-top';

import { bgBlur } from 'src/theme/css';

import { NAV, HEADER } from '../config-layout';

// ----------------------------------------------------------------------

export default function Header() {
  const theme = useTheme();

  const offset = useOffSetTop(HEADER.H_DESKTOP);

  return (
    <AppBar
      sx={{
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...{
          width: `calc(100% - ${NAV.W_VERTICAL + 1}px)`,
          height: HEADER.H_DESKTOP,
          ...(offset && {
            height: HEADER.H_DESKTOP_OFFSET,
          }),
        },
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      />
    </AppBar>
  );
}
