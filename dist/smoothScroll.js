var SmoothScroll = /** @class */ (function () {
    function SmoothScroll(smoothScrollSettings) {
        this.isMobileDevice = false;
        this.easings = {
            linear: function (t) { return t; },
            easeInQuad: function (t) { return t * t; },
            easeOutQuad: function (t) { return t * (2 - t); },
            easeInOutQuad: function (t) {
                return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
            },
            easeInCubic: function (t) { return t * t * t; },
            easeOutCubic: function (t) { return --t * t * t + 1; },
            easeInOutCubic: function (t) {
                return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
            },
            easeInQuart: function (t) { return t * t * t * t; },
            easeOutQuart: function (t) { return 1 - --t * t * t * t; },
            easeInOutQuart: function (t) {
                return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
            },
            easeInQuint: function (t) { return t * t * t * t * t; },
            easeOutQuint: function (t) { return 1 + --t * t * t * t * t; },
            easeInOutQuint: function (t) {
                return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
            }
        };
        this.settings = {
            timingFunction: this.easings.easeOutQuint,
            animationDuration: 600,
            changeUrl: true,
            navigationBreakpoint: 800,
            distanceFromTopDesktop: 0,
            distanceFromTopMobile: 0
        };
        this.currentEvent = null;
        this.checkForMobileDevice();
        this.setEventListeners();
        if (smoothScrollSettings) {
            if (smoothScrollSettings.easing) {
                this.settings.timingFunction = this.easings[smoothScrollSettings.easing];
            }
            if (smoothScrollSettings.animationDuration) {
                this.settings.animationDuration =
                    smoothScrollSettings.animationDuration;
            }
            if (smoothScrollSettings.changeUrl) {
                this.settings.changeUrl = smoothScrollSettings.changeUrl;
            }
            if (smoothScrollSettings.navigationBreakpoint) {
                this.settings.navigationBreakpoint =
                    smoothScrollSettings.navigationBreakpoint;
            }
            if (smoothScrollSettings.distanceFromTopDesktop) {
                this.settings.distanceFromTopDesktop =
                    smoothScrollSettings.distanceFromTopDesktop;
            }
            if (smoothScrollSettings.distanceFromTopMobile) {
                this.settings.distanceFromTopMobile =
                    smoothScrollSettings.distanceFromTopMobile;
            }
            if (smoothScrollSettings.customFunction) {
                this.settings.customFunction = smoothScrollSettings.customFunction;
            }
        }
    }
    SmoothScroll.prototype.eventHandler = function () {
        if (this.currentEvent != null) {
            if (this.isMobileDevice) {
                this.scrollMobile(this.currentEvent);
            }
            else {
                this.scroll(this.currentEvent);
            }
        }
    };
    SmoothScroll.prototype.checkForMobileDevice = function () {
        if (navigator.userAgent.match(/Android/i) ||
            navigator.userAgent.match(/webOS/i) ||
            navigator.userAgent.match(/iPhone/i) ||
            navigator.userAgent.match(/iPad/i) ||
            navigator.userAgent.match(/iPod/i) ||
            navigator.userAgent.match(/BlackBerry/i) ||
            navigator.userAgent.match(/Windows Phone/i) ||
            isTouchDevice()) {
            this.isMobileDevice = true;
        }
        function isTouchDevice() {
            try {
                document.createEvent("TouchEvent");
                return true;
            }
            catch (e) {
                return false;
            }
        }
    };
    SmoothScroll.prototype.setEventListeners = function () {
        var self = this;
        // setting event listeners for anchor tags with # in the href attribute
        var smoothScrollElements = document.querySelectorAll("a[href*='#'], .js-scroll");
        smoothScrollElements.forEach(function (smoothScrollElement) {
            smoothScrollElement.addEventListener("click", function (event) {
                self.currentEvent = event;
                self.eventHandler();
            });
        });
    };
    SmoothScroll.prototype.scroll = function (event) {
        event.preventDefault();
        var currentTarget = event.currentTarget;
        var self = this;
        // get the target query selector
        var targetQuerySelector = "#";
        if (currentTarget.tagName === "A") {
            targetQuerySelector = currentTarget.getAttribute("href");
            if (self.settings.changeUrl) {
                window.history.replaceState(null, "", targetQuerySelector);
            }
        }
        else if (currentTarget.classList.contains("js-scroll") &&
            currentTarget.dataset.target) {
            targetQuerySelector = currentTarget.dataset.target;
        }
        else {
            console.error("ERROR: No valid element provided, make sure you are using data-target='targetQuerySelector' to set the target element.");
        }
        // the targetPosition depends on the screen width
        var screenWidth = window.innerWidth ||
            document.documentElement.clientWidth ||
            document.getElementsByTagName("body")[0].clientWidth;
        // calculate how many px will need to be scrolled
        var distanceFromTop;
        if (screenWidth > self.settings.navigationBreakpoint) {
            distanceFromTop = self.settings.distanceFromTopDesktop;
        }
        else {
            distanceFromTop = self.settings.distanceFromTopMobile;
        }
        // if targetQuerySelector = "#" --> scroll to top
        var targetElement;
        var targetPosition;
        if (targetQuerySelector === "#") {
            targetPosition = 0;
        }
        else {
            targetElement = document.querySelector(targetQuerySelector);
            targetPosition = targetElement.offsetTop - distanceFromTop;
        }
        var startPosition = window.pageYOffset;
        var distance = targetPosition - startPosition;
        var duration = self.settings.animationDuration;
        var start = null;
        window.requestAnimationFrame(step);
        // abort scrolling when user scrolls
        var previousPosition = null;
        var abortAnimation = false;
        function step(timestamp) {
            if (!start) {
                start = timestamp;
                previousPosition = window.pageYOffset;
            }
            // check if user scrolled
            if (previousPosition &&
                parseInt(previousPosition.toString()) !== window.pageYOffset) {
                abortAnimation = true;
            }
            // if user didn't scroll or is mobile device
            if (!abortAnimation) {
                // calculating next position
                var progress = timestamp - start;
                var t = progress / self.settings.animationDuration;
                var newPos = startPosition + distance * self.settings.timingFunction(t);
                // scrolling and checking if animation should end
                window.scrollTo(0, newPos);
                if (progress < duration) {
                    previousPosition = newPos;
                    window.requestAnimationFrame(step);
                }
                else {
                    previousPosition = null;
                }
            }
        }
        // update url if target is an id
        if (self.settings.changeUrl && targetQuerySelector === "#") {
            window.history.replaceState(null, "", " ");
        }
        else if (self.settings.changeUrl &&
            typeof targetQuerySelector === "string" &&
            targetQuerySelector[0] === "#") {
            window.history.replaceState(null, "", targetQuerySelector);
        }
        // if custom function is provided
        if (self.settings.customFunction) {
            self.settings.customFunction();
        }
    };
    SmoothScroll.prototype.scrollMobile = function (event) {
        event.preventDefault();
        var currentTarget = event.currentTarget;
        var self = this;
        // get the target query selector
        var targetQuerySelector = "#";
        if (currentTarget.tagName === "A") {
            targetQuerySelector = currentTarget.getAttribute("href");
            if (self.settings.changeUrl) {
                window.history.replaceState(null, "", targetQuerySelector);
            }
        }
        else if (currentTarget.classList.contains("js-scroll") &&
            currentTarget.dataset.target) {
            targetQuerySelector = currentTarget.dataset.target;
        }
        else {
            console.error("ERROR: No valid element provided, make sure you are using data-target='targetQuerySelector' to set the target element.");
        }
        // the targetPosition depends on the screen width
        var screenWidth = window.innerWidth ||
            document.documentElement.clientWidth ||
            document.getElementsByTagName("body")[0].clientWidth;
        // calculate how many px will need to be scrolled
        var distanceFromTop;
        if (screenWidth > self.settings.navigationBreakpoint) {
            distanceFromTop = self.settings.distanceFromTopDesktop;
        }
        else {
            distanceFromTop = self.settings.distanceFromTopMobile;
        }
        // if targetQuerySelector = "#" --> scroll to top
        var targetElement;
        var targetPosition;
        if (targetQuerySelector === "#") {
            targetPosition = 0;
        }
        else {
            targetElement = document.querySelector(targetQuerySelector);
            targetPosition = targetElement.offsetTop - distanceFromTop;
        }
        var startPosition = window.pageYOffset;
        var distance = targetPosition - startPosition;
        var duration = self.settings.animationDuration;
        var start = null;
        window.requestAnimationFrame(step);
        function step(timestamp) {
            if (!start)
                start = timestamp;
            var progress = timestamp - start;
            var t = progress / self.settings.animationDuration;
            var newPos = startPosition + distance * self.settings.timingFunction(t);
            window.scrollTo(0, newPos);
            if (progress < duration) {
                window.requestAnimationFrame(step);
            }
        }
    };
    return SmoothScroll;
}());
