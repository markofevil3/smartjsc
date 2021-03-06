function Menu() {
  this.div = null;
  this.haml = null;
};

Menu.lang = [
  {'about': 'About', 'links': 'Links', 'goAbroad': 'Go Abroad', 'studying': 'Studying', 'export': 'Export', 'camping': 'Camping', 'gallery': 'Gallery', 'news': 'News', 'contact': 'Contact', 'questions': 'Questions', 'kindergarten': 'kindergarten', 'teenager': 'teenager', 'academic': 'academic', 'reflection': 'reflection', 'communication': 'communication', 'englishTest': 'english test', 'business': 'business', 'intensive': 'intensive'},
  {'about': 'Giới Thiệu', 'links': 'Liên Kết', 'goAbroad': 'Du Học', 'studying': 'Khoá Học', 'export': 'Export', 'camping': 'Cắm Trại', 'gallery': 'Ảnh', 'news': 'Tin Tức', 'contact': 'Liên Hệ', 'questions': 'Hỏi Đáp', 'kindergarten': 'Mẫu Giáo', 'teenager': 'Thiếu Niên', 'academic': 'Học Thuật', 'reflection': 'Phản Xạ', 'communication': 'Giao Tiếp', 'englishTest': 'Luyện Thi', 'business': 'Doanh Nghiệp', 'intensive': 'Chuyên Sâu'}
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
               '      div(id="skype" class="sub-menu")',
               '        div(class="skype sub-menu-icon")',
               '        div(id="skype-des" class="description")',
               '          div(class="top-des")',
               '            div(class="number-des") 03',
               '            div(class="icon-des logo")',
               '          div(class="bottom-des") skype',
               '      div(id="yahoo" class="sub-menu")',
               '        div(class="yahoo sub-menu-icon")',
               '        div(id="yahoo-des" class="description")',
               '          div(class="top-des")',
               '            div(class="number-des") 04',
               '            div(class="icon-des logo")',
               '          div(class="bottom-des") yahoo',
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
               '      div(id="england" class="sub-menu")',
               '        div(class="england sub-menu-icon")',
               '        div(id="england-des" class="description")',
               '          div(class="top-des")',
               '            div(class="number-des") 03',
               '            div(class="icon-des leaf")',
               '          div(class="bottom-des") england',
               '      div(id="question" class="sub-menu")',
               '        div(class="question sub-menu-icon")',
               '        div(id="question-des" class="description")',
               '          div(class="top-des")',
               '            div(class="number-des") 04',
               '            div(class="icon-des leaf")',
               '          div(class="bottom-des") #{questions}',
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
               '      div(id="kindergarten" class="sub-menu" data-subType="1")',
               '        div(class="kindergarten sub-menu-icon")',
               '        div(id="kindergarten-des" class="description")',
               '          div(class="top-des")',
               '            div(class="number-des") 01',
               '            div(class="icon-des logo")',
               '          div(class="bottom-des") #{kindergarten}',
               // '      div(id="pioneer" class="sub-menu" data-subType="2")',
               // '        div(class="pioneer sub-menu-icon")',
               // '        div(id="pioneer-des" class="description")',
               // '          div(class="top-des")',
               // '            div(class="number-des") 02',
               // '            div(class="icon-des logo")',
               // '          div(class="bottom-des") pioneer',
               '      div(id="teenager" class="sub-menu" data-subType="3")',
               '        div(class="teenager sub-menu-icon")',
               '        div(id="teenager-des" class="description")',
               '          div(class="top-des")',
               '            div(class="number-des") 03',
               '            div(class="icon-des logo")',
               '          div(class="bottom-des") #{teenager}',
               '      div(id="academic" class="sub-menu" data-subType="4")',
               '        div(class="academic sub-menu-icon")',
               '        div(id="academic-des" class="description")',
               '          div(class="top-des")',
               '            div(class="number-des") 04',
               '            div(class="icon-des logo")',
               '          div(class="bottom-des") #{academic}',
               '      div(id="reflection" class="sub-menu" data-subType="5")',
               '        div(class="reflection sub-menu-icon")',
               '        div(id="reflection-des" class="description")',
               '          div(class="top-des")',
               '            div(class="number-des") 05',
               '            div(class="icon-des logo")',
               '          div(class="bottom-des") #{reflection}',
               '      div(id="communication" class="sub-menu" data-subType="6")',
               '        div(class="communication sub-menu-icon")',
               '        div(id="communication-des" class="description")',
               '          div(class="top-des")',
               '            div(class="number-des") 06',
               '            div(class="icon-des logo")',
               '          div(class="bottom-des") #{communication}',
               '      div(id="intensive" class="sub-menu" data-subType="7")',
               '        div(class="intensive sub-menu-icon")',
               '        div(id="intensive-des" class="description")',
               '          div(class="top-des")',
               '            div(class="number-des") 07',
               '            div(class="icon-des logo")',
               '          div(class="bottom-des") #{intensive}',
               '      div(id="exam" class="sub-menu" data-subType="8")',
               '        div(class="exam sub-menu-icon")',
               '        div(id="exam-des" class="description")',
               '          div(class="top-des")',
               '            div(class="number-des") 08',
               '            div(class="icon-des logo")',
               '          div(class="bottom-des") #{englishTest}',
               '      div(id="business" class="sub-menu" data-subType="9")',
               '        div(class="business sub-menu-icon")',
               '        div(id="business-des" class="description")',
               '          div(class="top-des")',
               '            div(class="number-des") 09',
               '            div(class="icon-des logo")',
               '          div(class="bottom-des") #{business}',
               // '      div(id="skill" class="sub-menu" data-subType="10")',
               // '        div(class="skill sub-menu-icon")',
               // '        div(id="skill-des" class="description")',
               // '          div(class="top-des")',
               // '            div(class="number-des") 10',
               // '            div(class="icon-des logo")',
               // '          div(class="bottom-des") skills',
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
               // '    div(id="camping-inside-cate", class="camping inside-cate")',
               '    div(id="camping-inside-cate")',
               '      div(id="camping-content-wrap") #{campingContent}',
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

Menu.schoolLogosHaml =
  Haml.compile('div(id="#{schoolId}" class="logos" data-type="#{type}")',
               '  img(src="/img/goAbroad/#{logoLink}")'
  );

Menu.popupSchoolContentHaml =
  Haml.compile('div(id="popupSchool" class="popup")',
               '  div(id="closeButton")',
               '  div(id="popupSchoolContent")',
               '    img(id="schoolLogo" src="/img/goAbroad/#{logoLink}")',
               '    div(id="popupSchoolContentWrap")',
               '      | #{content}'
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
  Menu.lang[index].campingContent = WebData.CONTENT.camping;
  menu.haml = Menu.hamlMenu(Menu.lang[index]);
  menu.div = createNode(menu.haml);
  Menu.menu = menu;
  return menu;
};

Menu.hideAll = function(callback) {
  var count = 0;
  var otherMenus = $("div.display-menu").parent();
  for (var i = 0; i < otherMenus.length; i++) {
    $(otherMenus[i]).find('#close-bar').css('top', '-3em');
    $(otherMenus[i]).find('#number').css("top", '-5.5em');
    unbindMouseOver(otherMenus[i]);
  }
  if (Menu.activeMenuBar != null) {
    Menu.activeMenuBar[0].style.width = 0;
    Menu.activeMenuBar[0].style.marginLeft = 0;
  }
  ScreenMain.removeImageSlider();
  $("div.text").hide();
  Menu.activeMenu = null;
  $("div.display-menu").parent().height('23%').slideUp(200, function() {
    count++;
    if (count == 9) {
      if (callback) {
        callback();
      }
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
  ScreenMain.changeIntroImage('home');
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
  ScreenMain.changeIntroImage('home');
  $(menu).parent().stop().animate({height:'45%'},{queue:false, duration:500, easing: 'easeOutCubic', complete: function() {
    if (callback) {
      callback();
    }
  }});
}

Menu.showMenuBar = function(menu, callback) {
  Menu.activeMenu = menu;
  Menu.enableButtons(menu);
  switch (menu.id) {
    case 'gallery':
      $('#gallery-inside').animate({width: '18.5em', height: '95%'},{queue:false, duration:500, easing: 'easeOutExpo'});
      Menu.activeMenuBar = $('#gallery-inside');
      break;
    case 'camping':
      $('#camping-inside-cate').fadeIn('slow');
      Menu.activeMenuBar = $('#camping-inside-cate');
      break
    default:
      Menu.activeMenuBar = $(menu).parent().find('#'+ menu.id + '-inside-cate');
      Menu.activeMenuBar.css('marginLeft', '-5em').animate({width: $(document).width() + 'px'},{queue:false, duration:500, easing: 'easeOutExpo'});
  }
  unbindMouseOver(menu.parentNode);
};

Menu.hideMenuBar = function(menu, callback) {
  bindMouseOver(menu.parentNode);
  switch (Menu.activeMenuBar.attr('id')) {
    case 'gallery-inside':
      $('#gallery-inside').animate({width: '0', height: '0'},{queue:false, duration:500, easing: 'easeOutExpo', complete: function() {
        if (callback) {
          callback();
        }
      }});
      break;
    case 'camping-inside-cate':
      $('#camping-inside-cate').fadeOut('slow', function() {
        if (callback) {
          callback();
        }
      });
      break;
    default:
      Menu.activeMenuBar.animate({width: '0'},{queue:false, duration:500, easing: 'easeOutExpo', complete: function() {
        if (callback) {
          callback();
        }
      }}).css('marginLeft', '0');
  }
};

Menu.showDynamicContent = function(type) {
  console.log("here");
  ScreenMain.introImage.style.display = "none";
  ScreenMain.dynamicContentArrow.style.left = WebData.GO_ABROAD_CONTENT[type].arrowPos + 'em';
  ScreenMain.dynamicContent.querySelector("#display-content-wrap").innerHTML = WebData.GO_ABROAD_CONTENT[type].content;
  var logos = '';
  for (var i = 0; i < WebData.GO_ABROAD_CONTENT[type].schools.length; i++) {
    var school = WebData.GO_ABROAD_CONTENT[type].schools[i];
    logos += Menu.schoolLogosHaml({
      schoolId: school.id,
      logoLink: type + '/' + school.image,
      type: type
    });
  }
  ScreenMain.dynamicContent.querySelector("#school-logos").innerHTML = logos;
  var logoDivs = ScreenMain.dynamicContent.getElementsByClassName("logos");
  for (var i = 0; i < logoDivs.length; i++) {
    Button.enable(logoDivs[i], Menu.showSchoolContent);
  }
  ScreenMain.dynamicContent.style.display = 'block';
}

Menu.showSchoolContent = function(e) {
  var schoolType = e.getAttribute("data-type");
  var schoolId = e.id;
  var div = createNode(Menu.popupSchoolContentHaml({
    logoLink: schoolType + '/' + WebData.SCHOOL_CONTENT[schoolId].image,
    content: WebData.SCHOOL_CONTENT[schoolId].content
  }));
  Button.enable(div.querySelector("#closeButton"), function() {
    Popup.close();
  });
  Popup.open(ScreenMain.screen, div);
};

Menu.enableButtons = function(menu) {
  switch(menu.id) {
    case 'go-abroad':
      $("#question").click(function() {
        Menu.hideAll(function() {
          ScreenManager.setScreen('question');
        });
      });
      $("#canada").click(function() {
        // alert('canada');
        Menu.showDynamicContent('canada');
      });
      $("#singapore").click(function() {
        // alert('singapore');
        Menu.showDynamicContent('singapore');
      });
      $("#england").click(function() {
        // alert('singapore');
        Menu.showDynamicContent('england');
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
    case 'studying':
      $('#studying-inside-cate').find('.sub-menu').click(function(e) {
        Popup.openLoading(ScreenManager.currentScreen);
        var div = $(this);
        ajax('/studying', {
          subType: $(this).data('subtype')
        },
        function(response) {
          Popup.close();
          var json = JSON.parse(response);
          Menu.hideAll();
          $('#item-content').show('slow');
          if (json.data) {
            $('#item-title').html(json.data.title);
            $('#item-full-des').html(json.data.content);
          }
          // ScreenMain.changeIntroImage($(div).attr('id'));
          ScreenMain.changeIntroImage($(div).attr('id'));
          Button.enable(ScreenMain.screen.querySelector("#close-button"), function() {
            $('#item-content').hide('slow');
            Menu.showAll();
          });
        },
        function(response) {
          alert('There was a problem connecting to the server. Please refresh and try again later.');
        });
      });
      break;
  }
};