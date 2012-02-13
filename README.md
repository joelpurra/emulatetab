# EmulateTab javascript library
A jQuery plugin to emulate tabbing between elements on a page.

The <kbd>tab</kbd> key is very useful when it comes to navigating webpages. When working with functions that modify or reuse tabbing through elements on a page, the browser's native tabbing logic cannot be called from javascript. This plugin tries to emulate/simulate that browser logic.

## Usage

```javascript
// Emulate forward tab from the currently focused element 
$.emulateTab();

// Emulate reverse tab from the currently focused element 
$.emulateTab(-1);

// Emulate forward tab from a specific element
$(selector).emulateTab();

// Emulate reverse tab from a specific element
$(selector).emulateTab(-1);
```

### Tabbable elements
Elements that can be focused/tabbed include `<input>`, `<select>`, `<textarea>`, `<button>` and `<a href="...">` (the `href` attribute must exist).

Note that `<input type="hidden" />`, `<a>` (without `href`), `disabled="disabled"` or `display: none;` elements cannot be focused/tabbed to.

## Original purpose
Developed to as a part of two other plugins; one to [use <kbd>tab</kbd> to skip over less used form fields](https://github.com/joelpurra/skipontab), the other to [use the <kbd>+</kbd> on the keypad as a new tab key](https://github.com/joelpurra/plusastab). Both plugins were used in a web application for registering and administering letters.

## Dependencies
EmulateTab's only runtime dependencies is [jQuery](http://jquery.com/).

## Todo

* [jQuery UI](http://jqueryui.com/) has better code for [`:focusable`](https://github.com/jquery/jquery-ui/blob/master/ui/jquery.ui.core.js#L210)/[`:tabbable`](https://github.com/jquery/jquery-ui/blob/master/ui/jquery.ui.core.js#L214). Investigate how to implement it.
* Investigate focusing/tabbing and [`[contenteditable]`](http://www.whatwg.org/specs/web-apps/current-work/#contenteditable).
* Investigate focusing/tabbing non-input elements with [`[tabindex]`](http://www.w3.org/TR/html4/interact/forms.html#h-17.11.1) and negative values value.

## License
Developed for PTS by Joel Purra <http://joelpurra.se/>

Copyright (c) 2011, 2012, The Swedish Post and Telecom Authority (PTS)
All rights reserved.

Released under the BSD license.
