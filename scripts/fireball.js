var FIREBALL_WIDTH = 8;

var fireballController = function() {
	if (!this.falling) {
		this.falling = true;
		this.verticalVelocity = 7.5;
	}
	if (this.x > mario.x + document.body.clientWidth / 2 + FIREBALL_WIDTH / 2) {
		window.reducer('DELETE', this);
	}
};

var Fireball = function() {
	var fb = new Sprite('images/fireball.gif', {
		className: 'fireball',
		height: FIREBALL_WIDTH,
		horizontalVelocity: mario.horizontalVelocity + (mario.direction ? 7.5 : -7.5),
		maxVerticalVelocity: 10,
		verticalAcceleration: -1,
		x: mario.x,
		y: mario.y + mario.height * 0.5,
		width: FIREBALL_WIDTH
	});
	fb.set('controller', fireballController.bind(fb));
	return fb;
};
