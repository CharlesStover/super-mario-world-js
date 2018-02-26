var preload = {
  callback: function() {},
  init: function(items, callback) {
    this.callback = callback;
    this.total = items.length;
    for (var x = 0; x < this.total; ++x) {
      var img = document.createElement('img');
      img.addEventListener('load', this.onLoad.bind(this, img));
      img.setAttribute('src', items[x]);
      img.style.setProperty('height', '1px');
      img.style.setProperty('width', '1px');
      document.body.appendChild(img);
    }
  },
  loaded: 0,
  onLoad: function(img) {
    document.body.removeChild(img);
    this.loaded++;
    if (this.loaded === this.total) {
      this.callback();
    }
  },
  total: 0
};

preload.init(
  [
    'images/background.png',
    'images/mario.gif'
  ],
  function() {
    document.body.removeChild(document.getElementsByTagName('h1').item(0));
    window.reducer('RESIZE_WINDOW');
    window.view();
  }
);
