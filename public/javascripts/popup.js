function Popup() {};

Popup.activeParents = [];
Popup.activePopups = [];

Popup.loadingHaml = 
  Haml.compile('div(id="loading")',
               '  img(src="/img/icons/loading.png")',
               'div(id="loading-text") Loading...'
  );
  
Popup.errorHaml = 
  Haml.compile('div(id="error-main")',
               '  div(id="main-content")',
               '    div(id="banner")',
               '      div(id="text") ERROR',
               '    div(id="display-text-error") YOU HAVE ENCOUNTED NETWORK ERROR, PLEASE TRY AGAIN.',
               '  div(id="buttons")',
               '    div(id="return-button")',
               '      div(id="text") RETURN'
               );

Popup.open = function(parent, popup) {
  Dim.enable();
  Dim.adjust((Popup.activePopups.length + 1) * 5);
  // popup.style.cssText += 'z-index:' + (Popup.activePopups.length + 1) * 30 + ' !important;';
  parent.appendChild(popup);
  Popup.activeParents.push(parent);
  Popup.activePopups.push(popup);
};

Popup.replace = function(popup) {
  var activePopup = Popup.activePopups.pop();
  var activeParent = Popup.activeParents.pop();
  removeFromDocument(activePopup);
  activeParent.appendChild(popup);
  Popup.activePopups.push(popup);
  Popup.activeParents.push(activeParent);
};

Popup.close = function() {
  removeFromDocument(Popup.activePopups.pop());
  Popup.activeParents.pop();
  if (Popup.activeParents.length == 0) {
    Dim.disable();
  } else {
    Dim.adjust(Popup.activePopups.length * 5);
  }
};

Popup.closeAll = function() {
  while (Popup.activePopups.length > 0) {
    removeFromDocument(Popup.activePopups.pop());
  }
  Popup.activeParents.splice(0);
  Dim.disable();
};

Popup.openLoading = function(parent) {
  var screen = document.createElement('div');
  screen.id = 'loading-popup';
  screen.className = 'popup';
  screen.innerHTML = Popup.loadingHaml();
  Popup.open(parent, screen);
};

Popup.errorScreen = function(parent) {
  var screen = document.createElement('div');
  screen.id = 'screen-error';
  screen.className = 'popup';
  screen.innerHTML = Popup.errorHaml();
  Button.enable(screen.querySelector('#return-button'), function() {
    location.reload();
  });
  Popup.open(parent, screen);
};