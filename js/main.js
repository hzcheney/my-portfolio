$(document).ready(function () {
  "usr strict";

  //------- Superfish nav menu  js --------//

  $(".nav-menu").superfish({
    animation: {
      opacity: "show",
    },
    speed: 400,
  });

  // $(document).ready(function() {
  //   if ($(".menu-has-children ul>li a").hasClass("menu-active")) {
  //     $(".menu-active")
  //       .closest("ul")
  //       .parentsUntil("a")
  //       .addClass("parent-active");
  //   }
  // });

  //------- Header Scroll Class  js --------//

  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $("#header").addClass("header-scrolled");
    } else {
      $("#header").removeClass("header-scrolled");
    }
  });

  //------- Counter  js --------//
  if (document.getElementById("facts-area")) {
    $(".counter").counterUp({
      delay: 10,
      time: 1000,
    });
  }

  //------- Lightbox  js --------//

  $(".img-pop-up").magnificPopup({
    type: "image",
    gallery: {
      enabled: true,
    },
  });

  $(".play-btn").magnificPopup({
    type: "iframe",
    mainClass: "mfp-fade",
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false,
  });

  //------- Filter  js --------//

  $(".filters ul li").click(function () {
    $(".filters ul li").removeClass("active");
    $(this).addClass("active");

    var data = $(this).attr("data-filter");
    $grid.isotope({
      filter: data,
    });
  });

  if (document.getElementById("portfolio")) {
    var $grid = $(".grid").isotope({
      itemSelector: ".all",
      percentPosition: true,
      masonry: {
        columnWidth: ".all",
      },
    });
  }
  //------- Daily quotes --------//

  $.ajax({
    type: "get",
    url: "https://v1.hitokoto.cn/?c=d",
    dataType: "jsonp",
    success: function (json) {
      console.log(json);
      $(".banner-left > p").text(json.hitokoto);
    },
    error: function (e) {
      $("banner-left > p").text(" 真心和坚持✊最终会把我们引到该去的地方！");
      console.log(e);
    },
  });
  $.ajax({
    type: "get",
    url: "https://v1.hitokoto.cn/?c=d",
    dataType: "jsonp",
    success: function (json) {
      $("#skill-zen").text(json.hitokoto);
    },
    error: function (e) {
      console.log(e);
    },
  });
  $.ajax({
    type: "get",
    url: "https://v1.hitokoto.cn/?c=d",
    dataType: "jsonp",
    success: function (json) {
      $("#project-quote").text(json.hitokoto);
    },
    error: function (e) {
      console.log(e);
    },
  });

  //------- Skill  js --------//
  $(".skill").simpleSkillbar();

  //------- Timeline js --------//

  $(".content").each(function (i) {
    var bottom_of_object = $(this).offset().top + $(this).outerHeight();
    var bottom_of_window = $(window).height();

    if (bottom_of_object > bottom_of_window) {
      $(this).addClass("hidden");
    }
  });

  $(window).scroll(function () {
    /* Check the location of each element hidden */
    $(".hidden").each(function (i) {
      var bottom_of_object = $(this).offset().top + $(this).outerHeight();
      var bottom_of_window = $(window).scrollTop() + $(window).height();

      /* If the object is completely visible in the window, fadeIn it */
      if (bottom_of_window > bottom_of_object) {
        $(this).animate({ opacity: "1" }, 700);
      }
    });
  });
});
