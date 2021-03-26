export const replaceOne = (array = [], obj) => {
  return array.map((item) => (item._id === obj._id ? obj : item));
};

export const removeOne = (array = [], obj) => {
  return array.filter((item) => item._id !== obj._id);
};

export const addOne = (array = [], obj) => {
  return array.concat([obj]);
};

export const getButtons = (id) => {
  const editCompleteBtn = document.getElementById(`edit-complete-${id}`);
  const editBtn = document.getElementById(`edit-${id}`);
  return [editCompleteBtn, editBtn];
};

export const getInputContainer = (id) => {
  return document.getElementById(`task-input-container-${id}`);
};

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleString('en-UK', options);
};

export const formatData = (task) => {
  return Object.assign(
    {
      formatDate: formatDate(task.updatedAt),
      checked: task.fulfilled ? 'checked' : '',
    },
    task
  );
};

export const sortTasks = (tasks) => {
  return tasks
    .sort((task1, task2) => (task1.updatedAt < task2.updatedAt ? 1 : -1))
    .sort((task1, task2) => (task1.fulfilled < task2.fulfilled ? -1 : 0));
};
