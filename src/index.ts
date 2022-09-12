import { App } from './components/app/app';
import { evaluation } from './evaluation';


import './styles/vars.scss'
import './global.scss';

const app: App = new App();
app.start();
evaluation();