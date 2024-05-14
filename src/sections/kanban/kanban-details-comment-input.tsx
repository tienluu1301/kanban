import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';

// ----------------------------------------------------------------------

export default function KanbanDetailsCommentInput() {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        py: 3,
        px: 2.5,
      }}
    >
      <Paper variant="outlined" sx={{ p: 1, flexGrow: 1, bgcolor: 'transparent' }}>
        <InputBase fullWidth multiline rows={2} placeholder="Type a message" sx={{ px: 1 }} />

        <Stack direction="row" alignItems="center">
          <Stack direction="row" flexGrow={1}/>

          <Button variant="contained">Comment</Button>
        </Stack>
      </Paper>
    </Stack>
  );
}
