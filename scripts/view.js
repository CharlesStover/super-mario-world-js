window.view = function() {
	this.renders = (this.renders + 1) % 100;
	this.lastRender = new Date().getTime();

	// Render each object.
	for (var x = 0; x < this.objects.length; ++x) {
		var thisObject = this.objects[x];
		if (!thisObject) {
			continue;
		}

		// Calculate speeds
		if (thisObject.horizontalAcceleration) {
			thisObject.set(
				'horizontalVelocity',
				Math.min(
					Math.max(
						thisObject.horizontalVelocity + thisObject.horizontalAcceleration,
						-1 * thisObject.maxHorizontalVelocity
					),
					thisObject.maxHorizontalVelocity
				)
			);
		}
		if (thisObject.verticalAcceleration) {
			thisObject.set(
				'verticalVelocity',
				Math.min(
					Math.max(
						thisObject.verticalVelocity + thisObject.verticalAcceleration,
						-1 * thisObject.maxVerticalVelocity
					),
					thisObject.maxVerticalVelocity
				)
			);
		}

		// Calculate Y coordinate.
		if (thisObject.verticalVelocity) {
			var newY = thisObject.y + thisObject.verticalVelocity;
			if (newY <= 0) {
				thisObject.set('falling', false);
				thisObject.set('verticalVelocity', 0);
				thisObject.set('y', 0);
			}
			else {
				thisObject.set('falling', true);
				thisObject.set('y', newY);

				// Collision detection: Y
				if (thisObject.collisionY) {
					for (var y = 0; y < this.objects.length; ++y) {
						var thatObject = this.objects[y];
						if (
							x === y ||
							!thatObject ||
							thatObject.static ||
							!thisObject.isInside(thatObject)
						) {
							continue;
						}
						thisObject.collisionY(thatObject);
					}
				}
			}
		}

		// Calculate X coordinate.
		if (thisObject.horizontalVelocity) {
			thisObject.set('x', thisObject.x + thisObject.horizontalVelocity);

			// Collision detection: X
			if (thisObject.collisionX) {
				for (var y = 0; y < this.objects.length; ++y) {
					var thatObject = this.objects[y];
					if (
						x === y ||
						!thatObject ||
						thatObject.static ||
						!thisObject.isInside(thatObject)
					) {
						continue;
					}
					thisObject.collisionX(thatObject);
				}
			}
		}

		if (thisObject.controller) {
			thisObject.controller();
		}
		thisObject.view();
	}

	// 60 FPS
	setTimeout(
		window.view,
		Math.max(0, 17 - new Date().getTime() + this.lastRender)
	);
}.bind(window.model);
