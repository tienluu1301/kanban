import { useState, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';

import Divider from '@mui/material/Divider';

import TextField from '@mui/material/TextField';

import { styled } from '@mui/material/styles';

import Scrollbar from 'src/components/scrollbar';

import { IKanbanTask } from 'src/types/kanban';

import KanbanInputName from './kanban-input-name';
import KanbanDetailsToolbar from './kanban-details-toolbar';
import KanbanDetailsCommentList from './kanban-details-comment-list';
import KanbanDetailsCommentInput from './kanban-details-comment-input';

// ----------------------------------------------------------------------

const StyledLabel = styled('span')(({ theme }) => ({
  ...theme.typography.caption,
  width: 100,
  flexShrink: 0,
  color: theme.palette.text.secondary,
  fontWeight: theme.typography.fontWeightSemiBold,
}));

// ----------------------------------------------------------------------

type Props = {
  task: IKanbanTask;
  openDetails: boolean;
  onCloseDetails: VoidFunction;
  //
  onUpdateTask: (updateTask: IKanbanTask) => void;
  onDeleteTask: VoidFunction;
};

export default function KanbanDetails({
  task,
  openDetails,
  onCloseDetails,
  //
  onUpdateTask,
  onDeleteTask,
}: Props) {
  const [taskName, setTaskName] = useState(task.name);

  const [taskDescription, setTaskDescription] = useState(task.description);

  const handleChangeTaskName = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value);
  }, []);

  const handleUpdateTask = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      try {
        if (event.key === 'Enter') {
          if (taskName) {
            onUpdateTask({
              ...task,
              name: taskName,
            });
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
    [onUpdateTask, task, taskName]
  );

  const handleChangeTaskDescription = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskDescription(event.target.value);
  }, []);

  const renderHead = (
    <KanbanDetailsToolbar taskName={task.name} onDelete={onDeleteTask} taskStatus={task.status} />
  );

  const renderName = (
    <KanbanInputName
      placeholder="Task name"
      value={taskName}
      onChange={handleChangeTaskName}
      onKeyUp={handleUpdateTask}
    />
  );

  const renderDescription = (
    <Stack direction="row">
      <StyledLabel> Description </StyledLabel>

      <TextField
        fullWidth
        multiline
        size="small"
        value={taskDescription}
        onChange={handleChangeTaskDescription}
        InputProps={{
          sx: { typography: 'body2' },
        }}
      />
    </Stack>
  );

  const renderComments = <KanbanDetailsCommentList comments={task.comments} />;

  return (
    <Drawer
      open={openDetails}
      onClose={onCloseDetails}
      anchor="right"
      slotProps={{
        backdrop: { invisible: true },
      }}
      PaperProps={{
        sx: {
          width: {
            xs: 1,
            sm: 480,
          },
        },
      }}
    >
      {renderHead}

      <Divider />

      <Scrollbar
        sx={{
          height: 1,
          '& .simplebar-content': {
            height: 1,
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        <Stack
          spacing={3}
          sx={{
            pt: 3,
            pb: 5,
            px: 2.5,
          }}
        >
          {renderName}

          {renderDescription}
        </Stack>

        {!!task.comments.length && renderComments}
      </Scrollbar>

      <KanbanDetailsCommentInput />
    </Drawer>
  );
}
