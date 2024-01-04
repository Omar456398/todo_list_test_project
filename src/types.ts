export type TaskType = {
  id?: Number;
  description: string;
  isDone: Boolean;
};

export type TasksSliceType = { tasks: TaskType[]; isLoading: Boolean; isError: Boolean };
