import React from 'react';
import { render } from 'react-dom';
// we can get rid of these because of the router now these are used indirectly in the
// router.js file instead
// import StorePicker from './components/storepicker';
// import App from './components/App';
import Router from "./components/Router";
import './css/style.css';

render(<Router />, document.querySelector('#main'));
