/*
Easing functions:
  - linear
  - easeInCubic
  - easeOutCubic
  - easeInOutCubic
  - easeInQuad
  - easeOutQuad
  - easeInOutQuad
  - easeInQuart
  - easeOutQuart
  - easeInOutQuart
  - easeInQuint
  - easeOutQuint
  - easeInOutQuint
*/
var smoothScrollSettings = {
  easing: "easeOutQuart",
  animationDuration: 600,
  changeUrl: true,
  navigationBreakpoint: 900,
  distanceFromTopDesktop: 20,
  distanceFromTopMobile: 90,
  // customFunction: closeMenu
};

// function closeMenu() {
//   console.log("closing menu...");
// }

// easing functions
var easings = {
  linear: function (t) {
    return t;
  },
  easeInQuad: function (t) {
    return t * t;
  },
  easeOutQuad: function (t) {
    return t * (2 - t);
  },
  easeInOutQuad: function (t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  },
  easeInCubic: function (t) {
    return t * t * t;
  },
  easeOutCubic: function (t) {
    return --t * t * t + 1;
  },
  easeInOutCubic: function (t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  },
  easeInQuart: function (t) {
    return t * t * t * t;
  },
  easeOutQuart: function (t) {
    return 1 - --t * t * t * t;
  },
  easeInOutQuart: function (t) {
    return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
  },
  easeInQuint: function (t) {
    return t * t * t * t * t;
  },
  easeOutQuint: function (t) {
    return 1 + --t * t * t * t * t;
  },
  easeInOutQuint: function (t) {
    return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
  },
};

function setScrollEventListeners() {
  // setting event listeners for anchor tags with # in the href attribute
  var smoothScrollLinks = document.querySelectorAll("a[href*='#']");
  smoothScrollLinks.forEach(function (smoothScrollLink) {
    smoothScrollLink.addEventListener("click", smoothScroll);
  });
  // setting event listeners for elements with the js-scroll class
  var smoothScrollElements = document.querySelectorAll(".js-scroll");
  smoothScrollElements.forEach(function (smoothScrollElement) {
    smoothScrollElement.addEventListener("click", smoothScroll);
  });
}
setScrollEventListeners();

// function for smooth scrolling
function smoothScroll(event) {
  event.preventDefault();
  var currentTarget = event.currentTarget;

  // get the target query selector
  var targetQuerySelector = "#";
  if (currentTarget.tagName == "A") {
    targetQuerySelector = currentTarget.getAttribute("href");
    if (smoothScrollSettings.changeUrl) {
      history.replaceState(null, "", targetQuerySelector);
    }
  } else if (
    currentTarget.classList.contains("js-scroll") &&
    currentTarget.dataset.target
  ) {
    targetQuerySelector = currentTarget.dataset.target;
  } else {
    console.error(
      "ERROR: No valid element provided, make sure you are using data-target='targetQuerySelector' to set the target element."
    );
  }

  // update url if target is an id
  if (smoothScrollSettings.changeUrl && targetQuerySelector === "#") {
    history.replaceState(null, "", " ");
  } else if (
    smoothScrollSettings.changeUrl &&
    typeof targetQuerySelector === "string" &&
    targetQuerySelector[0] === "#"
  ) {
    history.replaceState(null, "", targetQuerySelector);
  }

  // the targetPosition depends on the screen width
  var screenWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.getElementsByTagName("body")[0].clientWidth;

  // calculate how many px will need to be scrolled
  var distanceFromTop;
  if (screenWidth > smoothScrollSettings.navigationBreakpoint) {
    distanceFromTop = smoothScrollSettings.distanceFromTopDesktop;
  } else {
    distanceFromTop = smoothScrollSettings.distanceFromTopMobile;
  }

  // if targetQuerySelector = "#" --> scroll to top
  var targetElement;
  var targetPosition;
  if (targetQuerySelector === "#") {
    targetPosition = 0;
  } else {
    targetElement = document.querySelector(targetQuerySelector);
    targetPosition = targetElement.offsetTop - distanceFromTop;
  }

  var startPosition = window.pageYOffset;
  var distance = targetPosition - startPosition;
  var duration = smoothScrollSettings.animationDuration;
  var start = null;

  // setting easingfunction
  var easing = easings[smoothScrollSettings.easing];

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
    if (
      previousPosition &&
      parseInt(previousPosition.toString()) != window.pageYOffset
    ) {
      abortAnimation = true;
    }

    // if user didn't scroll
    if (!abortAnimation) {
      // calculating next position
      var progress = timestamp - start;
      var t = progress / smoothScrollSettings.animationDuration;
      var newPos = startPosition + distance * easing(t);
      // scrolling and checking if animation should end
      window.scrollTo(0, newPos);
      if (progress < duration) {
        previousPosition = newPos;
        window.requestAnimationFrame(step);
      } else {
        previousPosition = null;
      }
    }
  }

  // if custom function is provided
  if (smoothScrollSettings.customFunction) {
    smoothScrollSettings.customFunction();
  }
}
