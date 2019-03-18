import {Router} from 'express';
import {getAll, update, add} from './store';

const router = Router();

router.get('/todos', (req, res) => {
  const todos = getAll();
  res.json(todos);
});

router.post('/todos', (req, res) => {
  const todo = req.body;
  add(todo);
  res.json({success: true});
});

router.put('/todos/:id', (req, res) => {
  const todo = req.body;
  const id = parseInt(req.params.id, 10);
  update(id, todo);
  res.json({success: true});
});

export default router;
