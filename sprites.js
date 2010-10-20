/**
 * Image loader and sprite referencing class.
 */
var Sprites = (function() {
  
  // Add a list of the file names for the images you want to load (minus the extensions)
  var mapNames = [];
  
  // Where are they located?
  var mapDirectory = "./";
  
  // What is the extension?
  var mapExtension = "png";
  
  var loaded = 0;
  var maps = {};
  var callback;
  var ts;
  
  function loadMaps(callback) {
    for (var i = 0; i < mapNames.length; i++) {
      var img = new Image();
      img.onload = function() {
        loaded++;
        if (loaded == mapNames.length && callback && typeof(callback) == "function")
          callback();
      };
      img.src = mapDirectory + mapNames[i] + "." + mapExtension;
      maps[mapNames[i]] = img;
    }
  }
  
  return {
    init: function(callback) {
      ts = RenderingEngine.tileSize();
      if (loaded < mapNames.length)
        loadMaps(callback);
      else
        callback();
    }
    , getSprite: function(map, col, row) {
      // Check to ensure it is a valid sprite
      if (!maps[map]) return null;
      if (row * ts >= maps[map].height) return null;
      if (col * ts >= maps[map].width) return null;
      
      return {image:maps[map], sx: col*ts, sy: row*ts};
    }
  };
})();
