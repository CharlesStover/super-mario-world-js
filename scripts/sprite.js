var Sprite = function(sheet, attr) {
	this.changes = [];
	this.set('element', document.createElement('div'));
	this.element.style.setProperty('position', 'relative');
	if (sheet) {
		this.set('sheet', sheet);
	}
	this.className = null;
	this.collisionX = null;
	this.collisionY = null;
	this.controller = null;
	this.height = 0;
	this.horizontalAcceleration = 0;
	this.horizontalVelocity = 0;
	this.maxHorizontalVelocity = 0;
	this.maxVerticalVelocity = 0;
	this.sprite = [0, 0];
	this.static = false;
	this.verticalAcceleration = -0.5;
	this.verticalVelocity = 0;
	this.width = 0;
	this.x = 0;
	this.y = 0;
	for (var key of Object.kets(attr)) {
		this.set(key, attr[key]);
	}
};

Sprite.prototype.set = function(key, value) {
	this[key] = value;
	this.changes.push(key);
};

Sprite.prototype.view = function() {

	// Changes that require view.
	while (this.changes.length) {
		switch (this.changes.pop()) {
			case 'className':
				this.element.className = this.className;
				break;
			case 'element':
				document.body.appendChild(this.element);
				break;
			case 'height':
				this.element.style.setProperty('height', this.height + 'px');
				this.element.style.setProperty('margin-top', (-1 * this.height) + 'px');
				break;
			case 'sheet':
				this.element.style.setProperty('background-image', 'url("' + this.sheet + '")');
				break;
			case 'sprite':
				this.element.style.setProperty('background-position', (-1 * this.sprite[0]) + 'px ' + (-1 * this.sprite[1]) + 'px');
				break;
			case 'x':
				this.element.style.setProperty('left', this.x + 'px');
				break;
			case 'y':
				this.element.style.setProperty('top', (-1 * this.y) + 'px');
				break;
			case 'width':
				this.element.style.setProperty('margin-left', (-1 * this.width / 2) + 'px');
				this.element.style.setProperty('width', this.width + 'px');
				break;
		}
	}
};
