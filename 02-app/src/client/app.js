import './app.scss';

import * as services from './services';

// ----------------
// playground
services.server.on$('test')
	.map(d => d + ' whoa')
	.subscribe(item => {
		console.log(`Got ${item} from server!`);
	})

services.server.status$
	.subscribe(status => console.log(status));

// ----------------
// Auth


// ----------------
// Components


// ----------------
// Bootstrap

services.socket.connect();


