import 'source-map-support/register';
import {clientMessage} from 'shared/observable-socket';

import express from 'express';
import http from 'http';
import socketIo from 'socket.io';
import chalk from 'chalk';
import {Observable} from 'rxjs';


import {ObservableSocket} from 'shared/observable-socket';

import {UsersModule} from './modules/users';
import {PlaylistModule} from './modules/playlist';
import {ChatModule} from './modules/chat';

const IsDevelopment = process.env.NODE_ENV !== 'production';

// -------------------------
// Setup

const app = express();
const server = new http.Server(app);
const io = socketIo(server);


// -------------------------
// Client Webpack

if (process.env.USE_WEBPACK === 'true') {

	let webpackMiddleware = require('webpack-dev-middleware');
	let webpackHotMiddleware = require('webpack-hot-middleware');
	let webpack = require('webpack');
	let clientConfig = require('../../webpack.client');


	const compiler = webpack(clientConfig);
	app.use(webpackMiddleware(compiler, {
		publicPath: '/build/',
		stats: {
			colors: true,
			chunks: false,
			assets: false,
			timings: false,
			modules: false,
			hash: false,
			version: false,

		},
	}));

	app.use(webpackHotMiddleware(compiler));

	console.log(chalk.bgRed('Using WebPack Dev Middleware! THIS IS FOR DEV ONLY!'));
}


// -------------------------
// Configure Express
app.set('view engine', 'jade');
app.use(express.static('public'));

const useEcternalStyles = !IsDevelopment;

app.get('/', (req, res) => {
	res.render('index', {
		useEcternalStyles
	});
})

// -------------------------
// Services
const videoServices = [];
const playlistRepository = {};

// -------------------------
// Modules
const users = new UsersModule(io);
const chat = new ChatModule(io, users);
const playlist = new PlaylistModule(io, users, playlistRepository, videoServices);
const modules = [users, chat, playlist]


// -------------------------
// Socket
io.on('connection', socket => {
	console.log(`Got connection from ${socket.request.connection.remoteAddress}`);

	const client = new ObservableSocket(socket);

	for (let mod of modules)
		mod.registerClient(client);

	for (let mod of modules)
		mod.clientRegistered(client);

});


// -------------------------
// Startup

const port = process.env.PORT || 3000;


function startServer() {
	server.listen(port, () => {
		console.log(`Started http server on ${port}`);
	})
};

Observable.merge(...modules.map(m => m.init$()))
	.subscribe({
		complete(){
			startServer();
		},
		error(error){
			console.error(`Could not init module: ${error.stact || error}`);
		}
	});


