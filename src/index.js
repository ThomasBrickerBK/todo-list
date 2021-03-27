import { task } from './script/model';
import { vue3 } from './script/vue3';
import { view } from './script/view';
import { replaceOne, removeOne, addOne, sortTasks } from './script/util';

import './style/main.scss';

const vm = vue3({
  data: {
    active: 0,
    successful: 0,
    scope: 0,
    deleteId: '',
    createMessage: '',
    editMessage: '',
    tasks: [],
  },
  computed: {
    info() {
      return `Active: ${this.active}\nSuccessful: ${this.successful}\nScope: ${
        this.active + this.successful
      }`;
    },
  },
  watch: {
    active(newVal, oldVal) {
      view.setActive(newVal);
    },
    successful(newVal, oldVal) {
      view.setSuccessful(newVal);
    },
    scope(newVal, oldVal) {
      view.setScope(newVal);
    },
    tasks(newVal, oldVal) {
      this.scope = newVal.length;

      this.successful = newVal.reduce((accum, task) => accum + Number(task.fulfilled), 0);

      this.active = this.scope - this.successful;

      view.renderTasks(this);

      console.log('test computed', 'info');
      console.log(this.info);
    },
    deleteId(newVal, oldVal) {
      view.openPopupDelete(!!newVal);
    },
  },

  methods: {
    async confirmCreate() {
      if (!this.createMessage.length) return;
      const newTask = await task.create({ message: this.createMessage });
      if (!newTask.error) this.tasks = sortTasks(addOne(this.tasks, newTask));
      view.openPopupCreate(false);
      this.createMessage = '';
    },
    inputCreateMessage(message) {
      this.createMessage = message;
    },
    inputEditMessage(message) {
      this.editMessage = message;
    },
    async fulfilled(id) {
      const currentTask = this.tasks.find((task) => task._id === id);
      const fulfilled = !currentTask.fulfilled;
      const newTask = await task.setFulfilled(id, fulfilled);
      if (!newTask.error) this.tasks = sortTasks(replaceOne(this.tasks, newTask));
    },
    async editComplete(id) {
      const newTask = await task.setMessage(id, this.editMessage);
      if (!newTask.error) this.tasks = sortTasks(replaceOne(this.tasks, newTask));
      view.setEditedTask(id, false);
    },
    edit(id) {
      view.setEditedTask(id, true);
      const currentTask = this.tasks.find((task) => task._id === id);
      this.editMessage = currentTask.message ?? '';
      view.initEditingInput(currentTask.message ?? '');
    },
    delete(id) {
      this.deleteId = id;
    },
    async confirmDelete() {
      if (!this.deleteId.length) return;
      const removedTask = await task.deleteOne(this.deleteId);
      if (!removedTask.error) this.tasks = sortTasks(removeOne(this.tasks, removedTask));
      this.deleteId = '';
    },
    deleteCancel() {
      this.deleteId = '';
    },
  },
  async created() {
    this.tasks = await task.getAll();
    view.subscribeToCreatingInput(this.inputCreateMessage);
    view.subscribeToEditingInput(this.inputEditMessage);
  },
});

window.vm = vm;
window.view = view;
