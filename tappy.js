/*! Tappy! - a lightweight normalized tap event. Copyright 2013 @scottjehl, Filament Group, Inc. Licensed MIT */
(function( w, $, undefined ){

	var tap = function( $els ){
		return $els.each(function(){

			var $el = $( this ),
				lastE,
				resetTimer,
				lastScroll,
				scrollTolerance = 15,
				href;

			function trigger( e ){
				e.preventDefault();
				$( e.target ).trigger( "tap", [ e ] );
			}

			function start(){
				lastScroll = w.document.body.scrollTop;
				if( $el.is( "a" ) ){
					// set href to null hash during tap. this prevents the address bar from dropping down in iOS
					href = $el[ 0 ].href;
					$el[ 0 ].href = "#";
				}
			}

			function end( e ){

				e.preventDefault();

				// this part prevents a double callback from touch and mouse on the same tap
				if( lastE && lastE !== e.type ){
					return false;
				}

				lastE = e.type;
				clearTimeout( resetTimer );
				resetTimer = setTimeout( function(){
					lastE = null;
				}, 1000 );

				// if a scroll happened between touchstart and touchend
				if( e.type === "touchend" && Math.abs( w.document.body.scrollTop - lastScroll ) > scrollTolerance ){
					return false;
				}

				// set href back
				if( href ){
					$el[ 0 ].href = href;
				}
				href = null;

				trigger( e );
			}

			$el
				.bind( "touchstart", start )
				.bind( "touchend", end )
				.bind( "click", end );
		});
	};

	// monkeybind
	var oldBind = $.fn.bind;
	$.fn.bind = function( evt, callback ){
		if( /(^| )tap( |$)/.test( evt ) ){
			tap( this );
		}
		return oldBind.apply( this, [evt, callback] );
	};

}( this, jQuery ));