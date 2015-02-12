# [EmulateTab](http://joelpurra.github.com/emulatetab) javascript library

A jQuery plugin to emulate tabbing between elements on a page.

The <kbd>tab</kbd> key is very useful when it comes to navigating webpages. When working with functions that modify or reuse tabbing through elements on a page, the browser's native tabbing logic cannot be called from javascript. This plugin tries to emulate/simulate that browser logic.



## Get it

Download the script, and include it in your HTML page after the jQuery script tag.

Link | Note
--- | ---
[emulatetab.joelpurra.js](https://raw.github.com/joelpurra/emulatetab/gh-pages/dist/emulatetab.joelpurra.js) | For development
[emulatetab.joelpurra.min.js](https://raw.github.com/joelpurra/emulatetab/gh-pages/dist/emulatetab.joelpurra.min.js) | For production
[Github](http://joelpurra.github.com/emulatetab) | `$ git clone --recursive git://github.com/joelpurra/emulatetab.git` <br /> Make sure to get the submodules too.
[Bower](http://sindresorhus.com/bower-components/#!/search/jquery-emulatetab) | `$ bower install jquery-emulatetab`
[Component](http://component.io/joelpurra/emulatetab) | `$ component install joelpurra/emulatetab`
[NPM](https://npmjs.org/package/jquery-emulatetab) | `$ npm install jquery-emulatetab`
[jQuery Plugin Registry](http://plugins.jquery.com/emulatetab/) |
[Packagist](https://packagist.org/packages/joelpurra/emulatetab) |



## Demos
* [`example/demo.html`](http://joelpurra.github.com/emulatetab/example/demo.html): Simple demo for comparing EmulateTab to your browser.



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
Elements that can be focused/tabbed include `<input>`, `<select>`, `<textarea>`, `<button>` and `<a href="...">` (the `href` attribute must exist and the tag must have some contents).

Note that `<input type="hidden" />`, `<a>` (without `href` or empty contents), `disabled="disabled"` or `display: none;` elements cannot be focused/tabbed to.



## Original purpose
Developed to as a part of two other plugins; one to [use <kbd>tab</kbd> to skip over less used form fields](https://github.com/joelpurra/skipontab), the other to [use the <kbd>+</kbd> on the keypad as a new tab key](https://github.com/joelpurra/plusastab). Both plugins were used in a web application for registering and administering letters.



## Dependencies
EmulateTab's only runtime dependencies is [jQuery](http://jquery.com/).



## Browser compatibility
Should be about as compatible as jQuery is, since most functions depend on jQuery's normalization. You are engouraged to [run the EmulateTab test suite](http://joelpurra.github.com/emulatetab/test/) and then report any issues.



## Contribute
In order to contribute to the project, follow these steps.

- Make sure you have installed [git](http://git-scm.com/downloads), [npm](http://nodejs.org/download/), [bower](http://bower.io/#installing-bower), [grunt](http://gruntjs.com/getting-started), [jekyll](http://jekyllrb.com/docs/installation/).
- [Fork the project on github](https://github.com/joelpurra/emulatetab/fork).
- `$ git clone --recursive git@github.com:USERNAME/emulatetab.git` where `USERNAME` is your github username.
- `$ git checkout -b my-own-modification` where `my-own-modification` is a descriptive name for your fix or feature.
- `$ npm install && bower install`
- `$ grunt watch`
- Make your changes to the code. Remember to write new test cases for your changes.
- `$ git commit`
- `$ grunt` to make sure all tests pass.
- `$ git push`
- Send a pull request on [github.com](https://github.com).



## Todo

* [jQuery UI](http://jqueryui.com/) has better code for [`:focusable`](https://github.com/jquery/jquery-ui/blob/master/ui/jquery.ui.core.js#L210)/[`:tabbable`](https://github.com/jquery/jquery-ui/blob/master/ui/jquery.ui.core.js#L214). Investigate how to implement it.
* Investigate focusing/tabbing and [`[contenteditable]`](http://www.whatwg.org/specs/web-apps/current-work/#contenteditable).
* Investigate focusing/tabbing non-input elements with [`[tabindex]`](http://www.w3.org/TR/html4/interact/forms.html#h-17.11.1) and negative values value.
* Create a separate git repo for packaged/minified bower/composer/component/jquery plugin releases.


## License
Developed for PTS by Joel Purra <http://joelpurra.se/>

Copyright (c) 2011, 2012, 2013, 2014, 2015, The Swedish Post and Telecom Authority (PTS)
All rights reserved.

Released under the BSD license.
