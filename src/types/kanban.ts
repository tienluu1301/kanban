// ----------------------------------------------------------------------

export type IKanbanComment = {
  id: string;
  name: string;
  message: string;
  messageType: 'text';
  createdAt: Date;
};

export type IKanbanTask = {
  id: string;
  name: string;
  status: string;
  description?: string;
  comments: IKanbanComment[];
  reporter: {
    id: string;
    name: string;
  };
};

export type IKanbanColumn = {
  id: string;
  name: string;
  taskIds: string[];
};

export type IKanban = {
  tasks: Record<string, IKanbanTask>;
  columns: Record<string, IKanbanColumn>;
  ordered: string[];
};
