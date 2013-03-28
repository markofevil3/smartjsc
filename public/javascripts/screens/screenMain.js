function ScreenMain() {};

ScreenMain.screen = document.createElement('div');
ScreenMain.screen.id = 'screen-main';
ScreenMain.imageAdvHolder = null;
ScreenMain.currentIntroImage = null;

var IMG_LEFT_POS = {
  'home-adv': {'left': 100, 'min': 353, 'width': 400, 'image': '/img/icons/home-adv.png'},
  'about-adv': {'left': 100, 'min': 786, 'width': 300, 'image': '/img/icons/about-adv.png'},
  'links-adv': {'left': 100, 'min': 365, 'width': 400, 'image': '/img/icons/links-adv.png'},
  'go-abroad-adv': {'left': 100, 'min': 380, 'width': 650, 'image': '/img/icons/go-abroad-adv.png'},
  'studying-adv': {'left': 100, 'min': 390, 'width': 650, 'image': '/img/icons/studying-adv.png'},
  'contact-adv': {'left': 100, 'min': 250, 'width': 830, 'image': '/img/icons/contact-adv.png'},
  'kindergarten-adv': {'left': 100, 'min': 786, 'width': 300, 'image': '/img/icons/studying-maugiao-adv.gif'},
  'pioneer-adv': {'left': 100, 'min': 786, 'width': 300, 'image': '/img/icons/studying-thieunhi-adv.png'},
  'teenager-adv': {'left': 100, 'min': 786, 'width': 300, 'image': '/img/icons/studying-thieunien-adv.gif'},
  'academic-adv': {'left': 100, 'min': 786, 'width': 350, 'image': '/img/icons/studying-hocthuat-adv.gif'},
  'reflection-adv': {'left': 100, 'min': 786, 'width': 300, 'image': '/img/icons/studying-phanxa-adv.gif'},
  'communication-adv': {'left': 100, 'min': 786, 'width': 350, 'image': '/img/icons/studying-giaotiep-adv.gif'},
};

ScreenMain.hamlScreen =
  Haml.compile('div(id="menu-holder")',
               '  | #{menu}',
               'div(id="middle-panel-wrap")',
               '  div(id="content")',
               '    div(id="content-wrap")',
               '  div(id="item-content")',
               '    div(id="main-content") ',
               '      div(id="item-title")',
               '      div(id="item-full-des")',
               '    div(id="close-button")',
               '      div(id="close-icon")',
               '  div(id="image-slider")',
               'div(id="bottom-panel")',
               '  div(id="footer-image")',
               '  div(id="intro-image" class="home-intro")',
               '    img(id="intro-home-adv" class="home-adv main-screen-image" style="bottom: 0" src="/img/icons/home-adv.png")',
               '    img(id="intro-about-adv" class="about-adv main-screen-image" src="/img/icons/about-adv.png")',
               '    img(id="intro-links-adv" class="links-adv main-screen-image" src="/img/icons/links-adv.png")',
               '    img(id="intro-go-abroad-adv" class="go-abroad-adv main-screen-image" src="/img/icons/go-abroad-adv.png")',
               '    img(id="intro-studying-adv" class="studying-adv main-screen-image" src="/img/icons/studying-adv.png")',
               '    img(id="intro-contact-adv" class="contact-adv main-screen-image" src="/img/icons/contact-adv.png")',
               '    img(id="intro-kindergarten-adv" class="kindergarten-adv main-screen-image" src="/img/icons/studying-maugiao-adv.gif")',
               '    img(id="intro-teenager-adv" class="teenager-adv main-screen-image" src="/img/icons/studying-thieunien-adv.gif")',
               '    img(id="intro-academic-adv" class="academic-adv main-screen-image" src="/img/icons/studying-hocthuat-adv.gif")',
               '    img(id="intro-reflection-adv" class="reflection-adv main-screen-image" src="/img/icons/studying-phanxa-adv.gif")',
               '    img(id="intro-communication-adv" class="communication-adv main-screen-image" src="/img/icons/studying-giaotiep-adv.gif")',
               'a(href="/login")',
               '  div(id="login-icon")',
               'div(id="lang-bar")',
               '  a(href="/?lang=vn")',
               '    img(src="/img/icons/lang-vn.png" class="lang-icon")',
               '  a(href="/?lang=en")',
               '    img(src="/img/icons/lang-en.png" class="lang-icon")'
  );

ScreenMain.hamlScreenContact =
  Haml.compile('div(id="contact-content")',
               '  span(id="title") Smart International Corporation',
               '  br',
               '  form(id="contact-form")',
               '    input(type="text" id="name" name="name" class="contact-input" placeholder="Your name")',
               '    div(class="space")',
               '    input(type="text" id="email" name="email" class="contact-input" placeholder="Your email")',
               '    div(class="space")',
               '    textarea(style="resize: none;" id="message" name="message" class="contact-input" placeholder="Your Message" cols=30 rows=10)',
               '    div(class="space")',
               '    input(type="submit", id="send-contact", value="Send")',
               '    div(id="loading-message")'
  );

ScreenMain.hamlImageSlider = 
  Haml.compile('ul(id="mycarousel" class="jcarousel jcarousel-skin-tango")',
               '  | #{rows}'
  );

ScreenMain.hamlImage =
  Haml.compile('li',
               '  a(href="#{url}" rel="lightbox[roadtrip]")',
               '    img(src=#{url} class="slider-images")'
  );

ScreenMain.hamlPopup = 
  Haml.compile('div(id="popupOnMain" class="popup")',
               '  div(id="popupContent")',
               '    div(id="closeButton")',
               '    img(src="/img/icons/popup.jpg" id="popupImage")'
  );
  
ScreenMain.start = function() {
  Menu.initMenu();
  ScreenMain.screen.innerHTML = ScreenMain.hamlScreen({
    menu: Menu.menu.haml
  });
  var menus = ScreenMain.screen.getElementsByClassName('display-menu');
  ScreenMain.imageAdvHolder = ScreenMain.screen.querySelector('#intro-image');
  ScreenMain.currentIntroImage = ScreenMain.screen.querySelector('#intro-home-adv');
  var div = createNode(ScreenMain.hamlPopup());
  Button.enable(div.querySelector("#closeButton"), function(e) {
    Popup.close();
  });
  Popup.open(ScreenMain.screen, div);
  for (var i = 0; i < menus.length; i++) {
    Button.enable(menus[i], function(e) {
      if (Menu.activeMenu != null && Menu.activeMenu.id == e.id) {
        Menu.activeMenu = null;
        Menu.showOther(e);
        if ($(e).find('#number').offset().top !=  0) {
          $(e).find('#number').animate({'top': '-5.5em'});
        }
        if ($('#content').css('display') != 'none') {
          $('#content').slideUp();
        }
        if (Menu.activeMenuBar != null) {
          Menu.hideMenuBar(e);
        }
      } else {
        switch(e.id) {
          case 'about':
            Menu.hideOther(e);
            $('#content').slideDown();
            $('#content-wrap').html(WebData.CONTENT[e.id]);
            break;
          case 'camping':
            // Menu.hideOther(e);
            // $('#content').slideDown();
            // $('#content-wrap').html(WebData.CONTENT[e.id]);
            if (Menu.activeMenu && Menu.activeMenu.id != e.id && Menu.activeMenuBar != null) {
              $(Menu.activeMenu).parent().stop().animate({height:'23%'},{queue:false, duration:500, easing: 'easeOutBounce'});
              $(Menu.activeMenu).find('#number').animate({'top': '-5.5em'});
              Menu.hideMenuBar(Menu.activeMenu);
              Menu.showOther(e);
              Menu.showMenuBar(e);
            } else {
              Menu.showMenuBar(e);
            }
            ajax('/campingImages', {
              timeStamp: Date.now()
            },
            function(response) {
              ScreenMain.initImageSlider(JSON.parse(response).data, 'camping');
            },
            function(response) {
              alert('There was a problem connecting to the server. Please refresh and try again later.');
            });
            break;
          case 'contact':
            Menu.hideOther(e);
            $('#content').slideDown();
            // $('#content').width('25em').slideDown();
            $('#content-wrap').html(ScreenMain.hamlScreenContact());
            ScreenMain.handleFormSubmit(ScreenMain.screen.querySelector('#contact-form'));
            break;
          case 'links':
          case 'go-abroad':
          case 'studying':
            if (Menu.activeMenu && Menu.activeMenu.id != e.id && Menu.activeMenuBar != null) {
              $(Menu.activeMenu).parent().stop().animate({height:'23%'},{queue:false, duration:500, easing: 'easeOutBounce'});
              $(Menu.activeMenu).find('#number').animate({'top': '-5.5em'});
              Menu.hideMenuBar(Menu.activeMenu);
              Menu.showOther(e);
              Menu.showMenuBar(e);
            } else {
              Menu.showMenuBar(e);
            }
            break;
          case 'news':
            Menu.hideAll(function() {
              ScreenManager.setScreen('news');
            });
            break;
          case 'gallery':
            if (Menu.activeMenu && Menu.activeMenu.id != e.id && Menu.activeMenuBar != null) {
              $(Menu.activeMenu).parent().stop().animate({height:'23%'},{queue:false, duration:500, easing: 'easeOutBounce'});
              $(Menu.activeMenu).find('#number').animate({'top': '-5.5em'});
              Menu.hideMenuBar(Menu.activeMenu);
              Menu.showOther(e);
              Menu.showMenuBar(e);
            } else {
              Menu.showMenuBar(e);
            }
            break;
        }
        if ($(e).find('#number').offset().top < 0) {
          $(e).find('#number').animate({'top': '0'});
        }
        ScreenMain.changeIntroImage(e.id);
      }
    });
  }
  setupAnimation();
};

ScreenMain.changeIntroImage = function(id) {
  var oldIntro = ScreenMain.currentIntroImage;
  ScreenMain.currentIntroImage = ScreenMain.screen.querySelector('#intro-' + id + '-adv');
  ScreenMain.imageAdvHolder.className = id + '-intro';
  var number = Math.floor((Math.random()*10)+1);
  if (number % 2 == 0) {
    $(oldIntro).stop().animate({'bottom': '-100%', 'opacity': 0}, 1000);
  } else {
    $(oldIntro).stop().animate({'left': '1000px', 'opacity': 0}, 1000);
  }
  if (IMG_LEFT_POS[id+'-adv']) {
    var value = $(window).width() - $(ScreenMain.currentIntroImage).width() - IMG_LEFT_POS[id+'-adv'].left;
    if (value < IMG_LEFT_POS[id+'-adv'].min) {
      value = IMG_LEFT_POS[id+'-adv'].min;
    }
    $('#intro-image').css('left', value + 'px');
    $(ScreenMain.currentIntroImage).stop().animate({'bottom': '0', 'left': 0, 'opacity': 1}, 1000);
  }
};

ScreenMain.initImageSlider = function(images, type) {
  var imagesDiv = '';
  for (var i = 0; i < images.length; i++) {
    imagesDiv += ScreenMain.hamlImage({url: escape(images[i])});
  }
  var slider = ScreenMain.hamlImageSlider({rows: imagesDiv});
  var imageSlider = ScreenMain.screen.querySelector("#image-slider");
  if (type == 'gallery') {
    imageSlider.className = 'gallery-image-slider';
  } else {
    imageSlider.className = 'camping-image-slider';
  }
  imageSlider.style.height = $(window).height() - 80 + 'px';
  imageSlider.innerHTML = slider;
  jQuery(document).ready(function() {
    if ($('#mycarousel')) {
      jQuery('#mycarousel').jcarousel({
        vertical: true,
        // auto: 3,
        wrap: 'circular',
        initCallback: mycarousel_initCallback
      });
    }
  });
};

ScreenMain.removeImageSlider = function() {
  var imageSlider = ScreenMain.screen.querySelector("#image-slider");
  imageSlider.style.height = 0;
  imageSlider.innerHTML = '';
};

ScreenMain.handleFormSubmit = function(form) {
  $("#send-contact").click(function(e) {
    e.preventDefault();
    var name = form.querySelector("#name").value;
    var email = form.querySelector("#email").value;
    var message = form.querySelector("#message").value;
    if (name == '' || email == '' || message == '') {
      alert('Please enter all information');
    } else {
      $("#loading-message").html('Sending...');
      $("#send-contact").attr('disabled','disabled');
      $.ajax({
        type: "POST",
        url: 'contact',
        data: $(form).serialize(),
        success: function(json) {
          if (json.data == 'success') {
            form.reset();
            $("#loading-message").html('');
            $("#send-contact").removeAttr('disabled');
            alert("Your message has been sent!");
          } else {
            $("#loading-message").html('');
            $("#send-contact").removeAttr('disabled');
            alert("Please retry later!");
          }
        }
      });
      return false;
    }
  });
};

function calculateImagePos(imgId) {
  if (IMG_LEFT_POS[imgId]) {
    var value = $(window).width() - IMG_LEFT_POS[imgId].width - IMG_LEFT_POS[imgId].left;
    if (value < IMG_LEFT_POS[imgId].min) {
      return IMG_LEFT_POS[imgId].min + 'px';
    }
    return value + 'px';
  }
};

function mycarousel_initCallback(carousel)
{
    // Disable autoscrolling if the user clicks the prev or next button.
    carousel.buttonNext.bind('click', function() {
        carousel.startAuto(0);
    });

    carousel.buttonPrev.bind('click', function() {
        carousel.startAuto(0);
    });

    // Pause autoscrolling if the user moves with the cursor over the clip.
    carousel.clip.hover(function() {
        carousel.stopAuto();
    }, function() {
        carousel.startAuto();
    });
};

function preloadImage(sources, folder, callback) {
  var numImages = sources.length;
  var images = [];
  var loadedImages = 0;
  
  if (sources != '') {
    for(var i = 0; i < sources.length; i++) {
      images[i] = new Image();
      images[i].onload = function() {
        if(++loadedImages >= numImages) {
          setTimeout(function() {
            if (callback) {
              callback(images);
            }
          }, 500);
        }
      };
      if (folder != null) {
        images[i].src = 'img/' + folder + '/' + sources[i];
      } else {
        images[i].src = 'img/' + sources[i];
      }
    }    
  } else {
    if (callback) {
      callback('');
    }
  }
};