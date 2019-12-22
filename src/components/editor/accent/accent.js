import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import AccentEditing from './accentediting';
import AccentUI from './accentui';

export default class Accent extends Plugin {
	static get requires() {
		return [ AccentEditing, AccentUI ];
	}

	static get pluginName() {
		return 'Accent';
	}
}
