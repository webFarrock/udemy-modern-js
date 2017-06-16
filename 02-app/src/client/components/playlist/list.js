import $ from 'jquery';
import  {ElementComponent} from '../../lib/component';
import {PlaylistSortComponent} from './sort';

export class PlaylistListComponent extends ElementComponent{
	constructor(){
		super('ul');
		this.$element.addClass('palylist-list');
	}

	_onAttach(){
		const sort = new PlaylistSortComponent();
		sort.attach(this._$mount);

		this.children.push()
	}
}