import {Component} from 'inferno';
import {getAll} from './store';
import axios from 'axios';

const ToDoLine = ({item: {done, todo, id}, onChange}) => (
  <div class="form-group form-check">
    <input
      type="checkbox"
      class="form-check-input"
      id={`todo${id}`}
      checked={done}
      name={`todo$${id}`}
      onChange={onChange}
    />
    <label class="form-check-label" for={`todo${id}`}>
      {done ? <strike>{todo}</strike> : todo}
    </label>
  </div>
);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.ssR = typeof document === 'undefined';

    if (!this.ssR) {
      //currently running on client
      this.addTodo = this.addTodo.bind(this);
      this.updateTodo = this.updateTodo.bind(this);
      this.loadTodos = this.loadTodos.bind(this);

      this.loadTodos();
    }
  }
  getInitialProps(props, context) {
    return new Promise((resolve, reject) => {
      const todos = getAll();
      this.state.todos = todos;
      resolve({
        todos
      });
    });
  }
  addTodo(todo) {
    axios.post('/api/todos', {todo}).then(this.loadTodos);
  }
  loadTodos() {
    axios.get('/api/todos').then(response => {
      this.setState({todos: response.data, todo: ''});
    });
  }
  updateTodo(id, done) {
    axios.put('/api/todos/' + id, {done}).then(this.loadTodos);
  }
  render() {
    const {todos = [], todo = ''} = this.state;
    return (
      <div class="row justify-content-center">
        <div class="mt-5 col-6">
          <h1>ToDo</h1>
          <form
            method="POST"
            action="/"
            class="form-inline"
            onsubmit="return false">
            <input
              type="text"
              name="todo"
              placeholder="What needs to be done"
              class="form-control mr-2"
              value={todo}
              onInput={e => this.setState({todo: e.target.value})}
            />
            <input type="hidden" name="action" value="add" />
            <button
              type="submit"
              class="btn btn-primary"
              onClick={() => this.addTodo(todo)}>
              Add
            </button>
          </form>
          <hr />
          <form method="POST" action="/">
            {todos.map(todo => (
              <ToDoLine
                item={todo}
                onChange={() => this.updateTodo(todo.id, !todo.done)}
              />
            ))}
            <input type="hidden" name="action" value="update" />
            {this.ssR && (
              <button type="submit" class="btn btn-success btn-block">
                Update
              </button>
            )}
          </form>
        </div>
      </div>
    );
  }
}
