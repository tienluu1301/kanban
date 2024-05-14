'use client';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';

import CompactLayout from 'src/layouts/compact';
import { SeverErrorIllustration } from 'src/assets/illustrations';

// ----------------------------------------------------------------------

export default function Page500() {
  return (
    <CompactLayout>
      <Typography variant="h3" sx={{ mb: 2 }}>
        500 Internal Server Error
      </Typography>

      <Typography sx={{ color: 'text.secondary' }}>
        There was an error, please try again later.
      </Typography>

      <SeverErrorIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />

      <Button component={RouterLink} href="/" size="large" variant="contained">
        Go to Home
      </Button>
    </CompactLayout>
  );
}
