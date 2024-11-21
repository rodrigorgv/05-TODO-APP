import { Todo } from '../todos/models/todo.model';

const Filters = {
  All: 'all',
  Completed: 'Completed',
  Pending: 'Pending',
};

const state = {
  todos: [
    new Todo('Piedra del alma'),
    new Todo('Piedra del infinito'),
    new Todo('Piedra del tiempo'),
    new Todo('Piedra del poder'),
    new Todo('Piedra del campo'),
  ],
  filter: Filters.All,
};

const initStore = () => {
  console.log(state);
  console.log('InitStore 🍕');
};

const loadStore = () => {
  throw new Error('Not implemented');
};
//si no especifica un filtro, se toma como defecto el all
const getTodos = (filter = Filters.All) => {
  switch (filter) {
    case Filters.All:
      //con el spread operator retornamos todos los elementos como un array
      return [...state.todos];
    case Filters.Completed:
      //el filter retorna un arreglo
      //barremos los elementod del todo, buscando los que tienen todo.done como true
      return state.todos.filter((todo) => todo.done);
    case Filters.Pending:
      return state.todos.filter((todo) => !todo.done);
    default:
      throw new Error(`option ${filter} is not valid`);
  }
};

/**
 * @param {String} description
 */
const addTodo = (description) => {
  if (!description) throw new Error('Description is required');
  state.todos.push(new Todo(description));
};

/**
 * @param {String} todoId todo identifier
 */
const toggleTodo = (todoId) => {
  state.todos = state.todos.map((todo) => {
    if (todo.id === todoId) {
      //aca se hace la negacion del valor
      todo.done = !todo.done;
    }
    return todo;
  });
};

/**
 * @param {String} todoId todo identifier
 */
const deleteTodo = (todoId) => {
  state.todos = state.todos.filter((todo) => todo.id !== todoId);
};

const deletCompleted = () => {
  state.todos = state.todos.filter((todo) => !todo.done);
};

/**
 * @param {Filters} newFilter
 */
const setFilter = (newFilter = Filters.All) => {
  const arrayFiltros = Object.keys(Filters);
  if (newFilter.includes(arrayFiltros)) {
    state.filter = newFilter;
  } else {
    throw new Error('filtro invalido');
  }
};

const getCurrentFilter = () => {
  return state.filter;
};

export default {
  addTodo,
  deletCompleted,
  deleteTodo,
  getCurrentFilter,
  getTodos,
  initStore,
  loadStore,
  setFilter,
  toggleTodo,
};
