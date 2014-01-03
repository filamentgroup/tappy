/*! Tappy! - a lightweight normalized tap event. Copyright 2013 @scottjehl, Filament Group, Inc. Licensed MIT */
(function( w, $, undefined ){

	var tap = function( $els ){
		return $els.each(function(){

			var $el = $( this ),
				lastE,
				resetTimer,
				lastScroll,
				scrollTolerance = 15;

			function trigger( e ){
				e.stopImmediatePropagation();
				e.preventDefault();
				$( e.target ).trigger( "tap", [ e, $( e.target ).attr( "href" ) ] );
			}

			function start( e ){
				lastScroll = w.document.body.scrollTop;
			}

			function end( e ){

				if( e.ctrlKey || e.metaKey ){
					return;
				}

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
