var posledniHodinaNoci = 7;



var RocknCoder = RocknCoder || {};

(function () {
  "use strict";

  RocknCoder.Pages = RocknCoder.Pages || {};
  // put the page events into one string
  var Events = "pagebeforeshow pageshow pagechange pagebeforehide pagehide",
    DocEvents = "pagebeforechange orientationchange",
    Kernel = function (event, data) {
      var that = this,
        eventType = event.type,
        pageName = $(this).attr("data-rnc-jspage");
      if (RocknCoder && RocknCoder.Pages && pageName && RocknCoder.Pages[pageName] && RocknCoder.Pages[pageName][eventType]) {
        RocknCoder.Pages[pageName][eventType].call(that, event, data);
      }
    },
    hookDocEvents = function (event, data) {
      // find the active page
      var activePage = $.mobile.activePage || $("div[data-rnc-jspage]").eq(0);
      Kernel.call(activePage, event, data);
    };

  // anonymous function which binds to the page's events
  (function () {
    $(document).on(DocEvents, function (event, data) {
      hookDocEvents(event, data);
    });

    $("div[data-rnc-jspage]").on(Events, Kernel);
  }());

  // anonymous function which binds to the document's pageload event
  (function () {
    $(document).bind(
      'pageload',
      function () {
        $(document)
          // to make sure we aren't double hooking events clear them all
          .off(DocEvents)
          .on(DocEvents, function (event, data) {
            hookDocEvents(event, data);
          });

        $("div[data-rnc-jspage]")
          // to make sure we aren't double hooking events clear them all
          .off(Events)
          // then hook them all  (the newly loaded page is in DOM at this point)
          .on(Events, Kernel);
      }
    );
  }());

  // size the content area
  RocknCoder.Dimensions = (function () {
    var get = function () {
      var isFirstPass = false,
        isIPhone = (/iphone/gi).test(navigator.appVersion),
        width = $(window).width(),
        height = $(window).height() + (isIPhone ? 60 : 0),
        hHeight = $('header').outerHeight(),
        fHeight = $('footer').outerHeight();
      return {
        width: width,
        height: height - hHeight - fHeight
      };
    };
    return {
      get: get
    };
  }());
}());



var RocknCoder = RocknCoder || {};

(function () {
	"use strict";

	RocknCoder.Pages = RocknCoder.Pages || {};

	RocknCoder.Pages.page1 = (function () {
		return {
      pagebeforechange: function(event, data){
        console.log("Hello from page before change #1");
      },
			pageshow: function () {
        console.log("page show #1")
      },
			pagehide: function () {
        console.log("page hide #1")
      }
		};
	}());

	RocknCoder.Pages.page2 = (function () {
		return {
      pagebeforechange: function(){
        console.log("Hello from page before change #2");
      },
			pageshow: function () {
        console.log("page show #2")
      },
			pagehide: function () {
        console.log("page hide #2")
      }
		};
	}());
}());


function parseDatum(strdatum, strcas){
	var parts = strdatum.split('.');
	var date = new Date(parseInt(parts[2], 10),     // year
					parseInt(parts[1], 10) - 1, // month, starts with 0
					parseInt(parts[0], 10));    // day
	date.setHours   (parseInt(strcas.substr(0, 2), 10));
	date.setMinutes (parseInt(strcas.substr(3, 2), 10));
	return date;
}

function pad(n) { return ("0" + n).slice(-2); }

function   getUrlVar() {
  var   href = window.location.href;
  var   queryUrl = href.slice(href.lastIndexOf( '?' ) + 1);
  return  queryUrl.split( '=' );
}