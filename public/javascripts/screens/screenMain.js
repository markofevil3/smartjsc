function ScreenMain() {};

ScreenMain.screen = document.createElement('div');
ScreenMain.screen.id = 'screen-main';
ScreenMain.imageAdvHolder = null;

var IMG_LEFT_POS = {
  'home-adv': {'left': 100, 'min': 353, 'width': 400},
  'about-adv': {'left': 100, 'min': 786, 'width': 300},
  'links-adv': {'left': 100, 'min': 365, 'width': 400},
  'go-abroad-adv': {'left': 100, 'min': 380, 'width': 650},
  'studying-adv': {'left': 100, 'min': 390, 'width': 650},
  'contact-adv': {'left': 100, 'min': 250, 'width': 830},
  'kindergarten-adv': {'left': 100, 'min': 786, 'width': 300},
  'pioneer-adv': {'left': 100, 'min': 786, 'width': 300},
  'teenager-adv': {'left': 100, 'min': 786, 'width': 300},
  'academic-adv': {'left': 100, 'min': 786, 'width': 350},
  'reflection-adv': {'left': 100, 'min': 786, 'width': 300},
  'communication-adv': {'left': 100, 'min': 786, 'width': 350},
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
               '    img(id="main-screen-image" class="home-adv")',
               'a(href="/login")',
               '  div(id="login-icon")'
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
  
ScreenMain.start = function() {
  Menu.initMenu();
  ScreenMain.screen.innerHTML = ScreenMain.hamlScreen({
    menu: Menu.menu.haml
  });
  var menus = ScreenMain.screen.getElementsByClassName('display-menu');
  ScreenMain.imageAdvHolder = ScreenMain.screen.querySelector('#intro-image');
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
            Menu.hideOther(e);
            $('#content').slideDown();
            $('#content-wrap').html(WebData.CONTENT[e.id]);
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
            // Menu.hideAll();
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
  var introImage = ScreenMain.screen.querySelector('#intro-image')
  introImage.style.bottom = '-100%';
  ScreenMain.imageAdvHolder.className = id + '-intro';
  ScreenMain.imageAdvHolder.firstChild.className = id + '-adv';
  ScreenMain.imageAdvHolder.style.left = calculateImagePos(id + '-adv');
  $(introImage).stop().animate({
    bottom: 0
  }, 1000);
}

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
    imageSlider.className = '';
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
  ScreenMain.screen.querySelector("#image-slider").innerHTML = '';
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