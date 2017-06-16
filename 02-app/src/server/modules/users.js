import _ from 'lodash';

import {ModuleBase} from '../lib/module';

export class UsersModule extends ModuleBase{

	constructor(io){
		super();
		this._io = io;
		this._usersList = [
			{name: 'One', color:this.getColorForUsername('One')},
			{name: 'Two', color:this.getColorForUsername('Two')},
			{name: 'Three', color:this.getColorForUsername('Three')},


		];
	}

	getColorForUsername(username){
		let hash = _.reduce(
			username,
			(hash, ch) => ch.charCodeAt(0) + (hash << 6) + (hash << 16) - hash,
			0
		);

		hash = Math.abs(hash);
		const hue = hash % 360;
		const saturation = hash % 25 + 70;
		const lightness = 100 - (hash % 15 + 35);


		return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
	}

	registerClient(client){
		client.onActions({
			'users:list': () => {
				return this._usersList;
			},
			'auth:login': () => {

			},
			'auth:logout': () => {

			},
		});
	}


}