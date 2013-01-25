function ScreenManager() {};

ScreenManager.currentScreen = null;
ScreenManager.currentPopupScreen = null;
ScreenManager.previousScreenId = '';

ScreenManager.setScreen = function(nextScreenId) {
  // Clear the popup.
  // Dim.disable();

  // Kill the old screen.
  if (ScreenManager.currentScreen) {
    removeFromDocument(ScreenManager.currentScreen);
  }

  switch (nextScreenId) {
    case 'main': ScreenManager.currentScreen = ScreenMain.screen; ScreenMain.start(); break;
    case 'question': ScreenManager.currentScreen = ScreenQuestion.screen; ScreenQuestion.start(); break;
    case 'news': ScreenManager.currentScreen = ScreenNews.screen; ScreenNews.start(); break;
  }

  ScreenManager.previousScreenId = nextScreenId;

  document.body.appendChild(ScreenManager.currentScreen);
  if (ScreenManager.currentScreen.id == 'screen-main') {
    setupAnimation();
  }
};
