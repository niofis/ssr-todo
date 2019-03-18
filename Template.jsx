import {Component} from 'inferno';
import axios from 'axios';
import App from './App';

export default class Template extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <html>
        <head>
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
            crossorigin="anonymous"
          />
        </head>
        <body>
          <div id="main" class="container">
            <App />
          </div>
        </body>
        <script src="https://cdn.jsdelivr.net/npm/axios@0.18.0/dist/axios.min.js"></script>
        <script src="https://unpkg.com/inferno@7.1.10/dist/inferno.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/inferno-hydrate@7.1.10/dist/inferno-hydrate.min.js"></script>
        <script src="/js/app.js" />
      </html>
    );
  }
}
