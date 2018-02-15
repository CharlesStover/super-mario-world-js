window.view = function() {
	this.renders = (this.renders + 1) % 100;
	this.lastRender = new Date().getTime();

	// Render each object.
	for (var x = 0; x < this.objects.length; ++x) {
		if (!this.objects[x]) {
			continue;
		}
		var obj = this.objects[x];
		if (obj.horizontalAcceleration) {
			obj.set(
				'horizontalVelocity',
				Math.min(
					Math.max(
						obj.horizontalVelocity + obj.horizontalAcceleration,
						-1 * obj.maxHorizontalVelocity
					),
					obj.maxHorizontalVelocity
				)
			);
		}
		if (obj.verticalAcceleration) {
			obj.set(
				'verticalVelocity',
				Math.min(
					Math.max(
						obj.verticalVelocity + obj.verticalAcceleration,
						-1 * obj.maxVerticalVelocity
					),
					obj.maxVerticalVelocity
				)
			);
		}
		if (obj.horizontalVelocity) {
			obj.set('x', obj.x + obj.horizontalVelocity);
		}
		if (obj.verticalVelocity) {
			var newY = obj.y + obj.verticalVelocity;
			if (newY <= 0) {
				obj.set('falling', false);
				obj.set('verticalVelocity', 0);
				obj.set('y', 0);
			}
			else {
				obj.set('falling', true);
				obj.set('y', newY);
			}
		}
		if (obj.controller) {
			obj.controller();
		}
		obj.view();
	}

	// 60 FPS
	setTimeout(
		window.view,
		Math.max(0, 17 - new Date().getTime() + this.lastRender)
	);
}.bind(window.model);
