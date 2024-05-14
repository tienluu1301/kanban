import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import { fToNow } from 'src/utils/format-time';
import { IKanbanComment } from 'src/types/kanban';

// ----------------------------------------------------------------------

type Props = {
  comments: IKanbanComment[];
};

export default function KanbanDetailsCommentList({ comments }: Props) {
  return (
    <>
      <Stack
        spacing={3}
        flexGrow={1}
        sx={{
          py: 3,
          px: 2.5,
          bgcolor: 'background.neutral',
        }}
      >
        {comments.map((comment) => (
          <Stack key={comment.id} direction="row" spacing={2}>
            <Avatar />

            <Stack spacing={0.5} flexGrow={1}>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="subtitle2"> {comment.name}</Typography>
                <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                  {fToNow(comment.createdAt)}
                </Typography>
              </Stack>

              <Typography variant="body2">{comment.message}</Typography>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </>
  );
}
