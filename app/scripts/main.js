/* jshint devel:true */

(function(jQuery) {
  'use strict';
  jQuery.fn.tinderLike = function(options) {
    var beforeEvent = null,
        moveSign = 1.0,
        target = this,
        rotateRad = 0;

    var defaults = {
      likeAction : function() {
      },
      unlikeAction : function() {
      },
      likeOrientedAction : function() {
        target.find('.true_badge').css({
          'opacity':  Math.abs(rotateRad / (Math.PI/48))});
      },
      unlikeOrientedAction : function() {
        target.find('.false_badge').css({
          'opacity':  Math.abs(rotateRad / (Math.PI/48))});
      },
      boxHideTime: 300,
      boxHideTimeDelay: 400
    };

    $(this).append('<span class="true_badge">True</span>'+
                   '<span class="false_badge">False</span>');

    var setting = jQuery.extend({}, defaults, options);

    var likeClickActionMoving = function(){
      $('.true_badge').css({'opacity':  1});
      target.css({
        'transition' : 'all ' + setting.boxHideTime +
          'ms linear '+ setting.boxHideTimeDelay+'ms',
        'transform' :'translate3d( 500px, 0px, 0px) ' +
          'rotate(60deg)',
        '-webkit-transform' :'translate3d( 500px, 0px, 0px) ' +
          'rotate(60deg)'
      });
      setTimeout(function() {
        target.css({
          'transform' : 'none)',
          '-webkit-transform' : 'none)',
          'transition' : 'none'}).addClass('hide');
        $('.true_badge').css({"opacity":  0});
        $('.why_button_box').removeClass('hide');
      }, setting.boxHideTime + setting.boxHideTimeDelay);
    };

    var unLikeClickActionMoving = function(){
      $('.false_badge').css({'opacity': 1});
      target.css({
        'transition' : 'all ' + setting.boxHideTime +
          'ms linear '+ setting.boxHideTimeDelay + 'ms',
        'transform' :'translate3d( -300px, 0px, 0px) ' +
          'rotate(-60deg)',
        '-webkit-transform' :'translate3d( -300px, 0px, 0px) ' +
          'rotate(-60deg)'
      });
      setTimeout(function() {
        target.css({
          'transform' : 'none)',
          '-webkit-transform' : 'none)',
          'transition' : 'none'}).addClass("hide");
        $('.false_badge').css({"opacity":  0});
      }, setting.boxHideTime + setting.boxHideTimeDelay);
    };

    $(this).on('touchstart', function(event) {
      event.preventDefault();
      beforeEvent = event.originalEvent;
      var targetHeight = target.height(),
          targetOffset = target.offset().top,
          originCss;

      if (event.originalEvent.pageY > (targetHeight/2 + targetOffset)) {
        originCss = {
          'transform-origin' :
          beforeEvent.pageX + 'px ' +
            (targetOffset - screen.height * 5) + 'px'
        };
        moveSign = -1.0;
      }
      else{
        originCss = {
          'transform-origin' :
          beforeEvent.pageX + 'px ' +
            (targetOffset + targetHeight + screen.height * 5) + 'px'
        };
        moveSign = 1.0;
      }
      target.css(originCss);
    }).on('touchmove', function(event){
      event.preventDefault();
      var e = event.originalEvent,
          moveX = (e.pageX - beforeEvent.pageX) * moveSign,
          moveY =  e.pageY - beforeEvent.pageY,
          movingVal = (moveX * 0.3)/(screen.height + moveY);
      rotateRad = Math.atan(movingVal);
      target.css({
        'transform' : 'translate3d(0px,' + moveY + 'px , 0px)' +
          ' rotate(' + rotateRad + 'rad)',
        '-webkit-transform' : 'translate3d(0px,' + moveY + 'px , 0px)' +
          ' rotate(' + rotateRad + 'rad)'
      });
      var sign = rotateRad > 0 ? 1 : -1;
      if (moveSign * sign > 0) {
        setting.likeOrientedAction();
      }
      else {
        setting.unlikeOrientedAction();
      }
    }).on('touchend', function(event) {
      event.preventDefault();
      var sign = rotateRad > 0 ? 1 : -1;
      if (target.offset().left < -target.width()/1.5 ||
          target.offset().left + target.width() >
          target.width()/1.5 + screen.width) {
        target.css({
          'transition' : 'all 0.2s linear 0ms',
          'transform' : 'translate3d( ' +
            moveSign * sign * screen.width * 2 +'px, 0px, 0px)',
          '-webkit-transform' : 'translate3d( ' +
            moveSign * sign * screen.width * 2 +'px, 0px, 0px)'
        });
        setTimeout(function(){
          target.css({
            'transform-origin' : '50% 50% 0',
            'transform' : 'rotate(0deg)',
            '-webkit-transform' : 'rotate(0deg)',
            'transition' : 'none'
          });
          target.addClass('hide');
          rotateRad = 0;
          setting.likeOrientedAction(target);
          setting.unlikeOrientedAction(target);
        }, 200);
        if (target.offset().left > -target.width()/1.5) {
          setting.likeAction(target);
          likeClickActionMoving();
        }
        else {
          setting.unlikeAction(target);
          unLikeClickActionMoving();
        }
      }
      else{
        target.css({
          'transform-origin' : '50% 50% 0',
          'transform' : 'rotate(0deg)',
          '-webkit-transform' : 'rotate(0deg)',
          'transition' : 'none'
        });
        rotateRad = 0;
        setting.likeOrientedAction();
        setting.unlikeOrientedAction();
      }

      beforeEvent = null;
    });

    return {
      like: function(){
        setTimeout(function(){
          target.css({
            'transform-origin' : '50% 50% 0',
            'transform' : 'rotate(0deg)',
            '-webkit-transform' : 'rotate(0deg)',
            'transition' : 'none'
          });
          target.addClass('hide');
          rotateRad = 0;
          setting.likeOrientedAction(target);
          setting.unlikeOrientedAction(target);
        }, 1000);
        likeClickActionMoving();
      },
      unLike: function(){
        setTimeout(function(){
          target.css({
            'transform-origin' : '50% 50% 0',
            'transform' : 'rotate(0deg)',
            '-webkit-transform' : 'rotate(0deg)',
            'transition' : 'none'
          });
          target.addClass('hide');
          rotateRad = 0;
          setting.likeOrientedAction(target);
          setting.unlikeOrientedAction(target);
        }, 1000);
        unLikeClickActionMoving();
      }
    };
  };
})(jQuery);
