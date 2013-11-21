/*global document:true, JoelPurra:true, jQuery:true, console:true, module:true, test:true, strictEqual:true, notStrictEqual:true */

(function(document, JoelPurra, $, console, module, test, strictEqual, notStrictEqual, undefined) {
    "use strict";

    var $container;

    // Logging helpers

    function warn() {
        try {
            console.warn.apply(console, arguments);
        } catch (e) {}
    }

    // Test helpers

    function normalSetup() {
        var $qunitFixture = $("#qunit-fixture");
        var $div = $("<div />");

        $div.appendTo($qunitFixture);

        $container = $div;
    }

    // Assertion functions

    function assertId($element, id) {
        // DEBUG
        if ($element.attr("id") !== id) {
            try {
                console.error([$element, $element.attr("id"), id]);

            } catch (e) {
                // Could show an alert message, but what the hell
            }
        }

        strictEqual($element.attr("id"), id, "The id did not match for element " + $element);
    }

    function getFocusedElement() {
        try {
            return $(document.activeElement);
        } catch (e) {
            warn("Could not use document.activeElement", document.activeElement, e);
        }

        // Fallback: use the EmulateTab itself
        warn("Falling back to JoelPurra.EmulateTab.getFocused()");

        // As usual, it is not a good idea to (how shall I put this)
        // test the code under test with, eh, the code under test.
        // Makes things easier though, as at least one test would
        // fail without this check.
        return JoelPurra.EmulateTab.getFocused();
    }

    function assertFocusedId(id) {
        assertId(getFocusedElement(), id);
    }

    function assertStartFncEnd(fnc) {
        $("#start").focus();
        assertFocusedId("start");
        fnc();
        assertFocusedId("end");
    }

    function assertStartEnd(fnc) {
        $container
            .append("<input id='start' type='text' value='text field that is the starting point' />")
            .append("<input id='end' type='submit' value='submit button that end of the tabbing' />");

        assertStartFncEnd(fnc);
    }

    function assertEndStart(fnc) {
        $container
            .append("<input id='end' type='submit' value='submit button that end of the tabbing' />")
            .append("<input id='start' type='text' value='text field that is the starting point' />");

        assertStartFncEnd(fnc);
    }

    function assertStartAEnd(fnc) {
        $container
            .append("<input id='start' type='text' value='text field that is the starting point' />")
            .append("<input id='a' type='text' value='Will be tabbed over' />")
            .append("<input id='end' type='submit' value='submit button that end of the tabbing' />");

        assertStartFncEnd(fnc);
    }

    function assertEndAStart(fnc) {
        $container
            .append("<input id='end' type='submit' value='submit button that end of the tabbing' />")
            .append("<input id='a' type='text' value='Will be tabbed over' />")
            .append("<input id='start' type='text' value='text field that is the starting point' />");

        assertStartFncEnd(fnc);
    }

    function assertTypeTab(typeElement) {
        $container
            .append("<input id='start' type='text' value='text field that is the starting point' />")
            .append(typeElement)
            .append("<input id='end' type='submit' value='submit button that end of the tabbing' />");

        assertStartFncEnd(function() {
            JoelPurra.EmulateTab.tab();
            assertFocusedId("a");
            JoelPurra.EmulateTab.tab();
        });
    }

    function assertTypeSkip(typeElement) {
        $container
            .append("<input id='start' type='text' value='text field that is the starting point' />")
            .append(typeElement)
            .append("<input id='end' type='submit' value='submit button that end of the tabbing' />");

        assertStartFncEnd(function() {
            JoelPurra.EmulateTab.tab();
        });
    }

    (function() {
        (function() {
            module("Library load");

            test("Object exists", 2, function() {
                notStrictEqual(typeof(JoelPurra.EmulateTab), "undefined", "JoelPurra.EmulateTab is undefined.");
                strictEqual(typeof(JoelPurra.EmulateTab), "object", "JoelPurra.EmulateTab is not an object.");
            });

        }());

        (function() {
            module("forwardTab", {
                setup: normalSetup
            });

            test("Once", 2, function() {
                assertStartEnd(function() {
                    JoelPurra.EmulateTab.forwardTab();
                });
            });

            test("Twice", 3, function() {
                assertStartAEnd(function() {
                    JoelPurra.EmulateTab.forwardTab();
                    assertFocusedId("a");
                    JoelPurra.EmulateTab.forwardTab();
                });
            });

            test("$from", 2, function() {
                assertStartAEnd(function() {
                    JoelPurra.EmulateTab.forwardTab($("#a"));
                });
            });

        }());

        (function() {
            module("reverseTab", {
                setup: normalSetup
            });

            test("Once", 2, function() {
                assertEndStart(function() {
                    JoelPurra.EmulateTab.reverseTab();
                });
            });

            test("Twice", 3, function() {
                assertEndAStart(function() {
                    JoelPurra.EmulateTab.reverseTab();
                    assertFocusedId("a");
                    JoelPurra.EmulateTab.reverseTab();
                });
            });

            test("$from", 2, function() {
                assertEndAStart(function() {
                    JoelPurra.EmulateTab.reverseTab($("#a"));
                });
            });

        }());

        (function() {
            module("tab forward", {
                setup: normalSetup
            });

            test("Once", 2, function() {
                assertStartEnd(function() {
                    JoelPurra.EmulateTab.tab($("#start"));
                });
            });

            test("Twice", 3, function() {
                assertStartAEnd(function() {
                    JoelPurra.EmulateTab.tab($("#start"));
                    assertFocusedId("a");
                    JoelPurra.EmulateTab.tab($("#a"));
                });
            });

            test("$from", 2, function() {
                assertStartAEnd(function() {
                    JoelPurra.EmulateTab.tab($("#a"));
                });
            });

            test("$from one step", 2, function() {
                assertStartAEnd(function() {
                    JoelPurra.EmulateTab.tab($("#a"), +1);
                });
            });

            test("$from two steps", 2, function() {
                assertStartAEnd(function() {
                    JoelPurra.EmulateTab.tab($("#start"), +2);
                });
            });

            test("Without arguments", 3, function() {
                assertStartAEnd(function() {
                    JoelPurra.EmulateTab.tab();
                    assertFocusedId("a");
                    JoelPurra.EmulateTab.tab();
                });
            });

        }());

        (function() {
            module("tab reverse", {
                setup: normalSetup
            });

            test("Once", 2, function() {
                assertEndStart(function() {
                    JoelPurra.EmulateTab.tab($("#start"), -1);
                });
            });

            test("Twice", 3, function() {
                assertEndAStart(function() {
                    JoelPurra.EmulateTab.tab($("#start"), -1);
                    assertFocusedId("a");
                    JoelPurra.EmulateTab.tab($("#a"), -1);
                });
            });

            test("$from", 2, function() {
                assertEndAStart(function() {
                    JoelPurra.EmulateTab.tab($("#a"), -1);
                });
            });

            test("$from two steps", 2, function() {
                assertEndAStart(function() {
                    JoelPurra.EmulateTab.tab($("#start"), -2);
                });
            });

        }());

        (function() {
            module("$.fn.emulateTab forward", {
                setup: normalSetup
            });

            test("Once", 2, function() {
                assertStartEnd(function() {
                    $("#start").emulateTab();
                });
            });

            test("Twice", 3, function() {
                assertStartAEnd(function() {
                    $("#start").emulateTab();
                    assertFocusedId("a");
                    $("#a").emulateTab();
                });
            });

            test("$from", 2, function() {
                assertStartAEnd(function() {
                    $("#a").emulateTab();
                });
            });

            test("$from one step", 2, function() {
                assertStartAEnd(function() {
                    $("#a").emulateTab(+1);
                });
            });

            test("$from two steps", 2, function() {
                assertStartAEnd(function() {
                    $("#start").emulateTab(+2);
                });
            });

        }());

        (function() {
            module("$.fn.emulateTab reverse", {
                setup: normalSetup
            });

            test("Once", 2, function() {
                assertEndStart(function() {
                    $("#start").emulateTab(-1);
                });
            });

            test("Twice", 3, function() {
                assertEndAStart(function() {
                    $("#start").emulateTab(-1);
                    assertFocusedId("a");
                    $("#a").emulateTab(-1);
                });
            });

            test("$from", 2, function() {
                assertEndAStart(function() {
                    $("#a").emulateTab(-1);
                });
            });

            test("$from two steps", 2, function() {
                assertEndAStart(function() {
                    $("#start").emulateTab(-2);
                });
            });

        }());

        (function() {
            module("$.emulateTab forward", {
                setup: normalSetup
            });

            test("Once", 2, function() {
                assertStartEnd(function() {
                    $.emulateTab($("#start"));
                });
            });

            test("Twice", 3, function() {
                assertStartAEnd(function() {
                    $.emulateTab($("#start"));
                    assertFocusedId("a");
                    $.emulateTab($("#a"));
                });
            });

            test("$from", 2, function() {
                assertStartAEnd(function() {
                    $.emulateTab($("#a"));
                });
            });

            test("$from one step", 2, function() {
                assertStartAEnd(function() {
                    $.emulateTab($("#a"), +1);
                });
            });

            test("$from two steps", 2, function() {
                assertStartAEnd(function() {
                    $.emulateTab($("#start"), +2);
                });
            });

        }());

        (function() {
            module("$.emulateTab reverse", {
                setup: normalSetup
            });

            test("Once", 2, function() {
                assertEndStart(function() {
                    $.emulateTab($("#start"), -1);
                });
            });

            test("Twice", 3, function() {
                assertEndAStart(function() {
                    $.emulateTab($("#start"), -1);
                    assertFocusedId("a");
                    $.emulateTab($("#a"), -1);
                });
            });

            test("$from", 2, function() {
                assertEndAStart(function() {
                    $.emulateTab($("#a"), -1);
                });
            });

            test("$from two steps", 2, function() {
                assertEndAStart(function() {
                    $.emulateTab($("#start"), -2);
                });
            });

        }());

        (function() {
            module("Element types", {
                setup: normalSetup
            });

            test("<input type='hidden' />", 2, function() {
                assertTypeSkip("<input id='a' type='hidden' value='Will not receive focus' />");
            });

            test("<input type='text' />", 3, function() {
                assertTypeTab("<input id='a' type='text' value='Will receive focus' />");
            });

            test("<input type='password' />", 3, function() {
                assertTypeTab("<input id='a' type='password' value='Will receive focus' />");
            });

            test("<input type='checkbox' />", 3, function() {
                assertTypeTab("<input id='a' type='checkbox' value='Will receive focus' />");
            });

            test("<input type='radio' /> one", 3, function() {
                assertTypeTab("<input id='a' type='radio' value='Will receive focus' />");
            });

            test("<input type='radio' /> two", 3, function() {
                assertTypeTab("<input id='a' type='radio' name='somename' value='Will receive focus as a group together with the other radio button' />" + "<input id='b' type='radio' name='somename' value='Will receive focus as a group together with the other radio button' />");
            });

            test("<input type='radio' /> multiple groups", 14, function() {

                $container
                    .append("<input id='start' type='text' value='text field that is the starting point' />")
                    .append("<input id='a' type='text' value='text field that is tabbed through' />")
                    .append("<input id='b' type='radio' name='somename1' value='Will receive focus as a group together with the other radio button' />")
                    .append("<input id='c' type='radio' name='somename1' value='Will receive focus as a group together with the other radio button' />")
                    .append("<input id='d' type='radio' name='somename1' value='Will receive focus as a group together with the other radio button' />")
                    .append("<input id='e' type='text' value='text field that is tabbed through' />")
                    .append("<input id='f' type='radio' name='somename1' value='Will receive focus as a group together with the other radio button' />")
                    .append("<input id='g' type='radio' name='somename1' value='Will receive focus as a group together with the other radio button' />")
                    .append("<input id='h' type='radio' name='somename1' value='Will receive focus as a group together with the other radio button' />")
                    .append("<input id='i' type='text' value='text field that is tabbed through' />")
                    .append("<input id='j' type='radio' name='somename2' value='Will receive focus as a single radio button' />")
                    .append("<input id='k' type='text' value='text field that is tabbed through' />")
                    .append("<input id='l' type='radio' name='somename1' value='Will receive focus as a single radio button' />")
                    .append("<input id='m' type='text' value='text field that is tabbed through' />")
                    .append("<input id='n' type='radio' name='somename3' value='Will receive focus as a single radio button' />")
                    .append("<input id='o' type='radio' name='somename4' value='Will receive focus as a single radio button' />")
                    .append("<input id='p' type='radio' name='somename3' value='Will receive focus as a single radio button' />")
                    .append("<input id='end' type='submit' value='submit button that end of the tabbing' />");

                assertStartFncEnd(function() {
                    JoelPurra.EmulateTab.tab();
                    assertFocusedId("a");
                    JoelPurra.EmulateTab.tab();
                    assertFocusedId("b");
                    JoelPurra.EmulateTab.tab();
                    assertFocusedId("e");
                    JoelPurra.EmulateTab.tab();
                    assertFocusedId("f");
                    JoelPurra.EmulateTab.tab();
                    assertFocusedId("i");
                    JoelPurra.EmulateTab.tab();
                    assertFocusedId("j");
                    JoelPurra.EmulateTab.tab();
                    assertFocusedId("k");
                    JoelPurra.EmulateTab.tab();
                    assertFocusedId("l");
                    JoelPurra.EmulateTab.tab();
                    assertFocusedId("m");
                    JoelPurra.EmulateTab.tab();
                    assertFocusedId("n");
                    JoelPurra.EmulateTab.tab();
                    assertFocusedId("o");
                    JoelPurra.EmulateTab.tab();
                    assertFocusedId("p");
                    JoelPurra.EmulateTab.tab();
                });
            });

            test("<input type='file' />", 3, function() {
                assertTypeTab("<input id='a' type='file' value='Will receive focus' />");
            });

            test("<input type='submit' />", 3, function() {
                assertTypeTab("<input id='a' type='submit' value='Will receive focus' />");
            });

            test("<input type='image' />", 3, function() {
                assertTypeTab("<input id='a' type='image' value='Will receive focus' />");
            });

            test("<input type='reset' />", 3, function() {
                assertTypeTab("<input id='a' type='reset' value='Will receive focus' />");
            });

            test("<input type='button' />", 3, function() {
                assertTypeTab("<input id='a' type='button' value='Will receive focus' />");
            });

            test("<input disabled='disabled' />", 2, function() {
                assertTypeSkip("<input id='a' type='text' disabled='disabled' value='Will not receive focus' />");
            });

            test("<input readonly='readonly' />", 3, function() {
                assertTypeTab("<input id='a' type='text' readonly='readonly' value='Will receive focus' />");
            });

            test("<input />", 3, function() {
                assertTypeTab("<input id='a' value='Will receive focus' />");
            });

            test("<input type='anythingwillreverttotext' />", 3, function() {
                assertTypeTab("<input id='a' type='anythingwillreverttotext' value='Will receive focus' />");
            });

            test("<button type='button'>", 3, function() {
                assertTypeTab("<input id='a' type='button' value='Will receive focus' />");
            });

            test("<button type='submit'>", 3, function() {
                assertTypeTab("<input id='a' type='submit' value='Will receive focus' />");
            });

            test("<button type='reset'>", 3, function() {
                assertTypeTab("<input id='a' type='reset' value='Will receive focus' />");
            });

            test("<button>", 3, function() {
                assertTypeTab("<input id='a' value='Will receive focus' />");
            });

            test("<select>", 3, function() {
                assertTypeTab("<select id='a'></select>");
            });

            test("<select> one <option>", 3, function() {
                assertTypeTab("<select id='a'><option>Anything</option></select>");
            });

            test("<select> two <option>", 3, function() {
                assertTypeTab("<select id='a'><option>Anything</option><option>Anything</option></select>");
            });

            test("<select multiple='multiple'>", 3, function() {
                assertTypeTab("<select id='a' multiple='multiple'></select>");
            });

            test("<select multiple='multiple'> one <option>", 3, function() {
                assertTypeTab("<select id='a' multiple='multiple'><option>Anything</option></select>");
            });

            test("<select multiple='multiple'> two <option>", 3, function() {
                assertTypeTab("<select id='a' multiple='multiple'><option>Anything</option><option>Anything</option></select>");
            });

            test("<textarea>", 3, function() {
                assertTypeTab("<textarea id='a'></textarea>");
            });

            test("<a href=\'\'>", 3, function() {
                assertTypeTab("<a id='a' href=''>Will receive focus</a>");
            });

            test("<a href=\'\'> empty contents", 2, function() {
                assertTypeSkip("<a id='a' href=''></a>");
            });

            test("<a>", 2, function() {
                assertTypeSkip("<a id='a'>Will not receive focus</a>");
            });
        }());
    }());
}(document, JoelPurra, jQuery, console, module, test, strictEqual, notStrictEqual));
