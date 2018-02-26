var FIREBALL_WIDTH = 8;

var fireballController = function() {
  if (!this.falling) {
    this.falling = true;
    this.verticalVelocity = 7.5;
  }
  if (
    this.x < mario.x - document.body.clientWidth / 2 - FIREBALL_WIDTH / 2 || // overflow left
    this.x > mario.x + document.body.clientWidth / 2 + FIREBALL_WIDTH / 2    // overflow right
  ) {
    window.reducer('DELETE', this);
  }
};

var Fireball = function() {
  var fb = new Sprite('images/fireball.gif', {
    className: 'fireball',
    collisionX: function(obj) {
      if (obj.type === 'tube') {
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
      if (obj.type !== 'mario') {
        if (this.verticalVelocity <= 0) {
          this.set('verticalVelocity', 7.5);
          this.set('y', obj.y + obj.height + 0.1);
        }
      }
    },
    height: FIREBALL_WIDTH,
    horizontalVelocity: mario.horizontalVelocity + (mario.direction ? 7.5 : -7.5),
    maxVerticalVelocity: 10,
    type: 'fireball',
    verticalAcceleration: -1,
    x: mario.x,
    y: mario.y + mario.height * 0.5,
    width: FIREBALL_WIDTH
  });
  fb.set('controller', fireballController.bind(fb));
  return fb;
};
