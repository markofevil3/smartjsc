function Dim() {};

Dim.div = document.createElement('div');
Dim.div.setAttribute('id', 'dim');
Dim.isEnabled = false;

Dim.enable = function() {
  if (!Dim.isEnabled) {
    document.body.appendChild(Dim.div);
    Dim.div.style.height = '100%';
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
  Dim.div.style.cssText = 'height:100%;';
}
