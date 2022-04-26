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

class View {
  constructor() {}
}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }
}

const app = new Controller(new Model(), new View());