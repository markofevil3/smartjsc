function ScreenQuestion() {};

ScreenQuestion.screen = document.createElement('div');
ScreenQuestion.screen.id = 'screen-question';
ScreenQuestion.screen.className = 'article-screens';

ScreenQuestion.items = null;
ScreenQuestion.currentItem = null;
ScreenQuestion.itemsPerPage = 5;
ScreenQuestion.prevButton = null;
ScreenQuestion.nextButton = null;

ScreenQuestion.hamlScreen =
  Haml.compile('div(id="question-menu" class="separate-menu" style="background-color: #146c86")',
               '  div(id="top-bar")',
               '    div(id="close-icon" class="icon leaf")',
               '    div(id="close-text") Click to close',
               '  div(id="bottom-bar")',
               '    div(class="icon leaf")',
               '    div(class="text") Question',
               'div(id="content")',
               '  div(id="content-wrap")',
               '    div(id="content-wrapper")',
               '      | #{rows}',
               '  div(id="paging")',
               '    div(id="prev" class="paging-button") Previous',
               '    div(id="next" class="paging-button") Next',
               'div(id="item-content")',
               '  div(id="main-content") ',
               '    div(id="item-title")',
               '    div(id="item-full-des")',
               '  div(id="close-button")',
               '    div(id="close-icon")'
  );

ScreenQuestion.hamlRow = 
  Haml.compile('div(class="row" style="background-color: #146c86" data-index="#{index}")',
               '  div(class="thumbnail-wrapper")',
               '    img(class="thumbnail" src="#{image}")',
               '  div(class="right-content")',
               '    div(class="title") #{title}',
               '    div(class="short-des") #{shortDes}'
  );
  
ScreenQuestion.start = function() {
  Popup.openLoading(ScreenManager.currentScreen);
  ajax('/questions', {
    timeStamp: Date.now()
  },
  function(response) {
    Popup.close();
    var json = JSON.parse(response);
    ScreenQuestion.items = json.data;
    ScreenQuestion.screen.innerHTML = ScreenQuestion.hamlScreen({
      rows: ScreenQuestion.createRows(ScreenQuestion.paging(0))
    });
    ScreenQuestion.enableRows(ScreenQuestion.screen.getElementsByClassName('row'));
    ScreenQuestion.prevButton = ScreenQuestion.screen.querySelector('#prev');
    ScreenQuestion.nextButton = ScreenQuestion.screen.querySelector('#next');
    ScreenQuestion.initPagingButtons();
    ScreenQuestion.currentItem = ScreenQuestion.screen.querySelector('#content-wrapper');
    Button.enable(ScreenQuestion.prevButton, ScreenQuestion.prev);
    Button.enable(ScreenQuestion.nextButton, ScreenQuestion.next);
    Button.enable(ScreenQuestion.screen.querySelector("#question-menu"), function() {
      $(ScreenManager.currentScreen).fadeOut('slow', function() {
        ScreenManager.setScreen('main');
      });
    });
  },
  function(response) {
    alert('There was a problem connecting to the server. Please refresh and try again later.');
  });
};

ScreenQuestion.paging = function(page) {
  return ScreenQuestion.items.slice(page * ScreenQuestion.itemsPerPage, (page + 1) * ScreenQuestion.itemsPerPage);
};

ScreenQuestion.prev = function(event) {
  var nextPage = event.getAttribute('data-page');
  if (nextPage != -1) {
    $(ScreenQuestion.currentItem).html(ScreenQuestion.createRows(ScreenQuestion.paging(parseInt(nextPage)))).hide().slideDown(700, function() {
      var items = ScreenQuestion.currentItem.getElementsByClassName('row');
      ScreenQuestion.enableRows(items);
    });
    if (nextPage == 0) {
      ScreenQuestion.prevButton.setAttribute('data-page', -1);
    } else {
      ScreenQuestion.prevButton.setAttribute('data-page', parseInt(nextPage) - 1);
    }
    ScreenQuestion.nextButton.setAttribute('data-page', parseInt(nextPage) + 1);
  }
};

ScreenQuestion.next = function(event) {
  var nextPage = event.getAttribute('data-page');
  if (nextPage != -1) {
    $(ScreenQuestion.currentItem).html(ScreenQuestion.createRows(ScreenQuestion.paging(parseInt(nextPage)))).hide().slideDown(700, function() {
      var items = ScreenQuestion.currentItem.getElementsByClassName('row');
      ScreenQuestion.enableRows(items);
    });
    if (ScreenQuestion.prevButton.getAttribute('data-page') != -1) {
      ScreenQuestion.prevButton.setAttribute('data-page', parseInt(nextPage) - 1);
    } else {
      ScreenQuestion.prevButton.setAttribute('data-page', '0');
    }
    if (nextPage >= ScreenQuestion.maxPage - 1) {
      ScreenQuestion.nextButton.setAttribute('data-page', -1);
    } else {
      ScreenQuestion.nextButton.setAttribute('data-page', parseInt(nextPage) + 1);
    }
  }
};

ScreenQuestion.initPagingButtons = function() {
  // ScreenQuestion.prevButton = ScreenQuestion.screen.querySelector('#prev');
  // ScreenQuestion.nextButton = ScreenQuestion.screen.querySelector('#next');
  ScreenQuestion.maxPage = Math.ceil(ScreenQuestion.items.length / ScreenQuestion.itemsPerPage);
  ScreenQuestion.prevButton.setAttribute('data-page', -1);
  if (ScreenQuestion.maxPage > 1) {
    ScreenQuestion.nextButton.setAttribute('data-page', 1);
  } else {
    ScreenQuestion.nextButton.setAttribute('data-page', -1);
  }
};

ScreenQuestion.createRows = function(items) {
  var rows = ''
  for (var i = 0; i < items.length; i++) {
    rows += ScreenQuestion.hamlRow({
      'image': 'img/' + items[i].thumbnailUrl,
      'title': items[i].title,
      'shortDes': ScreenQuestion.trimContent(items[i].content),
      'index': items[i]._id
    });
  }
  return rows;
};

ScreenQuestion.enableRows = function(items) {
  for (var i = 0; i < items.length; i++) {
    Button.enable(items[i], function(e) {
      var item;
      for (var i = 0; i < ScreenQuestion.items.length; i++) {
        if (ScreenQuestion.items[i]._id.toString() == e.getAttribute('data-index')) {
          item = ScreenQuestion.items[i];
        }
      }
      $('#item-title').html(item.title);
      $('#item-full-des').html(item.content);
      $('#content').hide(300);
      $('#item-content').show(300);
      Button.enable(ScreenQuestion.screen.querySelector("#close-button"), function() {
        $('#item-content').hide(300);
        $('#content').show(300);
      });
    });
  }
};

ScreenQuestion.trimContent = function(texts) {
  var add = false;
  texts = stripHTML(texts);
  while (texts.length > 175) {
    add = true;
    texts = texts.substring(0, texts.lastIndexOf(' '));
  }
  if (add) {
    texts += '... <span style="font-style:italic; font-size: 0.8em">see more >></span>';
  }
  return texts;
}