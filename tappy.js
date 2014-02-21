/*! Tappy! - a lightweight normalized tap event. Copyright 2013 @scottjehl, Filament Group, Inc. Licensed MIT */
(function( w, $, undefined ){

	// handling flag is true when an event sequence is in progress (thx androood)
	w.tapHandling = false;

	var tap = function( $els ){
		return $els.each(function(){

			var $el = $( this ),
				resetTimer,
				lastScroll,
				scrollTolerance = 15;

			function trigger( e ){
				$( e.target ).trigger( "tap", [ e, $( e.target ).attr( "href" ) ] );
				e.stopImmediatePropagation();
			}

			function getScroll(){
				return w.document.body.scrollTop !== undefined ? w.document.body.scrollTop : w.document.documentElement.scrollTop;
			}

			function start( e ){
				if( e.touches && e.touches.length > 1 || e.targetTouches && e.targetTouches.length > 1 ){
					return false;
				}
				lastScroll = getScroll();
			}

			function end( e ){
				clearTimeout( resetTimer );
				resetTimer = setTimeout( function(){
					w.tapHandling = false;
					lastScroll = null;
				}, 1000 );

				if( e.ctrlKey || e.metaKey ){
					return;
				}

				e.preventDefault();

				// this part prevents a double callback from touch and mouse on the same tap
			
				// if a scroll happened between touchstart and touchend
				if( w.tapHandling && w.tapHandling !== e.type || ( e.type === "touchend" || e.type === "MSPointerUp" ) && Math.abs( getScroll() - lastScroll ) > scrollTolerance ){
					return false;
				}

				w.tapHandling = e.type;
				trigger( e );
			}

			$el
				.bind( "touchstart MSPointerDown", start )
				.bind( "touchend MSPointerUp", end )
				.bind( "click", end );
		});
	};

	// monkeybind
	var oldBind = $.fn.bind;
	$.fn.bind = function( evt ){
		if( /(^| )tap( |$)/.test( evt ) ){
			tap( this );
		}
		return oldBind.apply( this, arguments );
	};

}( this, jQuery ));
