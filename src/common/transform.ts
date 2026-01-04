export const transform = (data: {
  decisions: Array<any>;
  tasks: Array<any>;
  people: Array<any>;
}) => {
  const { tasks, decisions, people, ...rest } = data;

  return {
    ...rest,
    ...(tasks
      ? {
          tasks: {
            set: tasks || [],
          },
        }
      : null),
    ...(decisions
      ? {
          decisions: {
            set: decisions || [],
          },
        }
      : null),
    ...(people
      ? {
          people: {
            set: people || [],
          },
        }
      : null),
  };
};
