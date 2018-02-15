var mario = new Sprite('images/mario.gif', {
	controller: function() {
		var xPerFrame = 7;
		if (this.walking) {
			this.walkFrame = (this.walkFrame + 1) % (xPerFrame * 4);
		}
		else {
			this.walkFrame = 0;
		}

		// Set background.
		document.body.style.setProperty('background-position', (Math.round(window.model.renders / 10) % 4) * -512 + (-1 * this.x) / 2 + 'px center');
		document.body.style.setProperty('margin-left', (-1 * this.x) + 'px');

		// Set sprite.
		if (this.direction) {
			if (this.walking) {
				if (this.walkFrame < xPerFrame) {
					if (this.horizontalVelocity === this.maxHorizontalVelocity) {
						this.set('sprite', [95, 0]);
						this.set('width', 18);
					}
					else {
						this.set('sprite', [0, 0]);
						this.set('width', 15);
					}
				}
				else if (this.walkFrame < xPerFrame * 2) {
					if (this.horizontalVelocity === this.maxHorizontalVelocity) {
						this.set('sprite', [113, 0]);
						this.set('width', 18);
					}
					else {
						this.set('sprite', [15, 0]);
						this.set('width', 15);
					}
				}
				else if (this.walkFrame < xPerFrame * 3) {
					if (this.horizontalVelocity === this.maxHorizontalVelocity) {
						this.set('sprite', [95, 0]);
						this.set('width', 18);
					}
					else {
						this.set('sprite', [0, 0]);
						this.set('width', 15);
					}
				}
				else {
					if (this.horizontalVelocity === this.maxHorizontalVelocity) {
						this.set('sprite', [131, 0]);
						this.set('width', 18);
					}
					else {
						this.set('sprite', [30, 0]);
						this.set('width', 16);
					}
				}
			}
			else {
				this.set('sprite', [0, 0]);
				this.set('width', 15);
			}
		}
		else {
			if (this.walking) {
				if (this.walkFrame < xPerFrame) {
					if (Math.abs(this.horizontalVelocity) === this.maxHorizontalVelocity) {
						this.set('sprite', [95, 28]);
						this.set('width', 18);
					}
					else {
						this.set('sprite', [80, 28]);
						this.set('width', 15);
					}
				}
				else if (this.walkFrame < xPerFrame * 2) {
					if (Math.abs(this.horizontalVelocity) === this.maxHorizontalVelocity) {
						this.set('sprite', [131, 28]);
						this.set('width', 18);
					}
					else {
						this.set('sprite', [65, 28]);
						this.set('width', 15);
					}
				}
				else if (this.walkFrame < xPerFrame * 3) {
					if (Math.abs(this.horizontalVelocity) === this.maxHorizontalVelocity) {
						this.set('sprite', [95, 28]);
						this.set('width', 18);
					}
					else {
						this.set('sprite', [80, 28]);
						this.set('width', 15);
					}
				}
				else {
					if (Math.abs(this.horizontalVelocity) === this.maxHorizontalVelocity) {
						this.set('sprite', [113, 28]);
						this.set('width', 18);
					}
					else {
						this.set('sprite', [49, 28]);
						this.set('width', 16);
					}
				}
			}
			else {
				this.set('sprite', [80, 28]);
				this.set('width', 15);
			}
		}
	},
	direction: true,
	falling: false,
	jumpVelocity: 10,
	maxHorizontalVelocity: 6,
	maxVerticalVelocity: 10,
	walkAcceleration: 0.1,
	walkFrame: 0,
	walking: 0,
	height: 28,
	width: 15
});
