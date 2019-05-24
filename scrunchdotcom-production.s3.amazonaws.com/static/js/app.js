$(document).ready(function(){

  var windowHeight = $(window).height();
  var menu = $("#menu")
  var menuContainer = $("#menu .container")
  var menuHeight = menuContainer.outerHeight();

  var landingSlide = $('.landing-slide');
  var landingSlideHeight = 0;

  landingSlide.each(function() {
    landingSlideHeight += $(this).outerHeight();
  });

  $(window).resize(function() {
    windowHeight = $(window).height();

    landingSlideHeight = 0;

    landingSlide.each(function() {
      landingSlideHeight += $(this).outerHeight();
    });
  });


  $(window).scroll(function() {
    var scroll = $(window).scrollTop();

    // Fix menu
    if (scroll > (landingSlideHeight - menuHeight)) {
      menu.addClass("menu-fixed");
    } else {
      menu.removeClass("menu-fixed");
    }
  });



  var videoOverlay = $('.fullscreen-video-overlay');
  var videoFrame = videoOverlay.find('iframe');
  var videoSrc = videoFrame.attr('src');
  var videoPlaying = false;
  if (videoFrame.attr('id') == 'wistia_embed') {
    var autoPlayParamStart = '&autoPlay=true';
    var autoPlayParamStop = '&autoPlay=false';
  } else {
    var autoPlayParamStart = '?autoplay=1';
    var autoPlayParamStop = '?autoplay=0';
  }

  // Toggle video overlay
  $('.js-toggle-video-overlay').click(function(){
    videoOverlay.toggleClass('hidden');
    if (videoPlaying) {
      videoFrame.attr('src', videoSrc + autoPlayParamStop);
      videoPlaying = false;
    } else {
      videoFrame.attr('src', videoSrc + autoPlayParamStart);
      videoPlaying = true;
    }
  });

  // Toggle search overlay
  $('.search-button').click(function(){
    $('#search').toggleClass('hidden');
    $('#search .overlay-input').focus();
  });

  // Hide overlays when hitting esc
  $(document).keyup(function(e) {
    if (e.which == 27) {
      $('.overlay').addClass('hidden');
      videoFrame.attr('src', videoSrc + '?autoplay=0');
    }
  });



  // Viewport checker

  // $('.dummy').viewportChecker({
  //   classToAdd: 'visible', // Class to add to the elements when they are visible
  //   classToRemove: 'invisible', // Class to remove before adding 'classToAdd' to the elements
  //   offset: 0, // The offset of the elements (let them appear earlier or later). This can also be percentage based by adding a '%' at the end
  //   invertBottomOffset: true, // Add the offset as a negative number to the element's bottom
  //   repeat: false, // Add the possibility to remove the class if the elements are not visible
  //   callbackFunction: function(elem, action){}, // Callback to do after a class was added to an element. Action will return "add" or "remove", depending if the class was added or removed
  //   scrollHorizontal: false // Set to true if your website scrolls horizontal instead of vertical.
  // });

  // Adding this with js so they are visible when js is disabled
  $('.inview').addClass('invisible');

  $('.inview').viewportChecker({
    classToAdd: 'visible',
    classToRemove: 'invisible',
    offset: 0,
    repeat: false
  });

  // Toggle expando lists (eg FAQ)
  $('.expando-list > li').click(function() {
    $(this).toggleClass('open');
  })



  // Get URL parameters, will display a banner for different campaigns eg:
  // https://scrunch.com/?ref=campaign

  // var getUrlParameter = function getUrlParameter(sParam) {
  //   var sPageURL = decodeURIComponent(window.location.search.substring(1)),
  //       sURLVariables = sPageURL.split('&'),
  //       sParameterName,
  //       i;
  //
  //   for (i = 0; i < sURLVariables.length; i++) {
  //     sParameterName = sURLVariables[i].split('=');
  //
  //     if (sParameterName[0] === sParam) {
  //       return sParameterName[1] === undefined ? true : sParameterName[1];
  //     }
  //   }
  // };
  //
  // var referral = getUrlParameter('ref');
  //
  // if (referral == 'myriad') {
  //   $('#scrunch-landing-slide').find('p:first-of-type').append('.<br />Thanks for visiting us at <strong>Myriad</strong>! &#128075;');
  // }



  // Sentiment rating stuff
  var sentimentItem = $('.sentiment-rating ul li');

  sentimentItem.on('click', function() {
    sentimentItem.removeClass();
    $(this).addClass('selected');
    sentimentItem.not('.selected').addClass('unselected');

    $(this).closest('.sentiment-rating').addClass('selection-made');
  });


  // Ben's form handler stuff
  $('.blog-post-likes > form').on('submit', function() {
    var url = $(this).attr('action');
    var method = $(this).attr('method');
    var key = 'rating_count';
    var likesSelector = '.likes-icon';
    if(!method) {
      method = 'post';
    }
    $.ajax({
      type : method.toUpperCase(),
      url : url,
      dataType: 'json',
      data : $(this).serializeArray(),
      success : function(data) {
        var verb = 'like';
        if(data[key] !== 1){
          verb += 's';
        }
        // Find all the forms that post to the same endpoint
        $('form[action="' + url + '"]').find(likesSelector).text(data[key] + ' ' + verb)
          .toggleClass('icon-heart').toggleClass('icon-heart-full');
      }.bind(this)
    });
    return false;
  });

  $('.scrunchapp-signup-form').on('submit', function(e) {
    e.preventDefault();
    var $email = $('.scrunchapp-signup-email');
    window.location.href = 'https://app.scrunch.com/account/signup?email=' + encodeURIComponent($email.val() || ''); 
  });

  $('.scrunchapp-signup-form').on('submit', function(e) {
    e.preventDefault();
    var $email = $('.scrunchapp-signup-email');
    window.location.href = 'https://app.scrunch.com/account/signup?email=' + encodeURIComponent($email.val() || ''); 
  });


  $("#sign-up-dropdown").toggle(false);
  $('#sign-up-btn').on('click', function() {
    $("#sign-up-dropdown").toggle();
  });

  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.drop-btn') && !event.target.matches('#sign-up-btn')) {
      $("#sign-up-dropdown").toggle(false);
    }
  }


});
