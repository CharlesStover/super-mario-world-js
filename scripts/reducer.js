window.reducer = function(type, action) {
  switch (type) {

    case 'ADD_GALOOMBA':
      var speed = Math.random() * 4 - 2;
      this.objects.push(new Sprite('images/galoomba.gif', {
        collisionX: function(obj) {
          if (obj.type === 'mario') {
            if (this.horizontalVelocity < 0) {
              obj.set('x', this.x - obj.width - 0.01);
            }
            else {
              obj.set('x', this.x + this.width + 0.01);
            }
          }
          else if (
            obj.type === 'galoomba' ||
            obj.type === 'tube'
          ) {
            this.set('horizontalAcceleration', -1 * this.horizontalAcceleration);
            this.set('x',
              obj.x + (
                this.horizontalVelocity > 0
                ? -1 * this.width - 0.1
                : obj.width + 0.1
              )
            );
            this.set('horizontalVelocity', -1 * this.horizontalVelocity);
          }
        },
        collisionY: function(obj) {
          if (obj.type === 'tube') {
            this.set('verticalVelocity', 0);
            this.set('y', obj.y + obj.height + 0.1);
          }
        },
        controller: function() {
          if (
            this.x > mario.x + document.body.clientWidth ||
            this.x < mario.x - document.body.clientWidth
          ) {
            window.reducer('DELETE', this);
          }
          if (this.dead) {
            this.dead++;
            if (this.dead > 8) {
              window.reducer('DELETE', this);
            }
          }
          else {
            this.frame++;
            if (this.horizontalVelocity > 0) {
              this.set('sprite', [this.frame > 8 ? 64 : 48, 0]);
            }
            else {
              this.set('sprite', [this.frame > 8 ? 16 : 0, 0]);
            }
            if (this.frame > 15) {
              this.frame = 0;
            }
          }
        },
        dead: 0,
        frame: 0,
        height: 15,
        horizontalAcceleration: speed < 0 ? -0.1 : 0.1,
        horizontalVelocity: speed,
        maxHorizontalVelocity: 2,
        maxVerticalVelocity: -5,
        verticalAcceleration: -1,
        sprite:
          speed > 0
          ? [48, 0]
          : [0, 0],
        type: 'galoomba',
        width: 16,
        x: mario.x + Math.random() * document.body.clientWidth - document.body.clientWidth / 2,
        y: document.body.clientHeight
      }));
      break;

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
