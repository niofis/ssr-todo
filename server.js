import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(routes);

app.listen(3000, err => {
  console.log('server listening on port 3000');
});
