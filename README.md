Tappy! 
=====

Tappy is a simple normalized tap event for touch, mouse, and keyboard.

Copyright 2013 @scottjehl, Filament Group, Inc. Licensed MIT

Why
===

Tappy allows you to bind to a `tap` event like you would any other user interaction, like `click`. The advantage of usting Tappy's  `tap` event over `click` is that it will allow you to execute code immediately on touch devices, eliminating the 300ms delay that click events have on platforms like iOS. Once bound to an element, Tappy's `tap` event will fire upon touch or other traditional interactions like mouse click, pressing the enter key, and more. 


How-to
===

Tappy requires jQuery, or a similar framework of matching API conventions. 

To use, include `tappy.js` in your page, select an element and bind to a `tap` event. 

``` js
$( "a.my-link" ).bind( "tap", function( e ){ 
  alert( "tap!" );
}); 
```
In binding to the `tap` event, you'll be automatically preventing the browser's default click handling on the element, so be sure to handle that tap responsibly.

To use tappy to create fast-click navigation, you can do something like this:

``` js
$( "a.my-link" ).bind( "tap", function( e ){ 
  // go to the e.target.href URL
}); 
```


FAQ
===

- Q: Can I use tappy with the `on` method rather than `bind`?
A: Nope.
- Q: Can I unbind a `tap` event?
A: Nope.
- Q: Shouldn't this plugin use jQuery's special events API?
A: Nope.
- Q: Can I use Tappy with event delegation by binding to the document instead of directly to elements?
A: Nope.
- Q: Why?
A: Nope.

