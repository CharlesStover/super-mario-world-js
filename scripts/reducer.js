window.reducer = function(type, action) {
  switch (type) {

		case 'ADD_TUBE':
			var TUBE_WIDTH = 32;
      this.objects.push(new Sprite(null, {
        className: 'tube',
        height: document.body.clientHeight - action.y,
        sheet: ['images/tube.gif', 'images/tube.gif'],
        sprite: [[0, 0], [TUBE_WIDTH, 0]],
        type: 'tube',
        x: mario.x + action.x - document.body.clientWidth / 2 - TUBE_WIDTH / 2,
        y: 0,
        width: TUBE_WIDTH
      }));
      break;

    case 'BRAKE_LEFT':
      if (mario.walking === -1) {
        mario.set('horizontalAcceleration', 0);
        mario.set('horizontalVelocity', 0);
        mario.set('walking', 0);
      }
      break;

    case 'BRAKE_RIGHT':
      if (mario.walking === 1) {
        mario.set('horizontalAcceleration', 0);
        mario.set('horizontalVelocity', 0);
        mario.set('walking', 0);
      }
      break;

    case 'DELETE':
      for (var x of Object.keys(this.objects)) {
        if (this.objects[x] === action) {
          document.body.removeChild(this.objects[x].element);
          delete this.objects[x];
          break;
        }
      }
      break;

    case 'JUMP':
      if (!mario.falling) {
        mario.set('verticalVelocity', mario.jumpVelocity);
      }
      break;

    case 'LOG':
      console.log(action);
      break;

    case 'RESIZE_WINDOW':
      // document.body.style.setProperty('padding-left', Math.round(document.body.clientWidth / 2) + 'px');
      document.body.style.setProperty('padding-top', document.body.clientHeight + 'px');
      break;

    case 'SHOOT_FIREBALL':
      this.objects.push(Fireball());
      break;

    case 'WALK_LEFT':
      if (mario.walking !== -1) {
        mario.set('direction', false);
        mario.set('horizontalAcceleration', -1 * mario.walkAcceleration);
        mario.set('horizontalVelocity', -0.25 * mario.horizontalVelocity);
        mario.set('walking', -1);
      }
      break;

    case 'WALK_RIGHT':
      if (mario.walking !== 1) {
        mario.set('direction', true);
        mario.set('horizontalAcceleration', mario.walkAcceleration);
        mario.set('horizontalVelocity', -0.25 * mario.horizontalVelocity);
        mario.set('walking', 1);
      }
      break;
  }
}.bind(window.model);
