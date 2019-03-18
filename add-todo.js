import {add, update, getAll} from './store';

const addTodo = (req, res, next) => {
  const {action} = req.body;
  if (action === 'add') {
    const {todo} = req.body;
    add({done: false, todo});
  } else if (action === 'update') {
    const re = /^todo\$(.+)$/;
    const isDone = val => val === 'on';

    const updates = Object.keys(req.body)
      .filter(k => re.test(k))
      .map(k => ({
        id: parseInt(k.match(re)[1], 10),
        done: isDone(req.body[k])
      }));

    //already done todos that where unchecked before submit will not
    //appear in the request body, so we need to get them from the
    //store and set them to false, if they are still checked 
    //as part of the request, means the user did nothing to them
    const doneTodos = getAll().filter(({done}) => done).map(d => (d.done = false, d));
    
    [...doneTodos, ...updates].forEach(u => update(u.id, {done: u.done}));
  }
  next();
};

export default addTodo;
