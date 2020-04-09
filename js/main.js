$(document).ready(function () {
  "usr strict";

  // ------- Daily quotes --------//

  $.ajax({
    type: "get",
    async: false,
    url: "https://v1.hitokoto.cn/?c=d",
    dataType: "jsonp",
    success: function (json) {
      // console.log(json);
      $(".banner-left > p").text(json.hitokoto);
    },
    error: function (e) {
      $("banner-left > p").text(" 真心和坚持✊最终会把我们引到该去的地方！");
      console.log(e);
    },
  });
  $.ajax({
    type: "get",
    async: false,
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
    async: false,
    url: "https://v1.hitokoto.cn/?c=d",
    dataType: "jsonp",
    success: function (json) {
      $("#project-quote").text(json.hitokoto);
    },
    error: function (e) {
      console.log(e);
    },
  });
  // ------- Superfish nav menu  js --------//

  $(".nav-menu").superfish({
    animation: {
      opacity: "show",
    },
    speed: 400,
  });

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

  //------- Lazy load js --------//

  $("img[data-src]").each(function (index, element) {
    var that = $(this);
    var imageData = that.attr("data-src");
    that.attr("src", imageData);
    console.log(imageData);
    $(this).ready(function () {
      that.removeAttr("data-src");
      console.log("success");
    });
  });

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
  //------- Skill  js --------//

  $(".skill").simpleSkillbar();

  //------- Mobile Nav  js --------//
  if ($("#nav-menu-container").length) {
    var $mobile_nav = $("#nav-menu-container").clone().prop({
      id: "mobile-nav",
    });
    // console.log($mobile_nav);

    $mobile_nav.find("> ul").attr({
      class: "",
      id: "",
    });
    $("body").append($mobile_nav);
    $("body").prepend(
      '<button type="button" id="mobile-nav-toggle"><i class="lnr lnr-menu"></i></button>'
    );
    $("body").append('<div id="mobile-body-overly"></div>');
    $("#mobile-nav")
      .find(".menu-has-children")
      .prepend('<i class="lnr lnr-chevron-down"></i>');

    $(document).on("click", ".menu-has-children i", function (e) {
      $(this).next().toggleClass("menu-item-active");
      $(this).nextAll("ul").eq(0).slideToggle();
      $(this).toggleClass("lnr-chevron-up lnr-chevron-down");
    });

    $(document).on("click", "#mobile-nav-toggle", function (e) {
      $("body").toggleClass("mobile-nav-active");
      $("#mobile-nav-toggle i").toggleClass("lnr-cross lnr-menu");
      $("#mobile-body-overly").toggle();
    });

    $(document).on("click", function (e) {
      var container = $("#mobile-nav, #mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($("body").hasClass("mobile-nav-active")) {
          $("body").removeClass("mobile-nav-active");
          $("#mobile-nav-toggle i").toggleClass("lnr-cross lnr-menu");
          $("#mobile-body-overly").fadeOut();
        }
      }
    });
  } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
    $("#mobile-nav, #mobile-nav-toggle").hide();
  }

  //------- Smooth Scroll  js --------//

  $(".nav-menu a, #mobile-nav a, .scrollto").on("click", function () {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      if (target.length) {
        var top_space = 0;

        if ($("#header").length) {
          top_space = $("#header").outerHeight();

          if (!$("#header").hasClass("header-fixed")) {
            top_space = top_space;
          }
        }

        $("html, body").animate(
          {
            scrollTop: target.offset().top - top_space,
          },
          1500,
          "easeInOutExpo"
        );

        if ($(this).parents(".nav-menu").length) {
          $(".nav-menu .menu-active").removeClass("menu-active");
          $(this).closest("li").addClass("menu-active");
        }

        if ($("body").hasClass("mobile-nav-active")) {
          $("body").removeClass("mobile-nav-active");
          $("#mobile-nav-toggle i").toggleClass("lnr-times lnr-bars");
          $("#mobile-body-overly").fadeOut();
        }
        return false;
      }
    }
  });

  $(document).ready(function () {
    $("html, body").hide();

    if (window.location.hash) {
      setTimeout(function () {
        $("html, body").scrollTop(0).show();

        $("html, body").animate(
          {
            scrollTop: $(window.location.hash).offset().top - 108,
          },
          1000
        );
      }, 0);
    } else {
      $("html, body").show();
    }
  });

  jQuery(document).ready(function ($) {
    // Get current path and find target link
    var path = window.location.pathname.split("/").pop();

    // Account for home page with empty path
    if (path == "") {
      path = "index.html";
    }

    var target = $('nav a[href="' + path + '"]');
    // Add active class to target link
    target.addClass("menu-active");
  });

  $(document).ready(function () {
    if ($(".menu-has-children ul>li a").hasClass("menu-active")) {
      $(".menu-active")
        .closest("ul")
        .parentsUntil("a")
        .addClass("parent-active");
    }
  });

  //------- Click Scroll  js --------//

  $(".banner-left > a").click(function () {
    $("html,body").animate({ scrollTop: $(".banner-area").height() }, 500);
    // debugger;
  });

  $(".home-about-right > a").click(function () {
    $("html,body").animate(
      {
        scrollTop:
          $(".home-about-area").height() + 120 + $(".banner-area").height(),
      },
      500
    );
    // debugger;
  });
});
