/*!
* @license EmulateTab
* Copyright (c) 2011, 2012 The Swedish Post and Telecom Authority (PTS)
* Developed for PTS by Joel Purra <http://joelpurra.se/>
* Released under the BSD license.
*
* A jQuery plugin to emulate tabbing between elements on a page.
*/

/*jslint vars: true, white: true, browser: true*/
/*global jQuery*/

// Set up namespace, if needed
var JoelPurra = JoelPurra || {};

(function ($, namespace) {

	namespace.EmulateTab = function () {
	};

	// TODO: get code for :focusable, :tabbable from jQuery UI?
	var focusable = ":input, a[href]";

	// Private methods
	{
		function findNextFocusable($from, offset) {

			var $focusable = $(focusable)
						.not(":disabled")
						.not(":hidden");

			var currentIndex = $focusable.index($from);

			var nextIndex = (currentIndex + offset) % $focusable.length;

			if (nextIndex <= -1) {

				nextIndex = $focusable.length + nextIndex;
			}

			var $next = $focusable.eq(nextIndex);

			return $next;
		}

		function getFocusedElement()
		{
			return $(document.activeElement);
		}

		function emulateTabbing($from, offset) {

			var $next = findNextFocusable($from, offset);

			$next.focus();
		}
	}

	// Public functions
	{
		namespace.EmulateTab.forwardTab = function ($from) {

			return namespace.EmulateTab.tab($from, +1);
		};

		namespace.EmulateTab.reverseTab = function ($from) {

			return namespace.EmulateTab.tab($from, -1);
		};

		namespace.EmulateTab.tab = function ($from, offset) {

			// Tab from focused element with offset, .tab(-1)
			if($.isNumeric($from)) {

				offset = $from;
				$from = undefined;
			}

			$from = $from || getFocusedElement();

			offset = offset || +1;

			emulateTabbing($from, offset);
		};

		$.extend({
			emulateTab: function (offset) {

				return namespace.EmulateTab.tab(offset);
			}
		});

		$.fn.extend({
			emulateTab: function (offset) {

				return namespace.EmulateTab.tab(this, offset);
			}
		});
	}

} (jQuery, JoelPurra));