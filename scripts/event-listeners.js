var CTRL = 17;
var DOWN = 40;
var LEFT = 37;
var RIGHT = 39;
var SPACE = 32;
var UP = 38;

window.addEventListener('click', function(event) {
  this('ADD_TUBE', {
    x: event.clientX,
    y: event.clientY
  });
}.bind(window.reducer));

window.addEventListener('keydown', function(event) {
  switch (event.keyCode) {
    case LEFT:
      this('DECREASE_SCROLL_X');
      this('WALK_LEFT');
      break;
    case RIGHT:
      this('INCREASE_SCROLL_X');
      this('WALK_RIGHT');
      break;
    case SPACE:
      this('JUMP');
      break;
    default:
      this('LOG', 'Unbound key: ' + event.keyCode);
  }
}.bind(window.reducer));

window.addEventListener('keyup', function(event) {
  switch (event.keyCode) {
    case CTRL:
      this('SHOOT_FIREBALL');
      break;
    case LEFT:
      this('BRAKE_LEFT');
      break;
    case RIGHT:
      this('BRAKE_RIGHT');
      break;
  }
}.bind(window.reducer));

window.addEventListener('resize', function() {
  window.reducer('RESIZE_WINDOW');
});
