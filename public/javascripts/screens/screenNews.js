function ScreenNews() {};

ScreenNews.screen = document.createElement('div');
ScreenNews.screen.id = 'screen-news';
ScreenNews.screen.className = 'article-screens';

ScreenNews.items = null;
ScreenNews.currentItem = null;
ScreenNews.itemsPerPage = 5;
ScreenNews.prevButton = null;
ScreenNews.nextButton = null;

ScreenNews.hamlScreen =
  Haml.compile('div(id="news-menu" class="separate-menu" style="background-color: #fbc488")',
               '  div(id="top-bar")',
               '    div(id="close-icon" class="icon leaf")',
               '    div(id="close-text") Click to close',
               '  div(id="bottom-bar")',
               '    div(class="icon leaf")',
               '    div(class="text") News',
               'div(id="content")',
               '  div(id="content-wrap")',
               '    div(id="content-wrapper")',
               '      | #{rows}',
               '  div(id="paging")',
               '    div(id="prev" class="paging-button" style="color: #e8cfbc") Previous',
               '    div(id="next" class="paging-button" style="color: #e8cfbc") Next',
               'div(id="item-content" style="background-color: #fbc488")',
               '  div(id="main-content") ',
               '    div(id="item-title")',
               '    div(id="item-full-des")',
               '  div(id="close-button" style="background-color: #fbc487")',
               '    div(id="close-icon")'
  );

ScreenNews.hamlRow = 
  Haml.compile('div(class="row" style="background-color: #fbc488" data-index="#{index}")',
               '  div(class="thumbnail-wrapper" style="background-color: #fde98a")',
               '    img(class="thumbnail" src="#{image}")',
               '  div(class="right-content")',
               '    div(class="title" style="color: #3c3c3c") #{title}',
               '    div(class="short-des" style="color: #7c6852") #{shortDes}'
  );
  
ScreenNews.start = function() {
  Popup.openLoading(ScreenManager.currentScreen);
  ajax('/news', {
    timeStamp: Date.now()
  },
  function(response) {
    Popup.close();
    var json = JSON.parse(response);
    ScreenNews.items = json.data;
    ScreenNews.screen.innerHTML = ScreenNews.hamlScreen({
      rows: ScreenNews.createRows(ScreenNews.paging(0))
    });
    ScreenNews.enableRows(ScreenNews.screen.getElementsByClassName('row'));
    ScreenNews.prevButton = ScreenNews.screen.querySelector('#prev');
    ScreenNews.nextButton = ScreenNews.screen.querySelector('#next');
    ScreenNews.initPagingButtons();
    ScreenNews.currentItem = ScreenNews.screen.querySelector('#content-wrapper');
    Button.enable(ScreenNews.prevButton, ScreenNews.prev);
    Button.enable(ScreenNews.nextButton, ScreenNews.next);
    Button.enable(ScreenNews.screen.querySelector("#news-menu"), function() {
      $(ScreenManager.currentScreen).fadeOut('slow', function() {
        ScreenManager.setScreen('main');
      });
    });
  },
  function(response) {
    alert('There was a problem connecting to the server. Please refresh and try again later.');
  });
};

ScreenNews.paging = function(page) {
  return ScreenNews.items.slice(page * ScreenNews.itemsPerPage, (page + 1) * ScreenNews.itemsPerPage);
};

ScreenNews.prev = function(event) {
  var nextPage = event.getAttribute('data-page');
  if (nextPage != -1) {
    $(ScreenNews.currentItem).html(ScreenNews.createRows(ScreenNews.paging(parseInt(nextPage)))).hide().slideDown(700, function() {
      var items = ScreenNews.currentItem.getElementsByClassName('row');
      ScreenNews.enableRows(items);
    });
    if (nextPage == 0) {
      ScreenNews.prevButton.setAttribute('data-page', -1);
    } else {
      ScreenNews.prevButton.setAttribute('data-page', parseInt(nextPage) - 1);
    }
    ScreenNews.nextButton.setAttribute('data-page', parseInt(nextPage) + 1);
  }
};

ScreenNews.next = function(event) {
  var nextPage = event.getAttribute('data-page');
  if (nextPage != -1) {
    $(ScreenNews.currentItem).html(ScreenNews.createRows(ScreenNews.paging(parseInt(nextPage)))).hide().slideDown(700, function() {
      var items = ScreenNews.currentItem.getElementsByClassName('row');
      ScreenNews.enableRows(items);
    });
    if (ScreenNews.prevButton.getAttribute('data-page') != -1) {
      ScreenNews.prevButton.setAttribute('data-page', parseInt(nextPage) - 1);
    } else {
      ScreenNews.prevButton.setAttribute('data-page', '0');
    }
    if (nextPage >= ScreenNews.maxPage - 1) {
      ScreenNews.nextButton.setAttribute('data-page', -1);
    } else {
      ScreenNews.nextButton.setAttribute('data-page', parseInt(nextPage) + 1);
    }
  }
};

ScreenNews.initPagingButtons = function() {
  // ScreenNews.prevButton = ScreenNews.screen.querySelector('#prev');
  // ScreenNews.nextButton = ScreenNews.screen.querySelector('#next');
  ScreenNews.maxPage = Math.ceil(ScreenNews.items.length / ScreenNews.itemsPerPage);
  ScreenNews.prevButton.setAttribute('data-page', -1);
  if (ScreenNews.maxPage > 1) {
    ScreenNews.nextButton.setAttribute('data-page', 1);
  } else {
    ScreenNews.nextButton.setAttribute('data-page', -1);
  }
};

ScreenNews.createRows = function(items) {
  var rows = ''
  for (var i = 0; i < items.length; i++) {
    rows += ScreenNews.hamlRow({
      'image': 'img/' + items[i].thumbnailUrl,
      'title': items[i].title,
      'shortDes': ScreenNews.trimContent(items[i].shortDes),
      'index': items[i]._id
    });
  }
  return rows;
};

ScreenNews.enableRows = function(items) {
  for (var i = 0; i < items.length; i++) {
    Button.enable(items[i], function(e) {
      var item;
      for (var i = 0; i < ScreenNews.items.length; i++) {
        if (ScreenNews.items[i]._id.toString() == e.getAttribute('data-index')) {
          items = ScreenNews.items[i];
        }
      }
      $('#item-title').html(items.title);
      $('#item-full-des').html(items.content);
      $('#content').hide(300);
      $('#item-content').show(300);
      Button.enable(ScreenNews.screen.querySelector("#close-button"), function() {
        $('#item-content').hide(300);
        $('#content').show(300);
      });
    });
  }
};

ScreenNews.trimContent = function(texts) {
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