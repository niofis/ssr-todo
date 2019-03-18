import { streamQueueAsString } from 'inferno-server';
import Template from './Template';

const controller = (req, res) => {
  res.write('<!doctype html>');
  streamQueueAsString(<Template/>).pipe(res);
}

export default controller;
