import { Draggable } from '@hello-pangea/dnd';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Paper, { PaperProps } from '@mui/material/Paper';

import { useBoolean } from 'src/hooks/use-boolean';

import { bgBlur } from 'src/theme/css';

import Iconify from 'src/components/iconify';

import { IKanbanTask } from 'src/types/kanban';

import KanbanDetails from './kanban-details';

// ----------------------------------------------------------------------

type Props = PaperProps & {
  index: number;
  task: IKanbanTask;
  onUpdateTask: (updateTask: IKanbanTask) => void;
  onDeleteTask: VoidFunction;
};

export default function KanbanTaskItem({
  task,
  index,
  onDeleteTask,
  onUpdateTask,
  sx,
  ...other
}: Props) {
  const theme = useTheme();

  const openDetails = useBoolean();

  const renderInfo = (
    <Stack direction="row" alignItems="center">
      <Stack
        flexGrow={1}
        direction="row"
        alignItems="center"
        sx={{
          typography: 'caption',
          color: 'text.disabled',
        }}
      >
        <Iconify width={16} icon="solar:chat-round-dots-bold" sx={{ mr: 0.25 }} />
        <Box component="span" sx={{ mr: 1 }}>
          {task.comments.length}
        </Box>
      </Stack>
    </Stack>
  );

  return (
    <>
      <Draggable draggableId={task.id} index={index}>
        {(provided, snapshot) => (
          <Paper
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={openDetails.onTrue}
            sx={{
              width: 1,
              borderRadius: 1.5,
              overflow: 'hidden',
              position: 'relative',
              bgcolor: 'background.default',
              boxShadow: theme.customShadows.z1,
              '&:hover': {
                boxShadow: theme.customShadows.z20,
              },
              ...(openDetails.value && {
                boxShadow: theme.customShadows.z20,
              }),
              ...(snapshot.isDragging && {
                boxShadow: theme.customShadows.z20,
                ...bgBlur({
                  opacity: 0.48,
                  color: theme.palette.background.default,
                }),
              }),
              ...sx,
            }}
            {...other}
          >
            <Stack spacing={2} sx={{ px: 2, py: 2.5, position: 'relative' }}>
              <Typography variant="subtitle2">{task.name}</Typography>

              {renderInfo}
            </Stack>
          </Paper>
        )}
      </Draggable>

      <KanbanDetails
        task={task}
        openDetails={openDetails.value}
        onCloseDetails={openDetails.onFalse}
        onUpdateTask={onUpdateTask}
        onDeleteTask={onDeleteTask}
      />
    </>
  );
}
