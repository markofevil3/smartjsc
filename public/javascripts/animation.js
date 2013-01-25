$(document).ready(function(){  
  // setupAnimation();
});

function bindMouseOver(div) {
  $(div).mouseover(function(){  
      $(this).stop().animate({height:'45%'},{queue:false, duration:500, easing: 'easeOutCubic'});
      $(this).find('#number').stop().animate({'top': '0'});
      $(this).find('#close-bar').stop().animate({'top': '1em'});
  });  

  //When mouse is removed  
  $(div).mouseout(function(){  
      $(this).stop().animate({height:'23%'},{queue:false, duration:500, easing: 'easeOutCubic'});
      $(this).find('#number').stop().animate({'top': '-5.5em'});
      $(this).find('#close-bar').stop().animate({'top': '-3em'});
  });
};

function unbindMouseOver(div) {
  $(div).unbind('mouseover');
  $(div).unbind('mouseout');
  $(div).height('45%');
};

function setupAnimation() {
  //When mouse rolls over  
  $(".cate").mouseover(function(){  
      
      $(this).stop().animate({height:'45%'},{queue:false, duration:500, easing: 'easeOutCubic'});
      $(this).find('#number').stop().animate({'top': '0'});
      $(this).find('#close-bar').stop().animate({'top': '1em'});
  });  

  //When mouse is removed  
  $(".cate").mouseout(function(){  
      $(this).stop().animate({height:'23%'},{queue:false, duration:500, easing: 'easeOutCubic'});
      $(this).find('#number').stop().animate({'top': '-5.5em'});
      $(this).find('#close-bar').stop().animate({'top': '-3em'});
  });
  
  $(".sub-menu-icon").mouseenter(function(e) {
    if (e.currentTarget.id == "gallery-sub-menu") {
      e.currentTarget.parentNode.style.backgroundColor = '#f8ca7e';
      $(this).parent().animate({
        backgroundColor: '#f8ca7e'
      });
      $(this).animate({
        width: '80%',
        height: '80%',
        marginTop: '-40%',
        marginLeft: '-40%',
        opacity: '1'
      }, 100);
    } else {
      console.log('bb');
      $(this).animate({
        width: '70%',
        height: '70%',
        marginTop: '-35%',
        marginLeft: '-35%',
        opacity: '1'
      }, 100);
    }
    $('#' + this.className.split(" ")[0] + '-des').stop().show().animate({
      width: '8em',
    }, 500);
  });
  
  $(".sub-menu-icon").mouseleave(function(e) {
    if (e.currentTarget.id == "gallery-sub-menu") {
      e.currentTarget.parentNode.style.backgroundColor = '#f2ec9b';
      $(this).animate({
        width: '100%',
        height: '100%',
        marginTop: '-50%',
        marginLeft: '-50%',
        opacity: '0.5'
      }, 100);
    } else {
      $(this).animate({
        width: '90%',
        height: '90%',
        marginTop: '-45%',
        marginLeft: '-45%',
        opacity: '0.4'
      }, 100);
    }
    var des = $('#' + this.className.split(" ")[0] + '-des');
    des.stop().animate({
      width: '0',
    }, 500, function() {
      des.hide();
    });
  });
}