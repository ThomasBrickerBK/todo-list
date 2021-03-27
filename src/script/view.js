const Mustache = require('mustache');
import { getButtons, getInputContainer } from './util';

const tasks = document.getElementById('tasks');
const template = document.getElementById('task-template');
const scope = document.getElementById('scope');
const active = document.getElementById('active');
const successful = document.getElementById('successful');
const popupDelete = document.getElementById('popup-delete');
const popupCreate = document.getElementById('popup-create');
const createTaskInput = document.getElementById('create-task-input');
const editTaskInput = document.getElementById('edit-task-input');
const editTaskInputHost = document.getElementById('host-input');

const creatingFuncs = [];
const editingFuncs = [];
let editedElem = null;

const createInputHandler = (e) => {
  creatingFuncs.forEach((func) => {
    if (typeof func === 'function') func(e.target.value);
  });
};
const editInputHandler = (e) => {
  editingFuncs.forEach((func) => {
    if (typeof func === 'function') func(e.target.value);
  });
};

createTaskInput.addEventListener('input', createInputHandler);
editTaskInput.addEventListener('input', editInputHandler);

export const view = {
  renderTasks(obj) {
    tasks.innerHTML = Mustache.render(template.innerHTML, obj).toString();
  },
  setScope(num) {
    scope.innerText = `${num}`;
  },
  setActive(num) {
    active.innerText = `${num}`;
  },
  setSuccessful(num) {
    successful.innerText = `${num}`;
  },
  initCreatingInput(str) {
    createTaskInput.value = str;
  },
  subscribeToCreatingInput(func) {
    creatingFuncs.push(func);
  },
  initEditingInput(str) {
    editTaskInput.value = str;
  },
  subscribeToEditingInput(func) {
    editingFuncs.push(func);
  },
  setEditedTask(id, edit) {
    if (edit && !editedElem) {
      const task = document.getElementById(id);
      const [editCompleteBtn, editBtn] = getButtons(id);
      editCompleteBtn.style.display = edit ? 'block' : 'none';
      editBtn.style.display = !edit ? 'block' : 'none';
      editedElem = task;
      const container = getInputContainer(id);
      container.style.height = `${container.children[0].clientHeight}px`;
      editTaskInput.style.height = `${container.children[0].clientHeight}px`;
      container.innerHTML = '';
      container.append(editTaskInput);
      window.rr = editTaskInput;
    }
    if (!edit && editedElem?.id === id) {
      const [editCompleteBtn, editBtn] = getButtons(id);
      editCompleteBtn.style.display = edit ? 'block' : 'none';
      editBtn.style.display = !edit ? 'block' : 'none';
      editTaskInputHost.append(editTaskInput);
      editedElem = null;
    }
  },
  openPopupCreate(show) {
    popupCreate.style.display = show ? 'block' : 'none';
    createTaskInput.value = '';
  },
  openPopupDelete(show) {
    popupDelete.style.display = show ? 'block' : 'none';
  },
};
