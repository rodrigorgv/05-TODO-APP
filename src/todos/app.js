import html from './app.html?raw';
import todoStore from '../store/todo.store';
import { renderTodos } from './use-cases';

const ElementIDs = {
  //este valor es el identificador a donde vamos a insertar el elemento html
  TodoList: '.todo-list',
  NewTodoInput: '#new-todo-input',
};

/**
 *
 * @param {String}
 */
export const App = (elementId) => {
  const displayTodos = () => {
    const todos = todoStore.getTodos(todoStore.getCurrentFilter());
    console.log('estos son los todos ', todos);
    renderTodos(ElementIDs.TodoList, todos);
  };

  //funcion anonima autoinvocada
  (() => {
    const app = document.createElement('div');
    app.innerHTML = html;
    document.querySelector(elementId).append(app);
    displayTodos();
  })();

  // referencias HTML
  const newDescripctionInput = document.querySelector(ElementIDs.NewTodoInput);
  const todoListUL = document.querySelector(ElementIDs.TodoList);

  //=========== PARA ADICION DE TAREA ===========
  //listeners
  //ESTO NOS SIRVE PARA OBTENER EL EVENTO DE LEVANTAR TECLA
  newDescripctionInput.addEventListener('keyup', (Event) => {
    //si no es enter, sale de la función
    if (Event.keyCode !== 13) return;
    //este valida que si pasa la anterior validacion, se valide la longitud
    if (Event.target.value.trim().length === 0) return;
    console.log(Event.target.value);
    todoStore.addTodo(Event.target.value);
    displayTodos();
    Event.target.value = '';
  });

  //=========== PARA COMPLETADO DE TAREA ===========
  todoListUL.addEventListener('click', (Event) => {
    //busca el elemento HTML con ese data atribute más cercano //retorna todo el elemento html
    const element = Event.target.closest('[data-id]');
    todoStore.toggleTodo(element.getAttribute('data-id'));
    displayTodos();
  });

  //=========== PARA ELIMINACIÓN DE TAREA ===========
  todoListUL.addEventListener('click', (Event) => {
    if (Event.target.className === 'destroy') {
      const element = Event.target.closest('[data-id]');
      todoStore.deleteTodo(element.getAttribute('data-id'));
      displayTodos();
    } else {
      return;
    }
  });
};
