 AOS.init({
 	duration: 800,
 	easing: 'slide',
 	once: false
 });

jQuery(document).ready(function($) {

	"use strict";

	
	$(".loader").delay(1000).fadeOut("slow");
  $("#overlayer").delay(1000).fadeOut("slow");	

	var siteMenuClone = function() {

		$('.js-clone-nav').each(function() {
			var $this = $(this);
			$this.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-menu-body');
		});


		setTimeout(function() {
			
			var counter = 0;
      $('.site-mobile-menu .has-children').each(function(){
        var $this = $(this);
        
        $this.prepend('<span class="arrow-collapse collapsed">');

        $this.find('.arrow-collapse').attr({
          'data-toggle' : 'collapse',
          'data-target' : '#collapseItem' + counter,
        });

        $this.find('> ul').attr({
          'class' : 'collapse',
          'id' : 'collapseItem' + counter,
        });

        counter++;

      });

    }, 1000);

		$('body').on('click', '.arrow-collapse', function(e) {
      var $this = $(this);
      if ( $this.closest('li').find('.collapse').hasClass('show') ) {
        $this.removeClass('active');
      } else {
        $this.addClass('active');
      }
      e.preventDefault();  
      
    });

		$(window).resize(function() {
			var $this = $(this),
				w = $this.width();

			if ( w > 768 ) {
				if ( $('body').hasClass('offcanvas-menu') ) {
					$('body').removeClass('offcanvas-menu');
				}
			}
		})

		$('body').on('click', '.js-menu-toggle', function(e) {
			var $this = $(this);
			e.preventDefault();

			if ( $('body').hasClass('offcanvas-menu') ) {
				$('body').removeClass('offcanvas-menu');
				$this.removeClass('active');
			} else {
				$('body').addClass('offcanvas-menu');
				$this.addClass('active');
			}
		}) 

		// click outisde offcanvas
		$(document).mouseup(function(e) {
	    var container = $(".site-mobile-menu");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	      if ( $('body').hasClass('offcanvas-menu') ) {
					$('body').removeClass('offcanvas-menu');
				}
	    }
		});
	}; 
	siteMenuClone();

	// navigation
  var OnePageNavigation = function() {
    var navToggler = $('.site-menu-toggle');
   	$("body").on("click", ".main-menu li a[href^='#'], .smoothscroll[href^='#'], .site-mobile-menu .site-nav-wrap li a", function(e) {
      e.preventDefault();

      var hash = this.hash;

      $('html, body').animate({
        'scrollTop': $(hash).offset().top - 0
      }, 1000, 'easeInOutCirc', function(){
        window.location.hash = hash;
      });

    });
  };
  OnePageNavigation();

  var siteScroll = function() {

  	

  	$(window).scroll(function() {

  		var st = $(this).scrollTop();

  		if (st > 100) {
  			$('.js-sticky-header').addClass('shrink');
  		} else {
  			$('.js-sticky-header').removeClass('shrink');
  		}

  	}) 

  };
  siteScroll();

   // Contact form
	jQuery.validator.addMethod('answercheck', function (value, element) {
		return this.optional(element) || /^\bcat\b$/.test(value)
	}, "type the correct answer -_-");

	// validate contactForm form
	$(function() {
		$('#contactForm').validate({
			rules: {
				name: {
					required: true,
					minlength: 2
				},
				subject: {
					required: true,
					minlength: 4
				},
				number: {
					required: true,
					minlength: 5
				},
				email: {
					required: true,
					email: true
				},
				message: {
					required: true,
					minlength: 20
				}
			},
			messages: {
				name: {
					required: "come on, you have a name, don't you?",
					minlength: "your name must consist of at least 2 characters"
				},
				subject: {
					required: "come on, you have a subject, don't you?",
					minlength: "your subject must consist of at least 4 characters"
				},
				number: {
					required: "come on, you have a number, don't you?",
					minlength: "your Number must consist of at least 5 characters"
				},
				email: {
					required: "no email, no message"
				},
				message: {
					required: "um...yea, you have to write something to send this form.",
					minlength: "thats all? really?"
				}
			},
			submitHandler: function(form) {
				var data = $(form).serialize();
				var $inputs = $('#contactForm :input').not('[type=submit]');
				$inputs.attr('disabled', 'disabled');
				$.ajax({
					type: "POST",
					url: "https://submit-form.com/ylEPGHLad5cHqs5bf59a0",
					data: data, // serializes the form's elements.
					success: function(data)
					{
						$('#contactForm').fadeTo( "slow", 1, function() {
							$('.alert-success').removeClass("d-none");
							setTimeout(function(){
								$('.alert-success').fadeOut("slow");
								$inputs.not('[type=submit]').val('');
								$inputs.removeAttr('disabled', '');
							}, 2000);
						});
					},
					error: function() {

						$('#contactForm').fadeTo( "slow", 1, function() {
							$('.alert-danger').removeClass("d-none").show();
							setTimeout(function(){
								$('.alert-danger').fadeOut("slow");
								$inputs.removeAttr('disabled', '');
							}, 2000);
						})
					}
				});
			}
		})
	})

});