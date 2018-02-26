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
  this.horizontalAcceleration = 0;
  this.horizontalVelocity = 0;
  this.maxHorizontalVelocity = 0;
  this.maxVerticalVelocity = 0;
  this.sprite = [0, 0];
  this.static = false;
  this.type = null;
  this.verticalAcceleration = -0.5;
  this.verticalVelocity = 0;
  var attr2 = Object.assign(
    {
      height: 0,
      width: 0,
      x: 0,
      y: 0
    },
    attr
  );
  for (var key of Object.keys(attr2)) {
    this.set(key, attr2[key]);
  }
};

Sprite.prototype.isInside = function(that) {
  return (
    this.x + this.width >= that.x &&
    this.x <= that.x + that.width &&
    this.y <= that.y + that.height &&
    this.y + this.height >= that.y
  );
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
        this.element.style.setProperty(
          'background-image',
          (
            Array.isArray(this.sheet)
            ? this.sheet
            : [this.sheet]
          )
          .map(function(sheet) {
            return 'url("' + sheet + '")';
          })
          .join(', ')
        );
        break;
      case 'sprite':
        this.element.style.setProperty(
          'background-position',
          (
            Array.isArray(this.sprite[0])
            ? this.sprite
            : [this.sprite]
          )
          .map(function(sprite) {
            return (-1 * sprite[0]) + 'px ' + (-1 * sprite[1]) + 'px';
          })
          .join(', ')
        );
        break;
      case 'x':
        this.element.style.setProperty('left', this.x + 'px');
        break;
      case 'y':
        this.element.style.setProperty('top', (-1 * this.y) + 'px');
        break;
      case 'width':
        //this.element.style.setProperty('margin-left', (-1 * this.width / 2) + 'px');
        this.element.style.setProperty('width', this.width + 'px');
        break;
    }
  }
};
