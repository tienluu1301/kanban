import { useMemo } from 'react';
import useSWR, { mutate } from 'swr';

import { fetcher, endpoints } from 'src/utils/axios';

import { IKanban, IKanbanTask, IKanbanColumn } from 'src/types/kanban';

// ----------------------------------------------------------------------

const URL = endpoints.kanban;

const options = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

export function useGetBoard() {
  const { data, isLoading, error, isValidating } = useSWR(
    URL,
    () => fetcher('https://my-json-server.typicode.com/tienluu1301/kanban-json/db'),
    options
  );

  const memoizedValue = useMemo(
    () => ({
      board: data?.board as IKanban,
      boardLoading: isLoading,
      boardError: error,
      boardValidating: isValidating,
      boardEmpty: !isLoading && !data?.board.ordered.length,
    }),
    [data?.board, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export async function createColumn(columnData: IKanbanColumn) {
  /**
   * Work in local
   */
  mutate(
    URL,
    (currentData: any) => {
      const board = currentData.board as IKanban;

      const columns = {
        ...board.columns,
        // add new column in board.columns
        [columnData.id]: columnData,
      };

      // add new column in board.ordered
      const ordered = [...board.ordered, columnData.id];

      return {
        ...currentData,
        board: {
          ...board,
          columns,
          ordered,
        },
      };
    },
    false
  );
}

// ----------------------------------------------------------------------

export async function updateColumn(columnId: string, columnName: string) {
  /**
   * Work in local
   */
  mutate(
    URL,
    (currentData: any) => {
      const board = currentData.board as IKanban;

      // current column
      const column = board.columns[columnId];

      const columns = {
        ...board.columns,
        // update column in board.columns
        [column.id]: {
          ...column,
          name: columnName,
        },
      };

      return {
        ...currentData,
        board: {
          ...board,
          columns,
        },
      };
    },
    false
  );
}

// ----------------------------------------------------------------------

export async function moveColumn(newOrdered: string[]) {
  /**
   * Work in local
   */
  mutate(
    URL,
    (currentData: any) => {
      const board = currentData.board as IKanban;

      // update ordered in board.ordered
      const ordered = newOrdered;

      return {
        ...currentData,
        board: {
          ...board,
          ordered,
        },
      };
    },
    false
  );
}

// ----------------------------------------------------------------------

export async function clearColumn(columnId: string) {
  /**
   * Work in local
   */
  mutate(
    URL,
    (currentData: any) => {
      const board = currentData.board as IKanban;

      const { tasks } = board;

      // current column
      const column = board.columns[columnId];

      // delete tasks in board.tasks
      column.taskIds.forEach((key: string) => {
        delete tasks[key];
      });

      const columns = {
        ...board.columns,
        [column.id]: {
          ...column,
          // delete task in column
          taskIds: [],
        },
      };

      return {
        ...currentData,
        board: {
          ...board,
          columns,
          tasks,
        },
      };
    },
    false
  );
}

// ----------------------------------------------------------------------

export async function deleteColumn(columnId: string) {
  /**
   * Work in local
   */
  mutate(
    URL,
    (currentData: any) => {
      const board = currentData.board as IKanban;

      const { columns, tasks } = board;

      // current column
      const column = columns[columnId];

      // delete column in board.columns
      delete columns[columnId];

      // delete tasks in board.tasks
      column.taskIds.forEach((key: string) => {
        delete tasks[key];
      });

      // delete column in board.ordered
      const ordered = board.ordered.filter((id: string) => id !== columnId);

      return {
        ...currentData,
        board: {
          ...board,
          columns,
          tasks,
          ordered,
        },
      };
    },
    false
  );
}

// ----------------------------------------------------------------------

export async function createTask(columnId: string, taskData: IKanbanTask) {
  /**
   * Work in local
   */
  mutate(
    URL,
    (currentData: any) => {
      const board = currentData.board as IKanban;

      // current column
      const column = board.columns[columnId];

      const columns = {
        ...board.columns,
        [columnId]: {
          ...column,
          // add task in column
          taskIds: [...column.taskIds, taskData.id],
        },
      };

      // add task in board.tasks
      const tasks = {
        ...board.tasks,
        [taskData.id]: taskData,
      };

      return {
        ...currentData,
        board: {
          ...board,
          columns,
          tasks,
        },
      };
    },
    false
  );
}

// ----------------------------------------------------------------------

export async function updateTask(taskData: IKanbanTask) {
  /**
   * Work in local
   */
  mutate(
    URL,
    (currentData: any) => {
      const board = currentData.board as IKanban;

      const tasks = {
        ...board.tasks,
        // add task in board.tasks
        [taskData.id]: taskData,
      };

      return {
        ...currentData,
        board: {
          ...board,
          tasks,
        },
      };
    },
    false
  );
}

// ----------------------------------------------------------------------

export async function moveTask(updateColumns: Record<string, IKanbanColumn>) {
  /**
   * Work in local
   */
  mutate(
    URL,
    (currentData: any) => {
      const board = currentData.board as IKanban;

      // update board.columns
      const columns = updateColumns;

      return {
        ...currentData,
        board: {
          ...board,
          columns,
        },
      };
    },
    false
  );
}

// ----------------------------------------------------------------------

export async function deleteTask(columnId: string, taskId: string) {
  /**
   * Work in local
   */
  mutate(
    URL,
    (currentData: any) => {
      const board = currentData.board as IKanban;

      const { tasks } = board;

      // current column
      const column = board.columns[columnId];

      const columns = {
        ...board.columns,
        [column.id]: {
          ...column,
          // delete tasks in column
          taskIds: column.taskIds.filter((id: string) => id !== taskId),
        },
      };

      // delete tasks in board.tasks
      delete tasks[taskId];

      return {
        ...currentData,
        board: {
          ...board,
          columns,
          tasks,
        },
      };
    },
    false
  );
}
