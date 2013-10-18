Tappy! - a lightweight normalized tap event. 
=====

Copyright 2013 @scottjehl, Filament Group, Inc. Licensed MIT

How-to
===

Tappy requires jQuery or a framework of similar API conventions. To use, include `tappy.js` and bind to a tap event. It'll normalize click/touchend/keyboard events to only fire once, as soon as possible (eliminating the 300ms delay on many touch devices).
``` js
$( "a.foo" ).bind( "tap", function(){ 
  alert( "tap!" ); 
}); 
```

By using this event, you'll be automatically preventing the default click on the element, so it's designed for cases where you want to handle the behavior in a custom way. This limitation may change as we adapt it to work better with delegation.
