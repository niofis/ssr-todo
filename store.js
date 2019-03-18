const todos = [
  {
    id: 10,
    done: false,
    todo: 'something'
  },
  {
    id: 20,
    done: true,
    todo: 'nothing'
  }
];

export function getAll() {
  return todos;
}

export function add(todo) {
  todo.id = (todos.length + 1) * 10;
  todos.push(todo);
}

export function update(id, value) {
  const todo = todos.find(e => e.id === id);
  delete value.id;
  Object.assign(todo, value);
}
