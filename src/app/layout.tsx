/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';

// ----------------------------------------------------------------------

import ThemeProvider from 'src/theme';
import { primaryFont } from 'src/theme/typography';

import SnackbarProvider from 'src/components/snackbar/snackbar-provider';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className={primaryFont.className}>
      <body>
        <ThemeProvider>
          <SnackbarProvider>{children}</SnackbarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
