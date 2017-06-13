import './app.scss';

import * as services from './services';

// ----------------
// playground

services.server.emitAction$('login', {username: 'foo', password: 'bar'})
	.subscribe(result => {
		if(result.error){
			console.log(result.error);
		}else{
			console.log('We are logged in');
		}
	});

// ----------------
// Auth


// ----------------
// Components


// ----------------
// Bootstrap

services.socket.connect();


