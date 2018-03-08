$(document).on('ready', function(){
	"use strict";

	/*----Loader----*/
	$(window).on('load', function() {
		window.scrollTo(0, 0);
		$('body').removeClass('loaderbody');
        $('.wraploader').fadeOut();
    });

	/*----Open menu----*/
	$('.mobilemenu').on('click',function(){
		$(this).toggleClass('opennav');
		$('nav').toggleClass('open');
	});

	/*----Grid setting----*/
	$('.grid').imagesLoaded( function() {

        var $grid = $(".grid").isotope({
            itemSelector: '.grid-item',
            layoutMode: 'masonry',
			masonry: {
				 gutter: 30
			}
        });

        $('.filters-button-group').on( 'click', 'button', function() {
			var filterValue = $( this ).attr('data-filter');
			$( 'button' ).removeClass('is-checked');
			$( this ).addClass('is-checked');
			$grid.isotope({ filter: filterValue });
		});

    });

    $('.gridservice').imagesLoaded( function() {

        var $grid = $(".gridservice").isotope({
            itemSelector: '.grid-item',
            layoutMode: 'masonry',
			masonry: {
				gutter: 30
			}
        });
    });


    /*----Hover grid 1----*/
    $('.wraptext').on({
        mouseenter: function () {
            $(this).addClass('wraptexthover');
            $(this).find('.wrapsosmed').addClass('wrapsosmedhover');
        },
        mouseleave: function () {
            $(this).removeClass('wraptexthover');
            $(this).find('.wrapsosmed').removeClass('wrapsosmedhover');
        }
    });


    /*----Client slider---*/
    $('.owl-carousel').owlCarousel({
	    loop:true,
	    autoplay:true,
	    margin:10,
	    nav:false,
	    responsive:{
	        0:{
	            items:1
	        },
	        600:{
	            items:3
	        },
	        1000:{
	            items:5
	        }
	    }
	});

	/*----Testimoni slider---*/
    $('.owl-testimoni').owlCarousel({
	    loop:true,
	    autoplay:true,
	    margin:10,
	    nav:false,
	    responsive:{
	        0:{
	            items:1
	        },
	        600:{
	            items:1
	        },
	        1000:{
	            items:1
	        }
	    }
	});

	/*----Work detail slider---*/
    $('.owl-workdetail').owlCarousel({
	    loop:true,
	    autoplay:true,
	    margin:10,
	    nav:false,
	    responsive:{
	        0:{
	            items:1
	        },
	        600:{
	            items:1
	        },
	        1000:{
	            items:1
	        }
	    }
	});

	/*----Setup navigation fix top when scroll---*/
    $(window).on('scroll', function (e) { 
        var scroll = $(window).scrollTop();
        var winheight = '200';
        var topheader = $('.header');
        if (scroll > winheight) {
            topheader.addClass('fixtop');
        }else{
            topheader.removeClass('fixtop');
        }
    });

    /*----Function to validate email---*/
    function isValidEmailAddress(emailAddress) {
		    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
		    return pattern.test(emailAddress);
	};

	/*----Form contact ajax---*/
    $("#formcontact").on('submit', function(){
    	var name = $('#name').val();
    	var email = $('#email').val();
    	var subject = $('#subject').val();
    	var message = $('#message').val();
    	var check = false;

    	//check name field
		if (name === ""){
			$('p.notif').css('display','block').text("Field name cannot be empty!").fadeIn();
			check = false;
			return false;
		}else{
			check = true;
		}

		//check email field
		if (email === ""){
			$('p.notif').text("Field email cannot be empty!").fadeIn();
			check = false;
			return false;
		}else{
			if( !isValidEmailAddress( email ) ) {
				$('p.notif').css('display','block').text("Email must be correct format!").fadeIn();
				check = false;
				return false;
			}else{
				check = true;
			}
		}

		//check name field
		if (subject === ""){
			$('p.notif').css('display','block').text("Field subject cannot be empty!").fadeIn();
			check = false;
			return false;
		}else{
			check = true;
		}

		//check message field
		if (message === ""){
			$('p.notif').css('display','block').text("Field message cannot be empty!").fadeIn();
			check = false;
			return false;
		}else{
			check = true;
		}

		if (check === true){
			$.ajax({
				type: "POST",
				url: "sendmail.php",
				data: $(this).serialize(),
				success: function(data){
					if (data === "error"){
						alert("Error! Something wrong with the script!!");
					}else{
						parent.location = "thank-you.html";
					}
				}
			});
		}

    	return false;
    });

});