function Menu() {
  this.div = null;
  this.haml = null;
};

Menu.lang = [
  {'about': 'About', 'links': 'Links', 'goAbroad': 'Go Abroad', 'studying': 'Studying', 'export': 'Export', 'camping': 'Camping', 'gallery': 'Gallery', 'news': 'News', 'contact': 'Contact'},
  {'about': 'Giới Thiệu', 'links': 'Liên Kết', 'goAbroad': 'Du Học', 'studying': 'Khoá Học', 'export': 'Export', 'camping': 'Cắm Trại', 'gallery': 'Ảnh', 'news': 'Tin Tức', 'contact': 'Liên Hệ'}
];

Menu.hamlMenu = 
  Haml.compile('ul(id="menu")',
               //### about
               '  li(class="cate" style="z-index: 10")',
               '    div(id="about" class="about display-menu")',
               '      div(id="close-bar" class="close-bar")',
               '        div(class="close-icon")',
               '        div(class="close-text") click to close',
               '      div(class="leaf-icon")',
               '        div(class="icon")',
               '      div(class="display-text")',
               '        div(id="about-text" class="text") #{about}',
               '      div(id="number" class="number-icon number01")',
               //#### links
               '  li(class="cate" style="z-index: 9")',
               '    div(id="links" class="links display-menu")',
               '      div(id="close-bar" class="close-bar")',
               '        div(class="close-icon")',
               '        div(class="close-text") click to close',
               '      div(class="leaf-icon")',
               '        div(class="icon")',
               '      div(class="display-text")',
               '        div(id="links-text" class="text") #{links}',
               '      div(id="number" class="number-icon number02")',
               '    div(id="links-inside-cate", class="links inside-cate")',
               '      div(id="facebook" class="sub-menu")',
               '        div(class="facebook sub-menu-icon")',
               '        div(id="facebook-des" class="description")',
               '          div(class="top-des")',
               '            div(class="number-des") 01',
               '            div(class="icon-des logo")',
               '          div(class="bottom-des") facebook',
               '      div(id="twitter" class="sub-menu")',
               '        div(class="twitter sub-menu-icon")',
               '        div(id="twitter-des" class="description")',
               '          div(class="top-des")',
               '            div(class="number-des") 02',
               '            div(class="icon-des logo")',
               '          div(class="bottom-des") twitter',
               //### go abroad
               '  li(class="cate" style="z-index: 8")',
               '    div(id="go-abroad" class="go-abroad display-menu")',
               '      div(id="close-bar" class="close-bar")',
               '        div(class="close-icon")',
               '        div(class="close-text") click to close',
               '      div(class="leaf-icon")',
               '        div(class="icon")',
               '      div(class="display-text")',
               '        div(id="go-abroad-text" class="text") #{goAbroad}',
               '      div(id="number" class="number-icon number03")',
               '    div(id="go-abroad-inside-cate", class="go-abroad inside-cate")',
               '      div(id="singapore" class="sub-menu")',
               '        div(class="singapore sub-menu-icon")',
               '        div(id="singapore-des" class="description")',
               '          div(class="top-des")',
               '            div(class="number-des") 01',
               '            div(class="icon-des leaf")',
               '          div(class="bottom-des") singapore',
               '      div(id="canada" class="sub-menu")',
               '        div(class="canada sub-menu-icon")',
               '        div(id="canada-des" class="description")',
               '          div(class="top-des")',
               '            div(class="number-des") 02',
               '            div(class="icon-des leaf")',
               '          div(class="bottom-des") canada',
               '      div(id="question" class="sub-menu")',
               '        div(class="question sub-menu-icon")',
               '        div(id="question-des" class="description")',
               '          div(class="top-des")',
               '            div(class="number-des") 03',
               '            div(class="icon-des leaf")',
               '          div(class="bottom-des") Questions',
               //### studying
               '  li(class="cate" style="z-index: 7")',
               '    div(id="studying" class="studying display-menu")',
               '      div(id="close-bar" class="close-bar")',
               '        div(class="close-icon")',
               '        div(class="close-text") click to close',
               '      div(class="leaf-icon")',
               '        div(class="icon")',
               '      div(class="display-text")',
               '        div(id="studying-text" class="text") #{studying}',
               '      div(id="number" class="number-icon number04")',
               '    div(id="studying-inside-cate", class="studying inside-cate")',
               '      div(id="course" class="sub-menu")',
               '        div(class="course sub-menu-icon")',
               '        div(id="course-des" class="description")',
               '          div(class="top-des")',
               '            div(class="number-des") 01',
               '            div(class="icon-des logo")',
               '          div(class="bottom-des") course',
               '      div(id="training" class="sub-menu")',
               '        div(class="training sub-menu-icon")',
               '        div(id="training-des" class="description")',
               '          div(class="top-des")',
               '            div(class="number-des") 02',
               '            div(class="icon-des logo")',
               '          div(class="bottom-des") training',
               '      div(id="register" class="sub-menu")',
               '        div(class="register sub-menu-icon")',
               '        div(id="register-des" class="description")',
               '          div(class="top-des")',
               '            div(class="number-des") 03',
               '            div(class="icon-des logo")',
               '          div(class="bottom-des") register',
               //### export
               '  li(class="cate" style="z-index: 6")',
               '    div(id="export" class="export display-menu")',
               '      div(id="close-bar" class="close-bar")',
               '        div(class="close-icon")',
               '        div(class="close-text") click to close',
               '      div(class="leaf-icon")',
               '        div(class="icon")',
               '      div(class="display-text")',
               '        div(id="export-text" class="text" style="color:#4f4f4f") #{export}',
               '      div(id="number" class="number-icon number05")',
               '    div(id="export-inside-cate", class="export inside-cate")',
               //### camping
               '  li(class="cate" style="z-index: 5")',
               '    div(id="camping" class="camping display-menu")',
               '      div(id="close-bar" class="close-bar")',
               '        div(class="close-icon")',
               '        div(class="close-text") click to close',
               '      div(class="leaf-icon")',
               '        div(class="icon")',
               '      div(class="display-text")',
               '        div(id="camping-text" class="text" style="color:#4f4f4f") #{camping}',
               '      div(id="number" class="number-icon number06")',
               '    div(id="camping-inside-cate", class="camping inside-cate")',
               //### gallery
               '  li(class="cate" style="z-index: 4")',
               '    div(id="gallery" class="gallery display-menu")',
               '      div(id="close-bar" class="close-bar")',
               '        div(class="close-icon")',
               '        div(class="close-text") click to close',
               '      div(class="leaf-icon")',
               '        div(class="icon")',
               '      div(class="display-text")',
               '        div(id="gallery-text" class="text" style="color:#4f4f4f") #{gallery}',
               '      div(id="number" class="number-icon number07")',
               '    div(id="gallery-inside", class="")',
               '      | #{rows}',
               //### news
               '  li(class="cate" style="z-index: 3")',
               '    div(id="news" class="news display-menu")',
               '      div(id="close-bar" class="close-bar")',
               '        div(class="close-icon")',
               '        div(class="close-text") click to close',
               '      div(class="leaf-icon")',
               '        div(class="icon")',
               '      div(class="display-text")',
               '        div(id="news-text" class="text" style="color:#4f4f4f") #{news}',
               '      div(id="number" class="number-icon number08")',
               '    div(id="news-inside-cate", class="news inside-cate")',
               //### contact
               '  li(class="cate" style="z-index: 2")',
               '    div(id="contact" class="contact display-menu")',
               '      div(id="close-bar" class="close-bar")',
               '        div(class="close-icon")',
               '        div(class="close-text") click to close',
               '      div(class="leaf-icon")',
               '        div(class="icon")',
               '      div(class="display-text")',
               '        div(id="contact-text" class="text" style="color:#4f4f4f") #{contact}',
               '      div(id="number" class="number-icon number09")'
  );

Menu.galleryHaml = 
  Haml.compile('div(id="gallery-item-#{index}" class="sub-menu" data-index="#{index}")',
               '  div(id="gallery-sub-menu" class="gallery-item-#{index} sub-menu-icon")',
               '    img(src="#{thumbnailUrl}" class="gallery-thumbnail")',
               '  div(id="gallery-item-#{index}-des" class="description")',
               '    div(class="top-des")',
               '      div(class="number-des") #{number}',
               '      div(class="icon-des logo")',
               '    div(class="bottom-des") #{title}'
  );

Menu.menu = null;
Menu.activeMenu = null;
Menu.activeMenuBar = null;

Menu.initMenu = function() {
  Menu.menu = null;
  Menu.activeMenu = null;
  Menu.activeMenuBar = null;
  var menu = new Menu();
  var index;
  if (LANG == 'en') {
    index = 0;
  } else {
    index = 1;
  }
  var rows = '';
  for (var i = 0; i < GALLERY.length; i++) {
    rows += Menu.galleryHaml({
      index: i.toString(),
      thumbnailUrl: '/img/' + GALLERY[i].thumbnailUrl,
      title: GALLERY[i].title,
      number: '0' + (i + 1).toString()
    });
  }
  Menu.lang[index].rows = rows;
  menu.haml = Menu.hamlMenu(Menu.lang[index]);
  menu.div = createNode(menu.haml);
  Menu.menu = menu;
  return menu;
};

Menu.hideAll = function(callback) {
  var count = 0;
  var otherMenus = $("div.display-menu").parent();
  for (var i = 0; i < otherMenus.length; i++) {
    unbindMouseOver(otherMenus[i]);
  }
  ScreenMain.removeImageSlider();
  $("div.text").hide();
  Menu.activeMenu = null;
  $("div.display-menu").parent().height('23%').slideUp(200, function() {
    count++;
    if (count == 9) {
      callback();
    }
  });
};

Menu.showAll = function() {
  ScreenMain.removeImageSlider();
  $('.text').show();
  $("div.display-menu").parent().find('#close-bar').css('top', '-3em');
  $("div.display-menu").parent().slideDown(200).find('#number').css('top', '-5.5em');
  var otherMenus = $("div.display-menu").parent();
  for (var i = 0; i < otherMenus.length; i++) {
    bindMouseOver(otherMenus[i]);
  }
  ScreenMain.imageAdvHolder.style.bottom = '-100%';
  ScreenMain.imageAdvHolder.className = 'home-intro';
  ScreenMain.imageAdvHolder.firstChild.className = 'home-adv';
  ScreenMain.imageAdvHolder.style.left = calculateImagePos('home-adv');
  $(ScreenMain.imageAdvHolder).stop().animate({
    bottom: 0
  }, 1000);
  // $(ScreenMain.imageAdvHolder).hide().slideDown('fast');
};

Menu.hideOther = function(menu) {
  // unbindMouseOver(menu.parentNode);
  var otherMenus = $("div.display-menu").parent();
  for (var i = 0; i < otherMenus.length; i++) {
    unbindMouseOver(otherMenus[i]);
  }
  ScreenMain.removeImageSlider();
  $("div.text:not('#"+ menu.id + "-text')").hide();
  Menu.activeMenu = menu;
  // $(menu).parent().height('45%');
  $("div.display-menu:not('#"+ menu.id + "')").parent().height('23%').slideUp(200, function() {
  });
};

Menu.showOther = function(menu, callback) {
  ScreenMain.removeImageSlider();
  $('.text').show();
  bindMouseOver(menu.parentNode);
  $("div.display-menu:not('#"+ menu.id + "')").parent().find('#close-bar').css('top', '-3em');
  $("div.display-menu:not('#"+ menu.id + "')").parent().slideDown(200).find('#number').css("top", '-5.5em');
  var otherMenus = $("div.display-menu:not('#"+ menu.id + "')").parent();
  for (var i = 0; i < otherMenus.length; i++) {
    bindMouseOver(otherMenus[i]);
  }
  ScreenMain.imageAdvHolder.style.bottom = '-100%';
  ScreenMain.imageAdvHolder.className = 'home-intro';
  ScreenMain.imageAdvHolder.firstChild.className = 'home-adv';
  ScreenMain.imageAdvHolder.style.left = calculateImagePos('home-adv');
  $(ScreenMain.imageAdvHolder).stop().animate({
    bottom: 0
  }, 1000);
  $(menu).parent().stop().animate({height:'45%'},{queue:false, duration:500, easing: 'easeOutCubic', complete: function() {
    if (callback) {
      callback();
    }
  }});
}

Menu.showMenuBar = function(menu, callback) {
  Menu.activeMenu = menu;
  Menu.enableButtons(menu);
  if (menu.id == 'gallery') {
    $('#gallery-inside').animate({width: '18.5em', height: '95%'},{queue:false, duration:500, easing: 'easeOutExpo'});
    Menu.activeMenuBar = $('#gallery-inside');
  } else {
    Menu.activeMenuBar = $(menu).parent().find('#'+ menu.id + '-inside-cate');
    Menu.activeMenuBar.css('marginLeft', '-5em').animate({width: $(document).width() + 'px'},{queue:false, duration:500, easing: 'easeOutExpo'});
  }
  unbindMouseOver(menu.parentNode);
};

Menu.hideMenuBar = function(menu, callback) {
  bindMouseOver(menu.parentNode);
  if (menu.id == 'gallery' || Menu.activeMenuBar.attr('id') == 'gallery-inside') {
    $('#gallery-inside').animate({width: '0', height: '0'},{queue:false, duration:500, easing: 'easeOutExpo', complete: function() {
      if (callback) {
        callback();
      }
    }})
  } else {
    Menu.activeMenuBar.animate({width: '0'},{queue:false, duration:500, easing: 'easeOutExpo', complete: function() {
      if (callback) {
        callback();
      }
    }}).css('marginLeft', '0');
  }
};

Menu.enableButtons = function(menu) {
  switch(menu.id) {
    case 'go-abroad':
      $("#question").click(function() {
        Menu.hideAll(function() {
          ScreenManager.setScreen('question');
        });
      });
      break;
    case 'gallery':
      $('#gallery-inside').find('.sub-menu').click(function() {
        var images = [];
        for (var i = 0; i < GALLERY[parseInt($(this).data('index'))].images.length; i++) {
          images.push('/img/' + GALLERY[parseInt($(this).data('index'))].images[i]);
        }
        ScreenMain.initImageSlider(images, 'gallery');
      });
      break;
  }
};