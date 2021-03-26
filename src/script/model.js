import { getData, postData, patchData, deleteData } from './api';
import { formatData, sortTasks } from './util';

export const task = {
  async getAll() {
    const tasks = (await getData('tasks')) ?? [];
    return sortTasks(tasks.map((task) => formatData(task)));
  },
  async getOne(id) {
    const task = await getData(`tasks/${id}`);
    return formatData(task);
  },
  async create(obj) {
    const task = await postData(`tasks`, obj);
    return formatData(task);
  },
  async setFulfilled(id, fulfilled) {
    const task = await patchData(`tasks/${id}`, { fulfilled });
    return formatData(task);
  },
  async setMessage(id, message) {
    const task = await patchData(`tasks/${id}`, { message });
    return formatData(task);
  },
  async deleteOne(id) {
    const task = await deleteData(`tasks/${id}`);
    return formatData(task);
  },
};
