import './app.scss';

import * as services from './services';

// ----------------
// playground

services.server.emitAction$('login', {user: 'foo', password: 'bar'})
	.subscribe(user => {
		console.log('We are logged in: ' + user );
	}, error => {
		console.error(error);
	});

// ----------------
// Auth


// ----------------
// Components
require('./components/player/player');

// ----------------
// Bootstrap

services.socket.connect();


