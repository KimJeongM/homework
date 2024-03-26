/*
* VirtualScroll from drojdjou
* https://github.com/drojdjou/bartekdrozdz.com/blob/master/static/src/framework/VirtualScroll.js
*/

var VirtualScroll = (function (document) {
    var vs = {};

    var numListeners, listeners = [], initialized = false;

    var touchStartX, touchStartY;

    // [ These settings can be customized with the options() function below ]
    // Mutiply the touch action by two making the scroll a bit faster than finger movement
    var touchMult = 2;
    // Firefox on Windows needs a boost, since scrolling is very slow
    var firefoxMult = 15;
    // How many pixels to move with each key press
    var keyStep = 120;
    // General multiplier for all mousehweel including FF
    var mouseMult = 1;

    var bodyTouchAction;

    var hasWheelEvent = 'onwheel' in document;
    var hasMouseWheelEvent = 'onmousewheel' in document;
    var hasTouch = 'ontouchstart' in document;
    var hasTouchWin = navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 1;
    var hasPointer = !!window.navigator.msPointerEnabled;
    var hasKeyDown = 'onkeydown' in document;

    var isFirefox = navigator.userAgent.indexOf('Firefox') > -1;

    var event = {
        y: 0,
        x: 0,
        deltaX: 0,
        deltaY: 0,
        originalEvent: null
    };

    vs.on = function (f) {
        if (!initialized) initListeners();
        listeners.push(f);
        numListeners = listeners.length;
    }

    vs.options = function (opt) {
        keyStep = opt.keyStep || 120;
        firefoxMult = opt.firefoxMult || 15;
        touchMult = opt.touchMult || 2;
        mouseMult = opt.mouseMult || 1;
    }

    vs.off = function (f) {
        listeners.splice(f, 1);
        numListeners = listeners.length;
        if (numListeners <= 0) destroyListeners();
    }

    var notify = function (e) {
        event.x += event.deltaX;
        event.y += event.deltaY;
        event.originalEvent = e;

        console.log( listeners)
        for (var i = 0; i < numListeners; i++) {
            listeners[i](event);
        }
    }

    var onWheel = function (e) {
        // In Chrome and in Firefox (at least the new one)
        event.deltaX = e.wheelDeltaX || e.deltaX * -1;
        event.deltaY = e.wheelDeltaY || e.deltaY * -1;

        // for our purpose deltamode = 1 means user is on a wheel mouse, not touch pad 
        // real meaning: https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent#Delta_modes
        if (isFirefox && e.deltaMode == 1) {
            event.deltaX *= firefoxMult;
            event.deltaY *= firefoxMult;
        }

        event.deltaX *= mouseMult;
        event.deltaY *= mouseMult;

        notify(e);
    }

    var onMouseWheel = function (e) {
        // In Safari, IE and in Chrome if 'wheel' isn't defined
        event.deltaX = (e.wheelDeltaX) ? e.wheelDeltaX : 0;
        event.deltaY = (e.wheelDeltaY) ? e.wheelDeltaY : e.wheelDelta;

        notify(e);
    }

    var onTouchStart = function (e) {
        var t = (e.targetTouches) ? e.targetTouches[0] : e;
        touchStartX = t.pageX;
        touchStartY = t.pageY;
    }

    var onTouchMove = function (e) {
        // e.preventDefault(); // < This needs to be managed externally
        var t = (e.targetTouches) ? e.targetTouches[0] : e;

        event.deltaX = (t.pageX - touchStartX) * touchMult;
        event.deltaY = (t.pageY - touchStartY) * touchMult;

        touchStartX = t.pageX;
        touchStartY = t.pageY;

        notify(e);
    }

    var onKeyDown = function (e) {
        // 37 left arrow, 38 up arrow, 39 right arrow, 40 down arrow
        event.deltaX = event.deltaY = 0;
        switch (e.keyCode) {
            case 37:
                event.deltaX = -keyStep;
                break;
            case 39:
                event.deltaX = keyStep;
                break;
            case 38:
                event.deltaY = keyStep;
                break;
            case 40:
                event.deltaY = -keyStep;
                break;
        }

        notify(e);
    }

    var initListeners = function () {
        if (hasWheelEvent) document.addEventListener("wheel", onWheel);
        if (hasMouseWheelEvent) document.addEventListener("mousewheel", onMouseWheel);

        if (hasTouch) {
            document.addEventListener("touchstart", onTouchStart);
            document.addEventListener("touchmove", onTouchMove);
        }

        if (hasPointer && hasTouchWin) {
            bodyTouchAction = document.body.style.msTouchAction;
            document.body.style.msTouchAction = "none";
            document.addEventListener("MSPointerDown", onTouchStart, true);
            document.addEventListener("MSPointerMove", onTouchMove, true);
        }

        if (hasKeyDown) document.addEventListener("keydown", onKeyDown);

        initialized = true;
    }

    var destroyListeners = function () {
        if (hasWheelEvent) document.removeEventListener("wheel", onWheel);
        if (hasMouseWheelEvent) document.removeEventListener("mousewheel", onMouseWheel);

        if (hasTouch) {
            document.removeEventListener("touchstart", onTouchStart);
            document.removeEventListener("touchmove", onTouchMove);
        }

        if (hasPointer && hasTouchWin) {
            document.body.style.msTouchAction = bodyTouchAction;
            document.removeEventListener("MSPointerDown", onTouchStart, true);
            document.removeEventListener("MSPointerMove", onTouchMove, true);
        }

        if (hasKeyDown) document.removeEventListener("keydown", onKeyDown);

        initialized = false;
    }

   // return vs;
})(document);

/*
* End VirtualScroll
*/


var scrollSection = document.getElementById('scroll_container');
var contentWrapper = scrollSection.querySelector('.wrapper');
var currentX = 0, targetX = 0, ease = 0.1;
var currentX2 = 0

const setTargetX = (value) => {
	targetX += value * 1.25;
    
	targetX = Math.max((scrollSection.getBoundingClientRect().width - window.innerWidth) * -1, targetX);
   
	targetX = Math.min(0, targetX);	
    console.log(targetX)
}

// A bit faster for touch
/* VirtualScroll.options({
	touchMult: 3,
});
	
VirtualScroll.on((e) => {
	setTargetX(e.deltaX || e.deltaY);
}) */

function mousemove(e) {
	setTargetX(e.movementX * 1.25);
}

function mousedown(e) {
	scrollSection.addEventListener('mousemove', mousemove);
	document.addEventListener('mouseup', mouseup);
	contentWrapper.style.transformOrigin = (currentX * -1) + e.clientX + 'px';
	contentWrapper.classList.add('drag');
}

function mouseup() {
		scrollSection.removeEventListener('mousemove', mousemove);
		contentWrapper.classList.remove('drag');
}

scrollSection.addEventListener('mousedown', mousedown);
	
	
const raf = () => {
	requestAnimationFrame(raf);
	currentX += Math.round(((targetX - currentX) * ease) * 1000) / 1000;
	currentX2 += (targetX - currentX2)*ease; 

	var t = `translateX(${currentX}px)`;
	var s = scrollSection.style;
	s["transform"] = t;
}
raf();