import _ from 'lodash';
import {Observable} from 'rxjs';
import {validateLogin} from 'shared/validation/users';

export class UsersStore{
	constructor(server){
		this._server = server;

		// users list
		const defaultStore = {users: []};
		const events$ = Observable.merge(
			this._server.on$('users:list').map(opList),
			this._server.on$('users:added').map(opAdd)
		);

		this.state$ = events$
			.scan((({state}, op) => op(state)), {state: defaultStore})
			.publishReplay(1);

		this.state$.connect();

		// ------------------
		// Bootstra

		this._server.on('connect', () => {
			this._server.emit('users:list');
		});
	}

	login$(name){
		const validator = validateLogin(name);
		if(validator.hasErrors)
			return Observable.throw({message: validator.message});

		return this._server.emitAction$('auth:login', {name});
	}
}

function opList(users){
	return state => {
		state.users = users;
		state.users.sort((l, r) => l.name.localeCompare(r.name));
		return {
			type: 'list',
			state: state
		}
	}
}

function opAdd(user){
	return state => {
		let insertIndex = _.findIndex(
			state.users,
			u => u.name.localeCompare(user.name) > 0
		);

		if(insertIndex === -1)
			insertIndex = state.users.length;

		state.users.splice(insertIndex, 0, user);

		return {
			type: 'list',
			user: user,
			state: state,
		}
	}
}