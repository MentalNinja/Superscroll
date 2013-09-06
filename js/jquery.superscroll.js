/*
 Scrollup v1.0
 Author: Don Wasik
 Git: https://github.com/MentalNinja/Superscroll

 Copyright 2013 Don Wasik.
 Licensed under the MIT license
 http://www.opensource.org/licenses/mit-license.php
 */

;(function($, window, document, undefined) {
  //Main Plugin Vars
  var defaults = {
        append: false,
        scrollName: "scrollup",
        scrollHash: true,
        scrollLocalHash: true,
        scrollExternalHash: true,
        scrollPersistent: false,
        scrollSpeedUp: 1000,
        scrollAnimation: true,
        showHashURL: true,
        top: 0,
        fadeInHeight: 850,
        fadeInSpeed: 500,
        fadeOutSpeed: 250,
        debug: false,
        callback: function() {}
      };

  //Define main plugin
  $.superscroll = function(element, options) {
    //Define variables
    var viewport = $('html, body');
    var canceledScroll = false;
    var debug = true;

    if(element && !element.length && !$.isEmptyObject(element)) {
      options = element;
    }

    var settings = $.extend({}, defaults, options);


    //Cancel scroll
    $.fn.cancelScroll = function() {
      viewport.bind("scroll mousedown DOMMouseScroll mousewheel keyup", function(e) {
        if(e.which > 0 || e.type === "mousedown" || e.type === "mousewheel") {
          viewport.stop().unbind('scroll mousedown DOMMouseScroll mousewheel keyup');
          canceledScroll = true;
          clearHash();
          pluginCallback();
          if(element && element.length && element.is(":visible")) {
            element.finish().stop().clearQueue().attr("style", "display: block;").unwrap();
          }
        }
      });
    };

    //Debug Toggle
    var old_console_log = console.log;
    console.log = function() {
      if(debug) {
        old_console_log.apply(this, arguments);
      }
    };

    //Clear Hashes
    function clearHash() {
      if(!settings.showHashURL) {
        if(window.history && window.history.pushState) { 
            window.history.pushState('', '', window.location.pathname);
        } else { 
          window.location.href = window.location.href.replace(/#.*$/, '#'); 
        }
      }
    }


    //Reset callback
    function pluginCallback() {
      viewport.stop().unbind('scroll mousedown DOMMouseScroll mousewheel keyup');
      if(!canceledScroll) {
        debug = true;
        settings.callback.call(this);
        debug = settings.debug;
      } else {
        console.log("Superscroll - canceled scroll! If callback was set, it was canceled too! :)");
      }
      canceledScroll = false;
    }


    //Check if user wants to append scrollup element using plugin instead of define element in html
    if(settings.append && element && !element.length && !$.isEmptyObject(element) && !$("#" + scrollName).length) {
      console.log("Superscroll - append setting is true, successfully created scroll element!");
      element = $('<div id="' + scrollName + '" />').appendTo("body");
    } else if(settings.append && element && $("#" + scrollName).length && $.isEmptyObject(element)) {
      console.log("Superscroll - append setting is true, but element already exists in html! Use plugin in the object method instead!");
    } else if(settings.append && element && element.length && !$.isEmptyObject(element)) {
      console.log("Superscroll - append setting is true, but element already exists in html! Ignoring and using element already in html!");
    } else if(settings.append && element && $("#" + scrollName).length && !$.isEmptyObject(element)) {
      console.log("Superscroll - append setting is true, but element already exists in html! Ignoring and using element already in html!");
      element = $("#" + scrollName);
    }


    //Check if debugging enabled by user
    if(!settings.debug) {
      debug = false;
    } else {
      console.log("Superscroll - successfully initialized debugging! :)");
    }


    //Check if hash scrolling disabled by user
    if(settings.scrollHash && settings.scrollLocalHash || settings.scrollHash && settings.scrollExternalHash) {
      console.log("Superscroll - successfully initialized hash scrolling! :)");

      //Check if local hash scrolling disabled by user
      if(settings.scrollLocalHash) {
        $('a[href*=#]:not([href=#])').click(function(e) {
          var $LinkSamePage = $(this.hash),
              LinkSamePage = this.hash;

          if($LinkSamePage.length) {
            viewport.stop().animate({scrollTop: $LinkSamePage.offset().top}, settings.scrollSpeedUp, function() {
              if(settings.showHashURL) {
                location.hash = LinkSamePage;
              }
              pluginCallback();
            }).cancelScroll();

            e.preventDefault();
          }
        });
      } else {
        console.log("Superscroll - local hash scrolling disabled by user!");
      }

      //Check if external hash scrolling disabled by user
      if(settings.scrollExternalHash) {
        var $LinkDiffPage = $(location.hash),
            LinkDiffPage = location.hash;

        if($LinkDiffPage.length) {
          setTimeout(function() {
            viewport.animate({scrollTop: 0}, 0);
          }, 10);

          $(window).on("load", function() {
            setTimeout(function() {
              viewport.animate({scrollTop: $LinkDiffPage.offset().top}, settings.scrollSpeedUp, function() {
                clearHash();
                pluginCallback();
              }).cancelScroll();
            }, 1000);
          });
        }
      } else {
        console.log("Superscroll - external hash scrolling disabled by user!");
      }
    } else {
      console.log("Superscroll - hash scrolling completely disabled by user!");
    }


    //Initilize plugin if the element exists that the user is trying to call plugin on
    if(element && element.length) {
      if(element.attr("id")) {
        console.log('Superscroll - successfully initialized scrollup on the element: "#' + element.attr("id") + '"! :)');
      } else if(element.attr("class")) {
        console.log('Superscroll - successfully initialized scrollup on the element: ".' + element.attr("class") + '"! :)');
      }

      if(settings.scrollPersistent) {
        element.fadeIn(0).click(function() {
          if(jQuery.ui && settings.scrollAnimation && element.css("position") === "fixed") {
            element.effect("bounce", {direction: "up"}, settings.scrollSpeedUp * 0.75, function() {
              element.stop(true).clearQueue();
            });
          }
          viewport.stop().animate({scrollTop: settings.top}, settings.scrollSpeedUp, function() {
            clearHash();
            pluginCallback();
          }).cancelScroll();
        });
      } else {
        $(window).scroll(function(){
          if($(this).scrollTop() >= settings.fadeInHeight) {
            element.fadeIn(settings.fadeInSpeed);
          } else {
            element.fadeOut(settings.fadeOutSpeed);
          }
        });

        element.click(function() {
          if(jQuery.ui && settings.scrollAnimation && element.css("position") === "fixed") {
            element.effect("bounce", {direction: "up"}, settings.scrollSpeedUp * 0.75, function() {
              element.stop(true).clearQueue().fadeOut(settings.fadeOutSpeed);
            });
          }
          viewport.stop().animate({scrollTop: settings.top}, settings.scrollSpeedUp, function() {
            clearHash();
            pluginCallback();
          }).cancelScroll();
        });
      }
    } else {
      console.log("Superscroll - no user defined element detected! Using hash scroll only.");
    }


    //Check if custom options are defined and write them to console
    if(options && !$.isEmptyObject(options)) {
      $.each(defaults, function(index, val) {
        if($.inArray(index, defaults) && defaults[index] !== settings[index]) {
          console.log("Superscroll - user defined option detected! User option: '" + index + "' set to: '" + settings[index] + "'");
        }
      });
    } else {
      console.log("Superscroll - no user defined options detected! Using defaults.");
    }
  };


  $.fn.superscroll = function(options) {
    if($($(this).selector).length) {
      return this.each(function() {
        if(!$.data($(this), 'superscroll')) {
          $.data($(this), 'superscroll');
          new $.superscroll($(this), options);
        }
      });
    } else if(!$($(this).selector).length && options.append) {
      console.log("Superscroll - append setting is true, but you are using the plugin in the object method, and the element does not exist! Use the plugin in the global method instead!");
    } else {
      console.log('Superscroll - scrollup couldn\'t be initialized on the element: "' + $(this).selector + '"! Does it exist? :(');
    }
  };
}(jQuery, window, document));