
$(document).ready(function(){
  // "use strict";
  $("#post-area").css("display", "none")
  // console.log("Loaded");

    var output = `<h2 class="text-dark text-center mt-5" style="margin-bottom: 20px;">Top Job Results </h2>`

    $(document).ajaxStart(function(){
      $("#job-listing").html("");
      $("#results-text").css("display", "none");
      $("#spinner").css("display", "block");
    })

    $(document).ajaxComplete(function(){
      $("#spinner").css("display", "none");

      window.setTimeout(function(){
        $('html').animate({
          scrollTop: $("#post-area").offset().top
        }, "slow");
      }, 500)

    })

    // console.log("Fetching.....");

    // $.ajax({
    //   type: "get",
    //   url: "data",
    //   success: function (data, status) {
    //     console.log(data)
    //     for (var i in data){
    //       output += `
    //       <div class="single-post d-flex flex-row animated fadeInUp">
    //       <div class="thumb">
    //         <img src="{% static "jobapp/img/post.png" %}" alt="">
    //       </div>
    //       <div class="details">
    //         <div class="title d-flex flex-row justify-content-between">
    //           <div class="titles">
    //             <h4>${data[i].job_title}</h4>
    //             <h6><a href="${data[i].company_link}" target="_blank">${data[i].company_name}</a></h6>					
    //           </div>
    //           <ul class="btns">
    //             <li><a href="#"><span class="lnr lnr-heart"></span></a></li>
    //             <li><a href="#">Apply</a></li>
    //           </ul>
    //         </div>
    //         <p>
    //         ${data[i].description}
    //         </p>
    //         <h5>Job Nature : ${data[i].job_category}</h5>
    //         <p class="address">${data[i].add_date}</p>
    //         <p class="address"><span class="lnr lnr-database"></span> 15k - 25k</p>
    //       </div>
    //     </div>          

    //       `
    //     }
    //     $("#job-listing").html(output);
        
    //   }
    // });
  
  function search(){
    let searchOutput = ``;
    // console.log("Searching.....");
    var search_keyword = $("#search-input").val()
    var job_category = $("#job-category").val()
    $.ajax({
      type: "get",
      url: "search",
      data: {
        keyword: search_keyword,
        job_category: job_category,
      },
      success: function (data, status){
        $("#post-area").css("display", "block");
        var count = 0;
        // console.log(data);
        for (var i in data){
          searchOutput += `
          <div class="single-post d-flex flex-row animated fadeInUp">
          <div class="details">
            <div class="title d-flex flex-row justify-content-between">
              <div class="titles">
                <h3>${data[i].job_title}</h3>
                <h5 class="mt-3"> <b>${data[i].company}</b></h5>					
              </div>
            </div>
            <p>
            ${data[i].job_desc}
            </p>
            <h5>Job Nature:${data[i].job_type}</h5>
            <p class="address"><span class="lnr lnr-map"></span>${data[i].job_location}</p>
            <p class="address"><span class="lnr lnr-database"></span>${data[i].job_salary}</p>
            <p class="address btn btn-info pl-3 pr-3"><a target="_blank" href="${data[i].job_link}" style="color: #fff">Apply</a></p>
          </div>
        </div>`;
          count += 1;
        }
        $("#results-text").html(`${count} Results found for <span>"${search_keyword}"</span></p>
        `);
        $("#results-text").css("display", "block");
        $("#job-listing").html(output);
        if(count < 1){
          searchOutput = `<div class="alert alert-danger">No job postings have been found for that keyword or category</div>`
        }
        $("#job-listing").append(searchOutput);
        // console.log($("#job-listing").text())
      },
      error: function(data){
        $("#spinner").css("display", "none");
        $("#results-text").html(`Error Could not search for <span>"${search_keyword}"</span></p>
        `);
        $("#results-text").css("display", "block");
      }
    });
  }  
  

  $("#search-btn").on("click",function(e){
    e.preventDefault();
    search()
  })

  $("#search-form").on("submit",function(e){
    e.preventDefault();
    search()
  })
  











	var window_width 	 = $(window).width(),
	window_height 		 = window.innerHeight,
	header_height 		 = $(".default-header").height(),
	header_height_static = $(".site-header.static").outerHeight(),
	fitscreen 			 = window_height - header_height;


	$(".fullscreen").css("height", window_height)
	$(".fitscreen").css("height", fitscreen);

    if(document.getElementById("default-select")){
          $('select').niceSelect();
    };

    if(document.getElementById("default-selects")){
          $('select').niceSelect();
    };   

    if(document.getElementById("default-selects2")){
          $('select').niceSelect();
    };        

    $('.img-pop-up').magnificPopup({
        type: 'image',
        gallery:{
        enabled:true
        }
    });


    $('.play-btn').magnificPopup({
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });


  // Initiate superfish on nav menu
  $('.nav-menu').superfish({
    animation: {
      opacity: 'show'
    },
    speed: 400
  });

  // Mobile Navigation
  if ($('#nav-menu-container').length) {
    var $mobile_nav = $('#nav-menu-container').clone().prop({
      id: 'mobile-nav'
    });
    $mobile_nav.find('> ul').attr({
      'class': '',
      'id': ''
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="lnr lnr-menu"></i></button>');
    $('body').append('<div id="mobile-body-overly"></div>');
    $('#mobile-nav').find('.menu-has-children').prepend('<i class="lnr lnr-chevron-down"></i>');

    $(document).on('click', '.menu-has-children i', function(e) {
      $(this).next().toggleClass('menu-item-active');
      $(this).nextAll('ul').eq(0).slideToggle();
      $(this).toggleClass("lnr-chevron-up lnr-chevron-down");
    });

    $(document).on('click', '#mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('#mobile-nav-toggle i').toggleClass('lnr-cross lnr-menu');
      $('#mobile-body-overly').toggle();
    });

    $(document).click(function(e) {
      var container = $("#mobile-nav, #mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('lnr-cross lnr-menu');
          $('#mobile-body-overly').fadeOut();
        }
      }
    });
  } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
    $("#mobile-nav, #mobile-nav-toggle").hide();
  }

  // Smooth scroll for the menu and links with .scrollto classes
  $('.nav-menu a, #mobile-nav a, .scrollto').on('click', function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        var top_space = 0;

        if ($('#header').length) {
          top_space = $('#header').outerHeight();

          if( ! $('#header').hasClass('header-fixed') ) {
            top_space = top_space;
          }
        }

        $('html, body').animate({
          scrollTop: target.offset().top - top_space
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu').length) {
          $('.nav-menu .menu-active').removeClass('menu-active');
          $(this).closest('li').addClass('menu-active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('lnr-times lnr-bars');
          $('#mobile-body-overly').fadeOut();
        }
        return false;
      }
    }
  });


    $(document).ready(function() {

    $('html, body').hide();

        if (window.location.hash) {

        setTimeout(function() {

        $('html, body').scrollTop(0).show();

        $('html, body').animate({

        scrollTop: $(window.location.hash).offset().top

        }, 1000)

        }, 0);

        }

        else {

        $('html, body').show();

        }

    });
  

  // Header scroll class
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#header').addClass('header-scrolled');
    } else {
      $('#header').removeClass('header-scrolled');
    }
  })


    $('.active-relatedjob-carusel').owlCarousel({
        items:1,
        autoplay:true,
        loop:true,
        margin:30,
        dots: true
    });

    $('.active-review-carusel').owlCarousel({
        items:2,
        margin:30,
        autoplay:true,
        loop:true,
        dots: true,       
            responsive: {
            0: {
                items: 1
            },
            480: {
                items: 1,
            },
            768: {
                items: 2,
            }
        }
    });

    $('.active-popular-post-carusel').owlCarousel({
        items:2,
        margin:30,
        autoplay:true,
        loop:true,
        dots: true,       
            responsive: {
            0: {
                items: 1
            },
            480: {
                items: 1,
            },
            768: {
                items: 1,
            },
            961: {
                items: 2,
            }
        }
    });




    //  Start Google map 

            // When the window has finished loading create our google map below

            if(document.getElementById("map")){
            
            google.maps.event.addDomListener(window, 'load', init);
        
            function init() {
                // Basic options for a simple Google Map
                // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
                var mapOptions = {
                    // How zoomed in you want the map to start at (always required)
                    zoom: 11,

                    // The latitude and longitude to center the map (always required)
                    center: new google.maps.LatLng(40.6700, -73.9400), // New York

                    // How you would like to style the map. 
                    // This is where you would paste any style found on Snazzy Maps.
                    styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]
                };

                // Get the HTML DOM element that will contain your map 
                // We are using a div with id="map" seen below in the <body>
                var mapElement = document.getElementById('map');

                // Create the Google Map using our element and options defined above
                var map = new google.maps.Map(mapElement, mapOptions);

                // Let's also add a marker while we're at it
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(40.6700, -73.9400),
                    map: map,
                    title: 'Snazzy!'
                });
            }
    }


    $(document).ready(function() {
            $('#mc_embed_signup').find('form').ajaxChimp();
    });      




 });
