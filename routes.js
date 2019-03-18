import {Router} from 'express';
import pagesController from './pages-controller';
import addTodo from './add-todo';
import api from './api';
import appBundle from './app-bundle';

const router = Router();

router.get('/js/app.js', async (req, res) => {
  const bundle = await appBundle();
  res.send(bundle);
});
router.use('/api', api);
router.get('/*', pagesController);
router.post('/', addTodo, pagesController);


export default router;
