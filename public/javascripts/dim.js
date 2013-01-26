function Dim() {};

Dim.div = document.createElement('div');
Dim.div.setAttribute('id', 'dim');
Dim.isEnabled = false;

Dim.enable = function() {
  if (!Dim.isEnabled) {
    document.body.appendChild(Dim.div);
    Dim.div.style.height = (document.body.offsetWidth * 2) / 3 + 'px';
    Dim.isEnabled = true;
  }
};

Dim.disable = function() {
  if (Dim.isEnabled) {
    removeFromDocument(Dim.div);
    Dim.isEnabled = false;
  }
};

Dim.adjust = function(zDepth) {
  Dim.div.style.cssText = 'height:' + (document.body.offsetWidth * 2) / 3 + 'px;';
}
