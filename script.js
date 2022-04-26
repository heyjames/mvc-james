class Model {
  constructor() {
    this.todos = [
      { id: 1, text: 'Learn from Tania', complete: false },
      { id: 2, text: 'Learn Next.js', complete: false },
      { id: 3, text: 'Learn headless CMS providers', complete: false },
    ];
  }

  addTodo(todoText) {
    const lastTodoId = this.todos[this.todos.length - 1].id;

    const todo = {
      id: this.todos.length > 0 ? lastTodoId + 1 : 1,
      text: todoText,
      complete: false
    };

    this.todos.push(todo);
  }

  deleteTodo(id) {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  editTodo(id, text) {
    this.todos.map(todo => (todo.id === id) ? todo.text = text : todo);
  }

  toggleTodo(id) {
    this.todos.map(todo => (todo.id === id) ? todo.complete = !todo.complete : todo)
  }
}

/**
 * Neither the controller nor the model should know anything about the DOM, 
 * HTML elements, CSS, or any of that. Anything relating to it should be in the 
 * view.
 */
class View {
  constructor() {
    this.app = this.getElement('#root');
    
    this.title = this.createElement('h1');
    this.title.textContent = 'Todos';

    this.form = this.createElement('form');

    this.input = this.createElement('input');
    this.input.type = 'text';
    this.input.placeholder = 'Add todo';
    this.input.name = 'todo';

    this.submitButton = this.createElement('button');
    this.submitButton.textContent = 'Submit';

    this.todoList = this.createElement('ul', 'todo-list');

    this.form.append(this.input, this.submitButton);
    this.app.append(this.title, this.form, this.todoList);
  }

  createElement(tag, className) {
    const element = document.createElement(tag);

    if (className) {
      element.classList.add(className);
    }

    return element;
  }

  getElement(selector) {
    const element = document.querySelector(selector);

    return element;
  }

  get _todoInputText() {
    return this.input.value;
  }

  _resetTodoInputText() {
    this.input.value = '';
  }

  displayTodos(todos) {
    // Remove all child elements (todo items) of todos from ul element
    while (this.todoList.firstChild) {
      this.todoList.removeChild(this.todoList.firstChild);
    }

    // Handle when there are 0 child elements (todo items)
    if (todos.length === 0) {
      const p = this.createElement('p');
      p.textContent = 'There are no items';
      this.todoList.append(p);
    } else {
      todos.forEach(todo => {
        const li = this.createElement('li');
        li.id = todo.id;
        
        const inputCheckbox = this.createElement('input');
        inputCheckbox.type = 'checkbox';
        inputCheckbox.checked = todo.complete;
        
        const span = this.createElement('span');
        span.contentEditable = true;
        
        if (todo.complete) {
          const strikeout = this.createElement('s');
          strikeout.textContent = todo.text;

          span.append(strikeout);
        } else {
          span.textContent = todo.text;
        }
  
        const deleteButton = this.createElement('button', 'delete');
        deleteButton.textContent = 'Delete';

        li.append(inputCheckbox, span, deleteButton);
        this.todoList.append(li);
      });
    }

  }

  // Type app.view.testTodo() in console
  testTodo() {
    console.log("Testing...");
    console.log(todos);
  }
}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }
}

const app = new Controller(new Model(), new View());